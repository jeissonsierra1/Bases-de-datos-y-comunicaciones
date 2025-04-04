# TechLogistics - Sistema de Gestión de Pedidos y Rastreo de Envíos
Este repositorio contiene el código fuente de un sistema integral de gestión logística desarrollado para TechLogistics S.A.

# Descripción del Proyecto
El sistema permite la administración eficiente de pedidos, clientes, transportistas y el seguimiento en tiempo real de los envíos. 

- Backend con Node.js y Express
- Base de datos MySQL (XAMPP)
- Frontend con HTML, CSS y JavaScript/React
- API REST para la comunicación entre componentes

  # Características Principales

- Gestión completa de clientes
- Creación y seguimiento de pedidos
- Rastreo de envíos en tiempo real con visualización en mapa
- Sistema de autenticación y registro de usuarios
- Interfaz de usuario intuitiva y responsiva

  # Estructura del Proyecto

- techlogistics_api/
- ├── frontend/
- │   ├── css/
- │   │   └── styles.css
- │   ├── js/
- │   │   ├── api.js
- │   │   ├── clientes.js
- │   │   ├── pedidos.js
- │   │   └── envios.js
- │   ├── clientes.html
- │   ├── envios.html
- │   ├── index.html
- │   ├── login.html
- │   └── pedidos.html
- ├── routes/
- │   ├── pedidos.js
- │   └── envios.js
- ├── node_modules/
- ├── package-lock.json
- ├── package.json
- ├── server.js
- └── techlogistics_db.sql

# Requisitos Previos

- Node.js 
- MySQL Server (XAMPP)
- Navegador web

# Instalación
- Clonar el repositorio:  
   ```sh
   https://github.com/jeissonsierra1/Bases-de-datos-y-comunicaciones.git
``
- Instala las dependencias:
- Configura la base de datos:

  techlogistics_db.sql

# Tecnologías Utilizadas

# Backend

- Node.js
- Express.js
- MySQL
- JWT (JSON Web Tokens)
- Bcrypt.js

# Frontend

- HTML5
- CSS3
- JavaScript
- React
- Leaflet (para mapas)







