export interface IUser {
  id: number;
  email: string;
  password: string;
  categories: ICategory[];
}

export interface ICategory {
  id: number;
  title: string;
  dateCreated: Date;
  tasks: ITask[];
}

export interface ITask {
  id: number;
  name: string;
  description: string;
  dataStart: Date;
  dataEnd: Date;
}

export interface ICreateCategoryDto {
  title: string;
}

export interface IUpdateCategoryDto {
  title?: string;
}

export interface ICreateTaskDto {
  name: string;
  description: string;
  dataStart: Date | string;
  dataEnd: Date | string;
  categoryId: number;
}

export interface IUpdateTaskDto {
  name: string;
  description: string;
  dataStart: Date | string;
  dataEnd: Date | string;
}

export interface IRegisterUserDto {
  email: string;
  password: string;
}

export interface ILoginUserDto {
  email: string;
  password: string;
}
