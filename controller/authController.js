import bcrypt from "bcryptjs";

import jwt from "jsonwebtoken";

import prisma from "../prisma.js";


// register function

export const register = async (req, res) => {

   const { username, password } = req.body;

   try {

     const hashed = await bcrypt.hash(password, 10);

     const user = await prisma.user.create({

       data: {username, password: hashed,},

        select: { id: true, username: true, createdAt: true },

     });

     res.status(201).json({message: "User registered",user});

   } catch (err) {

      res.status(400).send(err.message);

   }

};

import bcrypt from "bcryptjs";

import jwt from "jsonwebtoken";

import prisma from "../prisma.js"; // export default prisma จาก @prisma/client


export const loginPrisma = async (req, res) => {

  const { username, password } = req.body ?? {};

  if (!username || !password) {

    return res.status(400).json({ message: "username & password are required" });

  }

  try {

    const user = await prisma.user.findUnique({

      where: { username }, // ต้องกำหนด @unique ที่ username

      select: { id: true, username: true, password: true },

    });

    if (!user) return res.status(400).json({ message: "User not found" });

    // เทียบรหัสผ่าน

    const ok = await bcrypt.compare(password, user.password_hash);

    if (!ok) return res.status(400).json({ message: "Invalid credentials" });

    // ออก token


    return res.json({ accessToken, refreshToken });

  } catch (err) {

    return res.status(500).json({ message: err.message });

  }

};
