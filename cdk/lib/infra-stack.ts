import { Stack, StackProps } from 'aws-cdk-lib';
import * as ecs from 'aws-cdk-lib/aws-ecs'
import * as ec2 from 'aws-cdk-lib/aws-ec2'
import * as ssm from 'aws-cdk-lib/aws-ssm'
import * as iam from 'aws-cdk-lib/aws-iam'
import { Construct } from 'constructs';
import * as logs from 'aws-cdk-lib/aws-logs'
import 'dotenv/config'

interface ITestProps extends StackProps {
  stage: 'development' | 'qa' | 'staging' | 'production';
  workspace: 'lab' | 'staging' | 'production'
  service: 'test-service'
}

export class TestStack extends Stack {
  constructor(scope: Construct, id: string, props?: ITestProps) {
    super(scope, id, props);
    const context = `${props?.stage}/${props?.service}`

    // Find vpcId in ssm
    const vpcId = ssm.StringParameter.valueFromLookup(this, `/${props?.workspace}/infrastructure/vpcId`);
    
    // Get vpcCluster from lookup
    const clusterVpc = ec2.Vpc.fromLookup(this, "defaultVpc", { vpcId: vpcId });

    // Create a role
    const role = new iam.Role(this, `${context}/ExecutionRole`, {
      assumedBy: new iam.ServicePrincipal("ecs-tasks.amazonaws.com"),
      description: "This is a custom role...",
    });

    // Create a policy and attach to role
    const policy = new iam.ManagedPolicy(this, `${context}/policy`, {
      description: "Allow role to write in logsGroup",
      statements: [
        new iam.PolicyStatement({
          effect: iam.Effect.ALLOW,
          actions: [
            "ecr:GetAuthorizationToken", 
            "ecr:BatchCheckLayerAvailability", 
            "ecr:GetDownloadUrlForLayer", 
            "ecr:BatchGetImage", 
            "logs:*", 
            "iam:PassRole",
            "secretsmanager:GetSecretValue",
            "ecs:*",
            "ec2:*",
            "ecr:*",
          ],
          resources: ["*"],
        }),
      ],
      roles: [role],
    });

    // Create a log group
    const logGroup = new logs.LogGroup(this, `${context}/ActivityEcs`, {});

    // get cluster arn from ssm
    // const clusterArn = ssm.StringParameter.valueFromLookup(this, `/${props?.workspace}/infrastructure/CronosClusterArn`);
    // Get cluster from arn
    // const cluster = ecs.Cluster.fromClusterArn(this, 'TestCluster', 'arn:aws:ecs:us-east-1:339871347968:cluster/Cronos-lab');

    const cluster = ecs.Cluster.fromClusterAttributes(this, 'TestCluster', {
      clusterArn: 'arn:aws:ecs:us-east-1:339871347968:cluster/Cronos-lab',
      clusterName: 'Cronos-lab',
      vpc: clusterVpc,
      securityGroups: [
        new ec2.SecurityGroup(this, 'TestSecurityGroup', {
          vpc: clusterVpc,
          allowAllOutbound: true,
        }),
      ],
    });

    // Create a task definition
    const taskDefinition = new ecs.TaskDefinition(this, `${context}/task-definition`, {
      compatibility: ecs.Compatibility.EC2,
      cpu: '256',
      memoryMiB: '256',
      networkMode: ecs.NetworkMode.BRIDGE,
      executionRole: role,
      taskRole: role

    });

    // Create a service
    const service = new ecs.Ec2Service(this, `${context}/service`, {
      cluster: cluster,
      taskDefinition: taskDefinition,
      desiredCount: 1,
      minHealthyPercent: 100,
      maxHealthyPercent: 200,
    });

    service.autoScaleTaskCount({
      minCapacity: 1,
      maxCapacity: 3
    })

    // Create a container
    const container = taskDefinition.addContainer(`${context}-container`, {
      image: ecs.ContainerImage.fromAsset('../', {
        file: './Dockerfile',
      exclude: ['/cdk', '/node_modules']
      }),
      memoryReservationMiB: 128,
      cpu: 128,
      essential: true,
      logging: ecs.LogDrivers.awsLogs({
        streamPrefix: `${context}`,
        logGroup: logGroup,
      }),
      environment: {
        'PORT': `${process.env.PORT}`,
        'NODE_ENV': 'local',
        'SYSTEM_NAME': `${process.env.SYSTEM_NAME}`,
        'CMS_IMPLEMENTATION_SYSTEM_NAME': `${process.env.CMS_IMPLEMENTATION_SYSTEM_NAME}`,
        'DATABASE_URL': `${process.env.DATABASE_URL}`,
        'ENV_DB_LOCAL': `${process.env.ENV_DB_LOCAL}`,
        'CMS_IMPLEMENTATION_BASE_API': `${process.env.CMS_IMPLEMENTATION_BASE_API}`,
        'DICTIONARY_BASE_API': `${process.env.DICTIONARY_BASE_API}`,
        'DM_BASE_API': `${process.env.DM_BASE_API}`,
      }
    });

    container.addPortMappings({
    containerPort: 3000,
      hostPort: 0,
      protocol: ecs.Protocol.TCP
    });

  }
}
