import React, {useEffect, useState, useContext} from 'react';
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableWithoutFeedback,
} from 'react-native';
import AddButton from '../../components/AddButton';
import AsyncStorage from '@react-native-async-storage/async-storage';
import MedicationItems from '../../components/MedicationItems';
import {useNavigation} from '@react-navigation/native';
import {useMedication} from '../../context/MedicationProvider';

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

const DashboardItems: React.FC = ({setUserEmail}: any) => {
  const navigation = useNavigation();
  const {medications, setMedications} = useMedication();

  const navigateToScreen = (medication: any) => {
    navigation.navigate(
      'MedicationDetail' as never,
      {id: medication.id} as never,
    );
  };

  const renderMedication = () => {
    return (
      <FlatList
        data={medications}
        ListEmptyComponent={
          <View style={styles.emptyList}>
            <Text style={{color: '#333', fontSize: 24}}>
              No Medication Found
            </Text>
          </View>
        }
        renderItem={({item}) => (
          <MedicationItems onPress={() => navigateToScreen(item)} item={item} />
        )}
        keyExtractor={item => item.name}
      />
    );
  };

  React.useEffect(() => {
    navigation.setOptions({
      headerRightContainerStyle: {
        paddingRight: 15,
      },

      headerRight: () => (
        <TouchableWithoutFeedback
          onPress={async () => {
            try {
              await AsyncStorage.setItem('email', '');
              setUserEmail({email: ''});
            } catch (e) {
              console.log(e);
            }
          }}>
          <Text>Logout</Text>
        </TouchableWithoutFeedback>
      ),
    });
  }, []);

  return (
    <>
      <View style={styles.container}>
        {renderMedication()}
        <AddButton
          onPress={() => navigation.navigate('AddMedication' as never)}
          title={''}
        />
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
    borderRadius: 15,
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
    color: '#007aff',
  },
  emptyList: {
    flex: 1,
    // justifyContent: 'center',
    alignItems: 'center',
  },
});

export default DashboardItems;
