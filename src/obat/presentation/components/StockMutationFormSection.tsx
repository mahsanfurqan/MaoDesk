import { StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { useI18n } from "src/core/presentation/hooks/useI18n";
import { StockMutationType } from "src/obat/domain/entities/StockMutationEntity";

interface StockMutationFormSectionProps {
  mutationType: StockMutationType;
  mutationAmount: string;
  mutationNote: string;
  mutationErrorMessage: string | null;
  isSubmitting: boolean;
  onMutationTypeChange: (value: StockMutationType) => void;
  onMutationAmountChange: (value: string) => void;
  onMutationNoteChange: (value: string) => void;
  onSubmit: () => void;
}

const mutationTypeOptions: StockMutationType[] = ["masuk", "keluar", "koreksi"];

const StockMutationFormSection = ({
  mutationType,
  mutationAmount,
  mutationNote,
  mutationErrorMessage,
  isSubmitting,
  onMutationTypeChange,
  onMutationAmountChange,
  onMutationNoteChange,
  onSubmit,
}: StockMutationFormSectionProps) => {
  const i18n = useI18n();

  const amountLabel =
    mutationType === "koreksi"
      ? i18n.t("obat.screens.Obat.stockMutation.koreksiAmountLabel")
      : i18n.t("obat.screens.Obat.stockMutation.amountLabel");

  const amountPlaceholder =
    mutationType === "koreksi"
      ? i18n.t("obat.screens.Obat.stockMutation.koreksiAmountPlaceholder")
      : i18n.t("obat.screens.Obat.stockMutation.amountPlaceholder");

  return (
    <View style={styles.sectionContainer}>
      <Text style={styles.sectionTitle}>{i18n.t("obat.screens.Obat.stockMutation.title")}</Text>

      <Text style={styles.inputLabel}>{i18n.t("obat.screens.Obat.stockMutation.typeLabel")}</Text>
      <View style={styles.segmentContainer}>
        {mutationTypeOptions.map((typeOption) => {
          const isActive = mutationType === typeOption;

          return (
            <TouchableOpacity
              key={typeOption}
              onPress={() => onMutationTypeChange(typeOption)}
              style={[styles.segmentButton, isActive && styles.segmentButtonActive]}
              disabled={isSubmitting}
            >
              <Text
                style={[
                  styles.segmentButtonText,
                  isActive && styles.segmentButtonTextActive,
                ]}
              >
                {i18n.t(`obat.screens.Obat.stockMutation.type.${typeOption}`)}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>

      <Text style={styles.inputLabel}>{amountLabel}</Text>
      <TextInput
        value={mutationAmount}
        onChangeText={onMutationAmountChange}
        keyboardType="numeric"
        placeholder={amountPlaceholder}
        style={styles.input}
      />

      <Text style={styles.inputLabel}>{i18n.t("obat.screens.Obat.stockMutation.noteLabel")}</Text>
      <TextInput
        value={mutationNote}
        onChangeText={onMutationNoteChange}
        placeholder={i18n.t("obat.screens.Obat.stockMutation.notePlaceholder")}
        style={[styles.input, styles.noteInput]}
        multiline
        numberOfLines={3}
        textAlignVertical="top"
      />

      {mutationErrorMessage ? (
        <View style={styles.errorBanner}>
          <Text style={styles.errorText}>{mutationErrorMessage}</Text>
        </View>
      ) : null}

      <TouchableOpacity
        onPress={onSubmit}
        disabled={isSubmitting}
        style={styles.submitMutationButton}
      >
        <Text style={styles.submitMutationButtonText}>
          {isSubmitting
            ? i18n.t("obat.screens.Obat.stockMutation.submitting")
            : i18n.t("obat.screens.Obat.stockMutation.submit")}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default StockMutationFormSection;

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
  inputLabel: {
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
    marginBottom: 10,
    backgroundColor: "#fff",
  },
  noteInput: {
    minHeight: 80,
  },
  segmentContainer: {
    flexDirection: "row",
    gap: 8,
    marginBottom: 10,
  },
  segmentButton: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#c5d3ec",
    borderRadius: 8,
    backgroundColor: "#f7faff",
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 10,
  },
  segmentButtonActive: {
    borderColor: "#0b6efe",
    backgroundColor: "#eaf1ff",
  },
  segmentButtonText: {
    color: "#335792",
    fontWeight: "600",
  },
  segmentButtonTextActive: {
    color: "#0b4cc9",
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
  submitMutationButton: {
    borderRadius: 8,
    backgroundColor: "#0b6efe",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 11,
  },
  submitMutationButtonText: {
    color: "#fff",
    fontWeight: "700",
  },
});
