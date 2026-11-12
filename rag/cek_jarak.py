# cek_jarak.py
# Pemakaian: python cek_jarak.py "pertanyaan 1" "pertanyaan 2"
import sys

import rag

BATAS_SAAT_INI = rag.BATAS_JARAK
rag.BATAS_JARAK = 9.9  # matikan batas supaya semua jarak terlihat

PERTANYAAN = [
    # pertanyaan populer di UI
    ("Apa fungsi Niacinamide?", None),
    ("Apa perbedaan AHA dan BHA?", None),
    ("Bagaimana cara merawat kulit kering?", None),
    ("Apakah Hyaluronic Acid cocok untuk kulit berminyak?", None),
    ("Bagaimana cara kerja Retinol?", None),
    # tambahan
    ("Apa fungsi ceramide?", None),
    ("rutinitas pagi untuk kulit berminyak", None),
    ("Apa fungsi Niacinamide?", "Oily"),
    ("Bagaimana cara merawat kulit kering?", "Dry"),
]
PERTANYAAN += [(q, None) for q in sys.argv[1:]]

for q, tipe in PERTANYAAN:
    hasil = rag.cari_chunk(q, tipe)
    if not hasil:
        print(f"  --   | {q} [{tipe}] -> (tidak ada hasil)")
        continue
    j = hasil[0]["jarak"]
    status = "LOLOS" if j <= BATAS_SAAT_INI else "DITOLAK"
    print(f"{j:.3f} {status:8}| {q} [{tipe}] -> {hasil[0]['bagian']} > {hasil[0]['sub']}")