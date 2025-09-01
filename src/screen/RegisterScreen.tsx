import React, { useState } from "react";
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Alert } from "react-native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../App";
import { useNavigation } from "@react-navigation/native";
import auth from "@react-native-firebase/auth"; // use this, not getAuth()
import Icon from "react-native-vector-icons/Ionicons";

export default function RegisterScreen() {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
const [isLoading, setIsLoading] = useState(false);
const [showPassword, setShowPassword] = useState(false);

  const handleRegister = async () => {
    if (!username || !email || !password) {
      Alert.alert("Error", "Please fill in all fields");
      return;
    }

    setIsLoading(true);
    try {
      const userCredential = await auth().createUserWithEmailAndPassword(email, password);
      
      // Check if user exists before updating profile
      if (userCredential.user) {
        await userCredential.user.updateProfile({ displayName: username });
        
        await auth().signOut();
        navigation.replace("Login");
      } else {
        Alert.alert("Error", "User creation failed");
      }
    } catch (error: any) {
      Alert.alert("Registration Failed", error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Register</Text>
      {/* Username */}
      <Text style={styles.label}>Name</Text>
      <TextInput
        placeholder="Enter your name"
        value={username}
        onChangeText={setUsername}
        style={styles.input}
      />

      {/* Email */}
      <Text style={styles.label}>Email</Text>
      <TextInput
        placeholder="Enter your email"
        value={email}
        onChangeText={setEmail}
        style={styles.input}
        keyboardType="email-address"
      />

      <Text style={styles.label}>Password</Text>
      <View style={styles.passwordContainer}>
        <TextInput
          placeholder="Password"
          placeholderTextColor="#666"
          secureTextEntry={!showPassword}
          value={password}
          onChangeText={setPassword}
          style={[styles.input, { flex: 1, marginVertical: 0, borderWidth: 0, borderColor: "#ccc", color: "black" }]}
        />
        <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
          <Icon
            name={showPassword ? "eye-off" : "eye"}
            size={22}
            color="#333"
            style={{ marginRight: 10 }}
          />
        </TouchableOpacity>
      </View>

      <TouchableOpacity style={styles.registerButton} onPress={handleRegister}>
        <Text style={styles.registerButtonText}>Register</Text>
      </TouchableOpacity>

      <Text style={styles.loginText}>
        Already have an account?{" "}
        <Text style={styles.link} onPress={() => navigation.navigate("Login")}> 
          Login here
        </Text>
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    justifyContent: "center", 
    padding: 20,
    backgroundColor: "#fff" 
  },
  title: { 
    fontSize: 24, 
    fontWeight: "bold", 
    marginBottom: 20, 
    textAlign: "center" 
  },
  input: { 
    borderWidth: 1, 
    padding: 15, 
    marginVertical: 8, 
    borderRadius: 5,
    borderColor: "#ccc" 
  },
  registerButton: {
    backgroundColor: "#007AFF",
    padding: 15,
    borderRadius: 5,
    marginVertical: 10,
  },
  registerButtonText: {
    color: "#fff",
    textAlign: "center",
    fontWeight: "bold",
  },
  loginText: {
    textAlign: "center",
    marginTop: 20,
  },
  link: {
    color: "#007AFF",
    fontWeight: "bold",
  },
  label: {
    fontSize: 16,
    fontWeight: "500",
    marginBottom: 5,
    marginTop: 10,
  },
  passwordContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    marginVertical: 8,
    paddingRight: 10,
  },
});