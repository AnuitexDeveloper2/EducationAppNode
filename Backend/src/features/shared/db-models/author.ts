import mongoose,{model} from 'mongoose';
import { Author } from '../../authors/api';

const schema = mongoose.Schema;

export const authorSchema = new schema({
   name: {type: String,required: true}
});

interface authorModel extends Author,mongoose.Document {}

const authorModel = model<authorModel>('Author', authorSchema);
export default authorModel;