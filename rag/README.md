# KenaliKulit – Komponen RAG

## Menjalankan
1. `python -m venv .venv && source .venv/bin/activate`
2. `pip install -r requirements.txt`
3. Buat `.env` berisi `GEMINI_API_KEY=...`
4. Pastikan folder `chroma_db/` ada (jalankan `python build_index.py` jika belum)
5. `uvicorn api:app --port 8000`

## Endpoint
### GET /health → {"status": "ok"}

### POST /tanya
Request:
{
  "pertanyaan": "apa yang sebaiknya aku hindari?",   // wajib, 3-500 karakter
  "tipe_kulit": "Dry",        // opsional: Normal | Dry | Oily | Combination
  "acne_prone": false         // opsional: true/false dari kuesioner
}

Response 200:
{
  "jawaban": "...",
  "cukup_informasi": true,    // false → tampilkan pesan "informasi tidak ditemukan"
  "sumber": [
    {"nomor": 1, "bagian": "...", "sub": "...", "sumber": "...", "jarak": 0.285}
  ]
}

Error 422: input tidak valid. Error 503: LLM/vector DB bermasalah (tampilkan pesan error yang jelas).

## Catatan integrasi
- Kirim tipe_kulit persis seperti label model CV (4 label di atas).
- Jika CV tidak yakin, kirim tipe_kulit = null.
- acne_prone berasal dari kuesioner, bukan foto.
- Nomor (Sumber n) di teks jawaban sesuai field "nomor" di array sumber.

## Evaluasi
`python eval_rag.py` → hasil terakhir: (isi setelah dijalankan)