import messaging from "@react-native-firebase/messaging";
import {Platform} from "react-native";
import firebase from '@react-native-firebase/app';
import {Credentials} from "../Credentials/Credentials";



export const get_Token = async () => {

        const token = await messaging().getToken()
    console.log(token)
        return token

    }
