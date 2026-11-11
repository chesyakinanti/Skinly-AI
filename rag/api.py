from typing import Literal, Optional

from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, Field

import rag

app = FastAPI(title="KenaliKulit RAG API", version="1.0")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000", "http://localhost:5173"],  # sesuaikan dengan frontend
    allow_methods=["*"],
    allow_headers=["*"],
)


class TanyaRequest(BaseModel):
    pertanyaan: str = Field(min_length=3, max_length=500)
    tipe_kulit: Optional[Literal["Normal", "Dry", "Oily", "Combination"]] = None
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