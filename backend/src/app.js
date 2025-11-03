import express from 'express';
import cors from 'cors';
import locationRoutes from './routes/locationRoutes.js';

const app = express();

app.use(cors());
app.use(express.json());

// Ruta principal de API
app.use('/api/locations', locationRoutes);

app.get('/', (req, res) => {
  res.send('API de geolocalización funcionando 🚀');
});

export default app;
