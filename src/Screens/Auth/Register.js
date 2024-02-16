import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, Button, ToastAndroid } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import InputFeild from '../../Components/InputFeild';
import CommonButton from '../../Components/CommonButton';

const Register = ({ navigation }) => {

  const [userEmail, setUserEmail] = useState('');
  const [userPassword, setUserPassword] = useState('');
  const [confromPassword, setConfromPassword] = useState('');

  // Email validation function
  const isValidEmail = (email) => {
    // Regular expression for a basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const createAccount = () => {

    const isValidEmail = (email) => {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return emailRegex.test(email);
    };

    if (!userEmail.trim() || !userPassword.trim() || !confromPassword.trim()) {
      ToastAndroid.show('Please fill in all fields', ToastAndroid.SHORT, ToastAndroid.CENTER);
      return;
    }

    if (!isValidEmail(userEmail)) {
      ToastAndroid.show('Please enter a valid email address', ToastAndroid.SHORT, ToastAndroid.CENTER);
      return;
    }

    if (userPassword !== confromPassword) {
      ToastAndroid.show('Passwords do not match', ToastAndroid.SHORT, ToastAndroid.CENTER);
      return;
    }

    const userData = {
      email: userEmail,
      password: userPassword,
      password_confirmation: confromPassword
    }

    axios.post('http://3.232.244.22/api/register', userData, {
      headers: {
        'Content-Type': 'application/json'
      },
    })
      .then(res => {
        AsyncStorage.setItem('registrationComplete', 'true');
        ToastAndroid.show(res.data.message, ToastAndroid.SHORT, ToastAndroid.CENTER)
        navigation.navigate('Login')
      })
      .catch(error => {
        console.error("Error", error)
      })
  }

  return (
    <View style={styles.container}>
      <Text style={styles.toptext}>Register your Account</Text>
      <InputFeild placeholder={'Enter your Email'} value={userEmail} onChangeText={setUserEmail} style={{ marginVertical: '5%' }} keyboardType="email-address"></InputFeild>
      <InputFeild placeholder={'Enter your Password'} value={userPassword} onChangeText={setUserPassword}></InputFeild>
      <InputFeild placeholder={'Enter your Confrom Password'} value={confromPassword} onChangeText={setConfromPassword} style={{ marginVertical: '5%' }}></InputFeild>
      <CommonButton text={'Register'} onPress={() => createAccount()} buttonStyle={{ width: '40%' }} />
    </View>
  )
}

export default Register;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    backgroundColor: 'white'
  },
  toptext: {
    fontSize: 22,
    fontWeight: '800',
    color: 'black',
    marginTop: '7%'
  }
})