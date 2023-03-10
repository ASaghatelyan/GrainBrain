import React from "react";
import {createNativeStackNavigator} from "@react-navigation/native-stack";
import FirstPage from "../../screen/stackScreen/FirstPage";
import Login from "../../screen/stackScreen/Login";
import SignUp from "../../screen/stackScreen/SignUp";
import ResetPassword from "../../screen/stackScreen/ResetPassword";
import ForgotPassword from "../../screen/stackScreen/ForgotPassword";
import Effect from "../../screen/stackScreen/Effect";
import Guest from "../../screen/stackScreen/Guest";
import Comment from "../../screen/tabScreen/Commet";
import QRCodeScanner from "../../screen/stackScreen/QrCodeScanner";
import CommentGuest from "../../screen/stackScreen/CommentGuest";
import TermsAndConditions from "../../screen/stackScreen/TermsAndConditions";
import QrCodeScanner from "../../screen/stackScreen/QrCodeScanner";
import Anonymous from "../../screen/stackScreen/Anonymous";

export default function FirstPageNavigation() {

    const Stack = createNativeStackNavigator();

    return (
        <Stack.Navigator
            screenOptions={{
                headerShown: false,
            }}>
            <Stack.Screen name={"effect"} component={Effect}/>
            <Stack.Screen name={"qrCodeScanner"} component={QrCodeScanner}/>
            <Stack.Screen name={"firstPage"} component={FirstPage}/>
            <Stack.Screen name={"commentGuest"} component={CommentGuest}/>
            <Stack.Screen name={"termsAndConditions"} component={TermsAndConditions}/>
            <Stack.Screen name={"login"} component={Login}/>
            <Stack.Screen name={"signUp"} component={SignUp}/>
            <Stack.Screen name={"resetPassword"} component={ResetPassword}/>
            <Stack.Screen name={"forgotPassword"} component={ForgotPassword}/>
            <Stack.Screen name={"guest"} component={Guest}/>
            <Stack.Screen name={'comment'} component={Comment}/>
            <Stack.Screen name={'qRCodeScanner'} component={QRCodeScanner}/>
          <Stack.Screen name={'Anonymous'} component={Anonymous}/>
        </Stack.Navigator>
    );
}
