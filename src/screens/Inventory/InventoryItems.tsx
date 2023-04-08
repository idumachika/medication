import React, { useEffect, useState, useContext } from 'react';
import { StyleSheet, Text, View,FlatList, TouchableWithoutFeedback } from 'react-native';
import AddButton from '../../components/AddButton';
import AsyncStorage from '@react-native-async-storage/async-storage';
import InventoryList from '../../components/InventoryList';
import { useNavigation } from '@react-navigation/native';
import { useInventory } from '../../context/InventoryProvider';

type Item = {
  name: string;
  total: number;
  price: number;
  desc: string;
  
};

type MyProps = {
  item: Item[];
};

type Props = {
  route: {
    params: {
      name: string;
    };
  };
};

const InventoryItems: React.FC = ({setUserEmail}:any) => {
  const navigation = useNavigation();
  const { inventories, setInventories } = useInventory();
  
  

  

  const navigateToScreen = (inventory: any) => {
    navigation.navigate('Inventory Detail' as never, {id: inventory.id} as never);
  };

  const renderInventories = () => {
    return (
      <FlatList 
      data={inventories}
      ListEmptyComponent={(<View>
        <Text style ={{color:'#333', fontSize: 24}}>No Inventories Found</Text>
      </View>)}
      renderItem={({ item }) => (
        <InventoryList onPress={() => navigateToScreen(item)} item ={item} />
      )}
      keyExtractor={item => item.name}
    />
    )
  }


  React.useEffect(() => {
    navigation.setOptions({
      headerRightContainerStyle: {
        paddingRight: 15,
      },
      

      headerRight: () => (
        <TouchableWithoutFeedback
          onPress={async () =>{
            try { 
              await AsyncStorage.setItem('email', "");  
              setUserEmail({email:""})
              
            } catch (e) {
              console.log(e);
            }
           }
          }
        >
         <Text>Logout</Text>
        </TouchableWithoutFeedback>
      ),
    });
  }, []);

 

  return (
    <>
    <View style={styles.container}>
      {renderInventories()}
      <AddButton
        onPress={() => navigation.navigate("InventoryAddScreen" as never)} title={''}/>
      </View>
      
      </>

  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
    paddingHorizontal: 10,
    borderRadius: 15
  
  },
  addButton: {
    backgroundColor: '#007aff',

  },
  addButtonLabel: {
    fontSize: 32,
    color: '#fff',
  },
  text: {
    fontSize: 32,
    color:'#007aff' ,
  },
});

export default InventoryItems;