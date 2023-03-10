import React from "react";
import {createNativeStackNavigator} from "@react-navigation/native-stack";
import TabNavigation from "./TabNavigation";
import FirstPageNavigation from "./firstPageNavigation/FirstPageNavigation";

export default function StackNavigation(props) {

    const Stack = createNativeStackNavigator();

    return (
        <Stack.Navigator
            screenOptions={{
                headerShown: false,
            }}>
            <Stack.Screen name={"firstPageNavigation"} component={FirstPageNavigation}/>
            <Stack.Screen name={"tab"} component={TabNavigation}/>
        </Stack.Navigator>
    );
}
