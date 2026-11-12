import json
from pathlib import Path
import chromadb
from sentence_transformers import SentenceTransformer

chunks = json.loads(Path("dokumen_bersih/chunks.json").read_text(encoding="utf-8"))
print("Jumlah chunk dibaca:", len(chunks))

model = SentenceTransformer("intfloat/multilingual-e5-small")

teks_passage = ["passage: " + c["teks"] for c in chunks]
vektor = model.encode(teks_passage, normalize_embeddings=True, show_progress_bar=True)
print("Bentuk vektor:", vektor.shape)

client = chromadb.PersistentClient(path="chroma_db")
try:
    client.delete_collection("skinly_kb")
except Exception:
    pass  # koleksi belum ada, tidak masalah

koleksi = client.create_collection(name="skinly_kb")
koleksi.add(
    ids=[c["id"] for c in chunks],
    embeddings=vektor.tolist(),
    documents=[c["teks"] for c in chunks],
    metadatas=[
        {"bagian": c["bagian"], "sub": c["sub"], "sumber": c["sumber"]}
        for c in chunks
    ],
)
print("Jumlah data di ChromaDB:", koleksi.count())