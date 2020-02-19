import mongoose, {model} from 'mongoose';
import { Orders } from '../../features/orders/api';
import mongoosePaginate from 'mongoose-paginate'

const schema = mongoose.Schema;

export const printingEditionSchema = new schema({
    user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    items: { type: Object , required: true},
    payment_info: {type: Object, default: null},
    createdDate: { type: Date, default: Date.now }
});

printingEditionSchema.plugin(mongoosePaginate);

interface ordersModel extends Orders,mongoose.Document {}

const printingEditionModel = model<ordersModel>('Orders', printingEditionSchema);
export default printingEditionModel;
