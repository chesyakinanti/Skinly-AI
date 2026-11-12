# Skinly AI – Komponen RAG

Asisten tanya jawab edukasi tipe kulit dan perawatan kulit berbasis RAG. Jawaban hanya
bersumber dari knowledge base (Guide Tipe Kulit Wajah, disusun dari Cleveland Clinic dan
American Academy of Dermatology) dan menampilkan rujukannya. Bukan diagnosis medis.

## Menjalankan

1. Pasang Ollama dari https://ollama.com, lalu jalankan aplikasinya dan unduh model:
   ```bash
   ollama pull qwen2.5:3b
   ```
   Tidak perlu API key.
2. Buat virtual environment (Python 3.12) dan pasang dependensi:
   ```bash
   cd rag
   python3.12 -m venv .venv
   source .venv/bin/activate
   pip install -r requirements.txt
   ```
3. Bangun vector database (folder `chroma_db/` tidak ikut di Git):
   ```bash
   python bangun_db.py
   ```
4. Jalankan server RAG:
   ```bash
   uvicorn api:app --port 8001 --reload
   ```
5. Di root proyek, buat `.env.local` lalu jalankan ulang `npm run dev`:
   ```
   NEXT_PUBLIC_RAG_API_URL=http://localhost:8001/api/rag/assistant
   ```

Permintaan pertama lambat (puluhan detik) karena model dimuat ke memori.

## Endpoint

### GET /health
`{"status": "ok"}`

### POST /api/rag/assistant

Request:
```json
{
  "query": "Bagaimana cara merawat kulit kering?",
  "language": "id",
  "tipe_kulit": "Dry"
}
```

| Field | Wajib | Keterangan |
|---|---|---|
| `query` | ya | 3 sampai 500 karakter |
| `language` | tidak | saat ini jawaban selalu berbahasa Indonesia |
| `tipe_kulit` | tidak | `Normal`, `Dry`, `Oily`, atau `Combination` (hasil CV). Label lain dianggap tidak ada |
| `acne_prone` | tidak | `true`/`false` dari kuesioner (bukan dari foto) |

Respons 200:
```json
{
  "answer": "... (Sumber 1)\n\nCatatan: tipe kulit kering adalah estimasi dari foto, bukan diagnosis.",
  "references": [
    {"title": "Sumber 1: Tipe Kulit Kering › Rutinitas harian", "source": "Guide Tipe Kulit Wajah (...)"}
  ],
  "sufficient": true
}
```

- `sufficient: false` berarti informasinya tidak ada di knowledge base. Tampilkan `answer` apa adanya.
- `references` hanya berisi sumber yang benar-benar dikutip di jawaban.
- Error 422: body tidak valid. Error 503: Ollama atau vector database bermasalah.

## Cakupan knowledge base

Bisa dijawab: ciri tipe kulit, cara menentukan tipe kulit, rutinitas harian per tipe, kandungan
yang umum dipertimbangkan per tipe, yang sebaiknya dihindari, kapan ke dokter.

Tidak tercakup (dijawab "informasi tidak ditemukan"): AHA/BHA, retinol, vitamin C, dan kandungan
lain yang tidak dibahas guide. Pertanyaan medis (kanker, bercak, infeksi, dan sejenisnya)
dijawab dengan kalimat tetap yang mengarahkan ke dokter kulit. Rekomendasi merek ditolak.

## Evaluasi

```bash
python eval_rag.py      # retrieval, penolakan, merek, dan pengarahan ke dokter
python tes_kontrak.py   # meniru request frontend (server RAG harus hidup)
```

Kesesuaian jawaban dengan sumber dan ketepatan sitasi dicek manual untuk laporan.

## Keterbatasan

- Model lokal 3B kadang salah mengutip sumber. Model dapat diganti lewat `MODEL_LLM` dan
  fungsi `panggil_llm` di `rag.py`, tanpa mengubah API.
- Batas relevansi (`BATAS_JARAK`) dikalibrasi dari sedikit pertanyaan.
- Knowledge base hanya satu dokumen.