// src/utils/fileSystemStorage.adapter.ts
import * as fs from 'fs';
import { StorageAdapter } from './storage.interface';

export class FileSystemStorageAdapter implements StorageAdapter {
  private readonly filename: string;

  constructor(filename: string) {
    this.filename = filename;
    this.initStorage();
  }

  private initStorage(): void {
    if (!fs.existsSync(this.filename)) {
      fs.writeFileSync(this.filename, '', 'utf-8');
    }
  }

  readData(): string | null {
    try {
      return fs.readFileSync(this.filename, 'utf-8');
    } catch (error) {
      console.error('Error reading data from storage:', error);
      return null;
    }
  }

  writeData(data: string): void {
    try {
      fs.writeFileSync(this.filename, data, 'utf-8');
    } catch (error) {
      console.error('Error writing data to storage:', error);
    }
  }
}
