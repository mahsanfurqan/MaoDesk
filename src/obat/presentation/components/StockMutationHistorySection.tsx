import { ActivityIndicator, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import PaginationState from "src/core/presentation/types/PaginationState";
import { useI18n } from "src/core/presentation/hooks/useI18n";
import StockMutationEntity from "src/obat/domain/entities/StockMutationEntity";

interface StockMutationHistorySectionProps {
  isLoading: boolean;
  isRefreshing: boolean;
  errorMessage: string | null;
  stockMutations: StockMutationEntity[];
  pagination: PaginationState;
  pageCount: number;
  onRefresh: () => void;
  onPageChange: (page: number) => void;
}

const formatDateTime = (value: string) => {
  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return value;
  }

  return date.toLocaleString();
};

const formatSignedNumber = (value: number) => {
  if (value > 0) {
    return `+${value}`;
  }

  return String(value);
};

const StockMutationHistorySection = ({
  isLoading,
  isRefreshing,
  errorMessage,
  stockMutations,
  pagination,
  pageCount,
  onRefresh,
  onPageChange,
}: StockMutationHistorySectionProps) => {
  const i18n = useI18n();
  const canGoPrevious = pagination.page > 1;
  const safePageCount = Math.max(pageCount, 1);
  const canGoNext = pagination.page < safePageCount;

  return (
    <View style={styles.sectionContainer}>
      <View style={styles.historyHeaderRow}>
        <Text style={styles.sectionTitle}>{i18n.t("obat.screens.Obat.stockMutation.historyTitle")}</Text>

        <TouchableOpacity onPress={onRefresh}>
          <Text style={styles.refreshHistoryText}>
            {isRefreshing
              ? i18n.t("obat.screens.Obat.stockMutation.refreshingHistory")
              : i18n.t("obat.screens.Obat.stockMutation.refreshHistory")}
          </Text>
        </TouchableOpacity>
      </View>

      {errorMessage ? (
        <View style={styles.errorBanner}>
          <Text style={styles.errorText}>
            {i18n.t("obat.screens.Obat.stockMutation.historyError", {
              message: errorMessage,
            })}
          </Text>
          <TouchableOpacity onPress={onRefresh}>
            <Text style={styles.errorRetryText}>
              {i18n.t("obat.screens.Obat.stockMutation.retryHistory")}
            </Text>
          </TouchableOpacity>
        </View>
      ) : null}

      {isLoading && stockMutations.length === 0 ? (
        <View style={styles.historyLoadingContainer}>
          <ActivityIndicator size="small" color="#0b6efe" />
          <Text>{i18n.t("obat.screens.Obat.stockMutation.loadingHistory")}</Text>
        </View>
      ) : null}

      {!isLoading && stockMutations.length === 0 ? (
        <Text style={styles.emptyHistoryText}>{i18n.t("obat.screens.Obat.stockMutation.emptyHistory")}</Text>
      ) : null}

      {stockMutations.map((mutation) => {
        const isPositiveMutation = mutation.jumlah >= 0;

        return (
          <View key={mutation.id} style={styles.historyItem}>
            <View style={styles.historyTopRow}>
              <Text style={styles.historyTypeText}>
                {i18n.t(`obat.screens.Obat.stockMutation.type.${mutation.tipe}`)}
              </Text>
              <Text
                style={[
                  styles.historyAmountText,
                  isPositiveMutation
                    ? styles.historyAmountPositive
                    : styles.historyAmountNegative,
                ]}
              >
                {formatSignedNumber(mutation.jumlah)}
              </Text>
            </View>

            <Text style={styles.historyMetaText}>
              {i18n.t("obat.screens.Obat.stockMutation.stockTransition", {
                before: mutation.stokSebelum,
                after: mutation.stokSesudah,
              })}
            </Text>
            <Text style={styles.historyMetaText}>{formatDateTime(mutation.createdAt)}</Text>

            {mutation.catatan ? (
              <Text style={styles.historyNoteText}>{mutation.catatan}</Text>
            ) : null}
          </View>
        );
      })}

      {stockMutations.length > 0 ? (
        <View style={styles.paginationContainer}>
          <TouchableOpacity
            disabled={!canGoPrevious}
            onPress={() => onPageChange(pagination.page - 1)}
            style={[
              styles.paginationButton,
              !canGoPrevious && styles.paginationButtonDisabled,
            ]}
          >
            <Text style={styles.paginationButtonText}>{i18n.t("obat.screens.Obat.stockMutation.prev")}</Text>
          </TouchableOpacity>

          <Text style={styles.pageText}>
            {i18n.t("obat.screens.Obat.stockMutation.page", {
              page: pagination.page,
              pageCount: safePageCount,
            })}
          </Text>

          <TouchableOpacity
            disabled={!canGoNext}
            onPress={() => onPageChange(pagination.page + 1)}
            style={[
              styles.paginationButton,
              !canGoNext && styles.paginationButtonDisabled,
            ]}
          >
            <Text style={styles.paginationButtonText}>{i18n.t("obat.screens.Obat.stockMutation.next")}</Text>
          </TouchableOpacity>
        </View>
      ) : null}
    </View>
  );
};

export default StockMutationHistorySection;

const styles = StyleSheet.create({
  sectionContainer: {
    marginBottom: 14,
    padding: 12,
    borderWidth: 1,
    borderColor: "#e5e7eb",
    borderRadius: 10,
    backgroundColor: "#fff",
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "700",
    marginBottom: 8,
    color: "#111827",
  },
  historyHeaderRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
  },
  refreshHistoryText: {
    color: "#1d4fa8",
    fontWeight: "700",
  },
  errorBanner: {
    marginBottom: 10,
    padding: 10,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#efb2b2",
    backgroundColor: "#fff2f2",
  },
  errorText: {
    color: "#8e1c1c",
  },
  errorRetryText: {
    marginTop: 8,
    color: "#b42323",
    fontWeight: "700",
  },
  historyLoadingContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    paddingVertical: 8,
  },
  emptyHistoryText: {
    color: "#6b7280",
    paddingVertical: 10,
  },
  historyItem: {
    borderWidth: 1,
    borderColor: "#ebedf0",
    borderRadius: 8,
    padding: 10,
    marginBottom: 8,
    backgroundColor: "#fafbff",
  },
  historyTopRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 4,
  },
  historyTypeText: {
    color: "#1f2937",
    fontWeight: "700",
    textTransform: "capitalize",
  },
  historyAmountText: {
    fontWeight: "700",
  },
  historyAmountPositive: {
    color: "#0f766e",
  },
  historyAmountNegative: {
    color: "#b42323",
  },
  historyMetaText: {
    color: "#4b5563",
    fontSize: 12,
  },
  historyNoteText: {
    marginTop: 6,
    color: "#374151",
    fontStyle: "italic",
  },
  paginationContainer: {
    marginTop: 4,
    borderTopWidth: 1,
    borderTopColor: "#eee",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingTop: 10,
  },
  paginationButton: {
    backgroundColor: "#0b6efe",
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  paginationButtonDisabled: {
    backgroundColor: "#acc8ff",
  },
  paginationButtonText: {
    color: "#fff",
    fontWeight: "600",
  },
  pageText: {
    fontWeight: "500",
  },
});
