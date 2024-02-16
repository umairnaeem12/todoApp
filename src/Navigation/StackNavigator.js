import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Splash from '../Screens/Auth/Splash';
import Welcome from '../Screens/Auth/Welcome';
import Login from '../Screens/Auth/Login';
import Register from '../Screens/Auth/Register';
import TodoList from '../Screens/Home/TodoList';
import CreateTodo from '../Screens/Home/CreateTodo';
import UpdateTodo from '../Screens/Home/UpdateTodo';

const StackNavigator = () => {

    const Stack = createNativeStackNavigator();

    return (
        <NavigationContainer>
            <Stack.Navigator screenOptions={{ headerShown: false }}>
                <Stack.Screen name="Splash" component={Splash} />
                <Stack.Screen name="Welcome" component={Welcome} />
                <Stack.Screen name="Login" component={Login} />
                <Stack.Screen name="Register" component={Register} />
                <Stack.Screen name="TodoList" component={TodoList} />
                <Stack.Screen name="CreateTodo" component={CreateTodo} />
                <Stack.Screen name="UpdateTodo" component={UpdateTodo} />
            </Stack.Navigator>
        </NavigationContainer>
    )
}

export default StackNavigator;