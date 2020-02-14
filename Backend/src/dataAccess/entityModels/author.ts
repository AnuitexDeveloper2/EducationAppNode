import mongoose,{model} from 'mongoose';
import { Author } from '../../features/authors/api';
import  mongoosePaginate  from "mongoose-paginate";

const schema = mongoose.Schema;
export const authorSchema = new schema({
   _id: schema.Types.ObjectId,
   name: {type: String,required: true}
});
authorSchema.plugin(mongoosePaginate);

interface authorModel extends Author,mongoose.Document {}

const authorModel = model<authorModel>('Author', authorSchema);
export default authorModel;