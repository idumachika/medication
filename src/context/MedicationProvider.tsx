
import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { createContext, useEffect, useState, useContext} from 'react';


type Item = {
    name: string;
    dosage: number;
    frequency: string;
    time: string;
    
  };

  
interface ItemContextType {
    medications: Item[];
    setMedications: React.Dispatch<React.SetStateAction<Item[]>>;
  findMedication: () => void
}

const initialContext: ItemContextType = {
  medications: [],
  setMedications: () => {},
  findMedication: () => {},
};

export const MedicationContext = createContext<ItemContextType>(initialContext);

export const MedicationProvider: React.FC = ({children}: any) => {
  const [items, setItems] = useState<Item[]>([]);
  const [medications, setMedications] = useState<Item[]>([]);


  const findMedication = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem('medications');
      if (jsonValue != null) {
        const parsedValue: Item[] = JSON.parse(jsonValue);

        setMedications(parsedValue);
      }
    } catch (e) {
      console.log(e);
    }
  };

  useEffect (() => {
    AsyncStorage.clear
    findMedication();
  }, []);

  return (
    <MedicationContext.Provider
      value={{medications, setMedications, findMedication}}>
      {children}
    </MedicationContext.Provider>
  );
};




export const useMedication = () => useContext(MedicationContext);

export default MedicationProvider;



