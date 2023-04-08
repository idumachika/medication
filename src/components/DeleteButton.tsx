import React from 'react';
import { TouchableOpacity, StyleSheet, StyleProp, ViewStyle, Text } from 'react-native';


interface DeleteButtonProps {
  onPress: () => void;
  style?: StyleProp<ViewStyle>;
}

const DeleteButton: React.FC<DeleteButtonProps> = ({ onPress, style }) => {
  return (
    <TouchableOpacity testID="delete-button" style={[styles.button, style]} onPress={onPress}>
      <Text style={styles.deletebtn}>Delete</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#FF4136',
    width: 70,
    height: 40,
    borderRadius:5,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    bottom: 10,
    right: 10,
  },

  deletebtn: {
    color: "#fff",
    fontSize:12,
  }
});

export default DeleteButton;
