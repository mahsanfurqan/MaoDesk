import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useI18n } from "src/core/presentation/hooks/useI18n";

interface ObatActionsSectionProps {
  onEdit: () => void;
  onDelete: () => void;
  isSubmitting: boolean;
  isDeleting: boolean;
  deleteErrorMessage: string | null;
}

const ObatActionsSection = ({
  onEdit,
  onDelete,
  isSubmitting,
  isDeleting,
  deleteErrorMessage,
}: ObatActionsSectionProps) => {
  const i18n = useI18n();

  return (
    <View>
      <View style={styles.actionsContainer}>
        <TouchableOpacity
          onPress={onEdit}
          style={styles.editButton}
          disabled={isSubmitting}
        >
          <Text style={styles.editButtonText}>{i18n.t("obat.screens.Obat.edit")}</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={onDelete}
          style={styles.deleteButton}
          disabled={isSubmitting}
        >
          <Text style={styles.deleteButtonText}>
            {isDeleting
              ? i18n.t("obat.screens.Obat.deleting")
              : i18n.t("obat.screens.Obat.delete")}
          </Text>
        </TouchableOpacity>
      </View>

      {deleteErrorMessage ? (
        <View style={styles.errorBanner}>
          <Text style={styles.errorText}>{deleteErrorMessage}</Text>
        </View>
      ) : null}
    </View>
  );
};

export default ObatActionsSection;

const styles = StyleSheet.create({
  actionsContainer: {
    flexDirection: "row",
    gap: 8,
    marginVertical: 12,
  },
  editButton: {
    flex: 1,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#205ec9",
    backgroundColor: "#edf4ff",
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 10,
  },
  editButtonText: {
    color: "#205ec9",
    fontWeight: "700",
  },
  deleteButton: {
    flex: 1,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#bf2f2f",
    backgroundColor: "#fff2f2",
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 10,
  },
  deleteButtonText: {
    color: "#bf2f2f",
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
});
