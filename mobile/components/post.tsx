import { View, StyleSheet, Text, TouchableOpacity } from "react-native";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";

export default function Post() {
	return (
		<View style={styles.card}>
			<View style={styles.cardContent}>
				<View style={styles.avatar}></View>
				<View style={{ flexShrink: 1 }}>
					<View>
						<Text style={{ fontSize: 21 }}>Alice</Text>
					</View>
					<View>
						<Text style={{ color: "green" }}>
							A few seconds agao
						</Text>
					</View>
					<View style={{ marginTop: 5 }}>
						<Text style={{ fontSize: 16 }}>
							Lorem ipsum, dolor sit amet consectetur adipisicing
							elit. Quisquam culpa cupiditate magni? Ipsam iusto
							rem, iste.
						</Text>
					</View>
				</View>
			</View>
			<View
				style={{
					marginTop: 16,
					flexDirection: "row",
					justifyContent: "space-around",
				}}>
				<View
					style={{
						flexDirection: "row",
						gap: 5,
						alignItems: "center",
					}}>
					<TouchableOpacity>
						<MaterialIcons
							name="favorite-outline"
							color="red"
							size={28}
						/>
					</TouchableOpacity>
					<TouchableOpacity>
						<Text>5</Text>
					</TouchableOpacity>
				</View>
				<View
					style={{
						flexDirection: "row",
						gap: 5,
						alignItems: "center",
					}}>
					<TouchableOpacity>
						<MaterialIcons
							name="chat-bubble"
							color="green"
							size={28}
						/>
					</TouchableOpacity>
					<TouchableOpacity>
						<Text>10</Text>
					</TouchableOpacity>
				</View>
			</View>
		</View>
	);
}

const styles = StyleSheet.create({
	card: {
		borderBottomWidth: 1,
		borderBottomColor: "#cccccc80",
		paddingHorizontal: 12,
        paddingVertical: 16,
		backgroundColor: "white",
	},
	cardContent: {
		flexDirection: "row",
		gap: 10,
	},
	avatar: {
		width: 52,
		height: 52,
		borderRadius: 52,
		backgroundColor: "green",
	},
});
