import React, { useEffect, useState } from "react";
import { View, FlatList, Text, TouchableOpacity } from "react-native";
import { db } from "../firebase-config";
import { collection, getDocs } from "firebase/firestore";

const SubjectsScreen = ({ navigation }) => {
  const [subjects, setSubjects] = useState([]);

  useEffect(() => {
    const fetchSubjects = async () => {
      const data = await getDocs(collection(db, "subjects"));
      setSubjects(data.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
    };
    fetchSubjects();
  }, []);

  return (
    <View>
      <FlatList
        data={subjects}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => navigation.navigate("Chapters", { subjectId: item.id })}
          >
            <Text>{item.name}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

export default SubjectsScreen;
