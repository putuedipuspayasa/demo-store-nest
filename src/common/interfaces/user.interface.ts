import { IBase } from './base.interface';

export interface IUser extends IBase {
  username: string;
  name: string;
  email: string;
  phone: string;
  password: string;
}

export interface ICreateUserDto {
  name: string;
  email: string;
  phone: string;
  password: string;
}

export interface IUpdateUserDto {
  name?: string;
  email?: string;
  phone?: string;
  password?: string;
}
