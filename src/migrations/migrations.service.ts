import { HttpException, Injectable } from '@nestjs/common';
import { UsersService } from '@/users/users.service';
import { ConfigService } from '@nestjs/config';
import { Roles } from '@/users/models/role.model';
import { CreateUserInput } from '@/users/dto/create-user.dto';
import { I18nContext, I18nService } from 'nestjs-i18n';
import { StoragesService } from '@/storages/storages.service';
import * as fs from 'fs';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class MigrationsService {
  async createAdminAccount() {
    const currentAdmin = await this.userService.findOneByEmail(
      this.configService.get('ADMIN_USER_EMAIL'),
    );
    if (currentAdmin) {
      throw new HttpException(
        this.i18n.t('migrations.admin_account_already_exists', {
          lang: I18nContext.current().lang,
        }),
        409,
      );
    }

    const newUserInput = new CreateUserInput();
    newUserInput.email = this.configService.get('ADMIN_USER_EMAIL');
    newUserInput.password = this.configService.get('ADMIN_USER_PASSWORD');
    newUserInput.firstName = this.configService.get('ADMIN_USER_FIRST_NAME');
    newUserInput.lastName = this.configService.get('ADMIN_USER_LAST_NAME');
    newUserInput.activated = true;
    newUserInput.role = Roles.admin;
    await this.userService.create(newUserInput);

    return {
      message: 'Compte administrateur créé avec succès',
    };
  }

  // async createDefaultCurrencies() {
  //   const currencies = JSON.parse(
  //     fs.readFileSync('src/migrations/data/currencies.json', 'utf8'),
  //   );
  //   for (const currency of currencies) {
  //     const previous_currency =
  //       await this.configurationsService.findOneCurrency(currency.uuid);
  //     if (previous_currency) {
  //       previous_currency.name = currency.name;
  //       previous_currency.code = currency.code;
  //       previous_currency.symbol = currency.symbol;
  //       previous_currency.symbolLeft = currency.symbolLeft;
  //       previous_currency.hasDecimals = currency.hasDecimals;
  //       await previous_currency.save();
  //     } else {
  //       await this.configurationsService.createCurrency({
  //         uuid: currency.uuid,
  //         name: currency.name,
  //         code: currency.code,
  //         symbol: currency.symbol,
  //         symbolLeft: currency.symbolLeft,
  //         hasDecimals: currency.hasDecimals,
  //       });
  //     }
  //   }
  //   return {
  //     message: 'Monnaies ajoutées avec succès',
  //   };
  // }

  constructor(
    private readonly userService: UsersService,
    private readonly configService: ConfigService,
    private readonly i18n: I18nService,
    private readonly storagesService: StoragesService,
    // private readonly stocksService: StocksService,
    
    // @InjectRepository(ProductUnit)
    // private readonly productUnitRepository: Repository<ProductUnit>,
   
  ) {}

}
