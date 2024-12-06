import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import SubjectsScreen from "./screens/SubjectsScreen";
import AdminLogin from "./screens/AdminLogin";
import AdminDashboard from "./screens/AdminDashboard";
import ManageSubjects from "./screens/ManageSubjects";
import ManageChapters from "./screens/ManageChapters";
import ManageQuestions from "./screens/ManageQuestions";

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Subjects">
        <Stack.Screen name="Subjects" component={SubjectsScreen} />
        <Stack.Screen name="Chapters" component={ChaptersScreen} />
        <Stack.Screen name="Questions" component={QuestionsScreen} />
        <Stack.Screen name="Admin Login" component={AdminLogin} />
        <Stack.Screen name="Admin Dashboard" component={AdminDashboard} />
        <Stack.Screen name="Manage Subjects" component={ManageSubjects} />
        <Stack.Screen name="Manage Chapters" component={ManageChapters} />
        <Stack.Screen name="Manage Questions" component={ManageQuestions} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
