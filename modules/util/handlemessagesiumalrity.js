import fs from 'fs';
import path from 'path';
import stringSimilarity from 'string-similarity';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

let foundHighSimilarity = false;
let overlySimilar = false;
export async function handlemessagesiumalrity(message) {
    try{
    let text = message.content;
    let test = text.toLowerCase();


    const examplesFilePath = path.resolve(__dirname, 'examples.json');
    

    const examplesData = JSON.parse(fs.readFileSync(examplesFilePath, 'utf8'));
    let examples = examplesData.examples;
    

    for (let example of examples) {
        let similarity = stringSimilarity.compareTwoStrings(test, example.toLowerCase());
        if (similarity >= 1) {
            message.reply(`Are you looking for the Resourcepack? If so, please read <#1157648526742913064>`);
            overlySimilar = true;
            break;
        }
        if (similarity >= 0.7) {
            message.reply(`Are you looking for the Resourcepack? If so, please read <#1157648526742913064>`);
            foundHighSimilarity = true;
            break;
        }
        if (similarity >= 0.5) {
            message.reply(`Are you looking for the Resourcepack? If so, please read <#1157648526742913064>`);
            break;
        }
        else {
            break;
        }
    }
    if (foundHighSimilarity == true) {
        console.log(`attempting to add new example: ${test}`);
        if (overlySimilar == true) {
            console.log(`Found exact same message: ${test} not adding to examples`);
        }
        examples.push(test);
        fs.writeFileSync(examplesFilePath, JSON.stringify({ examples }, null, 2), 'utf8');
        console.log(`Added new example: ${test}`);
    }}catch (error) {
        console.error(error);
    }
}