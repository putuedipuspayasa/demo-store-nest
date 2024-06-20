export interface StorageAdapter {
    readData(): string | null;
    writeData(data: string): void;
}
