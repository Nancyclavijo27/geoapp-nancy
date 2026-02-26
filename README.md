# 🚀 GeoApp - Real Time Geolocation Tracking

Aplicación web full-stack para monitoreo de ubicación en tiempo real usando WebSockets (Socket.IO).

---

## 🌐 Live Demo

Frontend:
https://geoapp-nancy-frontend.onrender.com

Backend API:
https://geoapp-nancy.onrender.com

---

## 🧠 Descripción

GeoApp es una aplicación de seguimiento en tiempo real que:

- 📍 Recibe coordenadas vía Socket.IO
- 💾 Guarda puntos en base de datos
- 🔁 Emite actualizaciones en vivo al frontend
- 🔐 Incluye autenticación con JWT
- 🗺️ Muestra posiciones en mapa con Leaflet

---

## 🛠️ Tecnologías Utilizadas

### Frontend
- React
- React Router
- Leaflet
- Socket.IO Client
- Axios

### Backend
- Node.js
- Express
- Socket.IO
- Sequelize
- PostgreSQL
- JWT Authentication

### Deploy
- Render (Backend + Frontend)
- Supabase (Base de datos)

---

## ⚙️ Arquitectura

Frontend (React)  
⬇  
Backend (Express + Socket.IO)  
⬇  
PostgreSQL (Supabase)

Comunicación en tiempo real usando WebSockets.

---

## 🔐 Autenticación

- Registro de usuarios
- Login con JWT
- Middleware de autorización
- Protección de rutas

---

## 📦 Instalación Local

### 1️⃣ Clonar repositorio

```bash
git clone https://github.com/Nancyclavijo27/geoapp-nancy.git
cd geoapp-nancy
```

### 2️⃣ Backend

```bash
cd backend
npm install
npm start
```

### 3️⃣ Frontend

```bash
cd frontend
npm install
npm start
```

---

## 🌎 Variables de entorno

Backend:

```
DB_HOST=
DB_USER=
DB_PASSWORD=
DB_NAME=
JWT_SECRET=
```

---

## 📌 Estado del Proyecto

Proyecto funcional con:

✅ Autenticación  
✅ WebSockets en producción  
✅ Base de datos en la nube  
✅ Deploy completo  

---

## 👩‍💻 Autora

Nancy Clavijo  
Full Stack Developer  

LinkedIn: https://www.linkedin.com/in/nancy-clavijo-varela-29353117a/ 
GitHub: https://github.com/Nancyclavijo27

---

## 🎯 Objetivo Profesional

Proyecto desarrollado como parte de mi transición profesional al desarrollo Full Stack, demostrando implementación real de:

- WebSockets
- Autenticación segura
- Deploy en producción
- Arquitectura cliente-servidor

---
