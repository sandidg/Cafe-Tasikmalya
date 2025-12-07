import React, { useState } from 'react';
import TutorialAllCoffee from "./TutorialAllCoffee";

/* =========================
   CafeApp.jsx (final fixed + tutorial inserted)
   Replace your existing component file with this
   ========================= */

/* initial sample (ke-2 cafe tetap ada di atas) */
const SAMPLE_CAFES = [
  {
    id: 1,
    name: 'Urban Forest',
    address: 'Jl. Zahari Musthofi No.88, Kec. Tamansari, Kota Tasikmalaya, Jawa Barat',
    short: 'Nuansa kayu dan tanaman, cocok untuk tempat nongkrong santai dan work from cafe.',
    tags: ['Modern', 'Konsep Unik', 'Cozy'],
    popular: true,
    gallery: [
      'https://images.unsplash.com/photo-1498804103079-a6351b050096?q=80&w=1400&auto=format&fit=crop&ixlib=rb-4.0.3&s=1',
      'https://images.unsplash.com/photo-1504674900247-0877df9cc836?q=80&w=800&auto=format&fit=crop&ixlib=rb-4.0.3&s=2',
      'https://images.unsplash.com/photo-1506086679522-a4d8b9c8c55d?q=80&w=800&auto=format&fit=crop&ixlib=rb-4.0.3&s=3'
    ],
    facilities: ['Free Wi-Fi', 'Colokan Listrik', 'Outdoor & Indoor', 'Smoking area', 'Buka 24 Jam'],
    socials: { instagram: '@urbanforest', whatsapp: '+628123456789' },
    coords: { lat: -7.327, lng: 108.221 }
  },
  {
    id: 2,
    name: 'City Ngopi',
    address: 'Jl. Mangunbubumi No.12, Tasikmalaya',
    short: 'Kopi spesial dengan area outdoor luas, cocok untuk agenda kumpul sore.',
    tags: ['Sensa', 'Cozy'],
    popular: true,
    gallery: [],
    facilities: ['Free Wi-Fi', 'Colokan Listrik'],
    socials: { instagram: '@cityngopi', whatsapp: '' },
    coords: { lat: -7.325, lng: 108.223 }
  }
];

/* tambahan cafe (muncul ketika Load More diklik) */
const EXTRA_CAFES = [
  {
    id: 3,
    name: 'Bento Cafe',
    address: 'Jl. Merdeka No.10, Tasikmalaya',
    short: 'Cafe unik dengan menu bento & kopi, cocok untuk kerja santai.',
    tags: ['Bento', 'Cozy'],
    popular: false,
  },
  {
    id: 4,
    name: 'Siloka',
    address: 'Jl. Cikalong No.22, Tasikmalaya',
    short: 'Kombinasi galeri dan cafe, tempatnya artsy cocok buat foto.',
    tags: ['Arts', 'Cozy'],
    popular: false,
  },
  {
    id: 5,
    name: 'Kopi Tiam',
    address: 'Jl. Khatib No.5, Tasikmalaya',
    short: 'Kopi ala kopi tiam tradisional — kuat & autentik.',
    tags: ['Tradisional', 'Strong'],
    popular: false,
  },
  {
    id: 6,
    name: 'Today',
    address: 'Jl. Sudirman No.18, Tasikmalaya',
    short: 'Cafe modern dengan menu seasonal dan pastry enak.',
    tags: ['Modern', 'Pastry'],
    popular: false,
  },
  {
    id: 7,
    name: 'Pabric Space',
    address: 'Jl. Industri No.3, Tasikmalaya',
    short: 'Ruang kreatif + cafe, banyak colokan & workspace nyaman.',
    tags: ['Workspace', 'Event'],
    popular: false,
  },
  {
    id: 8,
    name: 'Nako',
    address: 'Jl. Merpati No.9, Tasikmalaya',
    short: 'Spot kekinian, interior aesthetic, cocok buat foto & meeting.',
    tags: ['Instagramable', 'Cozy'],
    popular: false,
  }
];

/* gabungkan semua cafe jadi satu array yang dipakai untuk render */
const ALL_CAFES = [...SAMPLE_CAFES, ...EXTRA_CAFES];

