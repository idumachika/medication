import React, {useEffect, useState} from 'react';
import { View, Text, StyleSheet } from 'react-native';
import DeleteButton from './DeleteButton';
import EditButton from './EditButton';
import { Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import { useMedication } from '../context/MedicationProvider';

type Props = {
  item: Item;
};

type Item = {
  name: string;
  dosage: number;
  frequency: string;
  time: string;
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


const MedicationDetails: React.FC<Props2> = ({ route}: Props2) => {
 const medicationId = route.params.id ; 
 const navigation = useNavigation();
 const {medications, setMedications} = useMedication();
 const [medics, setmedics] = useState<Item>();


 useEffect(() => {
   const details = medications.find(c => c.id === medicationId) as Item;
   setmedics(details);
 }, [])
 
 


 const deleteMedication = async () => {
    console.log('yes');
    const items = await AsyncStorage.getItem('medications'); 
    let medications = [];
    if (items != null) medications = JSON.parse(items);
    const newMedications = medications.filter(
      (n: Item) => n.name !== medics.name,
    ); 
    setMedications(newMedications);
    await AsyncStorage.setItem('inventories', JSON.stringify(newMedications));
    navigation.goBack(); 
};


const displayDeleteAlert = () => {
  Alert.alert(
    'Are You Sure!',
    'This action will delete your inventory permanently!',
    [
      {
        text: 'Delete',
        onPress: deleteMedication,
      },
      {
        text: 'No Thanks',
        onPress: () => console.log('no thanks'),
      },
    ],
    {
      cancelable: true,
    },
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

if (medics === undefined) {
  return null;
}
 
return (
  <View style={styles.container}>
    <Text style={styles.name}>Name: {medics.name}</Text>
    <Text style={styles.total}>Total: {medics.dosage}</Text>
    <Text style={styles.price}>Price: {medics.frequency}</Text>
    <Text style={styles.price}>Desc: {medics.time}</Text>

    <DeleteButton onPress={displayDeleteAlert}></DeleteButton>
    <EditButton
      onPress={() =>
        navigation.navigate('EditMedication' as never, {medics})
      }></EditButton>
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

export default MedicationDetails;

