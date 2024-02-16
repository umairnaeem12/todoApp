import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';

const Welcome = ({ navigation }) => {
  return (
    <View style={styles.container}>

      <Text style={styles.welcomeText}>{`Welcome To The App!`}</Text>
      <Text style={styles.disText}>{`This is a Todo App. Where you can add your todo task. Create your task on daily base and also delete your task.`}</Text>

      {/* Login and Register Button Container */}
      <View style={styles.btnContainer}>
        <TouchableOpacity style={[styles.loginBtn, { marginRight: '5%' }]} onPress={() => navigation.navigate('Login')}>
          <Text style={styles.loginBtnText}>Login</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.loginBtn} onPress={() => navigation.navigate('Register')}>
          <Text style={styles.loginBtnText}>Register</Text>
        </TouchableOpacity>
      </View>

    </View>
  )
}

export default Welcome;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#7cb3ab',
  },
  welcomeText: {
    fontWeight: '700',
    fontSize: 25,
    lineHeight: 25,
    color: '#603814'
  },
  disText: {
    fontWeight: 'normal',
    fontSize: 17,
    textAlign: 'center',
    margin: '5%',
    color: 'black'
  },
  btnContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly'
  },
  loginBtn: {
    backgroundColor: '#f1efeb',
    borderWidth: 1,
    borderColor: '#603814',
    padding: 10,
    borderRadius: 10,
    width: '40%',
    maxWidth: 120,
  },
  loginBtnText: {
    textAlign: 'center',
    fontWeight: '700',
    color: '#603814',
    fontSize: 18
  }
})