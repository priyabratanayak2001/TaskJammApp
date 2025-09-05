import React from "react";
import { View, Text, Image, StyleSheet } from "react-native";

interface HeaderProps {
  city?: string;
  title?: string;
  profileUri?: string;
  badgeText?: string;
}

const Header: React.FC<HeaderProps> = ({
  city = "BLR",
  title = "People",
  profileUri = "https://randomuser.me/api/portraits/women/44.jpg",
  badgeText = "42%",
}) => {
  return (
    <View style={styles.header}>
      {/* City */}
      <View style={styles.cityRow}>
        <View style={styles.greenDot} />
        <Text style={styles.city}>{city}</Text>
      </View>

      {/* Title */}
      <Text style={styles.title}>{title}</Text>

      {/* Profile + Badge */}
      <View style={styles.profileContainer}>
        <Image source={{ uri: profileUri }} style={styles.profilePic} />
        <View style={styles.badge}>
          <Text style={styles.badgeText}>{badgeText}</Text>
        </View>
      </View>
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  cityRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  greenDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: "green",
    marginRight: 6,
  },
  city: {
    fontSize: 16,
    fontWeight: "600",
  },
  title: {
    fontSize: 20,
    fontWeight: "700",
  },
  profileContainer: {
    position: "relative",
  },
  profilePic: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  badge: {
    position: "absolute",
    bottom: -4,
    right: -4,
    backgroundColor: "red",
    borderRadius: 12,
    paddingHorizontal: 6,
    paddingVertical: 2,
  },
  badgeText: {
    fontSize: 12,
    color: "white",
    fontWeight: "600",
  },
});
