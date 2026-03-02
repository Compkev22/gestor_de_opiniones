# gestor_de_opiniones

https://cetkinal-my.sharepoint.com/:f:/g/personal/kvelasquez-2022473_kinal_edu_gt/IgDgc96-MlzNTJDo5xbMcseUAWmeTAkPvPtSoQDO33GP-w0?e=Croce7

# 📝 Opinions System - Gestor de Opiniones

## 📖 Descripción

**Opinions System** es una plataforma web FullStack diseñada para que los usuarios puedan compartir sus pensamientos, ideas y opiniones de manera organizada.

El sistema permite:

- ✅ Registro de usuarios  
- ✅ Inicio de sesión mediante credenciales personalizadas  
- ✅ Creación de publicaciones con categorías  
- ✅ Sistema de comentarios interactivo  

El proyecto destaca por una **arquitectura limpia en el Backend** y un **Frontend dinámico** que consume una API REST propia.

---

## 🛠️ Tech Stack

| Capa        | Tecnologías |
|------------|------------|
| **Backend** | Node.js, Express.js |
| **Base de Datos** | MongoDB, Mongoose |
| **Frontend** | HTML5, CSS3, JavaScript (ES6+), Tailwind CSS |
| **Herramientas** | Git, GitHub, Dotenv, Morgan, Cors |

---

## ⚙️ Instalación

Sigue estos pasos para configurar el proyecto localmente:

### 1️⃣ Clonar el repositorio

```bash
git clone https://github.com/Compkev22/gestor_de_opiniones.git
cd gestor_de_opiniones
```

### 2️⃣ Instalar dependencias

```bash
npm install
```

### 3️⃣ Ejecutar el servidor

```bash
node index.js
```

### 4️⃣ Acceder al Frontend

Abre el archivo:

```
public/index.html
```

en tu navegador.

---

## 🔑 Variables de Entorno

Crea un archivo `.env` en la raíz del proyecto y configura las siguientes variables:

```env
PORT=3001
MONGO_URI=mongodb://127.0.0.1:27017/opinionsSystem
```

---

## 📂 Estructura del Proyecto

```plaintext
├── configs/                # Configuración de Servidor y MongoDB
├── public/                 # Frontend (HTML, CSS, JS)
│   ├── index.html
│   ├── script.js
│   └── style.css
├── src/                    # Backend (Lógica de Negocio)
│   ├── Auth/               # Registro y Login
│   ├── Users/              # CRUD de Usuarios
│   ├── Publications/       # Gestión de Posts
│   └── Comments/           # Gestión de Comentarios
├── .env                    # Variables de entorno
├── .gitignore              # Archivos omitidos en Git
├── index.js                # Punto de entrada de la App
└── package.json            # Dependencias y scripts
```

---

## 📜 Scripts Disponibles

```bash
node index.js   # Inicia el servidor en el puerto configurado
npm install     # Descarga todas las librerías necesarias
```

---

## 📡 Endpoints Disponibles

### 🔐 Autenticación

| Método | Endpoint | Descripción |
|--------|----------|------------|
| POST | `/auth/register` | Registro de nuevos usuarios |
| POST | `/auth/login` | Validación de credenciales |

---

### 📰 Publicaciones

| Método | Endpoint | Descripción |
|--------|----------|------------|
| GET | `/publications` | Listar todas las publicaciones |
| POST | `/publications` | Crear una nueva publicación (requiere login) |
| PUT | `/publications/:id` | Editar una publicación propia |
| DELETE | `/publications/:id` | Eliminar una publicación |

---

### 💬 Comentarios

| Método | Endpoint | Descripción |
|--------|----------|------------|
| POST | `/comments` | Agregar un comentario |
| GET | `/comments/:pubId` | Ver comentarios de una publicación específica |

---

## 🗄️ Modelos de Base de Datos

El sistema utiliza **Mongoose** para definir los esquemas en MongoDB:

### 👤 User (Usuario)

- `UserName`
- `UserSurname`
- `UserUsername` (Único)
- `UserEmail` (Único)
- `UserPassword` (Mínimo 6 caracteres)

---

### 📰 Publication (Publicación)

- `title`
- `category`
- `mainText`
- `author` (Relación con User)

---

### 💬 Comment (Comentario)

- `text`
- `author` (Relación con User)
- `publication` (Relación con Publication)

---

## 🚀 Características Destacadas

- Arquitectura modular y escalable
- Separación clara entre Backend y Frontend
- API REST propia
- Relaciones entre modelos con Mongoose
- Manejo de variables de entorno
- Sistema completo de autenticación y gestión de contenido

---

## 📌 Autor

Proyecto desarrollado como práctica FullStack aplicando buenas prácticas y arquitectura limpia.

---

## 📄 Licencia

Este proyecto está bajo la licencia MIT.
