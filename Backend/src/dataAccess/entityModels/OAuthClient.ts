import mongoose, { model } from "mongoose";
import { OAuth } from "../../features/user/api";
 const Schema = mongoose.Schema;

var oAuthClientSchema = new Schema({
  name: {type: String},
  client_id: {type: String},
  client_secret: {type: String},
  redirect_uri: {type: String, default:"http://localhost:8000/home"},
  grant_types: {type: String},
  scope: {type: String},
  User:  { type : Schema.Types.ObjectId, ref: 'User' },
});

interface oAuthModel extends OAuth,mongoose.Document {}
const oAuthClient = model<oAuthModel>('OAuthClient', oAuthClientSchema);
export default oAuthClient;

