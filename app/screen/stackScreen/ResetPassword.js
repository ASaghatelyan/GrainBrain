import React, { useState} from "react";
import {Text, StatusBar, ScrollView, TextInput} from "react-native"
import LinearGradient from "react-native-linear-gradient";
import {styles} from "../../style/ResetPasswordStyles";
import Button from "../../component/button/Button";
import {passwordValidate} from "../../component/validate/Validate";
import PasswordButton from "../../component/passwordButton/PasswordButton";
import GrainBrainLogoHeader from "../../component/grainBrainlogoHeader/GrainBrainLogoHeader";
import axios from "axios";
import Loading from "../../component/loading/Loading";

export default function ResetPassword(props) {
    const [newPassword, setNewPassword] = useState("")
    const [repeatPassword, setRepeatPassword] = useState("")
    const [newPasswordText, setNewPasswordText] = useState("")
    const [repeatPasswordText, setRepeatPasswordText] = useState("")
    const [verification, setVerification] = useState("")
    const [verificationText, setVerificationText] = useState("")
    const [visible, setVisible] = useState(false)

    const data = {
        code: verification,
        password: newPassword,
        password_confirmation: repeatPassword
    }

    const validateFunc = () => {
        if (passwordValidate.test(newPassword) && passwordValidate.test(repeatPassword) && newPassword === repeatPassword && verification.length === 8) {
            setVisible(true)
            axios.post("https://app.grain-brain.ca/api/resetPassword", data)
                .then((response) => {
                    setVisible(false)
                    props.navigation.navigate("login")
                })
                .catch((err) => {
                    console.log(err)
                    setVisible(false)
                })
        } else {
            setVisible(false)
        }
        if (newPassword !== repeatPassword) {
            setNewPasswordText("The password you’ve entered is incorrect.")
            setRepeatPasswordText("The repeat password you’ve entered is incorrect.")
        }
        if (!passwordValidate.test(newPassword)) {
            setNewPasswordText("The password you’ve entered is incorrect.")
        }
        if (!passwordValidate.test(repeatPassword)) {
            setRepeatPasswordText("The repeat password you’ve entered is incorrect.")
        }
        if (verification.length < 8) {
            setVerificationText("The Verification Code you’ve entered is incorrect.")
        }
    }

    return (
        <LinearGradient
            colors={['#136A8A', '#267871C2']}
            style={styles.linearGradient}>
            <StatusBar backgroundColor={'#136A8A'} barStyle={'light-content'}/>
            <ScrollView style={styles.ressetPasswordScrol} showsVerticalScrollIndicator={false}>
                <GrainBrainLogoHeader
                    logo={require("../../assets/image/GrainBrainlogo.png")}
                    Welcome={require("../../assets/image/resetpassword.png")}
                    marginTop={57}
                    marginTopWelcome={58}
                    marginBottom={57}
                />
                <TextInput
                    placeholder={'Verification Code'}
                    placeholderTextColor={"#A8A2AC"}
                    style={[styles.inputVerific, {borderColor: verificationText ? "red" : "white"}]}
                    onChangeText={(evt) => {
                        setVerification(evt)
                        setVerificationText("")
                    }}/>
                <Text style={styles.validText}>{verificationText}</Text>
                <PasswordButton
                    placeholder={"New password"}
                    borderColor={newPasswordText ? "red" : 'white'}
                    onChangeText={(evt) => {
                        setNewPassword(evt)
                        setNewPasswordText("")
                    }}
                />
                <Text style={styles.validText}>{newPasswordText}</Text>
                <PasswordButton
                    placeholder={"Repeat password"}
                    borderColor={repeatPasswordText ? "red" : 'white'}
                    onChangeText={(evt) => {
                        setRepeatPassword(evt)
                        setRepeatPasswordText("")
                    }}
                />
                <Text style={styles.validText}>{repeatPasswordText}</Text>
                <Button
                    title={"LOG IN"}
                    color={"#136A8A"}
                    backgroundColor={"white"}
                    fontWeight={"bold"}
                    marginVertical={60}
                    marginHorizontal={20}
                    onPress={() => {
                        validateFunc()
                    }}
                />
                <Loading loading={visible}/>
            </ScrollView>
        </LinearGradient>
    )
}
