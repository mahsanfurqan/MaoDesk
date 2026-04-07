import { observer } from "mobx-react";
import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { RootStackScreenProps } from "src/core/presentation/navigation/types";
import { useI18n } from "src/core/presentation/hooks/useI18n";
import { withProviders } from "src/core/presentation/utils/withProviders";
import CreateObatPayload from "src/obat/application/types/CreateObatPayload";
import UpdateObatPayload from "src/obat/application/types/UpdateObatPayload";
import ObatFormActions from "../components/ObatFormActions";
import ObatFormFieldsSection from "../components/ObatFormFieldsSection";
import { FindObatStoreProvider } from "../stores/FindObatStore/FindObatStoreProvider";
import { useFindObatStore } from "../stores/FindObatStore/useFindObatStore";
import { PostObatStoreProvider } from "../stores/PostObatStore/PostObatStoreProvider";
import { usePostObatStore } from "../stores/PostObatStore/usePostObatStore";
import { PutObatStoreProvider } from "../stores/PutObatStore/PutObatStoreProvider";
import { usePutObatStore } from "../stores/PutObatStore/usePutObatStore";

const ObatFormScreen = observer(
  ({ route, navigation }: RootStackScreenProps<"ObatForm">) => {
    const i18n = useI18n();
    const findObatStore = useFindObatStore();
    const postObatStore = usePostObatStore();
    const putObatStore = usePutObatStore();
    const editKode = route.params?.kode;
    const isEditMode = Boolean(editKode);
    const isSubmitting = postObatStore.isSubmitting || putObatStore.isSubmitting;
    const [isHydrated, setIsHydrated] = useState(false);

    const [kode, setKode] = useState(editKode ?? "");
    const [nama, setNama] = useState("");
    const [kategori, setKategori] = useState("");
    const [stok, setStok] = useState("0");
    const [localError, setLocalError] = useState<string | null>(null);

    useEffect(() => {
      if (!isEditMode || !editKode) {
        return;
      }

      findObatStore.findObat(editKode).catch(() => undefined);
    }, [isEditMode, editKode, findObatStore]);

    useEffect(() => {
      if (!isEditMode || isHydrated || !findObatStore.obat) {
        return;
      }

      setKode(findObatStore.obat.kode);
      setNama(findObatStore.obat.nama);
      setKategori(findObatStore.obat.kategori ?? "");
      setStok(String(findObatStore.obat.stok));
      setIsHydrated(true);
    }, [isEditMode, isHydrated, findObatStore.obat]);

    const storeErrorMessage = isEditMode
      ? putObatStore.errorMessage
      : postObatStore.errorMessage;
    const errorMessage = localError ?? storeErrorMessage;
    const title = isEditMode
      ? i18n.t("obat.screens.ObatForm.editTitle")
      : i18n.t("obat.screens.ObatForm.createTitle");

    const validatePayload = () => {
      if (!kode.trim()) {
        return i18n.t("obat.screens.ObatForm.requiredKode");
      }

      if (!nama.trim()) {
        return i18n.t("obat.screens.ObatForm.requiredNama");
      }

      if (Number.isNaN(Number(stok))) {
        return i18n.t("obat.screens.ObatForm.invalidStok");
      }

      return null;
    };

    const onSubmit = () => {
      const validationMessage = validatePayload();

      if (validationMessage) {
        setLocalError(validationMessage);

        return;
      }

      setLocalError(null);

      if (isEditMode && editKode) {
        const payload: UpdateObatPayload = {
          nama: nama.trim(),
          kategori: kategori.trim() || null,
          stok: Number(stok),
        };

        putObatStore
          .putObat(editKode, payload)
          .then(() => {
            navigation.replace("Obats", {
              refreshAt: Date.now(),
            });
          })
          .catch(() => undefined);

        return;
      }

      const payload: CreateObatPayload = {
        kode: kode.trim(),
        nama: nama.trim(),
        kategori: kategori.trim() || null,
        stok: Number(stok),
      };

      postObatStore
        .postObat(payload)
        .then(() => {
          navigation.replace("Obats", {
            refreshAt: Date.now(),
          });
        })
        .catch(() => undefined);
    };

    const onCancel = () => {
      navigation.goBack();
    };

    if (isEditMode && findObatStore.isLoading && !isHydrated) {
      return (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#0b6efe" />
          <Text style={styles.loadingText}>
            {i18n.t("obat.screens.ObatForm.loading")}
          </Text>
        </View>
      );
    }

    return (
      <ScrollView style={styles.container} contentContainerStyle={styles.content}>
        <Text style={styles.title}>{title}</Text>

        <ObatFormFieldsSection
          kode={kode}
          nama={nama}
          kategori={kategori}
          stok={stok}
          isEditMode={isEditMode}
          onKodeChange={setKode}
          onNamaChange={setNama}
          onKategoriChange={setKategori}
          onStokChange={setStok}
        />

        {errorMessage ? (
          <View style={styles.errorBanner}>
            <Text style={styles.errorText}>{errorMessage}</Text>
          </View>
        ) : null}

        <ObatFormActions
          isEditMode={isEditMode}
          isSubmitting={isSubmitting}
          onCancel={onCancel}
          onSubmit={onSubmit}
        />
      </ScrollView>
    );
  }
);

export default withProviders(
  FindObatStoreProvider,
  PostObatStoreProvider,
  PutObatStoreProvider
)(ObatFormScreen);

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    padding: 16,
  },
  title: {
    fontSize: 20,
    fontWeight: "700",
    marginBottom: 16,
  },
  errorBanner: {
    marginBottom: 12,
    padding: 10,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#efb2b2",
    backgroundColor: "#fff2f2",
  },
  errorText: {
    color: "#8e1c1c",
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    gap: 8,
  },
  loadingText: {
    color: "#4b5563",
  },
});
