import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import User from '../../screen/tabScreen/User';
import EditUser from '../../screen/tabScreen/EditUser';
import ChangePassword from '../../screen/tabScreen/ChangePassword';
import EditPage from "../../screen/tabScreen/EditPage";
import UsersSinglePage from "../../screen/stackScreen/UsersSinglePage";
import UsersFolow from "../../screen/tabScreen/UsersFolow";
import Comment from "../../screen/tabScreen/Commet";
import Chat from "../../screen/tabScreen/Chat";

export default function UserNavigation() {

    const Stack = createNativeStackNavigator();

    return (
        <Stack.Navigator
            screenOptions={{
                headerShown: false,
            }}>
            <Stack.Screen name={'user'} component={User}/>
            <Stack.Screen name={'editUser'} component={EditPage}/>
            <Stack.Screen name={'changePassword'} component={ChangePassword}/>
            <Stack.Screen name={'editPage'} component={EditUser}/>
            <Stack.Screen name={"usersSinglePage"} component={UsersSinglePage}/>
            <Stack.Screen name={"usersFolow"} component={UsersFolow}/>
            <Stack.Screen name={'comment'} component={Comment}/>
            <Stack.Screen name={'chat'} component={Chat}/>
        </Stack.Navigator>
    );
}
