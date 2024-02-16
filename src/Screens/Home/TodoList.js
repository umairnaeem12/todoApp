import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, Button, FlatList, TouchableOpacity, TextInput } from 'react-native';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { useFocusEffect } from '@react-navigation/native';
import CommonButton from '../../Components/CommonButton';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { resetUser } from '../../Redux/Slices/userSlice';

const TodoList = ({ navigation }) => {

    const dispatch = useDispatch();
    const userToken = useSelector(state => state.user.userToken);
    const [todoItems, setTodoItems] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');

      // Use useFocusEffect to refresh the list when the screen comes into focus
      useFocusEffect(
        React.useCallback(() => {
            getTodoList();
        }, [userToken]) // Add userToken as a dependency to re-run the effect when it changes
    );

    const getTodoList = async () => {
        try {
            const response = await axios.get('http://3.232.244.22/api/items', {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${userToken}`
                }
            });
            setTodoItems(response.data.items.data);
        } catch (error) {
            console.error('Error fetching todo list:', error);
        }
    };

    const deleteTodoItem = async (itemId) => {
        try {
            await axios.delete(`http://3.232.244.22/api/item/${itemId}`, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${userToken}`
                }
            });
            // After successful deletion, refresh the todo list
            getTodoList();
        } catch (error) {
            console.error('Error deleting todo item:', error);
        }
    };

    const logoutUser = async () => {

        const usertoken = {
            token: userToken,
        }

        try {
            await axios.post('http://3.232.244.22/api/logout', usertoken, {
                headers: {
                    'Content-Type': 'application/json',
                }
            });
            await AsyncStorage.setItem('LoginComplete', 'false');
            dispatch(resetUser());
            navigation.navigate('Login')
        } catch (error) {
            console.error('Error deleting todo item:', error);
        }
    };

    // Search Filter
    const filteredData = todoItems.filter(item =>
        item.title.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <View style={styles.container}>

            <CommonButton text={'Create New Task'} onPress={() => navigation.navigate('CreateTodo')} buttonStyle={{ width: '100%' }} />

            <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between'}}>
                <Text style={styles.todoText}>This is your Todo List:</Text>
                <TouchableOpacity onPress={() => logoutUser()}><Text style={{ color: '#603814', fontWeight: '700', textDecorationLine: 'underline' }}>Logout</Text></TouchableOpacity>
            </View>

            <Text style={{ color: 'black', fontWeight: '700' }}>Click any Todo Item to Update:</Text>

            {/* /Search Bar */}
            <TextInput
                style={styles.input}
                placeholder="Search..."
                value={searchQuery}
                onChangeText={text => setSearchQuery(text)}
            />

            <FlatList
                // data={todoItems}
                data={filteredData}
                renderItem={({ item }) => (
                    <>
                        <TouchableOpacity style={styles.listContainer} onPress={() => navigation.navigate('UpdateTodo', { item })}>

                            <View style={styles.topbtn}>
                                <Text style={styles.title}>Title: <Text style={{ color: 'black' }}>{item.title}</Text></Text>
                                <TouchableOpacity style={{}} onPress={() => deleteTodoItem(item.id)}><Text style={[styles.btn, { color: 'red' }]}>Delete</Text></TouchableOpacity>
                            </View>

                            <Text style={styles.title}>Discription: <Text style={{ color: 'black' }}>{item.description}</Text></Text>
                        </TouchableOpacity>
                    </>
                )}
                keyExtractor={(item) => item.id.toString()}
                extraData={todoItems} // Add extraData prop to trigger re-render when todoItems changes
            />

        </View>
    )
}

export default TodoList;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 20,
        backgroundColor: 'white'
    },
    btnContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-evenly'
    },
    todoText: {
        fontSize: 22,
        fontWeight: '800',
        color: 'black'
    },
    listContainer: {
        backgroundColor: '#f1efeb',
        margin: 5,
        paddingHorizontal: 10,
        paddingVertical: 5,
        borderRadius: 10,
        borderColor: '#603814',
        borderWidth: 1
    },
    topbtn: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    title: {
        fontWeight: '700',
        fontSize: 16,
        color: '#603814'
    },
    btn: {
        textDecorationLine: 'underline',
        color: 'blue',
        fontSize: 15,
        fontWeight: '700'
    },
    input: {
        borderWidth: 1,
        borderColor: '#603814',
        borderRadius: 10,
        paddingHorizontal: 10,
        fontWeight: '800',
        fontSize: 16,
        marginVertical: '5%'
    }
})