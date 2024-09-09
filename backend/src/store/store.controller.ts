import { Controller, Get, Param } from "@nestjs/common";
import { Public } from "../auth/decorators";
import { StoreService } from "./store.service";
import { StoreDto } from "./dto";

@Controller("stores")
export class StoreController {
  constructor(private readonly storeService: StoreService) {}

  @Public()
  @Get()
  getAll() {
    return this.storeService.getAll();
  }

  @Public()
  @Get(":id")
  findOne(@Param() params: StoreDto) {
    return this.storeService.getStore(params.id);
  }
}
