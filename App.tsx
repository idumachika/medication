import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import Login from "./src/screens/Login/Login";
import AsyncStorage from "@react-native-async-storage/async-storage";
import DashboardItems from "./src/screens/Dashboard/DashboardItems";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import MedicationDetail from "./src/components/MedicationDetails";
import { MedicationProvider } from './src/context/MedicationProvider';
import AddMedication from "./src/screens/AddMedication/AddMedication";
import EditMedication from "./src/screens/EditMedication/EditMedication";

const Stack = createNativeStackNavigator();

export default function App() {
  const [userEmail, setUserEmail] = useState({ email: "" });
  // AsyncStorage.clear();
  const findUser = async () => {
    const result = await AsyncStorage.getItem("email");
    if (result != null) {
      setUserEmail(JSON.parse(result));
      let data = JSON.parse(result);
      let price = data["email"];
    }

  };

  useEffect(() => {
    findUser();
  }, []);


  const RenderDetailScreen = (props: any) => <MedicationDetail {...props} />;

  if (!userEmail.email) return <Login onSubmit={findUser} />;
  return (
    <NavigationContainer>
      <MedicationProvider>
        <Stack.Navigator>
          <Stack.Screen
            options={{
              headerTitle: 'dashboard',
            }}
            name="dashboard">
            {props => <DashboardItems {...props} setUserEmail={setUserEmail} />}
          </Stack.Screen>
          <Stack.Screen
            name="MedicationDetail"
            component={RenderDetailScreen}
          />
          <Stack.Screen
            options={{
              headerTitle: 'Add Medication',
            }}
            name="AddMedication"
            component={AddMedication}
          />

          <Stack.Screen
            options={{
              headerTitle: 'Edit Medication',
            }}
            name="EditMedication"
            component={EditMedication}
          />
        </Stack.Navigator>
      </MedicationProvider>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#1e90ff",
  },
});
