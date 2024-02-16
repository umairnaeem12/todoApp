import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';

const CommonButton = ({onPress, buttonStyle, textStyle, text}) => {
  return (
    <View>
      <TouchableOpacity style={[styles.loginBtn, buttonStyle]} onPress={onPress}>
        <Text style={[styles.loginBtnText, textStyle]}>{text}</Text>
      </TouchableOpacity>
    </View>
  )
}

export default CommonButton;

const styles = StyleSheet.create({
    loginBtn: {
        backgroundColor: '#f1efeb',
        borderWidth: 1,
        borderColor: '#603814',
        padding: 10,
        borderRadius: 10,
        // width: '40%',
        alignSelf: 'center',
        margin: '5%'
      },
      loginBtnText: {
        textAlign: 'center',
        fontWeight: '700',
        color: '#603814',
        fontSize: 18
      },
})