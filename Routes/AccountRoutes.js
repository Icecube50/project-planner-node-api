import { Router } from "express";
import { Access } from "../DatabaseAccess/gateway.js";
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import pool from "../DatabaseAccess/postgresGateway.js";

const accountRouter = Router();

accountRouter.post("/login", Login);
accountRouter.post("/refresh", Refresh)
accountRouter.post("/register", Register)

async function Login(req, res, next){
  const client = await pool.connect();
  try{
    const user = req.body.user
    const password = bcrypt.hashSync(req.body.password, Number(process.env.SALT)) 

    const validCredentials = await client.query("SELECT f_validate_user($1, $2)", [user, password])

    if (!validCredentials) {
      console.log('Invalid credentials')
      return res.status(401).json({ error: 'Invalid credentials' })
    }

    const token = jwt.sign({ id: user.user }, process.env.SECRET_KEY, { expiresIn: String(process.env.ACCESS_TOKEN_LIFETIME)})
    const refreshToken = jwt.sign({ id: user.user }, process.env.REFRESH_KEY, { expiresIn: String(process.env.REFRESH_TOKEN_LIFETIME) });

    res.cookie("refreshToken", refreshToken, { httpOnly: true, secure: false, sameSite: "lax", path: "/" });
    res.json({ token: token, user: user })
  }
  catch(error){
    console.log(error)
    next(error)
  }
  finally{
    client.release()
  }
}

async function Refresh(req, res, next){
  const client = await pool.connect();
  try{
    const refreshToken = req.cookies.refreshToken;
    if (!refreshToken) {
      return res.status(401).json({ message: "No token provided" });
    }

    const user = req.body.user
    const query = await client.query("SELECT COUNT(username) FROM users WHERE username = $1;", [user])
    if(Number(query.rows[0].count) <= 0){
      return res.status(401).json({ message: "No user provided" });
    }

    jwt.verify(refreshToken, process.env.REFRESH_KEY, (err, user) => {
      if (err){
        return res.status(403).json({ message: "Refresh token expired" });
      } 

      // issue new access token
      const newAccessToken = jwt.sign({ id: user.user}, process.env.SECRET_KEY, { expiresIn: String(process.env.ACCESS_TOKEN_LIFETIME) });
      res.json({ token: newAccessToken });
    });
  }
  catch(error){
    next(error)
  }
  finally{
    client.release()
  }
}

async function Register(req, res, next){
  const client = await pool.connect();
  try{
    const user = req.body.user
    const password = bcrypt.hashSync(req.body.password, Number(process.env.SALT)) 
    await client.query("CALL create_user($1, $2)", [user, password])

    return Login(req, res, next)
  }
  catch(error){
    console.log(error)
    next(error)
  }
  finally{
    client.release()
  }
}

export default accountRouter;
