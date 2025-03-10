import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Res,
  Query,
  Request,
} from '@nestjs/common';
import { StoragesService } from './storages.service';
import { CreateRestStorageInput } from './dto/create-storage.dto';
import { I18n, I18nContext } from 'nestjs-i18n';
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { Public } from '@/auths/decorators/public.decorator';

@Controller('storages')
@ApiTags('storages')
export class StoragesController {
  constructor(private readonly storageService: StoragesService) {}

  @Get('/file/get/:bucket/:file_name')
  @ApiOperation({ summary: 'Get file from storage' })
  @Public()
  async displayFile(
    @Res() res,
    @Param('bucket') bucket: string,
    @Param('file_name') file_name: string,
    @Query('preview') preview: string,
    @I18n() i18n: I18nContext,
  ) {
    console.log('bucket', bucket);
    if (preview !== 'false') {
      const url = await this.storageService.displayFile(bucket, file_name);
      return res.status(302).redirect(url);
    } else {
      try {
        const fileBuffer = await this.storageService.getFile(bucket, file_name);
        res.set({
          'Content-Type': 'application/octet-stream',
          'Content-Disposition': `attachment; filename="${file_name}"`,
        });
        res.send(fileBuffer);
      } catch (error) {
        res.status(500).send(i18n.t('errors.error_when_getting_file'));
      }
    }
  }

  @Post('/file/upload')
  @ApiOperation({ summary: 'Upload file to storage' })
  @ApiCreatedResponse({ description: 'File uploaded' })
  @ApiBearerAuth()
  async uploadFile(@Body() data: CreateRestStorageInput) {
    return await this.storageService.create(data);
  }
}
