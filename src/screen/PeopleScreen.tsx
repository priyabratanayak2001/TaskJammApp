
import React from "react";
import {
  View,
  Text,
  FlatList,
  Image,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { useNavigation, NavigationProp } from "@react-navigation/native";
import Header from "../Components/Header";
import FloatingPostButton from "../Components/FloatingPostButton";

type RootTabParamList = {
  People: undefined;
  Jams: undefined;
  Request: undefined;
  chats: undefined;
};

const people = [
  {
    id: "1",
    name: "Kavya Raj",
    age: 24,
    role: "Associate Product Manager",
    img: require("../asserts/image2.png"),
    desc: "Creative thinker, loves product design and exploring new cafes.",
  },
  {
    id: "2",
    name: "Pratheep",
    age: 28,
    role: "Associate Product Manager",
    img: require("../asserts/img1.png"),
    desc: "Tech enthusiast, passionate about AI and fitness training.",
  },
  {
    id: "3",
    name: "preetipar",
    age: 22,
    role: "java fullstack Developer sd2",
    img: require("../asserts/img3.png"),
    desc: "Tech enthusiast, passionate about AI and fitness training.",
  },
];

export default function PeopleScreen() {

   const navigation = useNavigation<NavigationProp<RootTabParamList>>();

  return (
    <View style={styles.container}>
     
       {/* Reusable header */}
      <Header city="BLR" title="People" profileUri="https://randomuser.me/api/portraits/women/44.jpg" badgeText="42%" />

      {/* Filter row */}
      <View style={styles.filters}>
        <TouchableOpacity style={styles.filterBtn}>
          <Text style={styles.filterText}>Interests </Text>
          <View style={styles.filterValueContainer}>
            <Text style={styles.filterValue}>6</Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity style={styles.filterBtn}>
          <Text style={styles.filterText}>Age </Text>
          <View style={styles.filterValueContainer}>
            <Text style={styles.filterValue}>18–32</Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity style={styles.filterBtn}>
          <Text style={styles.filterText}>Gender </Text>
          <View style={styles.filterValueContainer}>
            <Text style={styles.filterValue}>W</Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity style={styles.filterBtn}>
          <Text style={styles.filterText}>Under </Text>
          <View style={styles.filterValueContainer}>
            <Text style={styles.filterValue}>15 km</Text>
          </View>
        </TouchableOpacity>
      </View>

      {/* People list */}
      <FlatList
        data={people}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ alignItems: "center" }}
        renderItem={({ item }) => (
          <View style={styles.card}>
            {/* Top text */}
            <Text style={styles.name}>
              {item.name} {item.age}
            </Text>

            <Text style={styles.role}>{item.role}</Text>

            {/* Avatar image */}
            <Image source={item.img} style={styles.avatar} resizeMode="cover" />

            {/* Description */}
            <Text style={styles.desc}>{item.desc}</Text>
          </View>
        )}
      />

      <FloatingPostButton 
  label="Post A JAM"   
  onPress={() => navigation.navigate("Jams")}
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
    paddingHorizontal: 10,
    paddingVertical: 8,
    justifyContent: "space-between",
  },
  filterBtn: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 8,
    paddingVertical: 4,
    backgroundColor: "white",
    borderRadius: 20,
    marginRight: 6,
    borderBlockColor: "black",
    borderWidth: 0.1,
  },
  filterText: {
    fontSize: 12,
    fontWeight: "500",
    color: "black", // normal text
  },
  filterValueContainer: {
    backgroundColor: "black",
    borderRadius: 12,
    paddingHorizontal: 6,
    paddingVertical: 2,
    marginLeft: 4,
  },
  filterValue: {
    color: "white",
    fontSize: 12,
    fontWeight: "600",
  },

  // People card
  card: {
    width: 380,
    height: 500,
    backgroundColor: "#fff",
    marginVertical: 10,
    padding: 12,
    borderRadius: 12,
    elevation: 2,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 4,
    alignItems: "center",
  },

  avatar: {
    width: 340,
    height: 365,
    borderRadius: 12,
    marginVertical: 8,
  },

  name: {
    fontSize: 22,
    fontWeight: "700",
    marginRight: 200,
    marginTop: 3,
    fontFamily: "Inter Tight",
  },
  role: {
    fontSize: 14,
    color: "black",
    marginBottom: 6,
    textAlign: "center",
    marginRight: 155,
    fontFamily: "Inter Tight",
  },
  desc: { fontSize: 13, color: "#333", paddingLeft: 10 },

  // Floating Post button
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
