import React, { useState } from "react";

export default function TutorialAllCoffee() {
  const [openId, setOpenId] = useState(null);

  const tutorials = [
    {
      id: 1,
      title: "Latte Rumahan",
      desc: "Creamy & hangat — cocok untuk suasana santai pagi atau sore.",
      icon: "☕",
      steps: [
        "Panaskan susu sampai berbusa.",
        "Seduh espresso / kopi kuat.",
        "Campur susu dan espresso.",
        "Tambahkan gula / sirup sesuai selera."
      ]
    },
    {
      id: 2,
      title: "Es Kopi Susu Gula Aren",
      desc: "Layer cantik & manis legit — favorit banyak orang.",
      icon: "🥤",
      steps: [
        "Siapkan gelas berisi es batu.",
        "Masukkan gula aren cair.",
        "Tuang susu sampai 3/4 gelas.",
        "Tambahkan espresso di atasnya untuk layer."
      ]
    },
    {
      id: 3,
      title: "Manual Brew (V60 / French Press / Tubruk)",
      desc: "Kontrol penuh rasa — pilih teknik sesuai preferensi.",
      icon: "🔥",
      steps: [
        "Pilih grind size sesuai metode.",
        "Panaskan air ke 90–96°C.",
        "Lakukan blooming 30 detik.",
        "Tuang air perlahan sesuai metode.",
        "Sajikan setelah ekstraksi selesai."
      ]
    },
    {
      id: 4,
      title: "Caramel Macchiato",
      desc: "Manis, creamy, dan wangi caramel — minuman favorit ala kafe.",
      icon: "🍮",
      steps: [
        "Tuang 1–2 sdm saus caramel ke dasar gelas.",
        "Tambahkan susu panas atau dingin (sesuai selera).",
        "Tambahkan sedikit foam susu di atasnya.",
        "Tuang espresso ke tengah foam (agar efek 'macchiato').",
        "Drizzle caramel di atas sebagai topping."
      ]
    }
  ];

  return (
    <div className="max-w-5xl mx-auto px-4 mt-20 mb-24">
      <h2 className="text-3xl font-bold text-[#6A2F14] mb-8">
        Tutorial Membuat Kopi di Rumah
      </h2>

      <div className="space-y-6">
        {tutorials.map((item) => (
          <div
            key={item.id}
            className="w-full bg-white border border-[#F0E6DD] shadow-sm rounded-xl p-6 flex items-start justify-between hover:shadow-md transition"
          >
            {/* ICON + TEXT */}
            <div className="flex items-start gap-4">
              <div className="w-16 h-16 bg-[#F8E9D8] rounded-xl flex items-center justify-center text-3xl">
                {item.icon}
              </div>

              <div>
                <h3 className="text-xl font-semibold text-[#6A2F14]">
                  {item.title}
                </h3>
                <p className="mt-1 text-sm text-[#7A5A3F] max-w-sm leading-relaxed">
                  {item.desc}
                </p>

                {openId === item.id && (
                  <div className="mt-3 pl-1">
                    {item.steps.map((s, i) => (
                      <div key={i} className="text-sm text-[#6A4A33] mb-1">
                        • {s}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* BUTTON */}
            <button
              className="px-5 py-2 rounded-full text-sm font-medium bg-[#6A2F14] text-white shadow hover:shadow-md transition"
              onClick={() => setOpenId(openId === item.id ? null : item.id)}
            >
              {openId === item.id ? "Tutup" : "Lihat Tutorial"}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
