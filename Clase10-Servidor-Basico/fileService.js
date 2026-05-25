import fs from "fs/promises";

const FILE_PATH = "./content.txt";

// =============================
// Ejercicio 1 - agregar texto (POST /words)
// =============================
export async function addText(text){
    await fs.appendFile(FILE_PATH, text + "\n");
}

export async function getContent(){
    try{
        const content = await fs.readFile(FILE_PATH,"utf-8");
        return content;
    }catch(error){
        if(error.code === "ENOENT"){
            console.log(`File in path ${FILE_PATH} does not exist`);
            return "";
        }
        throw error;
    }
}

// =============================
// Ejercicio 3 - obtener todas las líneas (GET /random-word usa esto)
// =============================
export async function getLines(){
    const content = await getContent();
    if(content === "") return [];
    const lines = content.split("\n");
    if(lines[lines.length - 1] === "") lines.pop();
    return lines;
}

export async function writeLines(lines){
    const data = lines.join("\n") + (lines.length ? "\n" : "");
    await fs.writeFile(FILE_PATH, data);
}

// =============================
// Ejercicio 2 - obtener una línea por número (GET /words/:line)
// =============================
export async function getLine(number){
    const lines = await getLines();
    if(number < 1 || number > lines.length){
        const error = new Error("Line out of range");
        error.code = "OUT_OF_RANGE";
        throw error;
    }
    return lines[number - 1];
}

// =============================
// Ejercicio 4 - actualizar una línea (PATCH /words/:line)
// =============================
export async function updateLine(number, text){
    const lines = await getLines();
    if(number < 1 || number > lines.length){
        const error = new Error("Line out of range");
        error.code = "OUT_OF_RANGE";
        throw error;
    }
    lines[number - 1] = text;
    await writeLines(lines);
}

// =============================
// Ejercicio 5 - eliminar una línea (DELETE /words/:line)
// =============================
export async function deleteLine(number){
    const lines = await getLines();
    if(number < 1 || number > lines.length){
        const error = new Error("Line out of range");
        error.code = "OUT_OF_RANGE";
        throw error;
    }
    lines.splice(number - 1, 1);
    await writeLines(lines);
}

export async function overwriteFile(text){
    await fs.writeFile(FILE_PATH, text);
}