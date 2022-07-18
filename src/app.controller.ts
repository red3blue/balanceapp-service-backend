import { Controller, Get, Inject, Param } from "@nestjs/common";

@Controller("/")
export class AppController {
  @Get("")
  async healthCheck() {
    let jesusDateBirth = new Date("1940-01-01");

    let timeelapsed = new Date().getTime() - jesusDateBirth.getTime();
    let seconds = Math.floor(timeelapsed / 1000);
    return {
      status: "OK",
      timeelapsed: seconds,
    };
  }
}
