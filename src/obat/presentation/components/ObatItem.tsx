import { useNavigation } from "@react-navigation/native";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { RootScreenNavigationProp } from "src/core/presentation/navigation/types";
import ObatEntity from "src/obat/domain/entities/ObatEntity";

interface ObatItemProps {
  obat: ObatEntity;
}

const ObatItem = ({ obat }: ObatItemProps) => {
  const navigation = useNavigation<RootScreenNavigationProp<"Obats">>();
  const onPress = () => {
    navigation.navigate("Obat", { kode: obat.kode });
  };

  return (
    <TouchableOpacity onPress={onPress}>
      <View style={styles.container}>
        <Text style={styles.title}>{obat.nama}</Text>
        <Text style={styles.meta}>Kode: {obat.kode}</Text>
        <Text style={styles.meta}>Kategori: {obat.kategori ?? "-"}</Text>
        <Text style={styles.meta}>Stok: {obat.stok}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default ObatItem;

const styles = StyleSheet.create({
  container: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  title: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 6,
  },
  meta: {
    fontSize: 13,
    color: "#555",
  },
});
