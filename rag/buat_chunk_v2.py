import re
import json
from pathlib import Path

md_path = Path("dokumen_mentah/guide-tipe-kulit-01.md")
teks = md_path.read_text(encoding="utf-8")

BATAS = 1000  # chunk lebih panjang dari ini dipecah di label **Pagi:** dst.

bagian_besar = teks.split("\n## ")[1:]
chunks = []

for b in bagian_besar:
    baris = b.split("\n", 1)
    judul_besar = baris[0].strip()
    isi = baris[1] if len(baris) > 1 else ""
    if judul_besar == "Referensi":
        continue

    potongan = isi.split("\n### ")
    for j, p in enumerate(potongan):
        if j == 0:
            judul_kecil = "Pengantar"
            isi_chunk = p.strip()
        else:
            judul_kecil, _, isi_chunk = p.partition("\n")
            judul_kecil = judul_kecil.strip()
            isi_chunk = isi_chunk.strip()
        if not isi_chunk:
            continue

        if len(isi_chunk) > BATAS:
            bagian_kecil = re.split(r"\n\n(?=\*\*[^*\n]+:\*\*)", isi_chunk)
        else:
            bagian_kecil = [isi_chunk]

        for k in bagian_kecil:
            if judul_kecil == "Pengantar":
                label = judul_besar
            else:
                label = f"{judul_besar} > {judul_kecil}"
            chunks.append({
                "id": f"chunk-{len(chunks):02d}",
                "bagian": judul_besar,
                "sub": judul_kecil,
                "teks": f"[{label}]\n{k.strip()}",
                "sumber": md_path.name,
            })

Path("dokumen_bersih/chunks.json").write_text(
    json.dumps(chunks, ensure_ascii=False, indent=2), encoding="utf-8"
)

print("Jumlah chunk:", len(chunks))
for c in chunks:
    baris_teks = c["teks"].split("\n")
    print(f"{c['id']} | {len(c['teks']):>5} | {baris_teks[0]}  ||  {baris_teks[1][:25]}")