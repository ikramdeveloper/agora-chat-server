import fetch from "node-fetch";
import dotenv from "dotenv";
dotenv.config();
import UserModel from "./user.model.js";
import {
  createAppToken,
  createUserToken,
  expirationInSeconds,
} from "../utils/agoraToken.js";

const createAgoraUser = async (body, res) => {
  const appToken = createAppToken();
  const response = await fetch(process.env.CHAT_REGISTER_URL, {
    method: "post",
    headers: {
      "content-type": "application/json",
      Authorization: "Bearer " + appToken,
    },
    body: JSON.stringify(body),
  });
  const result = await response.json();
  if (response.status != 200) {
    res.status(400).json({ success: false, data: result });
    return;
  }
  return result;
};

const registerUser = async (req, res) => {
  const { username, password } = req.body;

  const body = {
    username,
    password,
    nickname: username,
  };
  const result = await createAgoraUser(body, res);
  if (!result) return;
  try {
    await UserModel.create({
      username,
      password,
      chatUsername: username,
      userUuid: result.entities[0].uuid,
    });
    res.status(200).json({
      success: true,
      message: "User Registered Successfully.",
    });
  } catch (error) {
    console.log("error in registration", error);
    res.status(400).json({ success: false, message: error?.message });
  }
};

const loginUser = async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await UserModel.findOne({ username, password });
    if (!user) {
      res.status(401).json({
        success: false,
        message: "Invalid credentials",
      });
      return;
    }
    const userToken = createUserToken(user.Uuid);
    res.status(200).json({
      expireTimestamp: expirationInSeconds,
      chatUsername: user.chatUsername,
      accessToken: userToken,
    });
  } catch (err) {
    console.error("error in login", err);
    res.status(400).json({ success: false, message: err?.message });
  }
};

export { loginUser, registerUser };
