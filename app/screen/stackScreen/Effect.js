import React, {useEffect} from "react";
import {View, StatusBar, Image} from "react-native"
import LinearGradient from "react-native-linear-gradient";
import {styles} from "../../style/FirstPageStyles";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axiosInstance from "../../networking/axiosinstance";
import {useDispatch} from "react-redux";
import {Credentials} from "../../component/Credentials/Credentials";

export default function (props) {
    let dispatch = useDispatch()

    useEffect(() => {
        Credentials()
        const id = setTimeout(() => {
            handle()

        }, 1000)
        return () => {
            clearTimeout(id)
        }
    }, [])

    const getData = async () => {
        try {
            const value = await AsyncStorage.getItem('token')
            if (value !== null) {
                return value
            }
        } catch (e) {
            return null
        }
    }

    const getKeep = async () => {
        try {
            const value = await AsyncStorage.getItem('keep')
            if (value !== null) {
                return JSON.parse(value)
            }
        } catch (e) {
            return null
        }
    }

    const handle = async () => {
        let token = await getData()
        let keep = await getKeep()
        if (token && keep) {
            tokenFunc()
        } else {
            props.navigation.replace("firstPage")
        }
    }

    const tokenFunc = async () => {
        try {
            const response = await axiosInstance.get("/checkExpired")
            response.data.status ?
                validFunc()
                :
                props.navigation.replace("firstPage")
        } catch (e) {
            props.navigation.replace("firstPage")
        }
    }

    let validFunc = async () => {
        let token = await getData()
        try {
            let response = await axiosInstance.post('/me', {
                headers: {
                    authorization: 'Bearer ' + token
                }
            })
            dispatch({
                type: "SET_CUSTOMER",
                payload: response.data.message
            })
            props.navigation.replace("tab")
        } catch (e) {
            props.navigation.replace("firstPage")
        }
    }

    return (
        <LinearGradient
            colors={['#136A8A', '#267871C2']}
            style={styles.linearGradient}
        >
            <StatusBar backgroundColor={'#136A8A'} barStyle={'light-content'}/>
            <View style={{flex: 1, alignItems: "center", justifyContent: "center"}}>
                <Image source={require('../../assets/image/GrainBrainlogo.png')} style={styles.logoFirstPageImg}/>
            </View>
        </LinearGradient>
    )
}
