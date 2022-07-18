import { Controller, Get, Inject, Param } from "@nestjs/common";
import { IProductService } from "./evidence/application/services/IProductService";
import { ProductService } from "./evidence/application/services/ProductService";

@Controller("/")
export class AppController {
    
    // @Get("")
    // getUsers(){
    //     let something = this.productService.getAll()
    //     return { name:"Hello World!"};
    // }

    // @Get("/:userId")
    // getUser(@Param() params){
    //     return { name:"Hello World!", params};
    // }


}