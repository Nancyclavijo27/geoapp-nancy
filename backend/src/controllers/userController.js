import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/User.js"; // asegúrate que el archivo tenga .js

export const registerUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    if (!email || !password) {
      return res.status(400).json({ error: "Email y password son requeridos" });
    }

    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ error: "Usuario ya existe" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = await User.create({ email, password: hashedPassword });

    const token = jwt.sign(
      { id: user.id, email: user.email },
      process.env.JWT_SECRET || "tu_clave_secreta",
      { expiresIn: "1h" }
    );

    return res.status(201).json({ message: "Usuario creado", token });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

