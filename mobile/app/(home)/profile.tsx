import { useApp } from "@/components/app-provider";
import { useState } from "react";
import { Text, TextInput, TouchableOpacity, View } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function Profile() {
	const { auth, setAuth } = useApp();

	const [usernameInput, setUsernameInput] = useState("");
	const [passwordInput, setPasswordInput] = useState("");

	const login = async () => {
		const res = await fetch("http://localhost:8800/users/login", {
			method: "POST",
			body: JSON.stringify({
				username: usernameInput,
				password: passwordInput,
			}),
			headers: {
				"Content-Type": "application/json",
			},
		});

		if (!res.ok) {
			alert("Unable to login");
			return false;
		}

		const { user, token } = await res.json();
        await AsyncStorage.setItem("token", token);
		setAuth(user);
	};

	return (
		<View style={{ flex: 1 }}>
			{auth ? (
				<View
					style={{
						flex: 1,
						justifyContent: "center",
						alignItems: "center",
					}}>
					<Text style={{ fontWeight: "bold", fontSize: 18 }}>
						{auth.name}
					</Text>
					<View style={{ marginTop: 20 }}>
						<TouchableOpacity
							style={{
								borderRadius: 10,
								paddingVertical: 10,
								paddingHorizontal: 30,
								backgroundColor: "red",
							}}
							onPress={() => {
								setAuth(undefined);
							}}>
							<Text style={{ color: "white", fontSize: 18 }}>
								Logout
							</Text>
						</TouchableOpacity>
					</View>
				</View>
			) : (
				<View
					style={{
						flex: 1,
						justifyContent: "center",
						alignItems: "center",
					}}>
					<Text style={{ fontSize: 18, fontWeight: "bold" }}>
						Login
					</Text>
					<View style={{ marginTop: 20, gap: 10 }}>
						<TextInput
							value={usernameInput}
							onChangeText={setUsernameInput}
							autoCapitalize="none"
							style={{
								width: 300,
								fontSize: 18,
								borderWidth: 1,
								borderColor: "#66666650",
								borderRadius: 10,
								padding: 10,
								backgroundColor: "white",
							}}
							placeholder="username"
						/>
						<TextInput
							value={passwordInput}
							onChangeText={setPasswordInput}
							secureTextEntry
							style={{
								width: 300,
								fontSize: 18,
								borderWidth: 1,
								borderColor: "#66666650",
								borderRadius: 10,
								padding: 10,
								backgroundColor: "white",
							}}
							placeholder="password"
						/>
						<TouchableOpacity
							style={{
								width: 300,
								borderRadius: 10,
								paddingVertical: 10,
								paddingHorizontal: 30,
								backgroundColor: "green",
								alignItems: "center",
							}}
							onPress={() => {
								login();
								setUsernameInput("");
								setPasswordInput("");
							}}>
							<Text style={{ color: "white", fontSize: 18 }}>
								Login
							</Text>
						</TouchableOpacity>
					</View>
				</View>
			)}
		</View>
	);
}
