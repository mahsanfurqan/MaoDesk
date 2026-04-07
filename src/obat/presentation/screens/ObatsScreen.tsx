import { observer } from "mobx-react";
import { useEffect, useRef, useState } from "react";
import {
  FlatList,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { useI18n } from "src/core/presentation/hooks/useI18n";
import { withProviders } from "src/core/presentation/utils/withProviders";
import ObatItem from "../components/ObatItem";
import { GetObatStoreProvider } from "../stores/GetObatStore/GetObatStoreProvider";
import { useGetObatStore } from "../stores/GetObatStore/useGetObatStore";

const ObatsScreen = observer(() => {
  const i18n = useI18n();
  const getObatStore = useGetObatStore();
  const { isLoading, isRefreshing, errorMessage, results, pagination, pageCount } =
    getObatStore;
  const [search, setSearch] = useState(getObatStore.filters.search ?? "");
  const [kategori, setKategori] = useState(getObatStore.filters.kategori ?? "");
  const hasInitializedDebounce = useRef(false);

  useEffect(() => {
    getObatStore.getObat().catch(() => undefined);
  }, [getObatStore]);

  useEffect(() => {
    if (!hasInitializedDebounce.current) {
      hasInitializedDebounce.current = true;

      return;
    }

    const debounceTimeout = setTimeout(() => {
      const normalizedSearch = search.trim() || undefined;
      const normalizedKategori = kategori.trim() || undefined;
      const currentSearch = getObatStore.filters.search || undefined;
      const currentKategori = getObatStore.filters.kategori || undefined;

      if (
        normalizedSearch === currentSearch &&
        normalizedKategori === currentKategori
      ) {
        return;
      }

      getObatStore.mergeFilters({
        search: normalizedSearch,
        kategori: normalizedKategori,
      });
      getObatStore.mergePagination({ page: 1 });
      getObatStore.getObat().catch(() => undefined);
    }, 450);

    return () => {
      clearTimeout(debounceTimeout);
    };
  }, [search, kategori, getObatStore]);

  const onClearFilters = () => {
    setSearch("");
    setKategori("");
  };

  const onRefresh = () => {
    getObatStore.refreshObat().catch(() => undefined);
  };

  const onRetry = () => {
    getObatStore.getObat({ forceRefresh: true }).catch(() => undefined);
  };

  const goToPage = (page: number) => {
    getObatStore.mergePagination({ page });
    getObatStore.getObat().catch(() => undefined);
  };

  const canGoPrevious = pagination.page > 1;
  const safePageCount = Math.max(pageCount, 1);
  const canGoNext = pagination.page < safePageCount;
  const showInitialLoading = isLoading && results.length === 0;

  return (
    <View style={styles.container}>
      <View style={styles.filtersContainer}>
        <TextInput
          value={search}
          onChangeText={setSearch}
          placeholder={i18n.t("obat.screens.Obats.searchPlaceholder")}
          style={styles.searchInput}
        />

        <TextInput
          value={kategori}
          onChangeText={setKategori}
          placeholder={i18n.t("obat.screens.Obats.kategoriPlaceholder")}
          style={styles.searchInput}
        />

        <View style={styles.filterActionsContainer}>
          <TouchableOpacity
            onPress={onClearFilters}
            style={styles.secondaryButton}
          >
            <Text style={styles.secondaryButtonText}>
              {i18n.t("obat.screens.Obats.clearFilters")}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={onRefresh} style={styles.secondaryButton}>
            <Text style={styles.secondaryButtonText}>
              {i18n.t("obat.screens.Obats.refresh")}
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      {errorMessage ? (
        <View style={styles.errorBanner}>
          <Text style={styles.errorText}>
            {i18n.t("obat.screens.Obats.error", {
              message: errorMessage,
            })}
          </Text>

          <TouchableOpacity onPress={onRetry}>
            <Text style={styles.errorRetryText}>
              {i18n.t("obat.screens.Obats.retry")}
            </Text>
          </TouchableOpacity>
        </View>
      ) : null}

      {showInitialLoading ? (
        <Text>{i18n.t("obat.screens.Obats.loading")}</Text>
      ) : (
        <View style={styles.contentContainer}>
          <FlatList
            data={results}
            refreshing={isRefreshing}
            onRefresh={onRefresh}
            keyExtractor={(item) => item.kode}
            renderItem={({ item }) => <ObatItem obat={item} />}
            ListEmptyComponent={
              <Text style={styles.emptyText}>
                {i18n.t("obat.screens.Obats.empty")}
              </Text>
            }
          />

          <View style={styles.paginationContainer}>
            <TouchableOpacity
              disabled={!canGoPrevious}
              onPress={() => goToPage(pagination.page - 1)}
              style={[
                styles.paginationButton,
                !canGoPrevious && styles.paginationButtonDisabled,
              ]}
            >
              <Text style={styles.paginationButtonText}>
                {i18n.t("obat.screens.Obats.prev")}
              </Text>
            </TouchableOpacity>

            <Text style={styles.pageText}>
              {i18n.t("obat.screens.Obats.page", {
                page: pagination.page,
                pageCount: safePageCount,
              })}
            </Text>

            <TouchableOpacity
              disabled={!canGoNext}
              onPress={() => goToPage(pagination.page + 1)}
              style={[
                styles.paginationButton,
                !canGoNext && styles.paginationButtonDisabled,
              ]}
            >
              <Text style={styles.paginationButtonText}>
                {i18n.t("obat.screens.Obats.next")}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
    </View>
  );
});

export default withProviders(GetObatStoreProvider)(ObatsScreen);

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
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
  errorBanner: {
    marginHorizontal: 12,
    marginBottom: 8,
    padding: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#efb2b2",
    backgroundColor: "#fff2f2",
  },
  errorText: {
    color: "#8e1c1c",
    marginBottom: 8,
  },
  errorRetryText: {
    color: "#b42323",
    fontWeight: "700",
  },
  contentContainer: {
    flex: 1,
  },
  emptyText: {
    textAlign: "center",
    marginTop: 24,
    color: "#777",
  },
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
