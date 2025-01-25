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
import { geminiKey } from "../../constants.js";
import { GoogleGenerativeAI } from '@google/generative-ai';
export async function geminiRP(message) {
    const genAI = new GoogleGenerativeAI(geminiKey);
    
    // Configure the model with therapy-specific instructions
    const model = genAI.getGenerativeModel({
        model: "gemini-1.5-flash",
        systemInstruction: "Check if the User is looking for a resource pack/texture pack. Only respond with [Yes] or [No]. If they are asking for a bedrock resource pack respond with [No]. If they are asking for update respond with [No]",
    });
    try {
        // Start chat session with specific generation settings
        const chat = model.startChat({
            generationConfig: {
                temperature: 0.85,    // Controls randomness
                topP: 0.95,          // Nucleus sampling
                topK: 40,            // Top-k sampling
                maxOutputTokens: 8192 // Max response length
            }
        });
        
        // Send user message and get response
        const result = await chat.sendMessage(message);
        const response = await result.response.text();
        return response.toLowerCase().includes("yes");
    } catch (error) {
        console.error(error);
        return true;
    }
}