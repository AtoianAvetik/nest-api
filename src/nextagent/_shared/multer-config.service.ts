import { Injectable } from '@nestjs/common';
import { MulterModuleOptions, MulterOptionsFactory } from '@nestjs/platform-express';
import { ConfigService } from '../../_config/config.service';
import { existsSync, mkdirSync } from 'fs';
import { extname } from 'path';
import { diskStorage } from 'multer';
import { v4 as uuid } from 'uuid';
import { HttpException, HttpStatus } from '@nestjs/common';
import { UPLOADS_DEST } from '../constans';

@Injectable()
export class MulterConfigService implements MulterOptionsFactory {
    constructor(private readonly $configService: ConfigService) {
    }

    createMulterOptions(): MulterModuleOptions {
        return {
            dest: this.$configService.get('UPLOADS_DEST') + UPLOADS_DEST,
            storage: diskStorage({
                // Destination storage path details
                destination: (req: any, file: any, cb: any) => {
                    const uploadPath = this.$configService.get('UPLOADS_DEST') + UPLOADS_DEST;
                    // Create folder if doesn't exist
                    if (!existsSync(uploadPath)) {
                        mkdirSync(uploadPath);
                    }
                    cb(null, uploadPath);
                },
                // File modification details
                filename: (req: any, file: any, cb: any) => {
                    // Calling the callback passing the random name generated with the original extension name
                    cb(null, `${uuid()}${extname(file.originalname)}`);
                },
            }),
            limits: {
                fileSize: +this.$configService.get('MAX_FILE_SIZE'),
            },
            fileFilter: (req: any, file: any, cb: any) => {
                if (file.mimetype.match(/\/(jpg|jpeg|png|gif)$/)) {
                    // Allow storage of file
                    cb(null, true);
                } else {
                    // Reject file
                    cb(new HttpException(`Unsupported file type ${extname(file.originalname)}`, HttpStatus.BAD_REQUEST), false);
                }
            },
        };
    }
}
