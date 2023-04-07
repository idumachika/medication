import { View, Text,StyleSheet, TextInput, Keyboard, Alert } from 'react-native'
import React, { useState } from 'react'
import { TouchableWithoutFeedback } from 'react-native';
import CustomButton from '../../components/CustomButton';
import AsyncStorage from '@react-native-async-storage/async-storage';
import uuid from 'react-native-uuid';
import { useInventory } from '../../context/InventoryProvider';

const AddInventory = ({navigation}:any) => {
  const {inventories, setInventories} = useInventory();

  const [newItem, setnewItem] = useState({
    name: "",
    total: "",
    price: "",
    desc: ""
  })

  type NewItemType = {
      label: keyof typeof newItem;
      value: string;
  }

  const updateNewItem = ({label,value}: NewItemType) => {
    setnewItem({...newItem,[label]: value})
  }

  const {
    name,
    total,
    price,
    desc
  } = newItem

  const handleSubmit = async () => {
    if (!name || !total || !price || !desc) {
      // Display an error message if any of the fields are empty
      Alert.alert("Please fill in all fields");
      return;
    }

    const newItem = {
      name,
      desc,
      total: +total,
      price: +price,
      id:uuid.v4()
    };
    

    // Check if the name already exists in the inventory
    const items = await AsyncStorage.getItem("inventories");
    const parsedItems = items ? JSON.parse(items) : [];
    const nameExists = parsedItems.some(
      (item: NewItemType) => item.name === newItem.name
    );
    if (nameExists) {
      Alert.alert("An item with this name already exists in the inventory");
      return;
    }

    // Check if the description has at least three words
    const descWords = newItem.desc.split(" ");
    if (descWords.length < 3) {
      Alert.alert("Description must have at least three words");
      return;
    }

    const parsedTotal = newItem.total;
    const parsedPrice = newItem.price;

    if (isNaN(parsedTotal) || isNaN(parsedPrice)) {
      Alert.alert("Please enter valid numbers for Total and Price");
      return;
    }

    try {
      const jsonValue = JSON.stringify([...inventories, newItem]);
      setInventories([...inventories, newItem]);
      await AsyncStorage.setItem('inventories', jsonValue);  
      navigation.navigate('InventoryScreen')
    } catch (e) {
      console.log(e);
    }
  };




  return (
    <View style ={{flex:1}}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.container}>
          <TextInput
            style={[styles.input, styles.name]}
            placeholder="Name"
            onChangeText={(text) => updateNewItem({label:'name', value:text})}
            value={name}
          />
          <TextInput
            style={[styles.input, styles.total]}
            placeholder="Total"
            onChangeText={(text) => updateNewItem({label:'total', value:text})}
            value={total}
            keyboardType="numeric"
            
          />
          <TextInput
            style={[styles.input, styles.price]}
            placeholder="Price"
            onChangeText={(text) => updateNewItem({label: 'price', value:text})}
            value={price}
            keyboardType="numeric"
          />
          <TextInput
            style={[styles.input, styles.desc]}
            placeholder="Description"
            onChangeText={(text) => updateNewItem({label:'desc', value:text})}
            value={desc}
          />

          <CustomButton
            title={"OK"}
            backgroundColor={"#2ecc71"}
            textColor={"#fff"}
            onPress={handleSubmit}
          ></CustomButton>
         
        </View>
      </TouchableWithoutFeedback>
  </View>
  )
}
const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    flex: 1,
    backgroundColor: "#fff",
    justifyContent: "center",
  },
  modalBG: {
    flex: 1,
    zIndex: -1,
  },
  addButton: {
    backgroundColor: "#007aff",
  },
  addButtonLabel: {
    fontSize: 32,
    color: "#fff",
  },
  input: {
    borderWidth: 1,
    borderColor: "#007aff",
    fontSize: 15,
    paddingHorizontal:8,
    borderRadius:4,
    color: "#007aff",
  },
  name: {
    height: 40,
    marginBottom: 15,
    fontWeight: "bold",
  },
  total: {
    height: 40,
    marginBottom: 15,
    fontWeight: "bold",
  },
  price: {
    height: 40,
    marginBottom: 15,
    fontWeight: "bold",
  },
  desc: {
    height: 40,
    marginBottom: 15,
    fontWeight: "bold",
  },
});
export default AddInventory;