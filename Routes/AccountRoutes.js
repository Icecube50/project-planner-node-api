import { Router } from "express";
import { Access } from "../DatabaseAccess/gateway.js";
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { authenticateToken } from "../API/auth.js";

const accountRouter = Router();

accountRouter.post("/login", Login);
accountRouter.post("/refresh", Refresh)

function Login(req, res, next){
  try{
    const user = Access().get("users").find(u => u.user === req.body.user)

    if (!user || !bcrypt.compareSync(req.body.password, user.password)) {
      console.log('Invalid credentials')
      return res.status(401).json({ error: 'Invalid credentials' })
    }

    const token = jwt.sign({ id: user.user }, process.env.SECRET_KEY, { expiresIn: '15min'})
    const refreshToken = jwt.sign({ id: user.user }, process.env.REFRESH_KEY, { expiresIn: "7d" });

    res.cookie("refreshToken", refreshToken, { httpOnly: true, secure: false, sameSite: "lax", path: "/" });
    res.json({ token: token, user: user })
  }
  catch(error){
    next(error)
  }
}

function Refresh(req, res, next){
  try{
    const refreshToken = req.cookies.refreshToken;
    if (!refreshToken) 
      return res.status(401).json({ message: "No token provided" });

    const user = Access().get("users").find(u => u.user === req.body.user)
    if(!user)
      return res.status(401).json({ message: "No user provided" });

    jwt.verify(refreshToken, process.env.REFRESH_KEY, (err, user) => {
      if (err) return res.status(403).json({ message: "Invalid credentials" });

      // issue new access token
      const newAccessToken = jwt.sign({ id: user.user}, process.env.SECRET_KEY, { expiresIn: "15m" });
      res.json({ token: newAccessToken });
    });
  }
  catch(error){
    next(error)
  }
}

export default accountRouter;
