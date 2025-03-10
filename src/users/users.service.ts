import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import { User } from '@/users/models/user.model';
import { Token } from '@/users/models/token.model';
import { Repository } from 'typeorm';
import { CreateUserInput, CreateUserOutput } from '@/users/dto/create-user.dto';
import {
  PaginationUsersArgs,
  UsersPagination,
} from '@/users/dto/pagination-users.dto';
import { SortDirection } from '@/pagination/dto/pagination.dto';
import { I18nContext, I18nService } from 'nestjs-i18n';
import { Roles } from '@/users/models/role.model';
import { ListRolesOutput } from '@/users/dto/list-roles.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(Token)
    private readonly tokenRepository: Repository<Token>,
    private readonly i18n: I18nService,
  ) {}

  async createToken(token: string): Promise<void> {
    await this.tokenRepository.create({ token }).save();
  }

  async createTokenWithUSer(token: string, userUuid: string): Promise<void> {
    await this.tokenRepository.create({ token, userUuid }).save();
  }

  async findToken(token: string): Promise<Token | undefined> {
    return this.tokenRepository.findOneOrFail({
      where: { token },
    });
  }

  async findTokenUser(
    token: string,
    userUuid: string,
  ): Promise<Token | undefined> {
    return this.tokenRepository.findOneOrFail({
      where: { token, userUuid },
    });
  }

  async deleteToken(token: string): Promise<void> {
    await (
      await this.tokenRepository.findOneOrFail({ where: { token } })
    ).remove();
  }

  async deleteUserToken(token: string, userUuid: string): Promise<void> {
    await (
      await this.tokenRepository.findOneOrFail({ where: { token, userUuid } })
    ).remove();
  }

  async create(input: CreateUserInput): Promise<CreateUserOutput> {
    try {
      input.password = await bcrypt.hash(input.password, 10);
      const user = this.userRepository.create(input);
      user.role = input.role;
      await user.save();
      return { user };
    } catch (error) {
      if (error?.code === '23505') {
        throw new HttpException(
          this.i18n.t('users.user_with_email_exists', {
            lang: I18nContext.current().lang,
            args: { email: input.email },
          }),
          HttpStatus.BAD_REQUEST,
        );
      }
      throw new HttpException(
        this.i18n.t('common.internal_server_error', {
          lang: I18nContext.current().lang,
        }),
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async updateUser(
    uuid: string,
    input: CreateUserInput,
  ): Promise<CreateUserOutput> {
    const user = await this.userRepository.findOne({
      where: { uuid },
    });
    if (!user) {
      throw new HttpException(
        this.i18n.t('users.user_not_exists', {
          lang: I18nContext.current().lang,
        }),
        HttpStatus.BAD_REQUEST,
      );
    }
    if (input.password) {
      input.password = await bcrypt.hash(input.password, 10);
    } else {
      delete input.password;
    }
    this.userRepository.merge(user, input);
    await user.save();
    return this.findOneUser(uuid);
  }

  async findAll(args: PaginationUsersArgs): Promise<UsersPagination> {
    console.log(args);
    const qb = this.userRepository.createQueryBuilder('users').select();
    // Load avatar
    qb.leftJoinAndSelect('users.avatar', 'avatar');
    qb.take(args.take);
    qb.skip(args.skip);
    if (args.sortBy) {
      if (args.sortBy.createdAt != null) {
        qb.addOrderBy(
          'users.createdAt',
          args.sortBy.createdAt === SortDirection.ASC ? 'ASC' : 'DESC',
        );
      }
      if (args.sortBy.email != null) {
        qb.addOrderBy(
          'users.email',
          args.sortBy.email === SortDirection.ASC ? 'ASC' : 'DESC',
        );
      }
      if (args.sortBy.role != null) {
        qb.addOrderBy(
          'users.role',
          args.sortBy.role === SortDirection.ASC ? 'ASC' : 'DESC',
        );
      }
      if (args.sortBy.firstName != null) {
        qb.addOrderBy(
          'users.firstName',
          args.sortBy.firstName === SortDirection.ASC ? 'ASC' : 'DESC',
        );
      }
      if (args.sortBy.lastName != null) {
        qb.addOrderBy(
          'users.lastName',
          args.sortBy.lastName === SortDirection.ASC ? 'ASC' : 'DESC',
        );
      }
    } else {
      qb.orderBy('users.createdAt', 'DESC');
    }
    if (args.keyword != null && args.keyword !== '') {
      qb.where('users.email ILIKE :keyword', { keyword: `%${args.keyword}%` })
        .orWhere('users.firstName ILIKE :keyword', {
          keyword: `%${args.keyword}%`,
        })
        .orWhere('users.lastName ILIKE :keyword', {
          keyword: `%${args.keyword}%`,
        });
    }
    const [nodes, totalCount] = await qb.getManyAndCount();
    return { data: nodes, totalCount };
  }

  async findOne(uuid: User['uuid']): Promise<User | undefined> {
    return this.userRepository.findOneOrFail({
      where: { uuid },
      relations: ['avatar'],
    });
  }

  async findOneByEmail(email: User['email']): Promise<User | undefined> {
    return this.userRepository.findOne({
      where: { email: email },
      relations: ['avatar'],
    });
  }

  async findOneUser(uuid: User['uuid']): Promise<CreateUserOutput> {
    const user = await this.userRepository.findOne({
      where: { uuid },
      relations: ['avatar'],
    });
    if (!user) {
      throw new HttpException('Utilisateur non trouvé', HttpStatus.BAD_REQUEST);
    }
    return { user };
  }

  async deleteUser(uuid: User['uuid']): Promise<void> {
    const user = await this.userRepository.findOne({
      where: { uuid },
    });
    if (!user) {
      throw new HttpException('Utilisateur non trouvé', HttpStatus.NOT_FOUND);
    }
    await user.remove();
  }

  getRoles(): ListRolesOutput {
    return <ListRolesOutput>{
      roles: Object.values(Roles),
    };
  }

  async partialUpdate(uuid: string, param2: object) {
    await this.userRepository.update(uuid, param2);
  }

  async findAllWithoutPagination(): Promise<User[]> {
    return this.userRepository.find({
      where: { activated: true, enabled: true },
    });
  }
}
