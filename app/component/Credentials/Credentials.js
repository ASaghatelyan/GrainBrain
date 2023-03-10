import firebase from "@react-native-firebase/app";

export const Credentials = async () => {
    if (!firebase.apps.length) {
        const iosCredentials = {
            'apiKey': "AIzaSyAoA1pKKE_BH2T-KJDUTRsxtB-spKG7Z8A",
            'authDomain': "grainbrain-48320.firebaseapp.com",
            'projectId': "grainbrain-48320",
            'storageBucket': "grainbrain-48320.appspot.com",
            'messagingSenderId': "949012975588",
            'appId': "1:949012975588:ios:3a14a32644ba66306301f1",
            'measurementId': "G-Y0XXQL5DBQ",
            'databaseURL':'https://grainbrain-48320-default-rtdb.firebaseio.com/'
        };
        const Messaging =  await firebase.initializeApp(iosCredentials);
        console.log(Messaging, 'regklegrk');
        return  Messaging
    }else {
        firebase.app(); // if already initialized, use that one
    }

}