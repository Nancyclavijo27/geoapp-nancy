import User from "../models/User.js";

export const getProfile = async (req, res) => {
  try {
    const user = await User.findByPk(req.user.id, {
      attributes: ["id", "name", "email", "role"]
    });

    return res.json({
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role, // 👈 CLAVE
    });

  } catch (error) {
    console.error("Error en getProfile:", error);
    return res.status(500).json({ message: "Error en el servidor" });
  }
};
