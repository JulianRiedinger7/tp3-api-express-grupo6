# Trabajo Práctico N°3:

Bienvenid@ al repositorio del Trabajo Práctico N°3 para la asignatura de Programación 3. En este proyecto el Grupo 6 ha desarrollado una API que administra los datos de Servicios-Pedidos-Usuarios-Equipo para integrarlo con el front del TP1

## 🎯 Objetivos del TP

- Aplicar los conocimientos vistos en clase sobre modularización, Node.js, express y
  otros módulos
  *​ Instalación de paquetes por medio de la terminal con ‘npm’.
  *​ Aplicar conocimientos iniciales de POO (Programación Orientada a Objetos).
  *​ Gestionar datos mediante archivos JSON para simular una base de datos.
  *​ Diseñar y desarrollar endpoints para una API REST, utilizando los métodos ‘GET’ y
  ‘POST’.
  *​ Utilizar las herramientas de ‘render.com’ para hacer un deploy de una API.
  *​ Trabajar en equipo utilizando herramientas de Git y GitHub.

## 👥 Integrantes - Grupo 6

- Julieta Dabús
- Alejandro Lucas Baldres
- Julian Riedinger
- Marianela Belardinelli
- Clara Zivano
- Matías F. Ledesma González

## 📋 Organización

### División del Trabajo

**Alejandro Lucas Baldres - Servicios: listado completo**

Backend

GET /servicios — lee data/servicios.json y devuelve el array completo
El JSON debe tener más de 13 servicios (requisito del enunciado)
Cada servicio con id, nombre, descripción, imagen, precio, stock.
Agregado de endpoint para busqueda por nombre del servicio.

Frontend

Reemplaza los datos hardcodeados de servicios.html del TP1
Función asíncrona con fetch + try/catch que consume GET /servicios
Refactorizacion de Servicios: Renderiza las cards dinámicamente con JS en lugar
de tenerlas en el HTML

**Matías F. Ledesma González — Servicios: detalle individual**

Backend

GET /servicios/:id — busca en el mismo JSON por id, devuelve el objeto o 404 si no existe
Manejo explícito del caso not found con res.status(404).json(...)

Frontend

Usar un modal para linkear con el servicio
Función asíncrona que lee el id de la URL, hace fetch a /servicios/:id y renderiza el detalle

**Julián Riedinger — Equipo**

Backend

GET /equipo — lee data/equipo.json y devuelve el array de integrantes
Cada integrante con id, nombre, rol, descripción, imagen

Frontend

Reemplaza los datos hardcodeados de equipo.html del TP1
Función asíncrona con fetch + try/catch que consume GET /equipo
Renderiza las cards del equipo dinámicamente

**Marianela Belardinelli — Login**

POST /login — recibe { email, password } desde el front
Lee data/usuarios.json, busca el usuario, valida credenciales
Devuelve los datos del usuario si es correcto, o 401 si falla

Frontend

Página nueva pages/login.html con formulario de email y contraseña
Función asíncrona que hace fetch con method: POST y body: JSON.stringify(...)
Si el login es exitoso, guarda el id del usuario en localStorage y redirige al perfil

**Clara Zivano — Perfil de usuario**

Backend

GET /perfil/:id — lee data/usuarios.json, busca por id
Devuelve nombre, mail, fecha de registro, foto y últimos 3 pedidos (requisito del enunciado)
404 si el id no existe

Frontend

Página nueva pages/perfil.html
Lee el id guardado en localStorage por el login
Función asíncrona que consume GET /perfil/:id y renderiza los datos del usuario
Si no hay sesión activa (no hay id en localStorage), redirige a login.html

**Julieta Dabús — Formulario de pedido**

Backend

POST /pedidos — recibe los datos del formulario con req.body
Lee data/servicios.json, busca el servicio por id y verifica si tiene stock
Si hay stock devuelve 200 con confirmación, si no hay devuelve 400

Frontend

Reemplaza el contenido estático de pedido.html del TP1
Al cargar la página hace fetch a GET /servicios y puebla el select dinámicamente
Las opciones sin stock se muestran deshabilitadas en el select
Al enviar el formulario hace fetch con method: POST a /pedidos y muestra el resultado

## 🛠️ Tecnologías Utilizadas

- HTML5
- CSS3
- JavaScript
- Flexbox
- Git / GitHub
- NodeJs

## Metodologías utilizadas

Esta sección define el flujo de trabajo y las convenciones de nomenclatura para la gestión de ramas en el proyecto, asegurando un historial limpio y una integración controlada a través de GitHub.

### Estructura de Ramas Principales

