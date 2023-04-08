import React, {useEffect, useState} from 'react';
import { View, Text, StyleSheet } from 'react-native';
import DeleteButton from './DeleteButton';
import EditButton from './EditButton';
import { Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import { useInventory } from '../context/InventoryProvider';

type Props = {
  item: Item;
};

type Item = {
  name: string;
  total: number;
  price: number;
  desc: string;
};

type Props2 = {
  route: {
    params: {
      id: string;
    };
  };
};

interface DetailsScreenProps {
  item: Item;
}


const InventoryDetails: React.FC<Props2> = ({ route}: Props2) => {
 const inventoryId = route.params.id ; 
 const navigation = useNavigation();
 const {inventories,setInventories} = useInventory();
 const [inventory, setInventory] = useState<Item>();


 useEffect(() => {
   const details = inventories.find(c => c.id === inventoryId) as Item
   setInventory(details)
 }, [])
 
 


 const deleteInventory = async () => {
    console.log('yes');
    const items = await AsyncStorage.getItem('inventories'); 
    let inventories = [];
    if (items != null) inventories = JSON.parse(items);
    const newInventory = inventories.filter((n: Item) => n.name !==(inventory.name)); 
    setInventories(newInventory);
    await AsyncStorage.setItem('inventories', JSON.stringify(newInventory));
    navigation.goBack(); 
};


const displayDeleteAlert = () => {
  Alert.alert(
    'Are You Sure!',
    'This action will delete your inventory permanently!',
    [
      {
        text: 'Delete',
        onPress:deleteInventory,
      },
      {
        text: 'No Thanks',
        onPress: () => console.log('no thanks'),
      },
    ],
    {
      cancelable: true,
    }
  );
};


const getItems = async (): Promise<Item[]> => {
  try {
    const itemsJson = await AsyncStorage.getItem('items');
    if (itemsJson !== null) {
      return JSON.parse(itemsJson);
    }
    return [];
  } catch (error) {
    console.error('Error retrieving items from AsyncStorage:', error);
    return [];
  }
};

if (inventory === undefined) {
  return null
}
 
return (
  
    <View style={styles.container}>
      <Text style={styles.name}>Name: {inventory.name}</Text>
      <Text style={styles.total}>Total: {inventory.total}</Text>
      <Text style={styles.price}>Price: {inventory.price}</Text>
      <Text style={styles.price}>Desc: {inventory.desc}</Text>

      <DeleteButton onPress={displayDeleteAlert}></DeleteButton>
      <EditButton  onPress={() => navigation.navigate('InventoryEditScreen' as never, {inventory})}></EditButton>
    </View>

    
    
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: '#ddd',
    borderRadius: 8,
    margin: 8,
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#000',
  },
  total: {
    fontSize: 16,
    marginBottom: 4,
    color: '#000',
  },
  price: {
    fontSize: 16,
    marginBottom: 4,
    color: '#000',
  },
  desc: {
    fontSize: 14,
    marginTop: 8,
    color: '#000',
  },
});

export default InventoryDetails;

