import User from "../models/user.model.js";
import bcryptjs from "bcryptjs";
import { errorHandler } from '../utils/error.js';
import jwt from 'jsonwebtoken'

export const signup = async (req, res, next) => {
  const { username, email, password } = req.body;
  const hashedPassword = bcryptjs.hashSync(password, 10);
  const newUser = new User({ username, email, password: hashedPassword });

  try {
    await newUser.save();
    res.status(201).json("Пользователь успешно создан!");
  } catch (error) {
	next(errorHandler(550, 'Такой пользователь уже существует!'))
  }
};

export const signin = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    const validUser = await User.findOne({ email });

    if (!validUser)
      return next(errorHandler(404, "Такой пользователь не найден!"));

    const validPassword = bcryptjs.compareSync(password, validUser.password);

    if (!validPassword)
      return next(errorHandler(401, "Неправильные учетные данные!"));

    const token = jwt.sign({ id: validUser._id }, "dsfsafdfgsdfgsdf34f");
    const { password: hashedPassword, ...rest } = validUser._doc;
    res
      .cookie("access_token", token, {
        httpOnly: true,
      })
      .status(200)
      .json(rest);
  } catch (error) {
    next(err);
  }
};

export const signout = async (req, res, next) => {
  try {
    res.clearCookie("access_token");
    res.status(200).json("Вы успешно вышли из профиля");
  } catch (error) {
    next(error);
  }
};