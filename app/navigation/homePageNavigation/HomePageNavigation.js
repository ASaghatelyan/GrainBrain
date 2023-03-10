import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import HomePage from '../../screen/tabScreen/HomePage';
import Notifications from '../../screen/tabScreen/Notifications';
import UsersSinglePage from "../../screen/stackScreen/UsersSinglePage";
 import UsersFolow from "../../screen/tabScreen/UsersFolow";
import Chat from "../../screen/tabScreen/Chat";
import Comment from "../../screen/tabScreen/Commet";

export default function HomePageNavigation() {

    const Stack = createNativeStackNavigator();

    return (
        <Stack.Navigator
            screenOptions={{
                headerShown: false,
            }}>
            <Stack.Screen name={'homePage'} component={HomePage}/>
            <Stack.Screen name={'notifications'} component={Notifications}/>
            <Stack.Screen name={"usersSinglePage"} component={UsersSinglePage}/>
            <Stack.Screen name={"usersFolow"} component={UsersFolow}/>
            <Stack.Screen name={'comment'} component={Comment}/>
            <Stack.Screen name={'chat'} component={Chat}/>
        </Stack.Navigator>
    );
}
