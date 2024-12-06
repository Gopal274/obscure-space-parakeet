import React from "react";
import { View, Button } from "react-native";

const AdminDashboard = ({ navigation }) => {
  return (
    <View>
      <Button title="Manage Subjects" onPress={() => navigation.navigate("Manage Subjects")} />
      <Button title="Manage Chapters" onPress={() => navigation.navigate("Manage Chapters")} />
      <Button title="Manage Questions" onPress={() => navigation.navigate("Manage Questions")} />
    </View>
  );
};

export default AdminDashboard;
