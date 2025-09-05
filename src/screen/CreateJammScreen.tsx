import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  Platform,
} from "react-native";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import { useNavigation } from "@react-navigation/native";
import DateTimePicker, {
  DateTimePickerEvent,
} from "@react-native-community/datetimepicker";
import FloatingPostButton from "../Components/FloatingPostButton";

const activities = [
  "Breakfast",
  "Brunch",
  "Lunch",
  "Dinner",
  "Coffee",
  "Picnic",
  "Barbecue",
  "Board Games",
  "House Party",
  "Potluck",
  "Bike Ride",
  "Movie",
  "Road Trip",
  "Karaoke",
  "Outdoor Event",
  "Concert",
  "Party",
  "Live Music",
  "Art & Craft",
  "Volunteer",
  "Cooking",
  "Health & Fitness",
  "Themed Party",
  "Book Reading",
  "Gaming",
  "Shopping",
  "Nature Walking",
];
const whoPlayingOptions = [
  "Friends",
  "Family",
  "Colleagues",
  "Neighbours",
  "Everyone",
];

const playOptions = [
  {
    label: "Requested",
    image: require("../asserts/image2.png"), 
  },
  
  {
    label: "Request to JAMM",
    image: require("../asserts/img1.png"),
  },
  {
    label: "Attending",
    image: require("../asserts/img3.png"),
  },
];

