import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

interface FloatingPostButtonProps {
  onPress: () => void;
  label?: string; // full text
}

const FloatingPostButton: React.FC<FloatingPostButtonProps> = ({
  onPress,
  label = "Post a JAMM", // default fallback
}) => {
  // Split label into everything before last word + last word
  const words = label.trim().split(" ");
  const lastWord = words.pop(); // take last word (e.g., JAM/JAMM)
  const firstPart = words.join(" "); // rest of text (e.g., "Post a")

  return (
    <View style={styles.postButtonWrapper}>
      <TouchableOpacity style={styles.postButton} onPress={onPress}>
        <Text style={styles.postText}>
          <Text style={{ color: "white" }}>{firstPart} </Text>
          <Text style={{ color: "red" }}>{lastWord}</Text>
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default FloatingPostButton;

const styles = StyleSheet.create({
  postButtonWrapper: {
    position: "absolute",
    bottom: 20,
    alignSelf: "center",
  },
  postButton: {
    backgroundColor: "black",
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 30,
  },
  postText: {
    fontSize: 16,
    fontWeight: "bold",
  },
});
