import React, { useEffect, useState } from "react";
import { View, TextInput, Button, FlatList, Text, TouchableOpacity, Image } from "react-native";
import { db } from "../firebase-config";
import { collection, addDoc, deleteDoc, doc, getDocs, query, where } from "firebase/firestore";
import * as ImagePicker from "expo-image-picker";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";

const ManageQuestions = ({ route }) => {
  const { chapterId } = route.params;
  const [questions, setQuestions] = useState([]);
  const [newQuestion, setNewQuestion] = useState("");
  const [imageUri, setImageUri] = useState(null);

  const storage = getStorage();

  // Fetch questions linked to a specific chapter
  useEffect(() => {
    const fetchQuestions = async () => {
      const q = query(collection(db, "questions"), where("chapterId", "==", chapterId));
      const data = await getDocs(q);
      setQuestions(data.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
    };
    fetchQuestions();
  }, [chapterId]);

  // Add a new question with an optional image
  const addQuestion = async () => {
    let imageUrl = null;
    if (imageUri) {
      const storageRef = ref(storage, `questions/${Date.now()}`);
      const img = await fetch(imageUri);
      const bytes = await img.blob();
      await uploadBytes(storageRef, bytes);
      imageUrl = await getDownloadURL(storageRef);
    }

    if (newQuestion.trim()) {
      await addDoc(collection(db, "questions"), {
        question: newQuestion,
        imageUrl,
        chapterId,
      });
      setNewQuestion("");
      setImageUri(null);
      alert("Question added!");
    }
  };

  // Delete a question
  const deleteQuestion = async (id) => {
    await deleteDoc(doc(db, "questions", id));
    setQuestions(questions.filter((question) => question.id !== id));
    alert("Question deleted!");
  };

  // Pick an image
  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 1,
    });

    if (!result.cancelled) {
      setImageUri(result.uri);
    }
  };

  return (
    <View>
      <TextInput
        placeholder="New Question"
        value={newQuestion}
        onChangeText={setNewQuestion}
        style={{ borderBottomWidth: 1, marginBottom: 10 }}
      />
      <Button title="Pick Image" onPress={pickImage} />
      {imageUri && <Image source={{ uri: imageUri }} style={{ width: 100, height: 100 }} />}
      <Button title="Add Question" onPress={addQuestion} />
      <FlatList
        data={questions}
        renderItem={({ item }) => (
          <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
            <Text>{item.question}</Text>
            {item.imageUrl && (
              <Image source={{ uri: item.imageUrl }} style={{ width: 50, height: 50 }} />
            )}
            <TouchableOpacity onPress={() => deleteQuestion(item.id)}>
              <Text style={{ color: "red" }}>Delete</Text>
            </TouchableOpacity>
          </View>
        )}
      />
    </View>
  );
};

export default ManageQuestions;
