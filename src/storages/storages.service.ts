import { HttpException, Injectable } from '@nestjs/common';

import { InjectRepository } from '@nestjs/typeorm';
import { v4 as uuidv4 } from 'uuid';
import { SortDirection } from '@/pagination/dto/pagination.dto';
import { Repository } from 'typeorm';
import { MinioService } from 'nestjs-minio-client';
import {
  CreateRestStorageInput,
  CreateStorageInput,
  CreateStorageOutput,
} from './dto/create-storage.dto';
import { StorageDeleteOutput } from './dto/delete-storage.dto';
import {
  StoragesPagination,
  StoragesPaginationArgs,
} from './dto/pagination-storages.dto';
import { Storage } from './models/storage.model';
import {
  UpdateStorageInput,
  UpdateStorageOutput,
} from './dto/update-storage.dto';
import { ConfigService } from '@nestjs/config';
import { I18nContext, I18nService } from 'nestjs-i18n';
import { Buffer } from 'buffer';
import * as https from 'https';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const sharp = require('sharp');

@Injectable()
export class StoragesService {
  private readonly bucketName: string;
  private readonly imageMediumWidth: number;
  private readonly imageThumbnailWidth: number;
  private readonly apiUrl: string;
  constructor(
    @InjectRepository(Storage)
    private readonly storageRepository: Repository<Storage>,
    private readonly minioService: MinioService,
    private readonly configService: ConfigService,
    private readonly i18n: I18nService,
  ) {
    this.bucketName = configService.get('MINIO_BUCKET');
    this.imageMediumWidth = parseInt(configService.get('IMAGE_MEDIUM_WIDTH'));
    this.imageThumbnailWidth = parseInt(
      configService.get('IMAGE_THUMBNAIL_WIDTH'),
    );
    this.apiUrl = configService.get('MINIO_API_URL');
  }

  public get client() {
    return this.minioService.client;
  }

  async findAll(args: StoragesPaginationArgs): Promise<StoragesPagination> {
    const qb = this.storageRepository.createQueryBuilder('storages');
    const filterByMimeType = args.filterByMimeType || [];
    qb.take(args.take);
    qb.skip(args.skip);
    qb.orderBy('storages.createdAt', 'DESC');
    if (args.sortBy) {
      if (args.sortBy.createdAt != null) {
        qb.addOrderBy(
          'storages.createdAt',
          args.sortBy.createdAt === SortDirection.ASC ? 'ASC' : 'DESC',
        );
      }
      if (args.sortBy.file_name != null) {
        qb.addOrderBy(
          'storages.file_name',
          args.sortBy.file_name === SortDirection.ASC ? 'ASC' : 'DESC',
        );
      }

      if (args.sortBy.url != null) {
        qb.addOrderBy(
          'storages.url',
          args.sortBy.url === SortDirection.ASC ? 'ASC' : 'DESC',
        );
      }
      if (args.sortBy.caption != null) {
        qb.addOrderBy(
          'storages.caption',
          args.sortBy.caption === SortDirection.ASC ? 'ASC' : 'DESC',
        );
      }
      if (args.sortBy.description != null) {
        qb.addOrderBy(
          'storages.description',
          args.sortBy.description === SortDirection.ASC ? 'ASC' : 'DESC',
        );
      }
      if (args.sortBy.alternative_title != null) {
        qb.addOrderBy(
          'storages.alternative_title',
          args.sortBy.alternative_title === SortDirection.ASC ? 'ASC' : 'DESC',
        );
      }
    } else {
      qb.orderBy('storages.createdAt', 'DESC');
    }

    if (args.keyword != null && args.keyword !== '') {
      qb.where('storages.file_name ILIKE :keyword', {
        keyword: `%${args.keyword}%`,
      })
        .orWhere('storages.alternative_title ILIKE :keyword', {
          keyword: `%${args.keyword}%`,
        })
        .orWhere('storages.description ILIKE :keyword', {
          keyword: `%${args.keyword}%`,
        })
        .orWhere('storages.caption ILIKE :keyword', {
          keyword: `%${args.keyword}%`,
        })
        .orWhere('storages.url ILIKE :keyword', {
          keyword: `%${args.keyword}%`,
        });
    }
    if (filterByMimeType.length > 0) {
      filterByMimeType.forEach((mime_type) => {
        qb.orWhere('storages.mime_type ILIKE :mime_type', {
          mime_type: `%${mime_type}%`,
        });
      });
    }
    const [nodes, totalCount] = await qb.getManyAndCount();
    return { data: nodes, totalCount };
  }

  async findOne(uuid: Storage['uuid']): Promise<Storage | undefined> {
    const storage = await this.storageRepository.findOne({
      where: { uuid },
    });
    if (!storage) {
      throw new HttpException(this.t('Fichier introuvable'), 404);
    }
    return storage;
  }

