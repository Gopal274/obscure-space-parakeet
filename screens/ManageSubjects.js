import React, { useEffect, useState } from "react";
import { View, TextInput, Button, FlatList, Text, TouchableOpacity } from "react-native";
import { db } from "../firebase-config";
import { collection, addDoc, deleteDoc, doc, getDocs } from "firebase/firestore";

const ManageSubjects = () => {
  const [subjects, setSubjects] = useState([]);
  const [newSubject, setNewSubject] = useState("");

  // Fetch subjects from Firebase
  useEffect(() => {
    const fetchSubjects = async () => {
      const data = await getDocs(collection(db, "subjects"));
      setSubjects(data.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
    };
    fetchSubjects();
  }, []);

  // Add a new subject
  const addSubject = async () => {
    if (newSubject.trim()) {
      await addDoc(collection(db, "subjects"), { name: newSubject });
      setNewSubject("");
      alert("Subject added!");
    }
  };

  // Delete a subject
  const deleteSubject = async (id) => {
    await deleteDoc(doc(db, "subjects", id));
    setSubjects(subjects.filter((subject) => subject.id !== id));
    alert("Subject deleted!");
  };

  return (
    <View>
      <TextInput
        placeholder="New Subject"
        value={newSubject}
        onChangeText={setNewSubject}
        style={{ borderBottomWidth: 1, marginBottom: 10 }}
      />
      <Button title="Add Subject" onPress={addSubject} />
      <FlatList
        data={subjects}
        renderItem={({ item }) => (
          <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
            <Text>{item.name}</Text>
            <TouchableOpacity onPress={() => deleteSubject(item.id)}>
              <Text style={{ color: "red" }}>Delete</Text>
            </TouchableOpacity>
          </View>
        )}
      />
    </View>
  );
};

export default ManageSubjects;
