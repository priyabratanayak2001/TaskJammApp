import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
} from "react-native";
import { useRoute, useNavigation } from "@react-navigation/native";
import FloatingPostButton from "../Components/FloatingPostButton";
import Header from "../Components/Header";

export default function EventScreen() {
  const navigation = useNavigation();
  const route = useRoute();
  const [jamms, setJamms] = useState<any[]>([]); // store multiple JAMs

  // Add new JAM if passed from CreateJammScreen
  useEffect(() => {
    if (route.params?.jammData) {
      setJamms((prev) => [...prev, route.params.jammData]);
    }
  }, [route.params?.jammData]);

  const formatDate = (date: any) =>
    new Date(date).toLocaleDateString("en-US", {
      weekday: "short",
      day: "numeric",
      month: "short",
    });

  const formatTime = (date: any) =>
    new Date(date).toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });

  return (
    <View style={styles.container}>
      {/* Header */}
      <Header
        city="BLR"
        title="People"
        profileUri="https://randomuser.me/api/portraits/women/44.jpg"
        badgeText="42%"
      />

      {/* Filters */}
      <View style={styles.filters}>
        <TouchableOpacity style={styles.filterBtn}>
          <Text style={styles.filterText}>Upcoming</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.filterBtn}>
          <Text style={styles.filterText}>MY Jaams</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.filterBtn}>
          <Text style={styles.filterText}>This Week</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.filterBtn}>
          <Text style={styles.filterText}>This Month</Text>
        </TouchableOpacity>
      </View>

      <ScrollView style={{ flex: 1, paddingBottom: 120 }}>
        {jamms.length === 0 ? (
          <Text style={{ textAlign: "center", marginTop: 20, color: "gray" }}>
            No JAMs available
          </Text>
        ) : (
          jamms.map((jamm, index) => (
            <View key={index} style={styles.detailsContainer}>
              <Text style={styles.title}>{jamm.jammName}</Text>

              {/* Host info */}
              <View style={styles.hostRow}>
                <Image
                  source={{
                    uri: "https://randomuser.me/api/portraits/women/44.jpg",
                  }}
                  style={styles.smallImage}
                />
                <View style={styles.hostInfo}>
                  <Text style={styles.hostLabel}>Hosted by</Text>
                  <Text style={styles.hostName}>John Smith</Text>
                </View>
              </View>

              <View style={styles.detailRow}>
                <Text style={styles.detailLabel}>🎯</Text>
                <Text style={styles.detailValue}>{jamm.selectedActivity}</Text>
              </View>

              <View style={styles.detailRow}>
                <Text style={styles.detailLabel}>📅</Text>
                <Text style={styles.detailValue}>
                  {formatDate(jamm.fromDate)} • {formatTime(jamm.fromDate)} -{" "}
                  {formatTime(jamm.toDate)}
                </Text>
              </View>

              <View style={styles.detailRow}>
                <Text style={styles.detailLabel}>📍</Text>
                <Text style={styles.detailValue}>{jamm.location}</Text>
              </View>

              <View style={styles.detailRow}>
                <Text style={styles.detailLabel}>👥</Text>
                <Text style={styles.detailValue}>{jamm.selectedGuest}</Text>
              </View>

              <View style={styles.detailRow}>
                <Text style={styles.detailLabel}>💰</Text>
                <Text style={styles.detailValue}>{jamm.fee || "Free"}</Text>
              </View>

              <View style={styles.additionalInfo}>
                <Text style={styles.infoText}>{jamm.description}</Text>
              </View>

              <TouchableOpacity style={styles.joinButton}>
                <Text style={styles.joinButtonText}>{jamm.selectedHides}</Text>
              </TouchableOpacity>
            </View>
          ))
        )}
      </ScrollView>

      {/* Floating Post Button */}
      <FloatingPostButton
        label="Post A JAM"
       // onPress={() => navigation.navigate("CreateJamm")}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff", paddingTop: 40 },
  filters: {
    marginBottom: 10,
    marginHorizontal: 12,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  filterBtn: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    backgroundColor: "#fff",
    borderRadius: 20,
    borderColor: "black",
    borderWidth: 0.2,
    marginRight: 6,
  },
  filterText: { fontSize: 12, fontWeight: "500", color: "black" },
  banner: { margin: 12, borderRadius: 12, overflow: "hidden" },
  bannerImage: { width: "100%", height: 160 },
  bannerOverlay: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    padding: 6,
    backgroundColor: "rgba(0,0,0,0.4)",
  },
  bannerText: { color: "white", fontSize: 16, fontWeight: "bold" },
  detailsContainer: { padding: 12 },
  title: { fontSize: 28, fontWeight: "700", marginBottom: 10 },
  description: { fontSize: 14, color: "#666", marginVertical: 6 },
  detailRow: { flexDirection: "row", marginVertical: 5 },
  detailLabel: { fontWeight: "600", marginRight: 6 },
  detailValue: {
    color: "#333",
    fontWeight: "600",
    marginLeft: 4,
    fontSize: 16,
  },
  joinButton: {
    width: 170,
    marginLeft: 200,
    backgroundColor: "black",
    // marginHorizontal: 120,
    paddingVertical: 12,
    borderRadius: 40,
    alignItems: "center",
  },
  joinButtonText: { color: "white", fontWeight: "bold" },
  additionalInfo: { padding: 12 },
  infoTitle: { fontSize: 16, fontWeight: "600", marginTop: 10 },
  infoText: { fontSize: 16, color: "#444", marginTop: 4, fontWeight: "400" },
  smallImageContainer: {
    marginHorizontal: 12,
    marginBottom: 12,
    alignItems: "center",
  },

  hostRow: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 12,
  },
  smallImage: {
    width: 80,
    height: 80,
    borderRadius: 12,
  },
  hostInfo: {
    marginLeft: 12,
    justifyContent: "center",
  },
  hostLabel: { fontSize: 14, color: "#666" },
  hostName: { fontSize: 16, fontWeight: "600", marginTop: 2 ,color:"#E82561"},
});
