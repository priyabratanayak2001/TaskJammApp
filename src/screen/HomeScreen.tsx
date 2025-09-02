
import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Button,
} from "react-native";
import axios from "axios"; 

type Post = {
  id: number;
  title: string;
  body: string;
};

export default function HomeScreen({ navigation }: any) {
  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get("https://jsonplaceholder.typicode.com/posts");
        setPosts(response.data);
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    };

    fetchPosts(); //  call the async function
  }, []);

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerText}>📌 Posts</Text>
      </View>

      {/* Body */}
      <View style={styles.body}>
        <FlatList
          data={posts}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={styles.card}
              onPress={() => navigation.navigate("Details", { post: item })}
            >
              <Text style={styles.title}>{item.title}</Text>
              <Text numberOfLines={2}>{item.body}</Text>
            </TouchableOpacity>
          )}
        />
      </View>

      {/* Footer */}
      <View style={styles.footer}>
        <Text style={styles.footerText}>End of List</Text>
        <Button
          title="Go to Counter"
          onPress={() => navigation.navigate("Counter")}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 ,paddingTop:40,paddingBottom:20},
  header: { padding: 20, backgroundColor: "#4CAF50", alignItems: "center" },
  headerText: { fontSize: 20, color: "white", fontWeight: "bold" },
  body: { flex: 1, padding: 10,paddingHorizontal:15 },
  footer: {
    padding: 15,
    backgroundColor: "#eee",
    alignItems: "center",
    borderTopWidth: 1,
    borderColor: "#ccc",
  },
  footerText: { fontSize: 16, marginBottom: 5 },
  card: {
    padding: 15,
    marginVertical: 8,
    backgroundColor: "#f9f9f9",
    borderRadius: 8,
    elevation: 2,
  },
  title: { fontSize: 16, fontWeight: "bold", marginBottom: 5 },
});








