import { getContent, addText } from "./fileService.js";

 import http from "http";  
// async function main() {
//     await addText("Claudia");
//     const fileContent = await getContent();
//     console.log(fileContent);
// }

// main()

const PORT = 3000;

// const server = http.createServer((req, res) => {
//     console.log(req);
//     res.setHeader("Content-Type", "text/html; charset=utf-8");
//     res.end(`
//         <h1>Hola soy Clau desde el Servidor</h1>
//         <p>El HTML fue enviado desde Node.js. para mi tarea</p>
//     `);
// });

const server = http.createServer(async (req, res) => {
  res.setHeader("Content-Type", "application/json");
  let urlParameters = req.url.split("/");

  console.log(urlParameters);

  if (req.method == 'GET' && req.url == '/words') {
    const content = await getContent();
    res.statusCode = 200;
    res.end(JSON.stringify({
      content
    }));
    return; 
  }

  if (req.method == 'POST' && urlParameters[1] == "addword" && urlParameters[2]) {
    await addText(urlParameters[2]);
    res.statusCode = 200;
    let message = `The word ${urlParameters[2]} was added to the file`;
    res.end(JSON.stringify({
      "message": message
    }));
    return;
  }

  res.statusCode = 404;
  res.end(JSON.stringify({
    "error": "Not method to handle the url"
  }));
});


server.listen(PORT, () => {
    console.log(`Servidor disponible en http://localhost:${PORT}`);
});