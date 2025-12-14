import jwt from "jsonwebtoken";

export const authMiddleware = (req, res, next) => {
  console.log("🔍 Headers recibidos:", req.headers); // <--- AGREGA ESTO

  const token = req.headers["authorization"];

  if (!token) {
    return res.status(401).json({ message: "Token no enviado" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
     console.log("🟢 Token decodificado:", decoded);
    req.user = decoded; // 👈 guardamos el usuario en la request
    next();
  } catch (err) {
     console.log("❌ Error JWT:", err.message);
    return res.status(401).json({ message: "Token inválido" });
  }
};
