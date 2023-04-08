import React from 'react';
import { TouchableOpacity, StyleSheet, Text, TouchableOpacityProps } from 'react-native';

interface ButtonProps extends TouchableOpacityProps {
  title: string;
}

const FloatingButton: React.FC<ButtonProps> = ({ title, ...rest }: ButtonProps) => {
  return (
    <TouchableOpacity style={styles.button} {...rest}>
      <Text style={styles.buttonText}>Add Inventory</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#0074D9',
    padding: 10,
    marginBottom: 15,
    borderRadius: 5,
  },
  buttonText: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default FloatingButton;
