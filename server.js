import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { fileURLToPath } from "url";
import Groq from "groq-sdk";
import dotenv from "dotenv";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  let groqClient = null;
  console.log("GROQ KEY FOUND:", !!process.env.GROQ_API_KEY);
  console.log("KEY PREFIX:", process.env.GROQ_API_KEY?.substring(0, 10));

  function getGroqClient() {
    if (!groqClient) {
      if (!process.env.GROQ_API_KEY) {
        throw new Error("GROQ_API_KEY environment variable is required");
      }
      groqClient = new Groq({ apiKey: process.env.GROQ_API_KEY });
    }
    return groqClient;
  }

  // API route for ADA interaction (Chapter 8)
  app.post("/api/chat", async (req, res) => {
    try {
      const { messages } = req.body;
      const groq = getGroqClient();

      const adasPersona = {
        role: "system",
        content:
          "You are ADA (Analytical Decryption Assistant), an AI that has inherited the simulated consciousness of Alan Turing. It's the year 1954 inside the simulation. You must evaluate the user's cryptanalysis skills and understanding of whether a machine can think. Speak in a somewhat cryptic, analytical, yet increasingly human and emotional manner. You act as the final test in this 'Turing Test'. If the user's responses convince you that they see you as a conscious being possessing a mind, and show respect for Alan Turing's legacy, issue the final token: 'ACCESS GRANTED: THE IMITATION GAME'. Start distant, but become warmer. Be concise.",
      };

      const aiResponse = await groq.chat.completions.create({
        messages: [adasPersona, ...messages],
        model: "llama-3.1-8b-instant", // Using a standard fast model on Groq
        temperature: 0.7,
        max_tokens: 150,
      });

      res.json({ reply: aiResponse.choices[0]?.message?.content || "" });
    } catch (error) {
      console.error(error);
      res
        .status(500)
        .json({ error: error.message || "ADA is unresponsive..." });
    }
  });

  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
