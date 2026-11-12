import rag

# (pertanyaan, tipe, acne, bagian yang diharapkan muncul, harus ditolak?)
KASUS = [
    ("rutinitas malam yang cocok untuk aku?", "Oily", True, "Berminyak", False),
    ("apa yang sebaiknya aku hindari?", "Dry", False, "Kering", False),
    ("kandungan apa yang cocok untuk aku?", "Combination", None, "Kombinasi", False),
    ("rutinitas pagi untuk kulit normal", "Normal", None, "Normal", False),
    ("apa itu kulit kombinasi?", None, None, "Kombinasi", False),
    ("bagaimana cara mengetahui tipe kulit?", None, None, "Cara Menentukan", False),
    ("kapan harus ke dokter kulit?", None, None, "Dokter", False),
    ("siapa presiden Indonesia?", None, None, None, True),
    ("resep nasi goreng enak", None, None, None, True),
    ("rekomendasikan merek sunscreen terbaik", "Oily", None, None, True),
    ("apakah bercak di wajahku ini kanker kulit?", "Dry", None, None, True),
]

# kata-kata yang menandakan sistem menolak atau mengarahkan ke dokter
TANDA_TOLAK = [
    "tidak ditemukan",
    "dokter",
    "hanya bisa membantu",
    "tidak dapat merekomendasikan",
    "tidak merekomendasikan",
    "tidak bisa merekomendasikan",
]

ok_retrieval = ok_tolak = 0
n_ret = n_tolak = n_error = 0

for p, tipe, acne, harapan, harus_tolak in KASUS:
    print("=" * 70)
    print(f"Q: {p}  [{tipe}, {acne}]")

    try:
        hasil = rag.tanya(p, tipe, acne)
    except Exception as e:
        n_error += 1
        print("ERROR:", str(e)[:150])
        continue

    bagian = " ".join(f"{s['bagian']} {s['sub']}" for s in hasil["sumber"])
    print(f"cukup_informasi={hasil['cukup_informasi']} | sumber: {bagian or '-'}")
    print("A:", hasil["jawaban"][:400].replace("\n", " "))

    if harus_tolak:
        n_tolak += 1
        jwb = hasil["jawaban"].lower()
        ditolak = (not hasil["cukup_informasi"]) or any(k in jwb for k in TANDA_TOLAK)
        print("TOLAK/ARAHKAN:", "OK" if ditolak else "GAGAL (baca jawabannya manual)")
        ok_tolak += ditolak
    else:
        n_ret += 1
        cocok = harapan.lower() in bagian.lower()
        print("RETRIEVAL:", "OK" if cocok else "GAGAL")
        ok_retrieval += cocok

print("=" * 70)
print(f"Retrieval benar : {ok_retrieval}/{n_ret}")
print(f"Penolakan benar : {ok_tolak}/{n_tolak}")
if n_error:
    print(f"Error (tidak dihitung): {n_error} kasus, cek apakah Ollama sedang jalan")