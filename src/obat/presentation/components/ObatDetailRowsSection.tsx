import { StyleSheet, Text, View } from "react-native";

interface ObatDetailRowsSectionProps {
  rows: Array<[string, unknown]>;
}

const toText = (value: unknown) => {
  if (value === null || value === undefined || value === "") {
    return "-";
  }

  return String(value);
};

const ObatDetailRowsSection = ({ rows }: ObatDetailRowsSectionProps) => {
  return (
    <View>
      {rows.map(([label, value]) => (
        <View key={label} style={styles.row}>
          <Text style={styles.label}>{label}</Text>
          <Text style={styles.value}>{toText(value)}</Text>
        </View>
      ))}
    </View>
  );
};

export default ObatDetailRowsSection;

const styles = StyleSheet.create({
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
