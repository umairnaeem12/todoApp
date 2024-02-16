import axios from 'axios';
import React, { useState } from 'react';
import { StyleSheet, Text, View, FlatList, TextInput, Button, TouchableOpacity } from 'react-native';
import { useSelector } from 'react-redux';
import InputFeild from '../../Components/InputFeild';
import CommonButton from '../../Components/CommonButton';

const UpdateTodo = ({ route, navigation }) => {

  const userToken = useSelector(state => state.user.userToken);
  const { id, title: initialTitle, description: initialDescription } = route.params.item;

  const [title, setTitle] = useState(initialTitle);
  const [description, setDescription] = useState(initialDescription);

  const updateTodoItem = async () => {
    try {
      const updatedItem = {
        title: title,
        description: description,
      };

      // Send a PUT request to update the item
      await axios.put(`http://3.232.244.22/api/item/${id}`, updatedItem, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${userToken}`
        },
      });
      navigation.goBack();
    } catch (error) {
      console.error('Error updating todo item:', error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.toptext}>Update Your Todo Item:</Text>

      <InputFeild value={title} onChangeText={setTitle} style={{ marginVertical: '5%' }}></InputFeild>
      <InputFeild value={description} onChangeText={setDescription}></InputFeild>

      <CommonButton text={'Update Todo Item'} onPress={() => updateTodoItem()} buttonStyle={{ width: '60%' }} />

    </View>
  )
}

export default UpdateTodo;

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