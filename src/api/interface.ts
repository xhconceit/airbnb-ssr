import { AxiosRequestConfig } from 'axios'

export interface IResultOr {
  // 定义interface规范返回结果的类型
  code: string;
  success: boolean;
  message: string;
  result: any;
}

export interface IRoomListParams extends AxiosRequestConfig {
  pageNo: number,
  pageSize: number,
  cityCode: string
}

export interface IRoomDetailParams extends AxiosRequestConfig {
  id: number
}
