import { addText, getContent } from "./fileService.js";
import http from "http";

const PORT = 3000;

const server = http.createServer((req, res) => {
    console.log(req);
  res.setHeader("Content-Type", "text/html; charset=utf-8");

  res.end(`
    <h1>Hola soy Tutuma desde el Servidor</h1>
    <p>Este HTML fue enviado desde Node.js.</p>
  `);
});

server.listen(PORT, () => {
  console.log(`Servidor disponible en http://localhost:${PORT}`);
});

async function main() {
  await addText("No hay pollo :(");
  const content = await getContent();
  console.log(content);
}

main();