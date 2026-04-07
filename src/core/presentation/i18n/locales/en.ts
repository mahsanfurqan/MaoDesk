export default {
  core: {
    screens: {
      NotFound: {
        goHome: "Go to home screen",
      },
    },
    errors: {
      screenNotFound: "Screen not found",
      contextNotProvided: "{{contextName}} is not provided.",
    },
  },
  post: {
    screens: {
      Posts: {
        loading: "Loading...",
      },
      Post: {
        loading: "Loading...",
      },
    },
  },
  obat: {
    screens: {
      Obats: {
        loading: "Loading medicines...",
        searchPlaceholder: "Search medicine name",
        kategoriPlaceholder: "Filter by category",
        searchButton: "Search",
        clearFilters: "Clear filters",
        refresh: "Refresh",
        retry: "Retry",
        error: "Failed to load medicines: {{message}}",
        empty: "No medicines found.",
        prev: "Prev",
        next: "Next",
        page: "Page {{page}} / {{pageCount}}",
      },
      Obat: {
        loading: "Loading medicine details...",
        notFound: "Medicine not found.",
      },
    },
  },
};
