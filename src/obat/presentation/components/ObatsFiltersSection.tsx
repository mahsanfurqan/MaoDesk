import { StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { useI18n } from "src/core/presentation/hooks/useI18n";

interface ObatsFiltersSectionProps {
  search: string;
  kategori: string;
  onSearchChange: (value: string) => void;
  onKategoriChange: (value: string) => void;
  onCreateObat: () => void;
  onClearFilters: () => void;
  onRefresh: () => void;
}

const ObatsFiltersSection = ({
  search,
  kategori,
  onSearchChange,
  onKategoriChange,
  onCreateObat,
  onClearFilters,
  onRefresh,
}: ObatsFiltersSectionProps) => {
  const i18n = useI18n();

  return (
    <View style={styles.filtersContainer}>
      <TextInput
        value={search}
        onChangeText={onSearchChange}
        placeholder={i18n.t("obat.screens.Obats.searchPlaceholder")}
        style={styles.searchInput}
      />

      <TextInput
        value={kategori}
        onChangeText={onKategoriChange}
        placeholder={i18n.t("obat.screens.Obats.kategoriPlaceholder")}
        style={styles.searchInput}
      />

      <View style={styles.filterActionsContainer}>
        <TouchableOpacity onPress={onCreateObat} style={styles.primaryButton}>
          <Text style={styles.primaryButtonText}>{i18n.t("obat.screens.Obats.addObat")}</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={onClearFilters} style={styles.secondaryButton}>
          <Text style={styles.secondaryButtonText}>{i18n.t("obat.screens.Obats.clearFilters")}</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={onRefresh} style={styles.secondaryButton}>
          <Text style={styles.secondaryButtonText}>{i18n.t("obat.screens.Obats.refresh")}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default ObatsFiltersSection;

const styles = StyleSheet.create({
  filtersContainer: {
    padding: 12,
  },
  searchInput: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    marginBottom: 8,
  },
  filterActionsContainer: {
    flexDirection: "row",
    gap: 8,
  },
  primaryButton: {
    flex: 1,
    borderRadius: 8,
    backgroundColor: "#0b6efe",
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 10,
  },
  primaryButtonText: {
    color: "#fff",
    fontWeight: "700",
  },
  secondaryButton: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#c5d3ec",
    backgroundColor: "#f4f7ff",
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 10,
  },
  secondaryButtonText: {
    color: "#1d4fa8",
    fontWeight: "600",
  },
});
