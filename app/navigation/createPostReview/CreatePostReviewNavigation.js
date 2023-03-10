import React from "react";
import {createNativeStackNavigator} from "@react-navigation/native-stack";
import CreatePostReview from "../../screen/tabScreen/CreatePostReview";
import EditPage from "../../screen/tabScreen/EditPage";

export default function CreatePostReviewNavigation() {
    const Stack = createNativeStackNavigator();

    return (
        <Stack.Navigator
            screenOptions={{
                headerShown: false,
            }}>
            <Stack.Screen name={"createPostReview"} component={CreatePostReview}/>

        </Stack.Navigator>
    );
}
