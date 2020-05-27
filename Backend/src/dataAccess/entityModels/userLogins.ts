import mongoose, { model } from "mongoose";
import { OAuthModel } from "../../features/user/api";
 const Schema = mongoose.Schema;

var oAuthClientSchema = new Schema({
  user_Id: { type : Schema.Types.ObjectId, ref: 'User' },
  provider: {type: String, default: "Facebook"} 
});

interface UserLogins extends OAuthModel,mongoose.Document {}
const oAuthClient = model<UserLogins>('userLogins', oAuthClientSchema);
export default oAuthClient;

