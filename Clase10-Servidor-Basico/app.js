import { addText, getContent, getLines, getLine, updateLine, deleteLine } from "./fileService.js";
import http from "http";
import randomItem from "random-item";

const PORT = 3000;

function getRequestBody(req){
    return new Promise((resolve, reject) => {
        let body = "";
        req.on("data", chunk => { body += chunk.toString(); });
        req.on("end", () => resolve(body));
        req.on("error", reject);
    });
}

const server = http.createServer(async (req, res) => {
    // All responses will be JSON
    res.setHeader("Content-Type","application/json");
    const url = new URL(req.url, `http://${req.headers.host}`);
    const pathname = url.pathname;
    const parts = pathname.split("/").filter(Boolean);
    console.log(req.method, pathname);

    // GET /words -> full content
    if(req.method === 'GET' && pathname === '/words'){
        const content = await getContent();
        res.statusCode = 200;
        res.end(JSON.stringify({ content }));
        return;
    }

    // =============================
    // Ejercicio 1 - POST /words
    // POST /words -> body: { "word": "..." }
    // =============================
    if(req.method === 'POST' && pathname === '/words'){
        try{
            const raw = await getRequestBody(req);
            const body = JSON.parse(raw);
            if(!body.word || typeof body.word !== 'string'){
                res.statusCode = 400;
                res.end(JSON.stringify({ error: "Bad Request - 'word' is required and must be a string" }));
                return;
            }
            await addText(body.word);
            res.statusCode = 201;
            res.end(JSON.stringify({ message: `The word '${body.word}' was added to the file` }));
        }catch(error){
            res.statusCode = 400;
            res.end(JSON.stringify({ error: "Bad Request - invalid JSON" }));
        }
        return;
    }

    // =============================
    // Ejercicio 2 - GET /words/:line
    // GET /words/:line
    // =============================
    if(req.method === 'GET' && parts[0] === 'words' && parts[1]){
        const lineParam = parts[1];
        if(!/^\d+$/.test(lineParam)){
            res.statusCode = 400;
            res.end(JSON.stringify({ error: "Bad Request - line must be an integer greater than 0" }));
            return;
        }
        const lineNumber = parseInt(lineParam,10);
        try{
            const line = await getLine(lineNumber);
            res.statusCode = 200;
            res.end(JSON.stringify({ word: line }));
        }catch(e){
            if(e && e.code === 'OUT_OF_RANGE'){
                res.statusCode = 404;
                res.end(JSON.stringify({ error: 'Not Found' }));
            }else{
                res.statusCode = 500;
                res.end(JSON.stringify({ error: 'Internal Server Error' }));
            }
        }
        return;
    }

    // =============================
    // Ejercicio 3 - GET /random-word
    // GET /random-word
    // =============================
    if(req.method === 'GET' && pathname === '/random-word'){
        try{
            const lines = await getLines();
            if(lines.length === 0){
                res.statusCode = 404;
                res.end(JSON.stringify({ error: 'Not Found - file is empty' }));
                return;
            }
            const word = randomItem(lines);
            res.statusCode = 200;
            res.end(JSON.stringify({ word }));
        }catch(e){
            res.statusCode = 500;
            res.end(JSON.stringify({ error: 'Internal Server Error' }));
        }
        return;
    }

    // =============================
    // Ejercicio 4 - PATCH /words/:line
    // PATCH /words/:line
    // =============================
    if(req.method === 'PATCH' && parts[0] === 'words' && parts[1]){
        const lineParam = parts[1];
        if(!/^\d+$/.test(lineParam)){
            res.statusCode = 400;
            res.end(JSON.stringify({ error: "Bad Request - line must be an integer greater than 0" }));
            return;
        }
        const lineNumber = parseInt(lineParam,10);
        try{
            const raw = await getRequestBody(req);
            const body = JSON.parse(raw);
            if(!body.word || typeof body.word !== 'string'){
                res.statusCode = 400;
                res.end(JSON.stringify({ error: "Bad Request - 'word' is required and must be a string" }));
                return;
            }
            await updateLine(lineNumber, body.word);
            res.statusCode = 200;
            res.end(JSON.stringify({ message: `Line ${lineNumber} updated` }));
        }catch(e){
            if(e && e.code === 'OUT_OF_RANGE'){
                res.statusCode = 404;
                res.end(JSON.stringify({ error: 'Not Found' }));
            }else if(e instanceof SyntaxError){
                res.statusCode = 400;
                res.end(JSON.stringify({ error: 'Bad Request - invalid JSON' }));
            }else{
                res.statusCode = 500;
                res.end(JSON.stringify({ error: 'Internal Server Error' }));
            }
        }
        return;
    }

    // =============================
    // Ejercicio 5 - DELETE /words/:line
    // DELETE /words/:line
    // =============================
    if(req.method === 'DELETE' && parts[0] === 'words' && parts[1]){
        const lineParam = parts[1];
        if(!/^\d+$/.test(lineParam)){
            res.statusCode = 400;
            res.end(JSON.stringify({ error: "Bad Request - line must be an integer greater than 0" }));
            return;
        }
        const lineNumber = parseInt(lineParam,10);
        try{
            await deleteLine(lineNumber);
            res.statusCode = 200;
            res.end(JSON.stringify({ message: `Line ${lineNumber} deleted` }));
        }catch(e){
            if(e && e.code === 'OUT_OF_RANGE'){
                res.statusCode = 404;
                res.end(JSON.stringify({ error: 'Not Found' }));
            }else{
                res.statusCode = 500;
                res.end(JSON.stringify({ error: 'Internal Server Error' }));
            }
        }
        return;
    }

    res.statusCode = 404;
    res.end(JSON.stringify({ "error": "Not method to handle the url" }));
});

server.listen(PORT, () => {
  console.log(`Servidor disponible en http://localhost:${PORT}`);
});