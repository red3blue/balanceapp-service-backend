import { Controller, Get, Inject, Param } from "@nestjs/common";

@Controller("/healthCheck")
export class AppController {
  @Get()
  async healthCheck() {
    return {
      status: "UP",
      date: new Date(),
    };
  }
}
