import jwt from "jsonwebtoken";

export const authMiddleware = (req, res, next) => {
  const token = req.headers["authorization"];

  if (!token) {
    return res.status(401).json({ message: "Token no enviado" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // 👈 guardamos el usuario en la request
    next();
  } catch (err) {
    return res.status(401).json({ message: "Token inválido" });
  }
};
