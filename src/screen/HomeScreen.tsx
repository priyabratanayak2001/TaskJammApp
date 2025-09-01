import React, { useState } from "react";
import { Platform } from "react-native";
import {
  View,
  Text,
  TextInput,
  Button,
  FlatList,
  StyleSheet,
  Alert,
} from "react-native";
// import DateTimePicker from "@react-native-community/datetimepicker";
import DateTimePickerModal from "react-native-modal-datetime-picker"
import { Picker } from "@react-native-picker/picker";
// import { v4 as uuidv4 } from "uuid";
import uuid from "react-native-uuid";

type Task = {
  id: string;
  title: string;
  description: string;
  createdAt: Date;
  deadline: Date;
  priority: "Low" | "Medium" | "High";
  completed: boolean;
  category?: string;
};

export default function TodoApp() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [priority, setPriority] = useState<"Low" | "Medium" | "High">("Low");
  const [deadline, setDeadline] = useState(new Date());
  //const [showDatePicker, setShowDatePicker] = useState(false);
  const [isDatePickerVisible, setDatePickerVisible] = useState(false);

  const addTask = () => {
    if (!title.trim()) {
      Alert.alert("Title is required");
      return;
    }

    const newTask: Task = {
      id: uuid.v4() as string,
      title,
      description,
      createdAt: new Date(),
      deadline,
      priority,
      completed: false,
      category,
    };

    setTasks([...tasks, newTask]);
    setTitle("");
    setDescription("");
    setCategory("");
    setPriority("Low");
  };

  const toggleComplete = (id: string) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const deleteTask = (id: string) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

 // Sort tasks
  const sortTasks = () => {
    const priorityOrder = { High: 1, Medium: 2, Low: 3 };

    const sorted = [...tasks].sort((a, b) => {
      // Incomplete first
      if (a.completed !== b.completed) return a.completed ? 1 : -1;
      // Priority
      if (a.priority !== b.priority) return priorityOrder[a.priority] - priorityOrder[b.priority];
      // Earliest deadline
      return a.deadline.getTime() - b.deadline.getTime();
    });

    setTasks(sorted);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>My To-Do App</Text>

      {/* Add Task Form */}
      <TextInput
        style={[styles.input, { color: '#666' }]}
        placeholder="Title"
        placeholderTextColor="#666"
        value={title}
        onChangeText={setTitle}
      />
      <TextInput
        style={[styles.input, { color: '#666' }]}
        placeholder="Description"
        placeholderTextColor="#666"
        value={description}
        onChangeText={setDescription}
      />
      <TextInput
        style={[styles.input, { color: '#666' }]}
        placeholder="Category (optional)"
        placeholderTextColor="#666"
        value={category}
        onChangeText={setCategory}
      />

      <View style={styles.row}>
        <Text style={{ color: '#666' }}>Priority:</Text>
        <Picker
          selectedValue={priority}
          style={{ height: 50, width: 150, color: '#666' }}
          onValueChange={(itemValue) =>
            setPriority(itemValue as "Low" | "Medium" | "High")
          }
        >
          <Picker.Item label="Low" value="Low" color="#666" />
          <Picker.Item label="Medium" value="Medium" color="#666" />
          <Picker.Item label="High" value="High" color="#666" />
        </Picker>
      </View>

      {/* Deadline Picker */}
      <View style={{ marginVertical: 10 }}>
        <Button
          title={deadline ? deadline.toLocaleString() : "Pick Date"}
          onPress={() => setDatePickerVisible(true)}
        />
        <DateTimePickerModal
          isVisible={isDatePickerVisible}
          mode="datetime"
          date={deadline}
          onConfirm={(date) => {
            setDeadline(date);
            setDatePickerVisible(false);
          }}
          onCancel={() => setDatePickerVisible(false)}
        />
      </View>

      <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginVertical: 10 }}>
        <View style={{ flex: 1, marginRight: 10 }}>
          <Button title="Add Task" onPress={addTask} />
        </View>
        <View style={{ flex: 1 }}>
          <Button title="Sort Tasks" onPress={sortTasks} color="#666" />
        </View>
      </View>

      {/* Task List */}
      <FlatList
        data={tasks}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View
            style={[
              styles.taskCard,
              { backgroundColor: item.completed ? "#d3ffd3" : "#fff" },
            ]}
          >
            <Text style={{ fontWeight: "bold" }}>{item.title}</Text>
            <Text>{item.description}</Text>
            <Text>Category: {item.category || "-"}</Text>
            <Text>Priority: {item.priority}</Text>
            <Text>Deadline: {item.deadline.toLocaleString()}</Text>
            <View style={{ height: 10 }} />
            <View style={styles.row}>
              <View style={{ flex: 1, marginLeft :2}}>
                <Button
                  title={item.completed ? "Undo" : "Complete"}
                  onPress={() => toggleComplete(item.id)}
                  color={item.completed ? undefined : '#007AFF'}
                />
              </View>
              <View style={{ flex: 1, marginLeft: 90 }}>
                <Button
                  title="Delete"
                  color="red"
                  onPress={() => deleteTask(item.id)}
                />
              </View>
            </View>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: "#f2f2f2",paddingTop:20 },
  heading: {
    marginTop: 20,
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    marginVertical: 5,
    borderRadius: 5,
    backgroundColor: "#fff",
  },
  taskCard: {
    padding: 15,
    marginVertical: 7,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#ccc",
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
});
