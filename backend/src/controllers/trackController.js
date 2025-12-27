import TrackPoint from "../models/TrackPoint.js";

export const getUserTrack = async (req, res) => {
  try {
    const userId = req.user.id;

    const points = await TrackPoint.findAll({
      where: { userId },
      order: [["createdAt", "ASC"]],
    });

    res.json(points);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error obteniendo historial" });
  }
};
