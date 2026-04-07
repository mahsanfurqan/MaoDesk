import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useI18n } from "src/core/presentation/hooks/useI18n";

interface ObatFormActionsProps {
  isEditMode: boolean;
  isSubmitting: boolean;
  onCancel: () => void;
  onSubmit: () => void;
}

const ObatFormActions = ({
  isEditMode,
  isSubmitting,
  onCancel,
  onSubmit,
}: ObatFormActionsProps) => {
  const i18n = useI18n();

  const saveLabel = isEditMode
    ? i18n.t("obat.screens.ObatForm.saveUpdate")
    : i18n.t("obat.screens.ObatForm.saveCreate");

  return (
    <View style={styles.actionsContainer}>
      <TouchableOpacity onPress={onCancel} style={styles.cancelButton} disabled={isSubmitting}>
        <Text style={styles.cancelButtonText}>{i18n.t("obat.screens.ObatForm.cancel")}</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={onSubmit} style={styles.submitButton} disabled={isSubmitting}>
        <Text style={styles.submitButtonText}>
          {isSubmitting ? i18n.t("obat.screens.ObatForm.submitting") : saveLabel}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default ObatFormActions;

const styles = StyleSheet.create({
  actionsContainer: {
    flexDirection: "row",
    gap: 8,
  },
  cancelButton: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#d1d5db",
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 11,
    backgroundColor: "#fff",
  },
  cancelButtonText: {
    color: "#374151",
    fontWeight: "700",
  },
  submitButton: {
    flex: 1,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 11,
    backgroundColor: "#0b6efe",
  },
  submitButtonText: {
    color: "#fff",
    fontWeight: "700",
  },
});
