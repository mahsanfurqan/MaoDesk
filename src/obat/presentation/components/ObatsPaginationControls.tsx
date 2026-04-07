import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useI18n } from "src/core/presentation/hooks/useI18n";

interface ObatsPaginationControlsProps {
  page: number;
  pageCount: number;
  onPrevious: () => void;
  onNext: () => void;
}

const ObatsPaginationControls = ({
  page,
  pageCount,
  onPrevious,
  onNext,
}: ObatsPaginationControlsProps) => {
  const i18n = useI18n();
  const safePageCount = Math.max(pageCount, 1);
  const canGoPrevious = page > 1;
  const canGoNext = page < safePageCount;

  return (
    <View style={styles.paginationContainer}>
      <TouchableOpacity
        disabled={!canGoPrevious}
        onPress={onPrevious}
        style={[styles.paginationButton, !canGoPrevious && styles.paginationButtonDisabled]}
      >
        <Text style={styles.paginationButtonText}>{i18n.t("obat.screens.Obats.prev")}</Text>
      </TouchableOpacity>

      <Text style={styles.pageText}>
        {i18n.t("obat.screens.Obats.page", {
          page,
          pageCount: safePageCount,
        })}
      </Text>

      <TouchableOpacity
        disabled={!canGoNext}
        onPress={onNext}
        style={[styles.paginationButton, !canGoNext && styles.paginationButtonDisabled]}
      >
        <Text style={styles.paginationButtonText}>{i18n.t("obat.screens.Obats.next")}</Text>
      </TouchableOpacity>
    </View>
  );
};

export default ObatsPaginationControls;

const styles = StyleSheet.create({
  paginationContainer: {
    borderTopWidth: 1,
    borderTopColor: "#eee",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 12,
    paddingVertical: 10,
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
