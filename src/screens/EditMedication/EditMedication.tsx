import {View, Text, StyleSheet, TextInput, Keyboard, Alert} from 'react-native';
import React, {useEffect, useState} from 'react';
import {TouchableWithoutFeedback} from 'react-native';
import CustomButton from '../../components/CustomButton';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useMedication} from '../../context/MedicationProvider';

const EditMedication = ({navigation, route}: any) => {
  const medication = route.params.medics;

  const {medications, setMedications} = useMedication();

  const [newItem, setnewItem] = useState({
    name: '',
    dosage: '',
    frequency: '',
    time: '',
  });

  useEffect(() => {
    setnewItem({...medication});
  }, [medication]);

  console.log({newItem});

  type NewItemType = {
    label: keyof typeof newItem;
    value: string;
  };

  const updateNewItem = ({label, value}: NewItemType) => {
    setnewItem({...newItem, [label]: value});
  };

  const {name, dosage, frequency, time} = newItem;

  const handleSubmit = async () => {
    if (!name || !dosage || !frequency || !time) {
      Alert.alert('Please fill in all fields');
      return;
    }

    const newItem = {
      name,
      dosage,
      frequency,
      time,
      id: medication.id,
    };

    // const descWords = newItem.desc.split(' ');
    // if (descWords.length < 3) {
    //   Alert.alert('Description must have at least three words');
    //   return;
    // }

    // if (frequency || time) {
    //   Alert.alert('Please enter valid numbers for Frequency and Time');
    //   return;
    // }

    try {
      const items = await AsyncStorage.getItem('medications');
      const parsedItems = items ? JSON.parse(items) : [];
      const newItemList = parsedItems.map((item: {id: string}) => {
        if (item.id === medication.id) {
          return newItem;
        }
        return item;
      });

      await AsyncStorage.setItem('medications', JSON.stringify(newItemList));
      setMedications(newItemList);
      navigation.navigate('dashboard');
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <View style={{flex: 1}}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.container}>
          <TextInput
            style={[styles.input, styles.name]}
            placeholder="Name"
            onChangeText={text => updateNewItem({label: 'name', value: text})}
            value={name}
          />
          <TextInput
            style={[styles.input, styles.total]}
            placeholder="Dosage"
            onChangeText={text => updateNewItem({label: 'dosage', value: text})}
            value={dosage}
            keyboardType="numeric"
          />
          <TextInput
            style={[styles.input, styles.price]}
            placeholder="Frequency"
            onChangeText={text =>
              updateNewItem({label: 'frequency', value: text})
            }
            value={frequency}
            keyboardType="numeric"
          />
          <TextInput
            style={[styles.input, styles.desc]}
            placeholder="Time"
            onChangeText={text => updateNewItem({label: 'time', value: text})}
            value={time}
          />

          <CustomButton
            title={'Edit'}
            backgroundColor={'#0074D9'}
            textColor={'#fff'}
            onPress={handleSubmit}></CustomButton>
        </View>
      </TouchableWithoutFeedback>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
  },
  modalBG: {
    flex: 1,
    zIndex: -1,
  },
  addButton: {
    backgroundColor: '#007aff',
  },
  addButtonLabel: {
    fontSize: 32,
    color: '#fff',
  },
  input: {
    borderWidth: 1,
    borderColor: '#DDDDDD',
    fontSize: 15,
    paddingHorizontal: 8,
    borderRadius: 4,
    color: '#000',
  },
  name: {
    height: 40,
    marginBottom: 15,
    fontWeight: 'bold',
  },
  total: {
    height: 40,
    marginBottom: 15,
    fontWeight: 'bold',
  },
  price: {
    height: 40,
    marginBottom: 15,
    fontWeight: 'bold',
  },
  desc: {
    height: 40,
    marginBottom: 15,
    fontWeight: 'bold',
  },
});
export default EditMedication;
