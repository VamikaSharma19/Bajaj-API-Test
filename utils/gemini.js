const axios = require("axios");

async function askGemini(question) {
const url =
  "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=" +
  process.env.GEMINI_API_KEY;

  const strictQuestion = question + "\nGive ONLY the one-word answer. No sentences.";

  const response = await axios.post(url, {
    contents: [
      {
        role: "user",
        parts: [{ text: strictQuestion }]
      }
    ]
  });

  const text =
    response.data.candidates?.[0]?.content?.parts?.[0]?.text || "";

  const clean = text
    .replace(/[^a-zA-Z ]/g, "") 
    .trim()
    .split(" ")[0]; 

  return clean;
}

module.exports = askGemini;