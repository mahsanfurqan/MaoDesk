import { observer } from "mobx-react";
import { useEffect, useState } from "react";
import { Alert, ScrollView, StyleSheet, Text } from "react-native";
import { RootStackScreenProps } from "src/core/presentation/navigation/types";
import { useI18n } from "src/core/presentation/hooks/useI18n";
import { withProviders } from "src/core/presentation/utils/withProviders";
import { StockMutationType } from "src/obat/domain/entities/StockMutationEntity";
import ObatActionsSection from "../components/ObatActionsSection";
import ObatDetailRowsSection from "../components/ObatDetailRowsSection";
import StockMutationFormSection from "../components/StockMutationFormSection";
import StockMutationHistorySection from "../components/StockMutationHistorySection";
import { FindObatStoreProvider } from "../stores/FindObatStore/FindObatStoreProvider";
import { useFindObatStore } from "../stores/FindObatStore/useFindObatStore";
import { GetStockMutationsStoreProvider } from "../stores/GetStockMutationsStore/GetStockMutationsStoreProvider";
import { useGetStockMutationsStore } from "../stores/GetStockMutationsStore/useGetStockMutationsStore";
import { DeleteObatStoreProvider } from "../stores/DeleteObatStore/DeleteObatStoreProvider";
import { useDeleteObatStore } from "../stores/DeleteObatStore/useDeleteObatStore";
import { AdjustStockStoreProvider } from "../stores/AdjustStockStore/AdjustStockStoreProvider";
import { useAdjustStockStore } from "../stores/AdjustStockStore/useAdjustStockStore";

