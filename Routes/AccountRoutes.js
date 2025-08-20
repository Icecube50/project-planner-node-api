import { Router } from "express";
import { Access } from "../DatabaseAccess/gateway.js";
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

const accountRouter = Router();

accountRouter.post("/login", Login);

function Login(req, res, next){
  try{
    const user = Access().get("users").find(u => u.user === req.body.user)

    if (!user || !bcrypt.compareSync(req.body.password, user.password)) {
      console.log('Invalid credentials')
      return res.status(401).json({ error: 'Invalid credentials' })
    }

    const token = jwt.sign({ id: user.id, username: user.username }, process.env.SECRET_KEY, {
      expiresIn: '1h'
    })

    res.json({ token })
  }
  catch(error){
    next(error)
  }
}

export default accountRouter;