export default function CreateJammScreen() {
  const navigation = useNavigation();
  const [jammName, setJammName] = useState("");
  const [description, setDescription] = useState("");
  const [location, setLocation] = useState("");
  const [selectedHides, setSelectedHides] = useState("");
  const [url, setUrl] = useState("");
  const [selectedActivity, setSelectedActivity] = useState<string | null>(null);
  const [selectedGuest, setSelectedGuest] = useState<number | null>(null);
  const [selectedPlayOption, setSelectedPlayOption] = useState<string | null>(
    null
  );

  // From/To Dates
  const [fromDate, setFromDate] = useState(new Date());
  const [toDate, setToDate] = useState(
    new Date(Date.now() + 2 * 60 * 60 * 1000)
  );
  const [showFromPicker, setShowFromPicker] = useState(false);
  const [showFromTimePicker, setShowFromTimePicker] = useState(false);
  const [showToPicker, setShowToPicker] = useState(false);
  const [showToTimePicker, setShowToTimePicker] = useState(false);

  // Formatting
  const formatDate = (date: Date) =>
    date.toLocaleDateString("en-GB", { day: "2-digit", month: "2-digit" });
  const formatTime = (date: Date) =>
    date.toLocaleTimeString("en-GB", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    });

  // Handlers
  const onFromDateChange = (_event: DateTimePickerEvent, selected?: Date) => {
    setShowFromPicker(false);
    if (selected) {
      const newDate = new Date(fromDate);
      newDate.setFullYear(
        selected.getFullYear(),
        selected.getMonth(),
        selected.getDate()
      );
      setFromDate(newDate);

      if (Platform.OS === "android") setShowFromTimePicker(true);
    }
  };

  const onFromTimeChange = (_event: DateTimePickerEvent, selected?: Date) => {
    setShowFromTimePicker(false);
    if (selected) {
      const newDate = new Date(fromDate);
      newDate.setHours(selected.getHours(), selected.getMinutes());
      setFromDate(newDate);

      // Ensure toDate >= fromDate
      if (newDate > toDate) {
        const newTo = new Date(newDate);
        newTo.setHours(newTo.getHours() + 2);
        setToDate(newTo);
      }
    }
  };

  const onToDateChange = (_event: DateTimePickerEvent, selected?: Date) => {
    setShowToPicker(false);
    if (selected) {
      const newDate = new Date(toDate);
      newDate.setFullYear(
        selected.getFullYear(),
        selected.getMonth(),
        selected.getDate()
      );
      setToDate(newDate);

      if (Platform.OS === "android") setShowToTimePicker(true);
    }
  };

  const onToTimeChange = (_event: DateTimePickerEvent, selected?: Date) => {
    setShowToTimePicker(false);
    if (selected) {
      const newDate = new Date(toDate);
      newDate.setHours(selected.getHours(), selected.getMinutes());
      if (newDate > fromDate) setToDate(newDate);
    }
  };

  const handlePostJamm = () => {
    const jammData = {
      jammName,
      description,
      location,
      selectedHides,
      url,
      selectedActivity,
      selectedGuest,
      selectedPlayOption,
      fromDate,
      toDate,
    };

    navigation.navigate("Request", { jammData });
  };

  return (
    <ScrollView style={styles.container} keyboardShouldPersistTaps="handled">
      {/* Close Button */}
      <TouchableOpacity
        style={styles.closeButton}
        onPress={() => navigation.goBack()}
      >
        <MaterialIcons name="close" size={28} color="#000" />
      </TouchableOpacity>

      <Text
        style={[
          styles.heading,
          { marginLeft: 50, marginBottom: 50, color: "black" },
        ]}
      >
        Create your Jamm
      </Text>

      {/* Jamm Name */}
      <Text style={styles.label}>Jamm Name</Text>
      <TextInput
        placeholder="Type here"
        placeholderTextColor="#B0B0B0"
        style={[styles.input, { fontSize: 24, color: "#000" }]}
        value={jammName}
        onChangeText={setJammName}
        maxLength={35}
      />
      <Text style={styles.charCount}>Min 10 {jammName.length}/35</Text>

      {/* Activities */}
      <Text style={[styles.heading, { marginTop: 20, color: "#B0B0B0" }]}>
        Activity
      </Text>
      <View style={styles.activityContainer}>
        {activities.map((item, index) => (
          <TouchableOpacity
            key={index}
            style={[
              styles.activityButton,
              selectedActivity === item && styles.selectedActivity,
            ]}
            onPress={() => setSelectedActivity(item)}
          >
            <Text
              style={[
                styles.activityText,
                selectedActivity === item && { color: "white" },
              ]}
            >
              {item}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Number of Guests */}
      <Text style={[styles.heading, { marginTop: 20 }]}>Number of Guests</Text>
      <View style={styles.guestContainer}>
        {[1, 2, 3, 4, 5, 6, 7].map((num) => (
          <TouchableOpacity
            key={num}
            style={[
              styles.guestCircle,
              selectedGuest === num && styles.selectedGuest,
            ]}
            onPress={() => setSelectedGuest(num)}
          >
            <Text
              style={[
                styles.guestText,
                selectedGuest === num && { color: "white" },
              ]}
            >
              {num}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Who’s Playing */}
      <Text style={[styles.heading, { marginTop: 20 }]}>Who’s Playing</Text>
      <View style={styles.activityContainer}>
        {whoPlayingOptions.map((item, index) => (
          <TouchableOpacity
            key={index}
            style={[
              styles.activityButton,
              selectedPlayOption === item && styles.selectedActivity,
            ]}
            onPress={() => setSelectedPlayOption(item)}
          >
            <Text
              style={[
                styles.activityText,
                selectedPlayOption === item && { color: "white" },
              ]}
            >
              {item}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Location */}
      <Text style={styles.label}>Location</Text>
      <TextInput
        placeholder="Type here"
        placeholderTextColor="#B0B0B0"
        style={[
          styles.input,
          { fontSize: 24, color: "#000", marginBottom: 30 },
        ]}
        value={location}
        onChangeText={setLocation}
        maxLength={35}
      />

      {/* Description */}
      <Text style={styles.label}>Description</Text>
      <TextInput
        placeholder="Type here"
        placeholderTextColor="#B0B0B0"
        style={[styles.input, { fontSize: 24, color: "#000" }]}
        value={description}
        onChangeText={setDescription}
        maxLength={150}
      />
      <Text style={styles.charCount}>Min 35 {description.length}/150</Text>

      {/* Date & Time */}
      <View style={styles.dateTimeSection}>
        <Text style={styles.sectionLabel}>Date & Time</Text>

        <View style={styles.dateTimeRow}>
          <View style={styles.dateTimeColumn}>
            <Text style={styles.dateTimeLabel}>From</Text>
            <TouchableOpacity
              style={styles.dateTimeButton}
              onPress={() => setShowFromPicker(true)}
            >
              <Text style={styles.dateTimeText}>{formatDate(fromDate)}</Text>
              <Text style={styles.dateTimeText}>{formatTime(fromDate)}</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.dateTimeColumn}>
            <Text style={styles.dateTimeLabel}>To</Text>
            <TouchableOpacity
              style={styles.dateTimeButton}
              onPress={() => setShowToPicker(true)}
            >
              <Text style={styles.dateTimeText}>{formatDate(toDate)}</Text>
              <Text style={styles.dateTimeText}>{formatTime(toDate)}</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>

      {/* Pickers */}
      {showFromPicker && (
        <DateTimePicker
          value={fromDate}
          mode="date"
          display="default"
          onChange={onFromDateChange}
          minimumDate={new Date()}
        />
      )}
      {showFromTimePicker && (
        <DateTimePicker
          value={fromDate}
          mode="time"
          display="default"
          onChange={onFromTimeChange}
        />
      )}
      {showToPicker && (
        <DateTimePicker
          value={toDate}
          mode="date"
          display="default"
          onChange={onToDateChange}
          minimumDate={fromDate}
        />
      )}
      {showToTimePicker && (
        <DateTimePicker
          value={toDate}
          mode="time"
          display="default"
          onChange={onToTimeChange}
        />
      )}

      <Text style={styles.label}>Map URL(OPtional)</Text>
      <TextInput
        placeholder="Place here"
        placeholderTextColor="#B0B0B0"
        style={[styles.input, { fontSize: 24, color: "#000" }]}
        value={url}
        onChangeText={setUrl}
        maxLength={35}
      />

      <Text style={[styles.label, { marginTop: 20, marginBottom: 15 }]}>
        Hides from the Circles(Optional)
      </Text>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          marginHorizontal: 5,
          marginBottom: 120,
        }}
      >
        {playOptions.map((item, index) => (
          <TouchableOpacity
            key={index}
            style={[
              styles.playButton,
              selectedHides === item.label && styles.selectedActivity,
            ]}
            onPress={() => setSelectedHides(item.label)}
          >
            {/* Circular image */}
            <View style={styles.imageContainer}>
              <Image source={item.image} style={styles.playImage} />
            </View>

            <Text
              style={[
                styles.playText,
                selectedPlayOption === item.label && { color: "white" },
              ]}
            >
              {item.label}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Floating button above bottom tab */}
      <FloatingPostButton label="Post JAM" onPress={handlePostJamm} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, marginTop: 20 },
  closeButton: {
    alignSelf: "flex-end",
    padding: 5,
  },
  label: {
    color: "#B0B0B0",
    fontSize: 20,
    fontWeight: "500",
    marginHorizontal: 10,
    //marginBottom: 6,
    fontFamily: "Inter Tight",
  },

  charCount: {
    alignSelf: "flex-end",
    marginRight: 12,
    marginTop: 4,
    fontSize: 12,
    color: "#666",
  },

  heading: {
    color: "#B0B0B0",
    fontSize: 32,
    fontWeight: "500",
    marginBottom: 12,
    marginHorizontal: 10,
  },
  input: {
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 10,
    marginBottom: 12,
  },
  text: { marginTop: 12, fontSize: 16 },

  activityContainer: {
    marginBottom: 20,
    marginHorizontal: 10,
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "flex-start",
  },
  activityButton: {
    borderWidth: 1,
    borderColor: "#aaa",
    borderRadius: 20,
    paddingVertical: 8,
    paddingHorizontal: 14,
    margin: 6,
  },
  selectedActivity: {
    backgroundColor: "#E82561",
    borderColor: "#E82561",
  },
  activityText: { fontSize: 14 },
  guestContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginHorizontal: 10,
  },
  guestCircle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "#aaa",
    margin: 6,
    alignItems: "center",
    justifyContent: "center",
  },
  selectedGuest: {
    backgroundColor: "#f44",
    borderColor: "#f44",
  },
  guestText: { fontSize: 16 },
  dateTimeSection: {
    marginBottom: 25,
  },
  sectionLabel: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 12,
    color: "#000",
  },
  dateTimeRow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  dateTimeColumn: {
    width: "48%",
  },
  dateTimeLabel: {
    fontSize: 14,
    color: "#B0B0B0",
    marginBottom: 5,
  },
  dateTimeButton: {
    borderWidth: 1,
    borderColor: "#E0E0E0",
    borderRadius: 8,
    padding: 12,
  },
  dateTimeText: {
    fontSize: 16,
    color: "#000",
    textAlign: "center",
  },
  playButton: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 5,
    paddingHorizontal: 15,
    borderWidth: 1,
    borderColor: "#aaa",
    borderRadius: 20,
    marginHorizontal: 4,
    flex: 1, // makes buttons share space evenly
    justifyContent: "center",
  },

  imageContainer: {
    width: 24,
    height: 24,
    borderRadius: 12,
    overflow: "hidden",
    marginRight: 8,
    justifyContent: "center",
    alignItems: "center",
  },

  playImage: {
    width: 24,
    height: 24,
    borderRadius: 12,
  },

  playText: {
    fontSize: 14,
    color: "#000",
  },
});
