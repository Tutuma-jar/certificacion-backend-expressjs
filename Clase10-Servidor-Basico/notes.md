# Notas de la Clase 10 - Creación de un Servidor Básico

## Inicio Rapido de Proyecto Node.js

Es posible iniciar de forma rápida un proyecto de Node.js, utilizando el comando `npm init -y`.

La única consideración es que esta forma de inicializar, creea el proyecto con `"type": "commonjs" `, asi que se debe cambiar el tipo a `module` de manera manual.

## Consideraciones sobre npm run

La pasada clase se exploró de forma inicial la creación de scripts en `package.json`, estos por lo general se corren haciendo `npm run [script_name]`, sin embargo cuando el script tiene nombre igual a `start`, `test`, `restart` o `stop`, se puede correr solo haciendo `npm [script_name]`.

## Uso de archivos para esta clase

En la clase de hoy se hara uso del módulo `fs/promises` ya disponible en el entorno de ejecución de Node.js.

Lo importaremos usando 

```javascript
import fs from "fs/promises";
```

Tambien usaremos los siguientes métodos

### Agregar texto al archivo

```javascript
await fs.appendFile(FILE_PATH,text);
```

El método `appendFile` agrega `text` al contenido actual del archivo en `FILE_PATH`.

### Obtener el conteindo del archivo

```javascript
await fs.readFile(FILE_PATH,"utf-8");
```

El método `readFile` obtiene todo el contenido del arcihvo `FILE_PATH`.

## Creación Básica del Servidor

Para crear un servidor básico en Node.js, usaremos el módulo `http` importandolo con:

```javascript
import http from "http";
```

Creamos el servidor, con el método `http.createServer`, el cual como parámetro recibe un callback, que tiene como parametros `(req,res)`.

- `req` significa **request** y señala la petición que se hace a traves del protocolo HTTP, realizada por un cliente.
- `res` significa **response** y construira la respuesta que daremos a la petición a traves del servidor.

Nota que por el momento `req` va a manejar todas las peticiones que se hagan al servidor.

Un ejemplo de la lógica más básica de este servidor seria:

```javascript
const server = http.createServer((req, res) => {
  res.setHeader("Content-Type", "text/html; charset=utf-8");

  res.end(`
    <h1>Hola desde el Servidor</h1>
    <p>Este HTML fue enviado desde Node.js.</p>
  `);
});
```

Finalmente debemos hacer que el servidor escuche un puerto lo lograremos haciendo:

```javascript
server.listen(PORT, () => {
  console.log(`Servidor disponible en http://localhost:${PORT}`);
});
```

## Manejo de requests/responses

Para manejar un request debemos considerar primero el método de ese request los métodos HTTP son en general:

```javascript
GET     // Obtener información
POST    // Crear información nueva
PUT     // Reemplazar/actualizar completamente
PATCH   // Actualizar parcialmente
DELETE  // Eliminar información
```

Manejaremos el **request** analizando lo siguiente:

- `req.method` que sera el método HTTP
- `req.url` que devuelve la URL de la petición.

Responderemos el **response** a través de:

- `res.setHeader("Content-Type","application/json")` para colocar cabeceras.
- `res.statusCode` para indicar el código de respuesta
- `res.end()` para indicar el cuerpo de la respusta.