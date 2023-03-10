import React, {useEffect} from 'react';
import {Platform} from 'react-native';
import PushNotificationIOS from '@react-native-community/push-notification-ios';
import messaging from '@react-native-firebase/messaging';
import PushNotification from "react-native-push-notification";

export const ForegroundHandler = () => {
    useEffect(() => {
        const unsubscribe = messaging().onMessage((remoteMessage) => {
            console.log("handle in foreground", remoteMessage)
            const {notification, messageId,} = remoteMessage
            if (Platform.OS == 'ios') {
                PushNotificationIOS.addNotificationRequest({
                    id: messageId,
                    body: notification.body,
                    title: notification.title,
                    sound: 'default'
                });
            } else {
                PushNotification.localNotification({
                    channelId: "123",
                    id: messageId,
                    body: notification.body,
                    title: notification.title,
                    soundName: 'default',
                    vibrate: true,
                    playSound: true
                })
            }
        })
        return unsubscribe
    }, [])
    return null
}

export default ForegroundHandler
