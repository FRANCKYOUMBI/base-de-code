import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Customer } from '@/customers/models/customer.model';
import { InjectRepository } from '@nestjs/typeorm';
import { CustomerGroup } from '@/customers/models/customer_group.model';
import { Repository } from 'typeorm';
import {
  CreateCustomerInput,
  CreateCustomerOutput,
} from '@/customers/dto/create-customer.dto';
import {
  CreateCustomerGroupInput,
  CreateCustomerGroupOutput,
} from '@/customers/dto/create-customer-group.dto';
import {
  CustomersPagination,
  PaginationCustomersArgs,
} from '@/customers/dto/pagination-customer.dto';
import { SortDirection } from '@/pagination/dto/pagination.dto';
import {
  CustomerGroupsPagination,
  PaginationCustomerGroupsArgs,
} from '@/customers/dto/pagination-customer-category.dto';

@Injectable()
export class CustomersService {
  constructor(
    @InjectRepository(Customer)
    private readonly customerRepository: Repository<Customer>,
    @InjectRepository(CustomerGroup)
    private readonly customerGroupRepository: Repository<CustomerGroup>,
  ) {}

  async findCustomers(
    args: PaginationCustomersArgs,
  ): Promise<CustomersPagination> {
    const { take = 10, skip = 0, keyword, groupUuid, sortBy } = args;
    const qb = this.customerRepository
      .createQueryBuilder('customers')
      .leftJoinAndSelect('customers.group', 'group');

    qb.take(take);
    qb.skip(skip);

    if (keyword) {
      qb.where('customers.name ILIKE :keyword', { keyword: `%${keyword}%` });
      if (groupUuid) {
        qb.andWhere('customers.groupUuid = :groupUuid', { groupUuid });
      }
    } else if (groupUuid) {
      qb.where('customers.groupUuid = :groupUuid', { groupUuid });
    }

    if (sortBy) {
      if (sortBy.createdAt != null) {
        qb.addOrderBy(
          'customers.createdAt',
          sortBy.createdAt === SortDirection.ASC ? 'ASC' : 'DESC',
        );
      }
      if (sortBy.name != null) {
        qb.addOrderBy(
          'customers.name',
          sortBy.name === SortDirection.ASC ? 'ASC' : 'DESC',
        );
      }
    } else {
      qb.orderBy('customers.createdAt', 'DESC');
    }

    const [nodes, totalCount] = await qb.getManyAndCount();
    return { data: nodes, totalCount };
  }

  async findOneCustomer(uuid: string): Promise<CreateCustomerOutput> {
    const customer = await this.customerRepository
      .createQueryBuilder('customer')
      .where('customer.uuid = :uuid', { uuid })
      .leftJoinAndSelect('customer.group', 'group')
      .leftJoinAndSelect('customer.sales', 'sales')
      .getOne();

    if (!customer) {
      throw new HttpException('Client non trouvé', HttpStatus.NOT_FOUND);
    }

    return { customer };
  }

  async createCustomer(
    createCustomerInput: CreateCustomerInput,
  ): Promise<CreateCustomerOutput> {
    const { groupUuid, ...customerData } = createCustomerInput;
    const customer = this.customerRepository.create(customerData);

    customer.group = new CustomerGroup();
    customer.group.uuid = groupUuid;

    await customer.save();
    return this.findOneCustomer(customer.uuid);
  }

  async updateCustomer(
    uuid: string,
    updateCustomerInput: CreateCustomerInput,
  ): Promise<CreateCustomerOutput> {
    const { ...data } = updateCustomerInput;
    const customer = await this.customerRepository.findOneBy({ uuid });

    if (!customer) {
      throw new HttpException('Client non trouvé', HttpStatus.NOT_FOUND);
    }

    customer.name = data.name;
    customer.email = data.email;
    customer.phone = data.phone;
    customer.company = data.company;
    customer.rccm = data.rccm;
    customer.nui = data.nui;
    customer.address = data.address;
    customer.city = data.city;
    customer.country = data.country;
    customer.group = new CustomerGroup();
    customer.group.uuid = data.groupUuid;

    await customer.save();

    return this.findOneCustomer(uuid);
  }

  async deleteCustomer(uuid: string): Promise<void> {
    const customer = await this.customerRepository.findOneBy({ uuid });

    if (!customer) {
      throw new HttpException('Client non trouvé', HttpStatus.NOT_FOUND);
    }

    await this.customerRepository.remove(customer);
  }

  async findCustomerGroups(
    args: PaginationCustomerGroupsArgs,
  ): Promise<CustomerGroupsPagination> {
    const { take = 10, skip = 0, sortBy } = args;
    const qb = this.customerGroupRepository.createQueryBuilder('group');

    qb.take(take);
    qb.skip(skip);

    if (sortBy) {
      if (sortBy.createdAt != null) {
        qb.addOrderBy(
          'group.createdAt',
          sortBy.createdAt === SortDirection.ASC ? 'ASC' : 'DESC',
        );
      }
      if (sortBy.name != null) {
        qb.addOrderBy(
          'group.name',
          sortBy.name === SortDirection.ASC ? 'ASC' : 'DESC',
        );
      }
    } else {
      qb.orderBy('group.createdAt', 'DESC');
    }

    const [nodes, totalCount] = await qb.getManyAndCount();
    return { data: nodes, totalCount };
  }

  async findOneCustomerGroup(uuid: string): Promise<CreateCustomerGroupOutput> {
    const customerGroup = await this.customerGroupRepository.findOneBy({
      uuid,
    });

    if (!customerGroup) {
      throw new HttpException(
        'Groupe de clients non trouvé',
        HttpStatus.NOT_FOUND,
      );
    }

    return { customerGroup };
  }

  async createCustomerGroup(
    createCustomerGroupInput: CreateCustomerGroupInput,
  ): Promise<CreateCustomerGroupOutput> {
    const customerGroup = this.customerGroupRepository.create(
      createCustomerGroupInput,
    );
    await this.customerGroupRepository.save(customerGroup);
    return this.findOneCustomerGroup(customerGroup.uuid);
  }

  async updateCustomerGroup(
    uuid: string,
    updateCustomerGroupInput: CreateCustomerGroupInput,
  ): Promise<CreateCustomerGroupOutput> {
    const { ...data } = updateCustomerGroupInput;
    const customerGroup = await this.customerGroupRepository.findOneBy({
      uuid,
    });

    if (!customerGroup) {
      throw new HttpException(
        'Groupe de clients non trouvé',
        HttpStatus.NOT_FOUND,
      );
    }

    this.customerGroupRepository.merge(customerGroup, data);
    await this.customerGroupRepository.save(customerGroup);

    return this.findOneCustomerGroup(uuid);
  }

  async deleteCustomerGroup(uuid: string): Promise<void> {
    const customerGroup = await this.customerGroupRepository.findOneBy({
      uuid,
    });

    if (!customerGroup) {
      throw new HttpException(
        'Groupe de clients non trouvé',
        HttpStatus.NOT_FOUND,
      );
    }

    await this.customerGroupRepository.remove(customerGroup);
  }
}