  async create(
    createStorageInput: CreateStorageInput,
  ): Promise<CreateStorageOutput> {
    console.log('----- Start create storage -----');
    console.log({ createStorageInput });
    const base64 = createStorageInput.base_64;
    if (base64.split(',').length != 2) {
      throw new HttpException(this.t('storages.file_invalid'), 400);
    }
    let mimetype = base64.split(',')[0].split(';')[0].split(':')[1];
    const blob_name = encodeURIComponent(
      `${uuidv4()}-${createStorageInput.file_name}`,
    );
    // base 64 to bytes;
    const bytes = Buffer.from(base64.split(',')[1], 'base64');
    // get the size of the file in octects
    const is_image = mimetype.startsWith('image/') && !mimetype.includes('xml');
    let size = bytes.byteLength;
    let width = 0;
    let height = 0;
    let thumbnail = {};
    let medium = {};
    console.log('is_image', is_image);
    if (is_image && createStorageInput.compress) {
      console.log('compress image');
      mimetype = 'image/webp';
      const buffer = await sharp(bytes).webp({ quality: 90 }).toBuffer();
      console.log('convert to webp');
      await this.client.putObject(
        this.bucketName,
        blob_name,
        buffer,
        buffer.length,
        {
          'Content-Type': mimetype,
        },
      );
      console.log('finish upload');
      const metadata = await sharp(bytes).metadata();
      size = metadata.size;
      width = metadata.width;
      height = metadata.height;
      if (width > this.imageMediumWidth) {
        const medium_blob_name = `medium-${blob_name}`;
        const medium_bytes = await sharp(bytes)
          .resize(this.imageMediumWidth, null, {
            fit: 'contain',
            position: 'center',
          })
          .webp({ quality: 90 })
          .toBuffer();
        const medium_bytes_metadata = await sharp(medium_bytes).metadata();
        await this.client.putObject(
          this.bucketName,
          medium_blob_name,
          medium_bytes,
        );
        medium = {
          width: medium_bytes_metadata.width,
          height: medium_bytes_metadata.height,
          size: medium_bytes_metadata.size,
          file_name: medium_blob_name,
          url: `${this.apiUrl}${this.bucketName}/${medium_blob_name}`,
        };
      } else {
        medium = {
          width: metadata.width,
          height: metadata.height,
          size: metadata.size,
          file_name: blob_name,
          url: `${this.apiUrl}${this.bucketName}/${blob_name}`,
        };
      }
      if (width > this.imageThumbnailWidth) {
        const thumbnail_blob_name = `thumbnail-${blob_name}`;
        const thumbnail_bytes = await sharp(bytes)
          .resize(this.imageThumbnailWidth, null, {
            fit: 'contain',
            position: 'center',
          })
          .webp({ quality: 90 })
          .toBuffer();
        const thumbnail_bytes_metadata =
          await sharp(thumbnail_bytes).metadata();
        await this.client.putObject(
          this.bucketName,
          thumbnail_blob_name,
          thumbnail_bytes,
        );
        thumbnail = {
          width: thumbnail_bytes_metadata.width,
          height: thumbnail_bytes_metadata.height,
          size: thumbnail_bytes_metadata.size,
          file_name: thumbnail_blob_name,
          url: `${this.apiUrl}${this.bucketName}/${thumbnail_blob_name}`,
        };
      } else {
        thumbnail = {
          width: metadata.width,
          height: metadata.height,
          size: metadata.size,
          file_name: blob_name,
          url: `${this.apiUrl}${this.bucketName}/${blob_name}`,
        };
      }
    } else {
      await this.client.putObject(
        this.bucketName,
        blob_name,
        bytes,
        undefined,
        {
          'Content-Type': mimetype,
        },
      );
      console.log('finish upload');
    }
    console.log('start create storage objet');
    const input = {
      file_name: blob_name,
      url: `${this.apiUrl}${this.bucketName}/${blob_name}`,
      mime_type: mimetype,
      size,
      width,
      height,
      thumbnail,
      medium,
      alternative_title: createStorageInput.alternative_title
        ? createStorageInput.alternative_title
        : createStorageInput.file_name,
      caption: createStorageInput.caption
        ? createStorageInput.caption
        : createStorageInput.file_name,
      description: createStorageInput.description || '',
    };

    const storage = this.storageRepository.create(input);
    await storage.save();
    console.log('finish save object');
    console.log('-----------------');
    return { storage };
  }

  async createWithoutCompress(
    input: CreateRestStorageInput,
  ): Promise<CreateStorageOutput> {
    const base64 = input.base_64;
    if (base64.split(',').length != 2) {
      throw new HttpException(this.t('storages.file_invalid'), 400);
    }
    const mimetype = base64.split(',')[0].split(';')[0].split(':')[1];
    const blob_name = encodeURIComponent(`${uuidv4()}-${input.file_name}`);
    // base 64 to bytes;
    const bytes = Buffer.from(base64.split(',')[1], 'base64');
    // get the size of the file in octects
    const size = bytes.byteLength;
    const width = 0;
    const height = 0;
    const thumbnail = {};
    const medium = {};
    await this.client.putObject(this.bucketName, blob_name, bytes, undefined, {
      'Content-Type': mimetype,
    });

    const storage = this.storageRepository.create({
      file_name: blob_name,
      url: `${this.apiUrl}${this.bucketName}/${blob_name}`,
      mime_type: mimetype,
      size,
      width,
      height,
      thumbnail,
      medium,
      alternative_title: input.file_name,
      caption: input.file_name,
      description: '',
    });
    await storage.save();
    return { storage };
  }

