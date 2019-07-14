import { Injectable } from '@nestjs/common';
import { MulterModuleOptions, MulterOptionsFactory } from '@nestjs/platform-express';
import { existsSync, mkdirSync } from 'fs';
import { extname } from 'path';
import { diskStorage } from 'multer';
import { v4 as uuid } from 'uuid';
import { HttpException, HttpStatus } from '@nestjs/common';

const DEFAULT_CONFIG_OPTIONS = {
    dest: './uploads',
    limits: {
        fileSize: 100000000,
    },
    fileFilter: {
        mimeType: /\/(jpg|jpeg|png|gif)$/,
    },
};

@Injectable()
export class MulterConfigService implements MulterOptionsFactory {
    createMulterOptions(options = {}): MulterModuleOptions {
        const config = Object.assign(DEFAULT_CONFIG_OPTIONS, options);
        return {
            dest: config.dest,
            storage: diskStorage({
                // Destination storage path details
                destination: (req: any, file: any, cb: any) => {
                    const uploadPath = config.dest;
                    // Create folder if doesn't exist
                    if (!existsSync(uploadPath)) {
                        mkdirSync(uploadPath, { recursive: true });
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
                fileSize: +config.limits.fileSize,
            },
            fileFilter: (req: any, file: any, cb: any) => {
                if (file.mimetype.match(config.fileFilter.mimeType)) {
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
