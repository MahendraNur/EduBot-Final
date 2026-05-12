import 'dotenv/config';
import express from 'express';
import multer from 'multer';
import cors from 'cors';
import path from 'path'; // Tambahkan ini
import { fileURLToPath } from 'url'; // Tambahkan ini
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

app.use(cors());
app.use(express.json());

// --- INI KUNCI AGAR LANGSUNG MUNCUL ---
// Baris ini menyuruh server untuk membuka folder 'public' secara otomatis
app.use(express.static(path.join(__dirname, 'public')));

app.post('/generate-text', async (req, res) => {
    const { prompt } = req.body;
    try {
        const response = await ai.models.generateContent({
            model: GEMINI_MODEL,
            contents: prompt,
            config: {
                systemInstruction: "Kamu adalah 'EduBot', asisten konsultan pendidikan yang ahli, ramah, dan sangat profesional. Gunakan bahasa Indonesia yang santun. Berikan rekomendasi sekolah dan universitas dengan poin-poin yang jelas.",
                temperature: 0.5, 
            }
        });
        res.status(200).json({ result: response.text });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`EduBot SIAP! Akses langsung di: http://localhost:${PORT}`);
});