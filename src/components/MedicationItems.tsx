import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

type Item = {
  name: string;
  dosage: number;
  frequency: string;
  time: string;
};

type MyProps = {
  item: Item[];
onPress: (item: any) => void;

};
const MedicationComponent = ({ item, onPress }: MyProps) => {
    interface Item {
      name: string;
      dosage: number;
      frequency: string;
      time: string;
    }
    
  
    const {name, dosage, frequency, time} = item;
    
    return (
      <TouchableOpacity onPress={onPress}> 
      <View style = {styles.container}>
        <Text style = {styles.name}>{name}</Text>
      <Text style = {styles.text} >{dosage}</Text>
      <Text style = {styles.text}>{frequency}</Text>
      <Text style = {styles.text}>{time}</Text>
    
      </View>
      </TouchableOpacity>
    );
  };

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ddd',
    padding: 20,
    marginVertical: 8,
    borderRadius: 8,

  },
  item: {
    backgroundColor: '#007aff',
    padding: 20,
    marginVertical: 8,

    
  },
  name: {
    fontWeight: 'bold',
    fontSize: 20,
    color: '#000',
  },
  text: {

    fontSize: 16,
    color: '#000',
  },
});

export default MedicationComponent;

