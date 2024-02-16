import React, { useState } from 'react';
import { StyleSheet, Text, View, ToastAndroid } from 'react-native'; 
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { setUserId, setUserToken } from '../../Redux/Slices/userSlice';
import InputFeild from '../../Components/InputFeild';
import CommonButton from '../../Components/CommonButton';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Login = ({ navigation }) => {
  const dispatch = useDispatch();

  const [checkEmail, setCheckEmail] = useState('');
  const [checkPassword, setCheckPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const loginUser = async () => {

    const isValidEmail = (email) => {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return emailRegex.test(email);
    };

    if (!checkEmail.trim() || !checkPassword.trim()) {
      ToastAndroid.show('Please fill in all fields', ToastAndroid.SHORT, ToastAndroid.CENTER);
      return;
    }

    if (!isValidEmail(checkEmail)) {
      ToastAndroid.show('Please enter a valid email address', ToastAndroid.SHORT, ToastAndroid.CENTER);
      return;
    }

    try {
      const response = await axios.post('http://3.232.244.22/api/login', {
        email: checkEmail,
        password: checkPassword,
      }, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const user = response.data.user;
      await AsyncStorage.setItem('LoginComplete', 'true');
      dispatch(setUserId(user.id));
      dispatch(setUserToken(user.token));
      navigation.navigate('TodoList');

    } catch (error) {
      console.error('Error during login:', error);
      setErrorMessage(`Error: ${error.response.data.message}`);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.toptext}>Login your Account:</Text>

      <InputFeild
        placeholder={'Enter your Email'}
        value={checkEmail}
        onChangeText={setCheckEmail}
        style={{ marginVertical: '5%' }}
      />
      <InputFeild
        placeholder={'Enter your Password'}
        value={checkPassword}
        onChangeText={setCheckPassword}
      />

      {errorMessage ? (
        <Text style={styles.errorMessage}>{errorMessage}</Text>
      ) : null}

      <CommonButton text={'Login'} onPress={() => loginUser()} buttonStyle={{ width: '35%' }} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    paddingHorizontal: 20,
  },
  toptext: {
    fontSize: 22,
    fontWeight: '800',
    color: 'black',
    marginTop: '7%',
  },
  errorMessage: {
    color: 'red',
    marginBottom: 10,
  },
});

export default Login;
