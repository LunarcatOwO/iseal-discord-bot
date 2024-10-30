// MIT License

// Copyright (c) 2024 LunarcatOwO

// Permission is hereby granted, free of charge, to any person obtaining a copy
// of this software and associated documentation files (the "Software"), to deal
// in the Software without restriction, including without limitation the rights
// to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
// copies of the Software, and to permit persons to whom the Software is
// furnished to do so, subject to the following conditions:

// The above copyright notice and this permission notice shall be included in all
// copies or substantial portions of the Software.

// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
// IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
// FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
// AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
// LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
// OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
// SOFTWARE.
import fs from "fs";
import path from "path";
import stringSimilarity from "string-similarity";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export async function handlemessagesiumalrity(message) {
  try {
    let foundHighSimilarity = false;
    let overlySimilar = false;
    let text = message.content;
    let test = text.toLowerCase();

    const examplesFilePath = path.resolve(__dirname, "examples.json");

    const examplesData = JSON.parse(fs.readFileSync(examplesFilePath, "utf8"));
    let examples = examplesData.examples;

    for (let example of examples) {
      let similarity = stringSimilarity.compareTwoStrings(
        test,
        example.toLowerCase()
      );
      if (similarity >= 0.7) {
        await message.reply(
          `<@${message.author.id}> are you looking for the Resourcepack? If so, please read <#1296440139504943131>`
        );
        foundHighSimilarity = true;
        break;
      }
      if (similarity >= 0.5) {
        await message.reply(
          `<@${message.author.id}> are you looking for the Resourcepack? If so, please read <#1296440139504943131>`
        );
        break;
      }
    }
    if (foundHighSimilarity) {
      console.log(`attempting to add new example: ${test}`);
      for (let example of examples) {
        let similarity = stringSimilarity.compareTwoStrings(
          test,
          example.toLowerCase()
        );
        if (similarity >= 1) {
          overlySimilar = true;
          break;
        }
      }
      if (overlySimilar) {
        console.log(`Found exact same message: ${test} not adding to examples`);
        return;
      } else {
        examples.push(test);
        fs.writeFileSync(
          examplesFilePath,
          JSON.stringify({ examples }, null, 2),
          "utf8"
        );
        console.log(`Added new example: ${test}`);
        return;
      }
    }
  } catch (error) {
    console.error(error);
  }
}
