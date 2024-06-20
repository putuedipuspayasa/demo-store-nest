import { Injectable } from '@nestjs/common';
import { StorageAdapter } from './storage.interface';

@Injectable()
export class StorageService {
  constructor(private readonly storageAdapter: StorageAdapter) {}

  getCounter(): number {
    const content = this.storageAdapter.readData();
    return parseInt(content || '0', 10);
  }

  setCounter(counter: number): void {
    this.storageAdapter.writeData(counter.toString());
  }
}
