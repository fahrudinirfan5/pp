/**
 * Irfan Fahrudin - Backend Developer Portfolio
 * Vanilla JavaScript (Interactivity, Project Modals, Copy Email, Mobile Nav)
 */

document.addEventListener('DOMContentLoaded', () => {

  // ==========================================
  // 1. DATA PROJECT DETAIL (MODAL CONTENT)
  // ==========================================
  const projectDetails = {
    inventaris: {
      title: "Sistem Informasi Inventaris Berbasis Web",
      category: "Web Application & Database Design",
      role: "Backend Developer & Database Designer",
      tech: "Laravel, PHP, MySQL",
      overview: "Aplikasi web yang dirancang untuk mencatat, mengelola, dan memantau perputaran stok barang serta riwayat transaksi inventaris secara terstruktur dan terpusat.",
      problem: "Pengelolaan inventaris secara manual rentan terhadap ketidaksesuaian jumlah stok fisik dengan catatan pembukuan, serta menyulitkan penelusuran riwayat barang masuk dan keluar.",
      solution: "Membangun sistem backend terpusat menggunakan Laravel dan database relasional MySQL untuk memproses transaksi stok secara real-time dan menjaga integritas data.",
      features: [
        "Autentikasi pengguna berbasis multi-user login",
        "Manajemen master data barang dan kategori produk",
        "Pengelolaan stok masuk (pembelian/restock) dan stok keluar (penjualan/distribusi)",
        "Pencatatan riwayat transaksi dan mutasi stok secara berkala"
      ],
      process: [
        "Merancang Entity-Relationship Diagram (ERD) dan skema database di MySQL (relasi tabel barang, kategori, transaksi, detail_transaksi).",
        "Membuat migrasi database dan model Eloquent di Laravel beserta relasi belongsTo dan hasMany.",
        "Mengimplementasikan transaksi database (database transactions) untuk memastikan integritas data saat stok bertambah atau berkurang.",
        "Menerapkan sistem autentikasi dan validasi request form guna mencegah manipulasi data input."
      ],
      result: "[Belum diisi — misal: sistem berhasil meminimalkan selisih stok manual dan mempercepat pelacakan riwayat barang]"
    },

    "mobile-api": {
      title: "REST API Service untuk Aplikasi Mobile",
      category: "API Engineering & Authentication",
      role: "Backend API Developer",
      tech: "Laravel, PHP, MySQL, REST API",
      overview: "Layanan backend berbasis RESTful API yang menyediakan endpoints terstruktur untuk kebutuhan autentikasi pengguna dan pengelolaan data pada aplikasi mobile client.",
      problem: "Aplikasi mobile membutuhkan antarmuka komunikasi data sisi server yang aman, terstruktur, responsif, dan memiliki skema respon JSON yang konsisten.",
      solution: "Membangun REST API menggunakan Laravel dengan format respon JSON terstandarisasi, validasi payload request, dan mekanisme autentikasi token.",
      features: [
        "Endpoint autentikasi (Registrasi, Login, dan Token Management)",
        "Endpoint CRUD pengelolaan data utama aplikasi mobile",
        "Validasi input payload pada setiap request API",
        "Standarisasi respon HTTP (status codes 200, 201, 400, 401, 404, 500)"
      ],
      process: [
        "Merancang spesifikasi rute API (API route contract) dan format data JSON request-response.",
        "Membangun skema tabel database di MySQL untuk menampung akun pengguna dan data entitas.",
        "Mengimplementasikan controller API dengan resource response standar di Laravel.",
        "Menambahkan middleware autentikasi untuk memproteksi endpoint privat."
      ],
      result: "[Belum diisi — misal: endpoints API siap dan berhasil dikonsumsi oleh aplikasi mobile client dengan struktur respon yang stabil]"
    },

    monitoring: {
      title: "Sistem Monitoring Data Terpusat",
      category: "Data Ingestion & Backend Service",
      role: "Backend Developer",
      tech: "Python, PostgreSQL, REST API",
      overview: "Backend service berbasis Python yang berfungsi menerima aliran data pemantauan berkala, menyimpannya ke database PostgreSQL, dan menyediakannya kembali melalui antarmuka API.",
      problem: "Dibutuhkan sistem backend yang mampu menerima data berkala (ingestion) secara konsisten dan menyimpannya dalam basis data relasional untuk kebutuhan pelaporan atau pemantauan.",
      solution: "Mengembangkan backend service menggunakan Python dengan database PostgreSQL untuk menangani penyimpanan data monitoring serta menyediakan endpoint data retrieval.",
      features: [
        "Endpoint penerimaan data monitoring (Data Ingestion)",
        "Penyimpanan data terstruktur pada database PostgreSQL",
        "Endpoint pengambilan dan penyaringan data hasil monitoring (Data Retrieval)",
        "Penanganan error handling pada data yang masuk"
      ],
      process: [
        "Menyiapkan skema tabel di PostgreSQL yang terindeks untuk query data berbasis waktu.",
        "Menulis skrip backend menggunakan Python untuk memvalidasi payload data yang dikirimkan.",
        "Mengembangkan logika penyimpanan data ke PostgreSQL dan endpoint penyajian data.",
        "Menguji kestabilan alur penerimaan dan penarikan data."
      ],
      result: "[Belum diisi — misal: data monitoring tercatat secara berkala tanpa ada anomali relasi basis data]"
    }
  };

  // ==========================================
  // 2. MOBILE NAVIGATION TOGGLE
  // ==========================================
  const navToggle = document.getElementById('nav-toggle');
  const navMenu = document.getElementById('nav-menu');
  const navLinks = document.querySelectorAll('.nav-link');

  if (navToggle && navMenu) {
    navToggle.addEventListener('click', () => {
      navMenu.classList.toggle('active');
    });

    // Tutup nav menu saat salah satu link diklik
    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        navMenu.classList.remove('active');
      });
    });
  }

  // ==========================================
  // 3. SCROLL ACTIVE LINK HIGHLIGHTER
  // ==========================================
  const sections = document.querySelectorAll('section[id]');

  function updateActiveNavLink() {
    const scrollY = window.pageYOffset;

    sections.forEach(current => {
      const sectionHeight = current.offsetHeight;
      const sectionTop = current.offsetTop - 120;
      const sectionId = current.getAttribute('id');
      const targetLink = document.querySelector(`.nav-link[href*="${sectionId}"]`);

      if (targetLink) {
        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
          targetLink.classList.add('active');
        } else {
          targetLink.classList.remove('active');
        }
      }
    });
  }

  window.addEventListener('scroll', updateActiveNavLink);

  // ==========================================
  // 4. COPY TO CLIPBOARD EMAIL
  // ==========================================
  const copyBtn = document.getElementById('btn-copy-email');
  const emailTextEl = document.getElementById('email-text');
  const toast = document.getElementById('toast');
  const toastMsg = document.getElementById('toast-message');

  function showToast(message) {
    if (!toast) return;
    toastMsg.textContent = message;
    toast.classList.add('show');
    setTimeout(() => {
      toast.classList.remove('show');
    }, 3000);
  }

  if (copyBtn && emailTextEl) {
    copyBtn.addEventListener('click', async () => {
      const email = emailTextEl.textContent.trim();
      try {
        await navigator.clipboard.writeText(email);
        showToast('Email berhasil disalin ke clipboard!');
      } catch (err) {
        // Fallback untuk browser yang membatasi clipboard API
        const tempInput = document.createElement('input');
        tempInput.value = email;
        document.body.appendChild(tempInput);
        tempInput.select();
        document.execCommand('copy');
        document.body.removeChild(tempInput);
        showToast('Email berhasil disalin ke clipboard!');
      }
    });
  }

  // ==========================================
  // 5. PROJECT DETAIL MODAL
  // ==========================================
  const modal = document.getElementById('project-modal');
  const modalCloseBtn = document.getElementById('modal-close-btn');
  const modalTitle = document.getElementById('modal-project-title');
  const modalBody = document.getElementById('modal-project-body');
  const detailButtons = document.querySelectorAll('.btn-detail');

  function openProjectModal(projectKey) {
    const data = projectDetails[projectKey];
    if (!data || !modal || !modalTitle || !modalBody) return;

    modalTitle.textContent = data.title;

    modalBody.innerHTML = `
      <div style="margin-bottom: 1rem;">
        <span style="font-family: var(--font-mono); font-size: 0.8rem; color: #15803d; background: #dcfce7; border: 1px solid #bbf7d0; font-weight: 600; padding: 0.25rem 0.65rem; border-radius: 4px;">
          ${data.category}
        </span>
      </div>

      <h4 class="modal-section-title">Ringkasan Sistem</h4>
      <p class="modal-text">${data.overview}</p>

      <h4 class="modal-section-title">Masalah yang Diselesaikan</h4>
      <p class="modal-text">${data.problem}</p>

      <h4 class="modal-section-title">Solusi Teknis</h4>
      <p class="modal-text">${data.solution}</p>

      <h4 class="modal-section-title">Peran &amp; Tanggung Jawab</h4>
      <p class="modal-text"><strong>${data.role}</strong> — Menggunakan stack <strong>${data.tech}</strong>.</p>

      <h4 class="modal-section-title">Fitur Utama</h4>
      <ul class="modal-list">
        ${data.features.map(f => `<li>${f}</li>`).join('')}
      </ul>

      <h4 class="modal-section-title">Proses Pengembangan Backend</h4>
      <ul class="modal-list">
        ${data.process.map(p => `<li>${p}</li>`).join('')}
      </ul>

      <h4 class="modal-section-title">Hasil Proyek</h4>
      <p class="modal-text">${data.result}</p>
    `;

    modal.classList.add('active');
    modal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden'; // Kunci scroll halaman belakang
  }

  function closeProjectModal() {
    if (!modal) return;
    modal.classList.remove('active');
    modal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = ''; // Kembalikan scroll
  }

  detailButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
      const projectKey = e.currentTarget.getAttribute('data-project');
      if (projectKey) {
        openProjectModal(projectKey);
      }
    });
  });

  if (modalCloseBtn) {
    modalCloseBtn.addEventListener('click', closeProjectModal);
  }

  if (modal) {
    modal.addEventListener('click', (e) => {
      // Tutup jika user klik area gelap (backdrop) di luar window modal
      if (e.target === modal) {
        closeProjectModal();
      }
    });
  }

  // Tutup modal jika user menekan tombol Escape
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal && modal.classList.contains('active')) {
      closeProjectModal();
    }
  });

});
