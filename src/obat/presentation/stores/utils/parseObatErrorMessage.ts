export const parseObatErrorMessage = (error: unknown) => {
  const responseData = (
    error as {
      response?: {
        data?: {
          code?: string;
          message?: string;
          details?: string;
          hint?: string;
          error_description?: string;
        };
      };
    }
  )?.response?.data;

  const backendMessage = [
    responseData?.message,
    responseData?.details,
    responseData?.hint,
  ]
    .filter(Boolean)
    .join(" ")
    .toLowerCase();

  const isMissingMutationTable =
    responseData?.code === "PGRST205" ||
    backendMessage.includes("public.mutasi_stok");

  if (isMissingMutationTable) {
    return "Audit trail belum aktif di Supabase. Jalankan SQL: supabase/stock-mutation-audit.sql";
  }

  const isMissingAdjustStockFunction =
    responseData?.code === "PGRST202" ||
    backendMessage.includes("adjust_obat_stock");

  if (isMissingAdjustStockFunction) {
    return "Fungsi mutasi stok belum aktif di Supabase. Jalankan SQL: supabase/stock-mutation-audit.sql";
  }

  if (responseData?.message) {
    return responseData.message;
  }

  if (responseData?.error_description) {
    return responseData.error_description;
  }

  if (error instanceof Error && error.message) {
    return error.message;
  }

  return "Unknown error";
};
