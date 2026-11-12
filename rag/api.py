from typing import Literal, Optional

from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, Field

import rag

app = FastAPI(title="Skinly AI RAG API", version="1.1")

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:3000",
        "http://127.0.0.1:3000",
        "http://localhost:5173",
        "http://127.0.0.1:5173",
    ],
    allow_methods=["*"],
    allow_headers=["*"],
)

TipeKulit = Literal["Normal", "Dry", "Oily", "Combination"]

# Nama dokumen yang ditampilkan sebagai sumber di frontend
NAMA_DOKUMEN = (
    "Guide Tipe Kulit Wajah (disusun dari Cleveland Clinic dan American Academy of Dermatology)"
)


# ---------- Endpoint asli (format Indonesia) ----------
class TanyaRequest(BaseModel):
    pertanyaan: str = Field(min_length=3, max_length=500)
    tipe_kulit: Optional[TipeKulit] = None
    acne_prone: Optional[bool] = None


class SumberOut(BaseModel):
    nomor: int
    bagian: str
    sub: str
    sumber: str
    jarak: float


class TanyaResponse(BaseModel):
    jawaban: str
    cukup_informasi: bool
    sumber: list[SumberOut]


# ---------- Endpoint adapter untuk frontend Next.js ----------
class AssistantRequest(BaseModel):
    query: str = Field(min_length=3, max_length=500)
    language: Literal["id", "en"] = "id"   # belum dipakai untuk bahasa jawaban (menyusul)
    tipe_kulit: Optional[TipeKulit] = None
    acne_prone: Optional[bool] = None


class ReferenceOut(BaseModel):
    title: str
    source: str


class AssistantResponse(BaseModel):
    answer: str
    references: list[ReferenceOut]
    sufficient: bool


@app.get("/health")
def health():
    return {"status": "ok"}


@app.post("/tanya", response_model=TanyaResponse)
def tanya(req: TanyaRequest):
    try:
        return rag.tanya(req.pertanyaan, req.tipe_kulit, req.acne_prone)
    except Exception as e:
        print("RAG error:", e)
        raise HTTPException(status_code=503, detail="Layanan penjelasan sedang bermasalah, coba lagi nanti.")


@app.post("/api/rag/assistant", response_model=AssistantResponse)
def assistant(req: AssistantRequest):
    try:
        hasil = rag.tanya(req.query, req.tipe_kulit, req.acne_prone)
    except Exception as e:
        print("RAG error:", e)
        raise HTTPException(status_code=503, detail="Layanan penjelasan sedang bermasalah, coba lagi nanti.")

    references = []
    for s in hasil["sumber"]:
        judul = s["bagian"] if s["sub"] == "Pengantar" else f"{s['bagian']} › {s['sub']}"
        references.append({
            "title": f"Sumber {s['nomor']}: {judul}",
            "source": NAMA_DOKUMEN,
        })

    return {
        "answer": hasil["jawaban"],
        "references": references,
        "sufficient": hasil["cukup_informasi"],
    }