# kalibrasi.py
import rag

rag.BATAS_JARAK = 9.9  # matikan batas supaya semua jarak terlihat

RELEVAN = [
    ("rutinitas malam yang cocok untuk aku?", "Oily"),
    ("apa yang sebaiknya aku hindari?", "Dry"),
    ("kandungan apa yang cocok untuk aku?", "Combination"),
    ("rutinitas pagi", "Normal"),
    ("apa itu kulit kombinasi?", None),
    ("bagaimana cara mengetahui tipe kulit?", None),
    ("kapan harus ke dokter kulit?", None),
]

DI_LUAR_TOPIK = [
    ("siapa presiden Indonesia?", None),
    ("siapa presiden Indonesia?", "Oily"),
    ("resep nasi goreng enak", None),
    ("resep nasi goreng enak", "Dry"),
    ("cara install python di mac", "Normal"),
    ("jadwal pertandingan sepak bola malam ini", "Combination"),
]


def terdekat(p, t):
    c = rag.cari_chunk(p, t)
    if not c:
        return None, "-"
    return c[0]["jarak"], f"{c[0]['bagian']} > {c[0]['sub']}"


def cetak(judul, kasus):
    print(f"\n=== {judul} ===")
    jarak_list = []
    for p, t in kasus:
        j, label = terdekat(p, t)
        jarak_list.append(j)
        print(f"{j:.3f} | {p} [{t}] -> {label}")
    return jarak_list


rel = cetak("RELEVAN (harus lolos)", RELEVAN)
luar = cetak("DI LUAR TOPIK (harus ditolak)", DI_LUAR_TOPIK)

print("\n--- Ringkasan ---")
print(f"Jarak terbesar pertanyaan relevan   : {max(rel):.3f}")
print(f"Jarak terkecil pertanyaan di luar   : {min(luar):.3f}")
if max(rel) < min(luar):
    print(f"Ada celah. Coba BATAS_JARAK sekitar {(max(rel) + min(luar)) / 2:.3f}")
else:
    print("Tidak ada celah: jarak tumpang tindih, threshold saja tidak cukup.")