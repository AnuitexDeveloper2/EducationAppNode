import mongoose, { model } from 'mongoose';
import { Orders } from '../../features/orders/api';
import mongoosePaginate from 'mongoose-paginate'

const schema = mongoose.Schema;

export const ordersSchema = new schema({
    user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    items:
    {
        type: [{
            printing_edition_id: {
                type: mongoose.Schema.Types.ObjectId, ref: 'Printing_Edition', required: true
            },
            count: {
                type: Number, required: true
            },
            price: {
                type: Number, required: true
            },
            currency: {
                type: String, default: "USD"
            }
        }]
    },
    transaction_id: { type: String },
    amount: { type: Number },
    createdDate: { type: Date, default: Date.now }
});

ordersSchema.plugin(mongoosePaginate);

interface ordersModel extends Orders, mongoose.Document { }

const ordersModel = model<ordersModel>('Orders', ordersSchema);
export default ordersModel;