El proyecto se rige por dos ramas estables de larga duración:

- Main: Es la rama principal del proyecto. Contiene la versión lista para entregar, por lo que sólo debe recibir código que haya sido probado y aprobado.
- Dev: Es la rama de integración. Aquí se consolidan todas las funcionalidades y correcciones antes de pasar a la rama principal. Es el entorno de desarrollo activo.

### Convenciones para Ramas Personales

Cada integrante del grupo trabajará en ramas creadas a partir de Dev. El nombre de estas ramas debe seguir una estructura específica según el propósito de la tarea:

A. Nuevas Funcionalidades (Features) Si la tarea consiste en agregar una nueva característica o componente al proyecto:

- Formato: feature/agregado-Iniciales
- Ejemplo: feature/formulario-JD

B. Corrección de Errores (Fixes) Si la tarea consiste en solucionar un error o realizar un ajuste técnico:

- Formato: fix/correccion-Iniciales
- Ejemplo: fix/validaciones-JD

C. Documentación (Docs) Si la tarea consiste en generar o modificar documentación:

- Formato: docs/descripcion-Iniciales
- Ejemplo: docs/readme-ALL

## Resumen de Flujo de Trabajo

1. Estar posicionado en Dev y hacer un git pull para tener lo último.
2. Crear la rama personal: git checkout -b feature/mi-tarea-AB
3. Realizar los cambios y hacer commit.
4. Subir la rama al repositorio remoto: git push --set-upstream origin feature/mi-tarea-AB
5. Abrir el Pull Request en GitHub hacia la rama Dev.
6. Realizar el Merge a la rama Dev.
7. Una vez que el código de Dev esté estabilizado y listo para generar el entregable,
   realizar el Pull Request a Main.

## Documentación Técnica

## Modelos

### ServiciosModel

1. Constructor
   Crea una instancia de ServiciosModel
   Detalle de parametros:

- id: Identificador unico del servicio
- nombre: Nombre del Juego o servicio
- descripcion: Descripcion detallada del juego
- rutaImagen: Nombre del archivo de imagen. Ej. no-mans-sky.jpg
- puntaje: Puntuacion del Juego (0-5)
- stock: Cantidad de licencias disponibles
- precio: Precio en Pesos

2. getServiciosDeJson
   Metodo estatico que recibe un JSON plano y lo convierte en una instancia de ServiciosModel.
   Retorna un objeto del tipo ServiciosModel

### EquipoModel

1. Constructor

Crea una instancia de EquipoModel
Detalle de parámetros:

id: Identificador único del integrante
nombre: Nombre del integrante
apellido: Apellido del integrante
rol: Rol o cargo dentro de la tienda
imagen: Nombre del archivo de imagen. Ej. morales.jpg
acercaDe: Descripción personal del integrante

2. getIntegranteDeJson

Método estático que recibe un objeto JSON plano y lo convierte en una instancia de EquipoModel.
Retorna un objeto del tipo EquipoModel

## Controllers

### ServiciosController

1. getServicios
   Obtiene todos los servicios desde el archivo JSON y envía la respuesta HTTP.
   Retorna: Envía una respuesta JSON con el array de servicios o un error

2. getJson
   Lee el archivo JSON desde la ruta especificada y lo convierte en una lista de instancias de ServiciosModel
   Retorna: Objeto con formato:

```json
{
    "codigo": Codigo HTTP (200 ok o 500 Error),
    "servicios": Array de instancias de 'ServiciosModel' (vacio si error)
}
```

3. getPorNombre
   A partir del un string recibido por parametro, realiza un filtrado y retorna un json con las coincidencias.
   Retorna: Objeto con formato:

```json
{
    "codigo": Codigo HTTP (200 ok, 500 Error, 400 o 404 si es error del cliente),
    "servicios": Array de instancias de 'ServiciosModel' (vacio si error)
}
```

### EquipoController

1. getEquipo

Obtiene todos los integrantes del equipo desde el archivo JSON y envía la respuesta HTTP.
Retorna: Envía una respuesta JSON con el array de integrantes o un error

```json
{
  "mensaje": "Solo se envia si hay algun tipo de error o datos vacios",
  "equipo": "Array de instancias de EquipoModel (vacío si error)"
}
```

### Utils

## funciones.js

1. getJson

Lee un archivo JSON desde la ruta especificada y devuelve su contenido parseado como objeto o array de JavaScript.
Parámetros:

ruta: Ruta absoluta al archivo JSON

Retorna: El contenido del archivo parseado, o lanza un error si el archivo no existe o no es un JSON válido.
