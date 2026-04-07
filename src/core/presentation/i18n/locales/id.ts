export default {
  core: {
    errors: {
      screenNotFound: "Halaman tidak ditemukan",
    },
    screens: {
      NotFound: {
        goHome: "Kembali ke halaman utama",
      },
    },
  },
  post: {
    screens: {
      Posts: {
        loading: "Memuat...",
      },
      Post: {
        loading: "Memuat...",
      },
    },
  },
  obat: {
    screens: {
      Obats: {
        loading: "Memuat data obat...",
        searchPlaceholder: "Cari berdasarkan nama",
        kategoriPlaceholder: "Filter berdasarkan kategori",
        searchButton: "Cari",
        clearFilters: "Hapus filter",
        refresh: "Muat ulang",
        retry: "Coba lagi",
        error: "Gagal memuat data obat: {{message}}",
        empty: "Data obat tidak ditemukan.",
        prev: "Sebelumnya",
        next: "Berikutnya",
        page: "Halaman {{page}} / {{pageCount}}",
      },
      Obat: {
        loading: "Memuat detail obat...",
        notFound: "Data obat tidak ditemukan.",
      },
    },
  },
};