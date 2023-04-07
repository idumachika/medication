import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import Login from "./src/screens/LoginScreen";
import AsyncStorage from "@react-native-async-storage/async-storage";
import InventoryScreen from "./screens/InventoryScreen/InventoryScreen";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import InventoryDetail from "./src/components/InventoryDetails";
import { InventoryProvider } from "./src/context/InventoryProvider";
// import InventoryAddScreen from "./screens/inventoryAdd/InventoryAddScreen";
// import InventoryEditScreen from "./screens/InventoryEdit/InventoryEditScreen";

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


  const RenderDetaiScreen = (props: any) => <InventoryDetail {...props} />;

  if (!userEmail.email) return <Login onSubmit={findUser} />;
  return (
    <NavigationContainer>
      <InventoryProvider>
        <Stack.Navigator>
          <Stack.Screen  options={{
              headerTitle: "Inventories",
            }} name="InventoryScreen" >
          {props => <InventoryScreen {...props} setUserEmail={setUserEmail} />}
          </Stack.Screen>
          <Stack.Screen name="Inventory Detail" component={RenderDetaiScreen} />
          <Stack.Screen
            options={{
              headerTitle: "Add New Inventory",
            }}
            name="InventoryAddScreen"
            component={InventoryAddScreen}
          />

          <Stack.Screen
            options={{
              headerTitle: "Edit Inventory",
            }}
            name="InventoryEditScreen"
            component={InventoryEditScreen}
          />
        </Stack.Navigator>
      </InventoryProvider>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#1e90ff",
  },
});
