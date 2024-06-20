"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FileSystemStorageAdapter = void 0;
const fs = require("fs");
class FileSystemStorageAdapter {
    constructor(filename) {
        this.filename = filename;
        this.initStorage();
    }
    initStorage() {
        if (!fs.existsSync(this.filename)) {
            fs.writeFileSync(this.filename, '', 'utf-8');
        }
    }
    readData() {
        try {
            return fs.readFileSync(this.filename, 'utf-8');
        }
        catch (error) {
            console.error('Error reading data from storage:', error);
            return null;
        }
    }
    writeData(data) {
        try {
            fs.writeFileSync(this.filename, data, 'utf-8');
        }
        catch (error) {
            console.error('Error writing data to storage:', error);
        }
    }
}
exports.FileSystemStorageAdapter = FileSystemStorageAdapter;
//# sourceMappingURL=file-system-storage.adapter.js.map