const ObatScreen = observer(({ route, navigation }: RootStackScreenProps<"Obat">) => {
  const { kode } = route.params;
  const i18n = useI18n();
  const findObatStore = useFindObatStore();
  const getStockMutationsStore = useGetStockMutationsStore();
  const deleteObatStore = useDeleteObatStore();
  const adjustStockStore = useAdjustStockStore();
  const [mutationType, setMutationType] = useState<StockMutationType>("masuk");
  const [mutationAmount, setMutationAmount] = useState("");
  const [mutationNote, setMutationNote] = useState("");
  const [localMutationError, setLocalMutationError] = useState<string | null>(null);
  const { isLoading, obat } = findObatStore;
  const isSubmitting =
    deleteObatStore.isSubmitting || adjustStockStore.isSubmitting;
  const deleteErrorMessage = deleteObatStore.errorMessage;
  const adjustErrorMessage = adjustStockStore.errorMessage;
  const {
    isLoading: isLoadingMutations,
    isRefreshing: isRefreshingMutations,
    errorMessage: stockMutationError,
    results: stockMutations,
    pagination: stockMutationPagination,
    pageCount: stockMutationPageCount,
  } = getStockMutationsStore;

  useEffect(() => {
    findObatStore.findObat(kode);
    getStockMutationsStore.getStockMutations(kode).catch(() => undefined);
  }, [findObatStore, getStockMutationsStore, kode]);

  const onRefreshStockMutations = () => {
    getStockMutationsStore.refreshStockMutations(kode).catch(() => undefined);
  };

  const onMutationPageChange = (page: number) => {
    getStockMutationsStore.mergePagination({ page });
    getStockMutationsStore.getStockMutations(kode).catch(() => undefined);
  };

  if (isLoading) {
    return <Text>{i18n.t("obat.screens.Obat.loading")}</Text>;
  }

  if (!obat) {
    return <Text>{i18n.t("obat.screens.Obat.notFound")}</Text>;
  }

  const onEdit = () => {
    navigation.navigate("ObatForm", {
      kode: obat.kode,
    });
  };

  const onDelete = () => {
    Alert.alert(
      i18n.t("obat.screens.Obat.deleteConfirmTitle"),
      i18n.t("obat.screens.Obat.deleteConfirmMessage", {
        kode: obat.kode,
      }),
      [
        {
          text: i18n.t("obat.screens.Obat.deleteConfirmCancel"),
          style: "cancel",
        },
        {
          text: i18n.t("obat.screens.Obat.deleteConfirmAccept"),
          style: "destructive",
          onPress: () => {
            deleteObatStore
              .deleteObat(obat.kode)
              .then(() => {
                navigation.replace("Obats", {
                  refreshAt: Date.now(),
                });
              })
              .catch(() => undefined);
          },
        },
      ]
    );
  };

  const onSubmitStockMutation = () => {
    const parsedAmount = Number(mutationAmount);

    if (Number.isNaN(parsedAmount)) {
      setLocalMutationError(i18n.t("obat.screens.Obat.stockMutation.invalidAmount"));

      return;
    }

    if (mutationType === "koreksi" && parsedAmount < 0) {
      setLocalMutationError(
        i18n.t("obat.screens.Obat.stockMutation.invalidKoreksiAmount")
      );

      return;
    }

    if (mutationType !== "koreksi" && parsedAmount <= 0) {
      setLocalMutationError(i18n.t("obat.screens.Obat.stockMutation.invalidAmount"));

      return;
    }

    setLocalMutationError(null);

    adjustStockStore
      .adjustStock({
        kode: obat.kode,
        tipe: mutationType,
        jumlah: parsedAmount,
        catatan: mutationNote.trim() || null,
      })
      .then(() => {
        setMutationAmount("");
        setMutationNote("");

        return Promise.all([
          findObatStore.findObat(kode),
          getStockMutationsStore.refreshStockMutations(kode),
        ]);
      })
      .catch(() => undefined);
  };

  const mutationErrorMessage = localMutationError ?? adjustErrorMessage;

  const rows: Array<[string, unknown]> = [
    ["kode", obat.kode],
    ["nama", obat.nama],
    ["kategori", obat.kategori],
    ["stok", obat.stok],
    ["satuan_beli", obat.satuanBeli],
    ["harga_beli", obat.hargaBeli],
    ["stok_min", obat.stokMin],
    ["satuan_1", obat.satuan1],
    ["satuan_2", obat.satuan2],
    ["satuan_3", obat.satuan3],
    ["satuan_4", obat.satuan4],
    ["isi_1", obat.isi1],
    ["isi_2", obat.isi2],
    ["isi_3", obat.isi3],
    ["isi_4", obat.isi4],
    ["harga_jual_1", obat.hargaJual1],
    ["harga_jual_2", obat.hargaJual2],
    ["harga_jual_3", obat.hargaJual3],
    ["harga_jual_4", obat.hargaJual4],
    ["harga_resep_1", obat.hargaResep1],
    ["harga_resep_2", obat.hargaResep2],
    ["harga_resep_3", obat.hargaResep3],
    ["harga_resep_4", obat.hargaResep4],
    ["laba_otomatis", obat.labaOtomatis],
    ["suplier", obat.suplier],
    ["pabrik", obat.pabrik],
    ["expired", obat.expired],
    ["indikasi", obat.indikasi],
    ["komposisi", obat.komposisi],
    ["lokasi", obat.lokasi],
    ["no_batch", obat.noBatch],
  ];

  return (
    <ScrollView style={styles.container}>
      <ObatActionsSection
        onEdit={onEdit}
        onDelete={onDelete}
        isSubmitting={isSubmitting}
        isDeleting={deleteObatStore.isSubmitting}
        deleteErrorMessage={deleteErrorMessage}
      />

      <StockMutationFormSection
        mutationType={mutationType}
        mutationAmount={mutationAmount}
        mutationNote={mutationNote}
        mutationErrorMessage={mutationErrorMessage}
        isSubmitting={isSubmitting}
        onMutationTypeChange={setMutationType}
        onMutationAmountChange={setMutationAmount}
        onMutationNoteChange={setMutationNote}
        onSubmit={onSubmitStockMutation}
      />

      <StockMutationHistorySection
        isLoading={isLoadingMutations}
        isRefreshing={isRefreshingMutations}
        errorMessage={stockMutationError}
        stockMutations={stockMutations}
        pagination={stockMutationPagination}
        pageCount={stockMutationPageCount}
        onRefresh={onRefreshStockMutations}
        onPageChange={onMutationPageChange}
      />

      <ObatDetailRowsSection rows={rows} />
    </ScrollView>
  );
});

export default withProviders(
  FindObatStoreProvider,
  DeleteObatStoreProvider,
  AdjustStockStoreProvider,
  GetStockMutationsStoreProvider
)(ObatScreen);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 12,
  },
});
