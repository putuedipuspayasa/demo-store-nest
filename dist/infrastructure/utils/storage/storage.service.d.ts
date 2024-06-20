import { StorageAdapter } from './storage.interface';
export declare class StorageService {
    private readonly storageAdapter;
    constructor(storageAdapter: StorageAdapter);
    getCounter(): number;
    setCounter(counter: number): void;
}
