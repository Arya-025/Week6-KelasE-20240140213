/**
 * @file form.js — halaman Formulir Jual Motor.
 * Validasi input nama motor & harga, lalu buat draf iklan dari template yang dipilih.
 */

const templates = {
    gercep: (nama, harga, tag) => `🔥 DIJUAL CEPAT: ${nama} 🔥

Kondisi mulus, mesin terawat siap pakai jarak jauh maupun harian! 🛵💨

💰 Harga: ${harga} (Nego tipis di tempat)
✅ Surat-surat lengkap (STNK & BPKB)
✅ Pajak hidup & taat
✅ Kelistrikan normal semua

Minat serius langsung pantau unit atau hubungi kontak kami! 📲

#JualMotor #${tag} #MotorBekasBerkualitas #CepatLaku`,

    spesifikasi: (nama, harga, tag) => `✦ SPESIFIKASI UNIT: ${nama} ✦

Pilihan tepat untuk kendaraan harian yang tangguh dan irit bahan bakar.

Harga Penawaran: ${harga}

Keunggulan Kendaraan:
• Mesin standar pabrik, halus dan responsif
• Body terawat dan bebas dari bekas tabrak
• Dokumen legalitas dijamin aman (STNK/BPKB/Faktur)

Silakan jadwalkan waktu untuk cek unit secara langsung. Terima kasih.

#${tag} #BursaMotor #JualMotorBekas #Otomotif`,

    nego: (nama, harga, tag) => `Halo gan, mau nawarin ${nama} kesayangan nih ✨

Cocok banget buat dipakai kerja atau nongkrong. Dijamin gak kecewa! 🤝

Harga dibuka di ${harga} dan pastinya masih bisa nego santai sambil ngopi ☕️

Yuk langsung chat / DM sebelum keduluan yang lain ya~ 💬

#${tag} #MotorMurah #JualBeliMotor #NegoTipis`,
};

const form = document.getElementById("form");

const rules = {
    nama: (v) => {
        v = v.trim();
        if (!v) return "Nama/Merek motor wajib diisi.";
        if (v.length < 3) return `Nama motor minimal 3 karakter (sekarang ${v.length}).`;
        if (v.length > 60) return `Nama motor maksimal 60 karakter (sekarang ${v.length}).`;
        if (!/\p{L}/u.test(v)) return "Nama motor harus mengandung huruf.";
        return "";
    },
    harga: (v) => {
        if (!v) return "Harga wajib diisi.";
        const n = Number(v);
        if (!Number.isInteger(n)) return "Harga harus angka bulat, tanpa koma.";
        if (n < 500000) return "Harga minimal Rp 500.000.";
        if (n > 2000000000) return "Harga maksimal Rp 2.000.000.000.";
        return "";
    },
};

function validate(id) {
    const input = document.getElementById(id);
    const msg = rules[id](input.value);
    document.getElementById(`${id}-error`).textContent = msg;
    input.setAttribute("aria-invalid", msg ? "true" : "false");
    return !msg;
}

for (const id in rules) {
    document.getElementById(id).addEventListener("input", () => validate(id));
}

form.addEventListener("submit", (e) => {
    e.preventDefault();

    const invalid = Object.keys(rules).filter((id) => !validate(id));
    if (invalid.length) {
        document.getElementById(invalid[0]).focus();
        document.getElementById("caption").value = "";
        return;
    }

    const nama = document.getElementById("nama").value.trim();
    const harga = Number(document.getElementById("harga").value)
        .toLocaleString("id-ID", { style: "currency", currency: "IDR", maximumFractionDigits: 0 });
    const template = document.getElementById("template").value;
    
    const tag = nama.replace(/[^\p{L}\p{N}\s]/gu, "").split(/\s+/)
        .map((w) => w.charAt(0).toUpperCase() + w.slice(1)).join("");

    document.getElementById("caption").value = templates[template](nama, harga, tag);
});