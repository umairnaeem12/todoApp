import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, Button } from 'react-native';
import { useSelector } from 'react-redux';
import axios from 'axios';
import CommonButton from '../../Components/CommonButton';
import InputFeild from '../../Components/InputFeild';

const CreateTodo = ({ navigation }) => {

    const userToken = useSelector(state => state.user.userToken);

    const [title, setTitle] = useState('');
    const [discription, setDiscription] = useState('');

    const addTodoItems = async () => {
        try {
            const addData = {
                title: title,
                description: discription
            }

            const response = await axios.post('http://3.232.244.22/api/item', addData, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${userToken}`
                }
            });
            navigation.goBack();
        } catch (error) {
            console.error('Error adding todo item:', error.message);
        }
    }

    return (
        <View style={styles.container}>
            <Text style={styles.toptext}>Create New Todo</Text>
            <InputFeild placeholder={'Enter Title'} value={title} onChangeText={setTitle} style={{ marginVertical: '5%' }}></InputFeild>
            <InputFeild placeholder={'Enter Discription'} value={discription} onChangeText={setDiscription}></InputFeild>
            <CommonButton text={'Add Todo Item'} onPress={() => addTodoItems()} buttonStyle={{ width: '50%' }} />

        </View>
    )
}

export default CreateTodo;

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