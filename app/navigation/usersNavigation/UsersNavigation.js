import React from "react";
import {createNativeStackNavigator} from "@react-navigation/native-stack";
import Groups from "../../screen/tabScreen/Groups";
import UsersSinglePage from "../../screen/stackScreen/UsersSinglePage";
import Invite from "../../screen/tabScreen/Invite";
import GroupChat from "../../screen/tabScreen/GroupChat";

export default function UsersNavigation() {
    const Stack = createNativeStackNavigator();

    return (
        <Stack.Navigator
            screenOptions={{
                headerShown: false,
            }}>
            <Stack.Screen name={"users"} component={Groups}/>
            <Stack.Screen name={"usersSinglePage"} component={UsersSinglePage}/>
            <Stack.Screen name={'groupChat'} component={GroupChat}/>
            <Stack.Screen name={'invite'} component={Invite}/>
        </Stack.Navigator>
    );
}