  // upload file by file url
  async createByUrl(url: string): Promise<CreateStorageOutput> {
    const file_name = url.split('/').pop();
    console.log({ file_name });
    const blob_name = encodeURIComponent(`${uuidv4()}-${file_name}`);
    const file: Buffer = await new Promise((resolve) => {
      https.get(
        url,
        { secureProtocol: 'TLSv1_2_method', rejectUnauthorized: false },
        (response) => {
          const chunks = [];
          response.on('data', (chunk) => {
            chunks.push(chunk);
          });
          response.on('end', () => {
            resolve(Buffer.concat(chunks));
          });
        },
      );
    });
    const mimetype = 'image/jpeg';
    const size = file.byteLength;
    const width = 0;
    const height = 0;
    const thumbnail = {};
    const medium = {};
    await this.client.putObject(this.bucketName, blob_name, file, undefined, {
      'Content-Type': mimetype,
    });

    const storage = this.storageRepository.create({
      file_name: blob_name,
      url: `${this.apiUrl}${this.bucketName}/${blob_name}`,
      mime_type: mimetype,
      size,
      width,
      height,
      thumbnail,
      medium,
      alternative_title: file_name,
      caption: file_name,
      description: '',
    });

    await storage.save();
    return { storage };
  }

  async update(
    uuid: Storage['uuid'],
    input: UpdateStorageInput,
  ): Promise<UpdateStorageOutput> {
    const storage = await this.storageRepository.findOneOrFail({
      where: {
        uuid: uuid,
      },
    });
    if (input.file_name) storage.file_name = input.file_name;
    if (input.caption) storage.caption = input.caption;
    if (input.description) storage.description = input.description;
    if (input.alternative_title)
      storage.alternative_title = input.alternative_title;
    await storage.save();
    return { storage };
  }

  async remove(uuid: Storage['uuid']): Promise<StorageDeleteOutput> {
    const storage = await this.storageRepository.findOneOrFail({
      where: {
        uuid: uuid,
      },
    });
    try {
      if (storage.thumbnail && storage.thumbnail.file_name) {
        await this.client.removeObject(
          this.bucketName,
          storage.thumbnail.file_name,
        );
      }
      if (storage.medium && storage.medium.file_name) {
        await this.client.removeObject(
          this.bucketName,
          storage.medium.file_name,
        );
      }
      await this.client.removeObject(this.bucketName, storage.file_name);
    } catch (e) {}

    await storage.remove();
    return { uuid };
  }

  async displayFile(bucket: string, file_name: string): Promise<string> {
    return await this.client.presignedGetObject(
      bucket,
      encodeURIComponent(file_name),
    );
  }

  async getFile(bucketName: string, objectName: string): Promise<Buffer> {
    return new Promise<Buffer>((resolve, reject) => {
      this.client.getObject(
        bucketName,
        objectName,
        (err: any, dataStream: any) => {
          if (err) {
            return reject(err);
          }
          const chunks = [];
          dataStream.on('data', (chunk) => {
            chunks.push(chunk);
          });
          dataStream.on('end', () => {
            resolve(Buffer.concat(chunks));
          });
          dataStream.on('error', (err) => {
            reject(err);
          });
        },
      );
    });
  }

  t(key): string {
    return this.i18n.t(key, { lang: I18nContext.current().lang });
  }

  async createByBuffer(pdf: Uint8Array, filename: string) {
    const blob_name = encodeURIComponent(`${uuidv4()}-${filename}`);
    // Uint8Array to Buffer
    const buffer = Buffer.from(pdf);

    await this.client.putObject(this.bucketName, blob_name, buffer, undefined, {
      'Content-Type': 'application/pdf',
    });
    const storage = this.storageRepository.create({
      file_name: blob_name,
      url: `${this.apiUrl}${this.bucketName}/${blob_name}`,
      mime_type: 'application/pdf',
      size: pdf.byteLength,
      width: 0,
      height: 0,
      thumbnail: {},
      medium: {},
      alternative_title: filename,
      caption: filename,
      description: '',
    });
    await storage.save();
    return { storage };
  }

  async createImageByBuffer(
    buffer: Buffer,
    filename: string,
    mime_type: string,
  ) {
    await this.client.putObject(this.bucketName, filename, buffer, undefined, {
      'Content-Type': mime_type,
    });
    const storage = this.storageRepository.create({
      file_name: filename,
      url: `${this.apiUrl}${this.bucketName}/${filename}`,
      mime_type,
      size: buffer.byteLength,
      width: 0,
      height: 0,
      thumbnail: {},
      medium: {},
      alternative_title: filename,
      caption: filename,
      description: '',
    });
    await storage.save();
    return { storage };
  }
}
