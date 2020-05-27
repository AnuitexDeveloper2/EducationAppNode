"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const client_oauth2_1 = __importDefault(require("client-oauth2"));
exports.OauthOptions = new client_oauth2_1.default({
    clientId: '869634570156556',
    clientSecret: '72101c5e89f4738438560a99484104ac',
    accessTokenUri: 'https://graph.facebook.com/oauth/access_token',
    authorizationUri: 'https://www.facebook.com/dialog/oauth',
    redirectUri: 'http://localhost:8000/auth/callback' //'https://www.facebook.com/connect/login_success.html'
});
//# sourceMappingURL=oAuthHelper.js.map