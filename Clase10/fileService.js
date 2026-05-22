import fs from "fs/promises";

const FILE_PATH = "./content.txt";

export async function addText(text) {

  await fs.appendFile(FILE_PATH, text+"\n");

}

export async function getContent() {
  try {
    const content = await fs.readFile(FILE_PATH, "utf8");
    return content;
  } catch (error) {
    if(error.code === "ENOENT") {
      console.log('File in path ${FILE_PATH} not found.');
        return "";
    }
    throw error;
  }
}