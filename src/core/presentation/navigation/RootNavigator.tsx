import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { RootStackParamList } from "./types";
import PostScreen from "src/post/presentation/screens/PostScreen";
import NotFoundScreen from "../screens/NotFoundScreen";
import PostsScreen from "src/post/presentation/screens/PostsScreen";
import ObatsScreen from "src/obat/presentation/screens/ObatsScreen";
import ObatScreen from "src/obat/presentation/screens/ObatScreen";

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function RootNavigator() {
  const initialRouteName: keyof RootStackParamList = "Obats";

  return (
    <Stack.Navigator initialRouteName={initialRouteName}>
      <Stack.Screen name="Obats" component={ObatsScreen} />

      <Stack.Screen name="Obat" component={ObatScreen} />

      <Stack.Screen name="Posts" component={PostsScreen} />

      <Stack.Screen name="Post" component={PostScreen} />

      <Stack.Screen name="NotFound" component={NotFoundScreen} />
    </Stack.Navigator>
  );
}