function Icon({ name, className = 'w-5 h-5 inline-block mr-2' }) {
  if (name === 'search') return (
    <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M21 21l-4.35-4.35" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
      <circle cx="11" cy="11" r="6" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
  if (name === 'wifi') return (
    <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M2 12.5C6 8.5 12 8.5 16 12.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/><path d="M5.5 15C7.5 13 10.5 13 12.5 15" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/><circle cx="12" cy="18" r="1" fill="currentColor"/></svg>
  );
  if (name === 'plug') return (
    <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M7 7v4.5a3 3 0 003 3h4a3 3 0 003-3V7" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/><path d="M8 2v3M16 2v3" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/></svg>
  );
  if (name === 'clock') return (
    <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.6"/><path d="M12 7v6l4 2" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/></svg>
  );
  if (name === 'instagram') return (
    <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><rect x="3" y="3" width="18" height="18" rx="4" stroke="currentColor" strokeWidth="1.6"/><circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="1.6"/><path d="M17.5 6.5h.01" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"/></svg>
  );
  if (name === 'whatsapp') return (
    <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M21 12.5a8.5 8.5 0 10-2.4 5.7L21 21l-3.8-1.1A8.5 8.5 0 0021 12.5z" stroke="currentColor" strokeWidth="1.2" strokeLinejoin="round" strokeLinecap="round"/></svg>
  );
  return null;
}

export default function CafeApp() {
  const [query, setQuery] = useState('');
  const [active, setActive] = useState(null); // cafe id for detail view

  /* visibleCount untuk load more: mulai dari 2, tiap klik loadMore tambahkan 3 */
  const [visibleCount, setVisibleCount] = useState(2);

  /* filter dulu berdasarkan query, lalu slice sesuai visibleCount */
  const filtered = ALL_CAFES.filter(c =>
    c.name.toLowerCase().includes(query.toLowerCase()) ||
    (c.tags && c.tags.join(' ').toLowerCase().includes(query.toLowerCase())) ||
    (c.address && c.address.toLowerCase().includes(query.toLowerCase()))
  );

  const visibleCafes = filtered.slice(0, visibleCount);

  const cafe = ALL_CAFES.find(x => x.id === active);

  const btnBase = "px-4 py-2 rounded-full text-sm transition shadow-sm hover:shadow-md";

  const loadMore = () => {
    setVisibleCount(prev => Math.min(prev + 3, filtered.length));
  };

  return (
    <div className="min-h-screen bg-[#FBF6EE] text-[#3A1F0B]">

      {/* ===== HERO (absolute image top-right, reliable) ===== */}
      <header className="relative bg-[#6A2F14] text-white py-20 lg:py-28 overflow-visible" style={{ position: 'relative' }}>
        <div className="max-w-7xl mx-auto px-6 lg:px-12 grid grid-cols-1 lg:grid-cols-2 gap-10 items-start" style={{ position: 'relative', zIndex: 10 }}>
          {/* LEFT: content */}
          <div className="pt-4 lg:pt-8 z-20">
            <div className="inline-block bg-[#D9A36E] text-xs px-3 py-1 rounded-full mb-4 shadow-sm">Katalog Cafe</div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight max-w-3xl">
              Cafe Hits di Tasikmalaya
            </h1>

            <p className="mt-4 text-sm md:text-base opacity-90 max-w-md">
              Temukan cafe instagramable, cozy, dan populer di Kota Tasikmalaya. Cari berdasarkan suasana, fasilitas, dan lokasi.
            </p>

            <div className="mt-8 max-w-md">
              <div className="search-fallback flex items-center bg-white/10 backdrop-blur rounded-full px-4 py-2 border border-transparent focus-within:border-[#CFA67F] transition">
                <Icon name="search" className="w-4 h-4 text-[#EBD7BF] mr-3" />
                <input
                  id="search"
                  value={query}
                  onChange={(e) => {
                    setQuery(e.target.value);
                    /* optional: jika mau reset visible saat mengetik, uncomment
                    setVisibleCount(2);
                    */
                  }}
                  placeholder="Cari cafe, area, atau tag..."
                  className="w-full bg-transparent placeholder:text-[#EBD7BF] text-white outline-none text-sm md:text-base"
                />
              </div>

              <div className="mt-4 flex gap-2 flex-wrap">
                <button className="pill">Semua</button>
                <button className="pill">Konsep Alam</button>
                <button className="pill">Modern & Hits</button>
              </div>
            </div>
          </div>

          {/* right column intentionally left empty because image is absolutely positioned */}
          <div></div>
        </div>

        {/* absolute hero image — guaranteed to be top-right inside header */}
        <div
          className="absolute-hero-image"
          style={{
            position: 'absolute',
            right: '6%',
            top: '16%',
            width: '300px',
            height: '260px',
            borderRadius: '20px',
            overflow: 'hidden',
            zIndex: 40,
            transform: 'translateY(-8%)'
          }}
        >
          <img
            src="https://images.unsplash.com/photo-1509042239860-f550ce710b93?q=80&w=2000&auto=format&fit=crop"
            alt="Cafe Hero"
            style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
            loading="eager"
          />
        </div>
      </header>
      {/* ===== END HERO ===== */}

      {/* MAIN: list under hero (layout lama preserved; each cafe is its own card) */}
      <main className="max-w-7xl mx-auto px-4 md:px-6 mt-8 pb-12">
        {!active && (
          <div>
            {visibleCafes.map(c => (
              <section key={c.id} className="bg-[#FFF6EA] p-4 md:p-6 lg:p-8 rounded-xl shadow-md border border-[#F0E6DD] mb-6">
                <article className="bg-white rounded-xl p-4 md:p-6 shadow-sm border hover:shadow-md transition relative">
                  {c.popular && <div className="absolute right-4 top-4 bg-[#FF7F7F] text-white text-xs md:text-sm px-3 py-1 rounded-full shadow-sm">Populer</div>}

                  <div className="flex gap-4 items-start">
                    <div className="w-20 md:w-28 h-20 md:h-24 bg-gray-100 rounded-md flex items-center justify-center shadow-inner">Foto</div>

                    <div className="flex-1">
                      <h3 className="font-semibold text-lg md:text-xl leading-tight">{c.name}</h3>
                      {c.address && <p className="text-xs md:text-sm text-[#7A5A3F] mt-1">{c.address}</p>}
                      <p className="mt-3 text-sm md:text-base text-[#6A4A33] leading-relaxed">{c.short}</p>

                      {c.tags && (
                        <div className="mt-3 flex gap-2 flex-wrap">
                          {c.tags.map(t => <span key={t} className="text-xs md:text-sm px-3 py-1 rounded-full bg-[#FFF6EA] border border-[#F0E6DD] shadow-sm">{t}</span>)}
                        </div>
                      )}

                      <div className="mt-4 flex gap-3">
                        <button onClick={() => setActive(c.id)} className={`${btnBase} bg-[#6A2F14] text-white`}>Detail</button>
                        <button className={`${btnBase} bg-white border`}>Bagikan</button>
                      </div>
                    </div>
                  </div>
                </article>
              </section>
            ))}

            {/* Load More */}
            <div className="text-center pt-2">
              {visibleCount < filtered.length ? (
                <button onClick={loadMore} className={`${btnBase} bg-[#6A2F14] text-white px-6`}>Load More</button>
              ) : (
                <div className="text-sm text-[#7A5A3F]">Semua cafe telah ditampilkan.</div>
              )}
            </div>
          </div>
        )}

        {/* DETAIL VIEW */}
        {active && cafe && (
          <article className="bg-[#FFFCEB] p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-bold text-center mb-6">{cafe.name}</h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="md:col-span-2">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="md:col-span-2 bg-gray-100 rounded h-56 flex items-center justify-center overflow-hidden">
                    {cafe.gallery && cafe.gallery[0] ? <img src={cafe.gallery[0]} alt="main" className="object-cover w-full h-full" /> : <div>Foto Besar</div>}
                  </div>
                  <div className="flex flex-col gap-4">
                    <div className="bg-gray-100 rounded h-28 flex items-center justify-center overflow-hidden">{cafe.gallery && cafe.gallery[1] ? <img src={cafe.gallery[1]} alt="1" className="object-cover w-full h-full" /> : <div>Foto 1</div>}</div>
                    <div className="bg-gray-100 rounded h-28 flex items-center justify-center overflow-hidden">{cafe.gallery && cafe.gallery[2] ? <img src={cafe.gallery[2]} alt="2" className="object-cover w-full h-full" /> : <div>Foto 2</div>}</div>
                  </div>
                </div>

                <div className="mt-4 flex gap-2 flex-wrap">
                  {cafe.tags && cafe.tags.map(t => <span key={t} className="text-xs px-3 py-1 rounded-full bg-[#FFF6EA] border border-[#F0E6DD]">{t}</span>)}
                </div>

                <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-semibold mb-3">Fasilitas</h4>
                    <ul className="space-y-3 text-sm text-[#6A4A33]">
                      {cafe.facilities && cafe.facilities.map((f, idx) => (
                        <li key={f} className="flex items-center">
                          <span className="mr-3 text-[#6A4A33]"><Icon name={idx===0? 'wifi': idx===1 ? 'plug' : idx===3 ? 'clock' : 'plug'} /></span>
                          <span>{f}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <h4 className="font-semibold mb-3">Media Sosial</h4>
                    <div className="space-y-3 text-sm text-[#6A4A33]">
                      <div className="flex items-center"><Icon name="instagram" />{cafe.socials?.instagram}</div>
                      <div className="flex items-center"><Icon name="whatsapp" />{cafe.socials?.whatsapp || '-'} </div>
                    </div>

                    <div className="mt-6">
                      <h4 className="font-semibold mb-2">Lokasi</h4>
                      <p className="text-sm text-[#6A4A33]">{cafe.address}</p>
                      <button onClick={() => window.open(`https://www.google.com/maps/search/?api=1&query=${cafe.coords?.lat},${cafe.coords?.lng}`, '_blank')} className="mt-4 bg-[#6A2F14] text-white px-4 py-2 rounded-full shadow">Open Location</button>
                    </div>
                  </div>
                </div>

              </div>

              <div className="md:col-span-1">
                <div className="bg-white p-4 rounded shadow-sm">
                  <h4 className="font-semibold">Info Singkat</h4>
                  <p className="text-sm text-[#6A4A33] mt-2">{cafe.short}</p>
                  <div className="mt-4 flex gap-2">
                    <button className="bg-[#6A2F14] text-white px-3 py-2 rounded-full shadow">Hubungi</button>
                    <button onClick={() => setActive(null)} className="bg-white border px-3 py-2 rounded-full">Kembali</button>
                  </div>
                </div>

                <div className="mt-4 text-sm text-[#7A5A3F]">
                  <div className="font-semibold">Jam Operasional</div>
                  <div className="mt-2">Buka setiap hari • 08:00 - 22:00</div>
                </div>
              </div>

            </div>
          </article>
        )}
      </main>

      {/* Insert tutorial section (separate component) */}
      <TutorialAllCoffee />

      {/* ABOUT (no decorative image to avoid confusion) */}
      <section className="bg-[#6A2F14] text-white py-14 mt-0">
        <div className="max-w-5xl mx-auto px-6">
          <div className="rounded-2xl p-10">
            <h2 className="text-3xl font-bold mb-4">TasikNongkrong</h2>
            <p className="max-w-2xl text-sm leading-relaxed opacity-90">
              TasikNongkrong adalah platform untuk menemukan rekomendasi cafe terbaik di Tasikmalaya.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-10">
              <div className="bg-[#F8E9D8] p-6 rounded-xl shadow">
                <div className="font-semibold text-[#6A2F14] mb-2">Cari Cafe</div>
                <p className="text-sm text-[#6A4A33]">Temukan cafe dengan berbagai konsep — modern, klasik, outdoor, hingga hidden gem.</p>
              </div>

              <div className="bg-[#F8E9D8] p-6 rounded-xl shadow">
                <div className="font-semibold text-[#6A2F14] mb-2">Tentang Kami</div>
                <p className="text-sm text-[#6A4A33]">Dapatkan informasi lengkap dan update mengenai cafe yang sedang populer di Tasikmalaya.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <footer className="py-8 text-center text-sm text-[#7A5A3F]">© TasikNongkrong</footer>
    </div>
  );
}
