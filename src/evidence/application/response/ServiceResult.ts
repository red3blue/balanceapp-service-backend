import { HttpStatusCodes } from "./HttpStatusCodes";

// @injectable()
export class ServiceResult {
  public StatusCode: HttpStatusCodes;
  public Message: string | null;
  public Data: any | null;

  constructor(statusCode: HttpStatusCodes, message: string | null = null, data: any = null) {
    this.StatusCode = statusCode;
    this.Data = data;
    this.Message = message;
  }
}
