import React, { useState } from "react";
import { View, Text, Button, StyleSheet } from "react-native";

export default function CounterScreen() {
  const [count, setCount] = useState(0);

  return (
    <View style={styles.container}>
      <Text style={styles.counterText}>{count}</Text>
      <View style={styles.buttons}>
        <Button title="+" onPress={() => setCount(count + 1)} />
        <Button title="-" onPress={() => setCount(count - 1)} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", alignItems: "center" },
  counterText: { fontSize: 40, marginBottom: 20 },
  buttons: { flexDirection: "row", gap: 20 },
});
