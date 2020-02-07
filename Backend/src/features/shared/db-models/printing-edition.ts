import mongoose, {model} from 'mongoose';
import { PrintingEdition } from '../../printing-editions/api';
import { PrintingEditionType } from '../enums/printingEditionType';

const schema = mongoose.Schema;

export const printingEditionSchema = new schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    cover_image: { type: String },
    removed_at: { type: Boolean, default: false },
    type: { type: PrintingEditionType, required: true },
    price: { type: Number, required: true },
    currency: { type: String, required: true },
    author_ids: { type: [mongoose.Schema.Types.ObjectId],ref: 'Author' }
});

interface printingEditionModel extends PrintingEdition,mongoose.Document {}

const printingEditionModel = model<printingEditionModel>('Printing_Edition', printingEditionSchema);
export default printingEditionModel;


