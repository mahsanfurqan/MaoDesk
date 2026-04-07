import { observer } from "mobx-react";
import { useEffect } from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { RootStackScreenProps } from "src/core/presentation/navigation/types";
import { useI18n } from "src/core/presentation/hooks/useI18n";
import { withProviders } from "src/core/presentation/utils/withProviders";
import { FindObatStoreProvider } from "../stores/FindObatStore/FindObatStoreProvider";
import { useFindObatStore } from "../stores/FindObatStore/useFindObatStore";

const toText = (value: unknown) => {
  if (value === null || value === undefined || value === "") {
    return "-";
  }

  return String(value);
};

const ObatScreen = observer(({ route }: RootStackScreenProps<"Obat">) => {
  const { kode } = route.params;
  const i18n = useI18n();
  const findObatStore = useFindObatStore();
  const { isLoading, obat } = findObatStore;

  useEffect(() => {
    findObatStore.findObat(kode);
  }, [findObatStore, kode]);

  if (isLoading) {
    return <Text>{i18n.t("obat.screens.Obat.loading")}</Text>;
  }

  if (!obat) {
    return <Text>{i18n.t("obat.screens.Obat.notFound")}</Text>;
  }

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
      {rows.map(([label, value]) => (
        <View key={label} style={styles.row}>
          <Text style={styles.label}>{label}</Text>
          <Text style={styles.value}>{toText(value)}</Text>
        </View>
      ))}
    </ScrollView>
  );
});

export default withProviders(FindObatStoreProvider)(ObatScreen);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 12,
  },
  row: {
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  label: {
    fontSize: 12,
    color: "#666",
    textTransform: "uppercase",
  },
  value: {
    marginTop: 4,
    fontSize: 15,
    color: "#111",
  },
});
