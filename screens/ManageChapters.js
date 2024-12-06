import React, { useEffect, useState } from "react";
import { View, TextInput, Button, FlatList, Text, TouchableOpacity } from "react-native";
import { db } from "../firebase-config";
import { collection, addDoc, deleteDoc, doc, getDocs, query, where } from "firebase/firestore";

const ManageChapters = ({ route }) => {
  const { subjectId } = route.params;
  const [chapters, setChapters] = useState([]);
  const [newChapter, setNewChapter] = useState("");

  // Fetch chapters linked to a specific subject
  useEffect(() => {
    const fetchChapters = async () => {
      const q = query(collection(db, "chapters"), where("subjectId", "==", subjectId));
      const data = await getDocs(q);
      setChapters(data.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
    };
    fetchChapters();
  }, [subjectId]);

  // Add a new chapter
  const addChapter = async () => {
    if (newChapter.trim()) {
      await addDoc(collection(db, "chapters"), { name: newChapter, subjectId });
      setNewChapter("");
      alert("Chapter added!");
    }
  };

  // Delete a chapter
  const deleteChapter = async (id) => {
    await deleteDoc(doc(db, "chapters", id));
    setChapters(chapters.filter((chapter) => chapter.id !== id));
    alert("Chapter deleted!");
  };

  return (
    <View>
      <TextInput
        placeholder="New Chapter"
        value={newChapter}
        onChangeText={setNewChapter}
        style={{ borderBottomWidth: 1, marginBottom: 10 }}
      />
      <Button title="Add Chapter" onPress={addChapter} />
      <FlatList
        data={chapters}
        renderItem={({ item }) => (
          <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
            <Text>{item.name}</Text>
            <TouchableOpacity onPress={() => deleteChapter(item.id)}>
              <Text style={{ color: "red" }}>Delete</Text>
            </TouchableOpacity>
          </View>
        )}
      />
    </View>
  );
};

export default ManageChapters;

