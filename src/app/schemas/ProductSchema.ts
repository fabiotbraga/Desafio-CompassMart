import mongoose, { Schema } from 'mongoose';
import paginate from 'mongoose-paginate-v2';
import { IProduct } from '../interfaces/IProduct'

const schema = new Schema<IProduct>({
  title: { type: String, required: true },
  description: { type: String, required: true },
  departament: { type: String, required: true },
  brand: { type: String, required: true },
  price: { type: Number, required: true },
  qtd_stock: { type: Number, required: true },
  barcodes: { type: String, unique: true, required: true },
  stock_control_enabled: {type: Boolean, default: false }
}, { timestamps: { createdAt: 'created_at', updatedAt: 'updatedAt' } });

//schema.query.byYear = function (brand) {
//  return this.find({ brand: brand })
//}
schema.plugin(paginate);

//const Product = mongoose.model<IProduct>('product', schema);
const Product = mongoose.model<IProduct, mongoose.PaginateModel<IProduct>>('product', schema);
export default Product