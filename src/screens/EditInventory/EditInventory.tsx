import { View, Text,StyleSheet, TextInput, Keyboard, Alert } from 'react-native'
import React, { useEffect, useState } from 'react'
import { TouchableWithoutFeedback } from 'react-native';
import CustomButton from '../../components/CustomButton';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useInventory } from '../../context/InventoryProvider';

const EditInventory= ({navigation,route}:any) => {

  const inventory = route.params.inventory ;
  
  const {inventories, setInventories} = useInventory();

  const [newItem, setnewItem] = useState({
    name: "",
    total: "",
    price: "",
    desc: ""
  })

  useEffect(() => {
    setnewItem({...inventory})
  }, [inventory])
  
console.log({newItem});


  

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
      Alert.alert("Please fill in all fields");
      return;
    }

    const newItem = {
      name,
      desc,
      total: +total,
      price: +price,
      id:inventory.id
    };
    

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
      const items = await AsyncStorage.getItem("inventories");
      const parsedItems = items ? JSON.parse(items) : [];
      const newItemList = parsedItems.map((item: { id: string; }) => {
        if (item.id === inventory.id) {
          return newItem
        }
        return item;
      })
  
      
      await AsyncStorage.setItem('inventories', JSON.stringify(newItemList));  
      setInventories(newItemList)
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
            value={total.toString()}
            keyboardType="numeric"
          />
          <TextInput
            style={[styles.input, styles.price]}
            placeholder="Price"
            onChangeText={(text) => updateNewItem({label: 'price', value:text})}
            value={price.toString()}
            keyboardType="numeric"
          />
          <TextInput
            style={[styles.input, styles.desc]}
            placeholder="Description"
            onChangeText={(text) => updateNewItem({label:'desc', value:text})}
            value={desc}
          />

          <CustomButton
            title={"Edit Inventory"}
            backgroundColor={"#0074D9"}
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
    borderColor: "#DDDDDD",
    fontSize: 15,
    paddingHorizontal:8,
    borderRadius:4,
    color: '#000',
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
export default EditInventory;