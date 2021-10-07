import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { OrderSchema, Order as OrderSchemaClass } from './models/order.schema';
import { UserSchema, User as UserSchemaClass } from './models/user.schema';
import { OrdersService } from './services/orders.service';
import { OrdersController } from './controllers/orders.controller';
import { OrderDao } from './dao/order.dao';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: OrderSchemaClass.name, schema: OrderSchema },
      { name: UserSchemaClass.name, schema: UserSchema },
    ]),
  ],
  controllers: [OrdersController],
  providers: [OrdersService, OrderDao],
  exports: [OrdersService, OrderDao],
})
export class OrdersModule {}
