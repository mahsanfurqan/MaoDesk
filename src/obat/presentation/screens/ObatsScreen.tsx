import { useNavigation } from "@react-navigation/native";
import { observer } from "mobx-react";
import { useEffect, useRef, useState } from "react";
import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import {
  RootScreenNavigationProp,
  RootStackScreenProps,
} from "src/core/presentation/navigation/types";
import { useI18n } from "src/core/presentation/hooks/useI18n";
import { withProviders } from "src/core/presentation/utils/withProviders";
import ObatItem from "../components/ObatItem";
import ObatsFiltersSection from "../components/ObatsFiltersSection";
import ObatsPaginationControls from "../components/ObatsPaginationControls";
import { GetObatStoreProvider } from "../stores/GetObatStore/GetObatStoreProvider";
import { useGetObatStore } from "../stores/GetObatStore/useGetObatStore";

const ObatsScreen = observer(({ route }: RootStackScreenProps<"Obats">) => {
  const i18n = useI18n();
  const navigation = useNavigation<RootScreenNavigationProp<"Obats">>();
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
    if (!route.params?.refreshAt) {
      return;
    }

    getObatStore.refreshObat().catch(() => undefined);
  }, [route.params?.refreshAt, getObatStore]);

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

  const onCreateObat = () => {
    navigation.navigate("ObatForm");
  };

  const goToPage = (page: number) => {
    getObatStore.mergePagination({ page });
    getObatStore.getObat().catch(() => undefined);
  };

  const showInitialLoading = isLoading && results.length === 0;

  return (
    <View style={styles.container}>
      <ObatsFiltersSection
        search={search}
        kategori={kategori}
        onSearchChange={setSearch}
        onKategoriChange={setKategori}
        onCreateObat={onCreateObat}
        onClearFilters={onClearFilters}
        onRefresh={onRefresh}
      />

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

          <ObatsPaginationControls
            page={pagination.page}
            pageCount={pageCount}
            onPrevious={() => goToPage(pagination.page - 1)}
            onNext={() => goToPage(pagination.page + 1)}
          />
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
});
