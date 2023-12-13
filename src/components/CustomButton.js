import { Text, TouchableOpacity } from 'react-native';
import React from 'react';

export default function CustomButton({ label, onPress, disabled }) {
  return (
    <TouchableOpacity
      onPress={() => {
        if (!disabled) {
          onPress();
        }
      }}
      style={{
        backgroundColor: disabled ? '#CCCCCC' : '#AD40AF', 
        padding: 20,
        borderRadius: 10,
        marginBottom: 30,
        opacity: disabled ? 0.5 : 1, 
      }}
      disabled={disabled} 
    >
      <Text
        style={{
          textAlign: 'center',
          fontWeight: '700',
          fontSize: 16,
          color: '#fff',
        }}>
        {label}
      </Text>
    </TouchableOpacity>
  );
}
