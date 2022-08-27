import { Types } from 'mongoose';
export interface IProduct {
    title: string;
    description: string;
    departament: string;
    brand: string;
    price: number;
    qtd_stock: number;
    barcodes: string;
    stock_control_enabled?: boolean
}

export interface IProductResponse {
    _id: Types.ObjectId;
    title: string;
    description: string;
    departament: string;
    brand: string;
    price: number;
    qtd_stock: number;
    barcodes: string;
    stock_control_enabled?: boolean;
}

export interface IProductPaginate {
  departament?: string;
  brand?: string;
  page?: number
  stock_control_enabled?: boolean
}

export interface IProductUpdate {
  title: string;
  description: string;
  departament: string;
  brand: string;
  price: number;
  qtd_stock: number;
  barcodes?: string;
  stock_control_enabled?: boolean
}

export interface IProductResponseUpdate {
  _id: Types.ObjectId;
  title: string;
  description: string;
  departament: string;
  brand: string;
  price: number;
  qtd_stock: number;
  barcodes?: string;
  stock_control_enabled?: boolean;
}


export interface IProductResponseCsv {
  sucess: number;
  errors: number
  errors_details
}