# 🚀 GeoApp - Real Time Geolocation Tracking

Aplicación web full-stack para monitoreo de ubicación en tiempo real usando WebSockets (Socket.IO).

---

## 🌐 Live Demo

La aplicación fue desplegada utilizando Render y Supabase.

Actualmente la disponibilidad de la demo puede verse afectada por limitaciones de los servicios gratuitos utilizados durante el despliegue.
---

## 🧠 Descripción

GeoApp es una aplicación de seguimiento en tiempo real que:

- 📍 Recibe coordenadas vía Socket.IO
- 💾 Guarda puntos en base de datos
- 🔁 Emite actualizaciones en vivo al frontend
- 🔐 Incluye autenticación con JWT
- 🗺️ Muestra posiciones en mapa con Leaflet

---

## 📷 Capturas de Pantalla

### Inicio de Sesión

<p align="center">
  < <img width="250" height="500" alt="image" src="https://github.com/user-attachments/assets/1441dba2-c8e0-4f1f-8ca5-c9827fdced4b" />
</p>

### Dashboard

<p align="center">
<img width="250" height="500" alt="image" src="https://github.com/user-attachments/assets/d8f190fc-d5dc-4bf7-9590-71aa141391b4" />
  </p>
  
### Mapa de ubicaciones

<p align="center">
<img width="250" height="500" alt="image" src="https://github.com/user-attachments/assets/a5a3b09d-9bc8-4c9c-8c14-7de4b474f593" />
  </p>

   ### Lista de ubicaciones
   
<p align="center">
<img width="250" height="500" alt="image" src="https://github.com/user-attachments/assets/d0bcbc64-0685-47df-b3e3-9b891439d514" />
</p>



## 🛠️ Tecnologías Utilizadas

---

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

Características implementadas:

✅ Autenticación JWT
✅ Comunicación en tiempo real mediante Socket.IO
✅ Persistencia de datos en PostgreSQL
✅ Visualización geográfica con Leaflet
✅ Arquitectura Full Stack cliente-servidor

Nota:
La disponibilidad de la demo puede verse afectada por las limitaciones de los servicios gratuitos utilizados para el despliegue.

---

## 🚀 Aprendizajes

Durante este proyecto desarrollé experiencia práctica en:

- Desarrollo Full Stack.
- Implementación de WebSockets.
- Gestión de autenticación con JWT.
- Diseño de APIs REST.
- Integración entre React y Node.js.
- Despliegue de aplicaciones en la nube.

- ---

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

