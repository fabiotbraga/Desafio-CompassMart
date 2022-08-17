import { Types } from 'mongoose';
export interface IProduct {
    title: string;
    description: string;
    brand: string;
    price: number;
    qtd_stock: number;
    barcodes: number;
}

export interface IProductResponse {
    _id: Types.ObjectId;
    title: string;
    description: string;
    brand: string;
    price: number;
    qtd_stock: number;
    barcodes: number;
}