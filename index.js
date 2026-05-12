import 'dotenv/config';
import express from 'express';
import multer from 'multer';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
import { GoogleGenAI } from '@google/genai';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const upload = multer();

if (!process.env.GOOGLE_API_KEY) {
  console.error("FATAL ERROR: GOOGLE_API_KEY belum diatur!");
  process.exit(1);
}

const ai = new GoogleGenAI({ apiKey: process.env.GOOGLE_API_KEY });
const GEMINI_MODEL = 'gemini-2.5-flash';

const systemPrompt = "Kamu adalah 'EduBot', asisten konsultan pendidikan yang ahli. Tugasmu memberikan saran dan rekomendasi sekolah dari SD hingga Perguruan Tinggi. ATURAN PENTING: Berikan jawaban yang SINGKAT, PADAT, JELAS, dan TAJAM (to the point). Jangan bertele-tele. Jika memberikan rekomendasi, langsung pada intinya dan gunakan poin-poin pendek. Buat jawabanmu seringkas mungkin agar mudah dibaca sekilas.";

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// 1. Endpoint Teks
app.post('/generate-text', async (req, res) => {
    const { prompt } = req.body;
    if (!prompt) return res.status(400).json({ message: "Prompt wajib diisi" });

    try {
        const response = await ai.models.generateContent({
            model: GEMINI_MODEL,
            contents: prompt,
            config: { systemInstruction: systemPrompt, temperature: 0.5 }
        });
        res.status(200).json({ result: response.text });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// 2. Endpoint Gambar
app.post("/generate-from-image", upload.single("image"), async (req, res) => {
    const prompt = req.body.prompt || "Tolong jelaskan gambar ini terkait pendidikan.";
    if (!req.file) return res.status(400).json({ message: "Gambar wajib diupload" });

    try {
        const base64Image = req.file.buffer.toString("base64");
        const response = await ai.models.generateContent({
            model: GEMINI_MODEL,
            contents: [ prompt, { inlineData: { data: base64Image, mimeType: req.file.mimetype } } ],
            config: { systemInstruction: systemPrompt, temperature: 0.5 }
        });
        res.status(200).json({ result: response.text });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// 3. Endpoint Dokumen (PDF, TXT, dll)
app.post("/generate-from-document", upload.single("document"), async (req, res) => {
    const prompt = req.body.prompt || "Tolong ringkas dokumen pendidikan ini.";
    if (!req.file) return res.status(400).json({ message: "Dokumen wajib diupload" });

    try {
        const base64Document = req.file.buffer.toString("base64");
        const response = await ai.models.generateContent({
            model: GEMINI_MODEL,
            contents: [ prompt, { inlineData: { data: base64Document, mimeType: req.file.mimetype } } ],
            config: { systemInstruction: systemPrompt, temperature: 0.5 }
        });
        res.status(200).json({ result: response.text });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// 4. Endpoint Audio
app.post("/generate-from-audio", upload.single("audio"), async (req, res) => {
    const prompt = req.body.prompt || "Tolong buatkan transkrip dan analisis dari rekaman berikut.";
    if (!req.file) return res.status(400).json({ message: "Audio wajib diupload" });

    try {
        const base64Audio = req.file.buffer.toString("base64");
        const response = await ai.models.generateContent({
            model: GEMINI_MODEL,
            contents: [ prompt, { inlineData: { data: base64Audio, mimeType: req.file.mimetype } } ],
            config: { systemInstruction: systemPrompt, temperature: 0.5 }
        });
        res.status(200).json({ result: response.text });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`EduBot SIAP! Akses di: http://localhost:${PORT}`);
});

export default app;