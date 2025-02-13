import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { useRouter } from "expo-router";

export default function Index() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome to FirstCall</Text>
      <TouchableOpacity 
        style={styles.button} 
        onPress={() => router.replace("/(tabs)/home")}
      >
        <Text style={styles.buttonText}>Go to App</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    justifyContent: "center", 
    alignItems: "center", 
    backgroundColor: "#FF6B6B" 
  },
  title: { 
    fontSize: 24, 
    fontWeight: "bold", 
    color: "white" 
  },
  button: { 
    marginTop: 20, 
    backgroundColor: "white", 
    padding: 10, 
    borderRadius: 10 
  },
  buttonText: { 
    color: "#FF6B6B", 
    fontSize: 16 
  },
});
