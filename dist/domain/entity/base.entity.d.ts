export declare class BaseEntity {
    id: number;
    uid: string;
    created_at: Date;
    updated_at: Date;
    deleted_at: Date;
    generateUlid(): void;
}
