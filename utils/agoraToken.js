import agoraToken from "agora-token";
import dotenv from "dotenv";
dotenv.config();

const { ChatTokenBuilder } = agoraToken;

const appId = process.env.APP_ID;
const appCertificate = process.env.APP_CERTIFICATE;
// Token expire time, hardcode to 86400 seconds = 1 day
const expirationInSeconds = 86400;

const createUserToken = (uuid) => {
  const userToken = ChatTokenBuilder.buildUserToken(
    appId,
    appCertificate,
    uuid,
    expirationInSeconds
  );

  return userToken;
};

const createAppToken = () => {
  const appToken = ChatTokenBuilder.buildAppToken(
    appId,
    appCertificate,
    expirationInSeconds
  );

  return appToken;
};

export { createUserToken, createAppToken, expirationInSeconds };
