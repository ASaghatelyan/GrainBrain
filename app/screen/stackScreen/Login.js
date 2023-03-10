import React, {useEffect, useState} from "react";
import {Alert, Platform, ScrollView, StatusBar, Text, TouchableOpacity, View} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import LinearGradient from "react-native-linear-gradient";
import axiosInstance from '../../networking/axiosinstance'
import {styles} from "../../style/LoginStyles";
import {useDispatch} from "react-redux";
import Input from "../../component/input/Input";
import Button from "../../component/button/Button";
import CheckBox from "@react-native-community/checkbox";
import GrainBrainLogoHeader from "../../component/grainBrainlogoHeader/GrainBrainLogoHeader";
import PasswordButton from "../../component/passwordButton/PasswordButton";
import {passwordValidate, validateEmail} from "../../component/validate/Validate";
import Loading from "../../component/loading/Loading";
import {get_Token} from "../../component/notification/Notification";

export default function Login(props) {
    let dispatch = useDispatch()
    const [isSelected, setIsSelected] = useState(false);
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [passwordText, setPasswordText] = useState("")
    const [emailText, setEmailText] = useState("")
    const [registerText, setRegisterText] = useState("")
    const [visible, setVisible] = useState(false)

    const storeData = async (value) => {
        try {
            await AsyncStorage.setItem('token', value)
        } catch (e) {
            console.log(e)
        }
    }

    const tokenNotification = async (token) => {
        try {
          const data =   await AsyncStorage.getItem('tokenNotification')
            return data
        } catch (e) {
            console.log(e)
        }
    }

    const storeKeep = async (value) => {
        try {
            await AsyncStorage.setItem('keep', JSON.stringify(isSelected))
        } catch (e) {
            console.log(e)
        }
    }

    const firebaseToken = async (value) => {
        try {
            await AsyncStorage.setItem('firebaseToken', value)
        } catch (e) {
            console.log(e)
        }
    }

    const validateFunc = async () => {
        if (validateEmail(email) && passwordValidate.test(password) && !passwordText) {
            setVisible(true)
            try {
                const data = {
                    password,
                    email
                }
                let response = await axiosInstance.post('/login', data)
                console.log(response)
                if(response?.data?.message === 'Your Account is deleted.'){
                    Alert.alert(
                        "",
                        'Your Account is deleted.',
                    );
                    throw new Error()
                } else {
                    await firebaseToken(response.data.access_token)
                    await storeKeep()
                    await storeData(response.data.access_token)
                    await notificationToken() //token firebase
                    dispatch({
                        type: "SET_CUSTOMER",
                        payload: response.data.message
                    })
                }
                setVisible(false)
            } catch (e) {
                console.log(e.response)
                setVisible(false)
                setRegisterText(e.response.data.error);
            }
        } else {
            setVisible(false)
        }
        if (!validateEmail(email)) {
            setEmailText("The email you’ve entered is incorrect.")
        }
        if (!passwordValidate.test(password)) {
            setPasswordText("The password you’ve entered is incorrect.")
        }
        if (password.length < 8) {
            setPasswordText("The repeat Password should contain more than 8 characters")
        }
    }

    const notificationToken = async () => {
        const token = await tokenNotification()
        try {
            const data = {
                token:token
            }
            const response = await axiosInstance.post('/save-token', data)
            await tabSubmit()
        } catch (e) {
            console.log(e.response, 'notification')
        }
    }

    const tabSubmit = async () => {
        await props.navigation.replace("tab")
    }

    return (
        <LinearGradient
            colors={["#136A8A", "#267871C2"]}
            style={styles.linearGradient}
        >
            <StatusBar backgroundColor={'#136A8A'} barStyle={'light-content'}/>
            <ScrollView contentContainerStyle={{flexGrow:1}} showsVerticalScrollIndicator={false}>
                <View style={styles.LoginView}>
                    <GrainBrainLogoHeader
                        logo={require("../../assets/image/GrainBrainlogo.png")}
                        Welcome={require("../../assets/image/Welcomeback.png")}
                        marginTop={57}
                        marginTopWelcome={58}
                    />
                    <Input
                        placeholder={"Email"}
                        marginTop={58}
                        borderColor={emailText ? "red" : "white"}
                        fontWeight={"bold"}
                        onChangeText={(evt) => {
                            setEmail(evt.trim())
                            setEmailText("")
                            setRegisterText("")
                        }}
                    />
                    <Text style={styles.validateText}>{emailText}</Text>
                    <PasswordButton
                        placeholder={"Password"}
                        borderColor={passwordText ? "red" : "white"}
                        fontWeight={"bold"}
                        onChangeText={(evt) => {
                            setPassword(evt.trim())
                            setPasswordText("")
                            setRegisterText("")
                        }}/>
                    <Text style={styles.validateText}>{passwordText}</Text>
                    <View style={styles.forgotPasswordView}>
                        <View style={styles.checkBoxView}>
                            <CheckBox
                                disabled={false}
                                value={isSelected}
                                onValueChange={(newValue) => setIsSelected(newValue)}
                                style={{transform: [{scaleX: Platform.OS === "ios" ? 0.7 : 0.9}, {scaleY: Platform.OS === "ios" ? 0.7 : 0.9}]}}
                                tintColors={{true: '#136A8A', false: '#C1C1C1'}}
                            />
                            <Text style={styles.forgotText}>Keep Me Logged In</Text>
                        </View>
                        <TouchableOpacity
                            onPress={() => {
                                props.navigation.navigate("forgotPassword")
                            }}>
                            <Text style={styles.forgotText}>Forgot the Password?</Text>
                        </TouchableOpacity>
                    </View>
                    <Text style={[styles.validateText, {marginBottom: 40, marginTop: 13}]}>{registerText}</Text>
                    <Button
                        title={"LOG IN"}
                        color={"#136A8A"}
                        backgroundColor={"white"}
                        fontWeight={"bold"}
                        marginBottom={14}
                        onPress={() => {
                            validateFunc()
                        }}/>
                    <View style={styles.signUpView}>
                        <Text style={styles.newAccount}>New account? </Text>
                        <TouchableOpacity onPress={() => {
                            props.navigation.navigate("signUp")
                        }}>
                            <Text style={styles.signUpText}>Sign up</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </ScrollView>
            <Loading loading={visible}/>
        </LinearGradient>
    );
}
