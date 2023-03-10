import React, {useEffect, useState} from "react";

import {Alert, Text, Image, Platform} from "react-native";
import {Provider} from "react-redux";
import store from "./app/redux";
import AppNavigation from "./app/navigation/AppNavigation";
import messaging from '@react-native-firebase/messaging';
import {requestUserPermission, notificationListener} from "./app/component/notification_helper/helper";
import PushNotificationIOS from "@react-native-community/push-notification-ios";
import ForegroundHandler from "./app/component/remoteNotification_ios/RemoteNotification";
import {Credentials} from "./app/component/Credentials/Credentials";

const App = () => {

    useEffect(() => {
        requestUserPermission()
        notificationListener()
    }, [])

    return (
        <Provider store={store}>
            <ForegroundHandler/>
            <AppNavigation/>
        </Provider>
    );
};

export default App;

