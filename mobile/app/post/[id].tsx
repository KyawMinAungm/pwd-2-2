import { useLocalSearchParams } from "expo-router";
import { View, Text } from "react-native";

export default function Post() {
    const { id } = useLocalSearchParams();

    return (
        <View
            style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
            <Text style={{ fontSize: 21, fontWeight: "bold" }}>Post {id}</Text>
        </View>
    );
}
