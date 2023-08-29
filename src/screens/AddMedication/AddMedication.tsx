import React, {useState} from 'react';
import {View, Text, StyleSheet, TextInput, Keyboard, Alert} from 'react-native';
import {TouchableWithoutFeedback} from 'react-native';
import CustomButton from '../../components/CustomButton';
import AsyncStorage from '@react-native-async-storage/async-storage';
import uuid from 'react-native-uuid';
import {useMedication} from '../../context/MedicationProvider';
import RNPickerSelect from 'react-native-picker-select';

const dosageItems = [
  {label: '1', value: '1'},
  {label: '2', value: '2'},
  {label: '3', value: '1'},
];

const AddMedication = ({navigation}: any) => {
  const { medications, setMedications } = useMedication();
  const [selectedDosage, setSelectedDosage] =useState('')

  const [newItem, setnewItem] = useState({
    name: '',
    dosage: '',
    frequency: '',
    time: '',
  });

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
      id: uuid.v4(),
    };

    const items = await AsyncStorage.getItem('medications');
    console.log('items===', items);
    const parsedItems = items ? JSON.parse(items) : [];
    const nameExists = parsedItems.some(
      (item: NewItemType) => item.name === newItem.name,
    );
    if (nameExists) {
      Alert.alert('An item with this name already exists in the List');
      return;
    }

    const selectedfrequency = newItem.frequency;
    // if (selectedfrequency) {
    //   Alert.alert('Frequency is required');
    //   return;
    // }

    // if (dosage || time) {
    //   Alert.alert('Please enter valid numbers for Frequency and Time');
    //   return;
    // }

    try {
      const jsonValue = JSON.stringify([...medications, newItem]);
      setMedications([...medications, newItem]);
      await AsyncStorage.setItem('medications', jsonValue);
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
            placeholder="frequency"
            onChangeText={text =>
              updateNewItem({label: 'frequency', value: text})
            }
            value={frequency}
            keyboardType="numeric"
          />
          <TextInput
            style={[styles.input, styles.desc]}
            placeholder="Date"
            onChangeText={text => updateNewItem({label: 'time', value: text})}
            value={time}
          />

          <CustomButton
            title={'Add'}
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
    color: '#000000',
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
export default AddMedication;
