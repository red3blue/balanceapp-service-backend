#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from 'aws-cdk-lib';
import { TestStack } from '../lib/infra-stack';
import "dotenv/config"

const app = new cdk.App();
const env = { account: process.env.AWS_ACCOUNT_NUMBER, region: process.env.AWS_DEFAULT_REGION ?? "us-east-1" };

new TestStack(app, `test-service-development`, {
  stage: "development",
  service: "test-service",
  workspace: "lab",
  env: env,
});