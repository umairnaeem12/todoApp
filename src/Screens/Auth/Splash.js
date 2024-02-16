import React, { useEffect } from 'react';
import { StyleSheet, View, Image } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Splash = ({ navigation }) => {

  useEffect(() => {
    const checkRegistration = async () => {
      try {
        const LoginComplete = await AsyncStorage.getItem('LoginComplete');
        setTimeout(() => {
          // If user close app after register then first he move on login screen.
          if (LoginComplete === 'true') {
            navigation.navigate('TodoList');
          } else {
            navigation.navigate('Welcome');
          }
        }, 3000);
      } catch (error) {
        console.error('Error checking registration:', error);
      }
    };

    checkRegistration();
  }, [navigation]);

  return (
    <View style={styles.container}>
      <Image source={{ uri: 'https://i.pinimg.com/564x/f6/7b/5c/f67b5c5befc4189f7781a4d7fd004992.jpg' }} style={styles.imgContainer} />
    </View>
  )
}

export default Splash;

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  imgContainer: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover'
  }
})