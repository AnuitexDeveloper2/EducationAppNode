import ClientOath2 from "client-oauth2";

export const OauthOptions = new ClientOath2({
    clientId: '869634570156556',
    clientSecret: '72101c5e89f4738438560a99484104ac',
    accessTokenUri: 'https://graph.facebook.com/oauth/access_token',
    authorizationUri: 'https://www.facebook.com/dialog/oauth',
    redirectUri: 'http://localhost:8000/auth/callback'//'https://www.facebook.com/connect/login_success.html'
  })