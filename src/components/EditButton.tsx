import React from 'react';
import { TouchableOpacity, StyleSheet, StyleProp, ViewStyle,Text } from 'react-native';

interface EditButtonProps {
  onPress: () => void;
  style?: StyleProp<ViewStyle>;
}

const EditButton: React.FC<EditButtonProps> = ({ onPress, style }) => {
  return (
    <TouchableOpacity testID="edit-button"   style={[styles.button, style]} onPress={onPress}>
      <Text style={styles.editbtn}>Edit</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#0074D9',
    borderRadius: 5,
    width: 70,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  editbtn: {
    fontSize: 12,
    color:"#fff"
  }
});

export default EditButton;
