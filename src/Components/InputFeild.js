import React from 'react';
import { StyleSheet, Text, View, TextInput } from 'react-native';

const InputFeild = ({placeholder, value, onChangeText, style, keyboardType}) => {
  return (
    <View>
        <TextInput placeholder={placeholder} value={value} onChangeText={onChangeText} style={[styles.input, style]} placeholderTextColor={'#603814'} keyboardType={keyboardType}></TextInput>
    </View>
  )
}

export default InputFeild;

const styles = StyleSheet.create({
    input: {
        borderWidth: 1,
        borderColor: '#603814',
        borderRadius: 10,
        paddingHorizontal: 10,
        fontWeight: '800',
        fontSize: 16,
      },
})