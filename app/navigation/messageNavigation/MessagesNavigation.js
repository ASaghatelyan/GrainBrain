import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Messages from '../../screen/tabScreen/Messages';
import Chat from '../../screen/tabScreen/Chat';
import Invite from '../../screen/tabScreen/Invite';

export default function MessagesNavigation() {
    const Stack = createNativeStackNavigator();

    return (
        <Stack.Navigator
            screenOptions={{
                headerShown: false,
            }}
        >
            <Stack.Screen name={'messages'} component={Messages}/>
            <Stack.Screen name={'chat'} component={Chat}/>
        </Stack.Navigator>
    );
}
