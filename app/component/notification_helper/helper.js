// import messaging from '@react-native-firebase/messaging';
//
// export async function requestUserPermission() {
//     const authStatus = await messaging().requestPermission();
//     const enabled =
//         authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
//         authStatus === messaging.AuthorizationStatus.PROVISIONAL;
//     if (enabled) {
//         console.log('Authorization status:', authStatus);
//     }
//     }
//


import messaging from '@react-native-firebase/messaging';
import AsyncStorage from "@react-native-async-storage/async-storage";

export async function requestUserPermission() {
    const authStatus = await messaging().requestPermission();
    const enabled =
        authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
        authStatus === messaging.AuthorizationStatus.PROVISIONAL;
    if (enabled) {
        getFcmToken()
    }
}


const getFcmToken = async () => {
    let checkToken = await AsyncStorage.getItem('tokenNotification')
    console.log(checkToken,'1111111111111111111111111111111111111111111111111111111111111111111111111111111111111111')

    if (!checkToken) {
        try {
            const fcmToken = await messaging().getToken()
            console.log(fcmToken,'1111111111111111111111111111111111111111111111111111111111111111111111111111111111111111')
            if (!!fcmToken) {
                await AsyncStorage.setItem('tokenNotification', fcmToken)
            }
        } catch (error) {
            alert(error?.message)
        }
    }
}

export const notificationListener = async() =>{
    messaging().onNotificationOpenedApp(remoteMessage => {
        console.log(
            'Notification caused app to open from background state:',
            remoteMessage.notification,
        );
        console.log("backgrund state",remoteMessage.notification)
    });
    messaging()
        .getInitialNotification()
        .then(remoteMessage => {
            if (remoteMessage) {
                console.log(
                    'Notification caused app to open from quit state:',
                    remoteMessage.notification,
                );
                console.log("remote message",remoteMessage.notification)
            }
        })
}

export const get_Token_token = async () => {

    return await messaging().deleteToken()


}