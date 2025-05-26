import fs from 'fs/promises';
import crypto from 'crypto';
import path from 'path';
import { File } from '../models/index.js';

export class LocalQueue {
  constructor(name) {
    this.name = name;
    this.jobs = [];
  }

  async add(name, data) {
    console.log(`[LocalQueue] Job added: ${name}`, data);
    setTimeout(() => {
      this.processJob(data);
    }, 1000);
  }

  async processJob(data) {
    console.log(`[LocalQueue] Processing job:`, data);

    try {
      const file = await File.findByPk(data.fileId);
      if (!file) {
        console.error('File not found in DB');
        return;
      }

      await file.update({ status: 'processing' });

      // Resolve absolute path of stored file
      const absolutePath = path.resolve(file.storage_path);
      console.log('Reading file from:', absolutePath);

      const fileData = await fs.readFile(absolutePath);
      console.log('File size:', fileData.length);

      const hash = crypto.createHash('sha256').update(fileData).digest('hex');
      console.log('File hash:', hash);

      await file.update({ status: 'processed', extracted_data: hash });
    } catch (err) {
      console.error('Error processing file:', err);
      if (data.fileId) {
        await File.update(
          { status: 'failed', extracted_data: err.message },
          { where: { id: data.fileId } }
        );
      }
    }
  }
}
