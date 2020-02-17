import mongoose, {model} from 'mongoose';
import { PrintingEdition } from '../../features/printing-editions/api';
import { PrintingEditionType } from '../../features/shared/enums/printingEditionType';
import mongoosePaginate from 'mongoose-paginate'

const schema = mongoose.Schema;

export const printingEditionSchema = new schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    cover_image: { type: String },
    removed_at: { type: Boolean, default: false },
    type: { type: PrintingEditionType, required: true },
    price: { type: Number, required: true },
    currency: { type: String, default: 'USD' },
    author_ids: [{ type: mongoose.Schema.Types.ObjectId,ref: 'Author',required: true }]
});

printingEditionSchema.plugin(mongoosePaginate);

interface printingEditionModel extends PrintingEdition,mongoose.Document {}

const printingEditionModel = model<printingEditionModel>('Printing_Edition', printingEditionSchema);
export default printingEditionModel;


