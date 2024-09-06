import { Controller, Get } from "@nestjs/common";
import { Public } from "../auth/decorators";
import { StoreService } from "./store.service";

@Controller("stores")
export class StoreController {
  constructor(private readonly storeService: StoreService) {}

  @Public()
  @Get()
  getAll() {
    return this.storeService.getAll();
  }
}
