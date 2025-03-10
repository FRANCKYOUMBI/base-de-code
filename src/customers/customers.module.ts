import { Module } from '@nestjs/common';
import { CustomersController } from './customers.controller';
import { CustomersService } from './customers.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CustomerGroup } from '@/customers/models/customer_group.model';
import { Customer } from '@/customers/models/customer.model';

@Module({
  imports: [TypeOrmModule.forFeature([CustomerGroup, Customer])],
  controllers: [CustomersController],
  providers: [CustomersService],
  exports: [CustomersService],
})
export class CustomersModule {}
