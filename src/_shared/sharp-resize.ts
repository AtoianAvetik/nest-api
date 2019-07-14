import * as sharp from 'sharp';
import * as path from 'path';
import * as uuidv4 from 'uuid/v4';
import { existsSync, mkdirSync } from 'fs';

export class Resize {
    folder: string = '';
    size = {
        w: 300,
        h: 300,
    };
    filename;

    constructor(folder, size?, filename?) {
        this.folder = folder;
        this.size = size;
        this.filename = filename;
    }

    async save(buffer) {
        const filename = this.filename || Resize.filename();
        const filepath = this.filepath(filename);

        await sharp(buffer)
            .resize(this.size.w, this.size.h, {
                fit: sharp.fit.inside,
                withoutEnlargement: true,
            })
            .toFile(filepath);

        return filename;
    }

    static filename() {
        return `${uuidv4()}.png`;
    }

    filepath(filename) {
        if (!existsSync(this.folder)) {
            mkdirSync(this.folder, { recursive: true });
        }

        return path.resolve(`${this.folder}/${filename}`);
    }
}
