import { Link } from "expo-router";
import { Text, View } from "react-native";

export default function Index() {
  const id = 123;
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text style={{ fontSize: 24, fontWeight: "bold" }}>Home</Text>
      <Link href={`/post/${id}`}>Post 123</Link>
    </View>
  );
}
