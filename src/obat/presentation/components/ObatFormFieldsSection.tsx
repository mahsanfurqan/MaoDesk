import { StyleSheet, Text, TextInput, View } from "react-native";
import { useI18n } from "src/core/presentation/hooks/useI18n";

interface ObatFormFieldsSectionProps {
  kode: string;
  nama: string;
  kategori: string;
  stok: string;
  isEditMode: boolean;
  onKodeChange: (value: string) => void;
  onNamaChange: (value: string) => void;
  onKategoriChange: (value: string) => void;
  onStokChange: (value: string) => void;
}

const ObatFormFieldsSection = ({
  kode,
  nama,
  kategori,
  stok,
  isEditMode,
  onKodeChange,
  onNamaChange,
  onKategoriChange,
  onStokChange,
}: ObatFormFieldsSectionProps) => {
  const i18n = useI18n();

  return (
    <View>
      <Text style={styles.label}>{i18n.t("obat.screens.ObatForm.kodeLabel")}</Text>
      <TextInput
        value={kode}
        onChangeText={onKodeChange}
        editable={!isEditMode}
        placeholder={i18n.t("obat.screens.ObatForm.kodePlaceholder")}
        style={[styles.input, isEditMode && styles.inputDisabled]}
      />

      <Text style={styles.label}>{i18n.t("obat.screens.ObatForm.namaLabel")}</Text>
      <TextInput
        value={nama}
        onChangeText={onNamaChange}
        placeholder={i18n.t("obat.screens.ObatForm.namaPlaceholder")}
        style={styles.input}
      />

      <Text style={styles.label}>{i18n.t("obat.screens.ObatForm.kategoriLabel")}</Text>
      <TextInput
        value={kategori}
        onChangeText={onKategoriChange}
        placeholder={i18n.t("obat.screens.ObatForm.kategoriPlaceholder")}
        style={styles.input}
      />

      <Text style={styles.label}>{i18n.t("obat.screens.ObatForm.stokLabel")}</Text>
      <TextInput
        value={stok}
        onChangeText={onStokChange}
        placeholder={i18n.t("obat.screens.ObatForm.stokPlaceholder")}
        style={styles.input}
        keyboardType="numeric"
      />
    </View>
  );
};

export default ObatFormFieldsSection;

const styles = StyleSheet.create({
  label: {
    fontSize: 13,
    color: "#4b5563",
    marginBottom: 6,
  },
  input: {
    borderWidth: 1,
    borderColor: "#d1d5db",
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    marginBottom: 12,
    backgroundColor: "#fff",
  },
  inputDisabled: {
    backgroundColor: "#f3f4f6",
    color: "#6b7280",
  },
});
