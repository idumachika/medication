import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import Login from "./src/screens/Login/Login";
import AsyncStorage from "@react-native-async-storage/async-storage";
import InventoryScreen from "./src/screens/Inventory/InventoryItems";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import InventoryDetail from "./src/components/InventoryDetails";
import { InventoryProvider } from "./src/context/InventoryProvider";
import AddInventoryItems from "./src/screens/AddInventory/AddInventoryItems";
import EditInventory from "./src/screens/EditInventory/EditInventory";

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


  const RenderDetailScreen = (props: any) => <InventoryDetail {...props} />;

  if (!userEmail.email) return <Login onSubmit={findUser} />;
  return (
    <NavigationContainer>
      <InventoryProvider>
        <Stack.Navigator>
          <Stack.Screen  options={{
              headerTitle: "Inventories",
            }} name="InventoryScreen">
          {props => <InventoryScreen {...props} setUserEmail={setUserEmail} />}
          </Stack.Screen>
          <Stack.Screen name="Inventory Detail" component={RenderDetailScreen} />
          <Stack.Screen
            options={{
              headerTitle: "Add New Inventory",
            }}
            name="InventoryAddScreen"
            component={AddInventoryItems}
          />

          <Stack.Screen
            options={{
              headerTitle: "Edit Inventory",
            }}
            name="InventoryEditScreen"
            component={EditInventory}
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
