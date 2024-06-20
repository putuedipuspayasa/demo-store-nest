import { StorageAdapter } from './storage.interface';
export declare class FileSystemStorageAdapter implements StorageAdapter {
    private readonly filename;
    constructor(filename: string);
    private initStorage;
    readData(): string | null;
    writeData(data: string): void;
}
