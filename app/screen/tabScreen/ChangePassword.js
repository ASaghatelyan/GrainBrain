import React, {useState} from "react";
import {View, Text, ScrollView} from "react-native";
import ProfileComponent from "../../component/profileComponent/ProfileComponent";
import Input from "../../component/input/Input";
import Button from "../../component/button/Button";
import {styles} from "../../style/ChangePasswordStyles";
import {TabActions} from '@react-navigation/native';
import {passwordValidate} from "../../component/validate/Validate";

export default function ChangePassword(props) {
    const [oldPassword, setOldPassword] = useState("")
    const [newPassword, setNewPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")
    const [oldPasswordText, setOldPasswordText] = useState("")
    const [newPasswordText, setNewPasswordText] = useState("")
    const [confirmPasswordText, setConfirmPasswordText] = useState("")

    const jumpToActionHome = TabActions.jumpTo('homePageNavigation', {screen: "homePage"});

    const validFunc = () => {
        if (passwordValidate.test(newPassword) && passwordValidate.test(confirmPassword) && passwordValidate.test(oldPassword) && newPassword === confirmPassword) {
            props.navigation.dispatch(jumpToActionHome)
        }
        if (!passwordValidate.test(confirmPassword)) {
            setConfirmPasswordText("The confirm password you’ve entered is incorrect.");
        }
        if (!passwordValidate.test(newPassword)) {
            setNewPasswordText("The new password you’ve entered is incorrect.");
        }
        if (!passwordValidate.test(oldPassword)) {
            setOldPasswordText("The old password you’ve entered is incorrect.");
        }
        if (newPassword !== confirmPassword) {
            setNewPasswordText("The new password you’ve entered is incorrect.");
            setConfirmPasswordText("The confirm password you’ve entered is incorrect.");
        }
    }

    return (
        <ScrollView style={styles.ScrolPassword} showsVerticalScrollIndicator={false}>
            <View style={styles.ChangeView}>
                <ProfileComponent navigation={props.navigation}/>
                <Text style={styles.ChangePasswordText}>Change password</Text>
                <Input
                    placeholder={"Old Password"}
                    borderColor={oldPasswordText ? "red" : "#EEEEEE"}
                    backgroundColor={"#F8F8F8"}
                    marginTop={17}
                    onChangeText={(evt) => {
                        setOldPassword(evt)
                        setOldPasswordText("")
                    }}/>
                <Text style={styles.textValid}>{oldPasswordText}</Text>
                <Input
                    placeholder={"New Password"}
                    borderColor={newPasswordText ? "red" : "#EEEEEE"}
                    backgroundColor={"#F8F8F8"}
                    onChangeText={(evt) => {
                        setNewPassword(evt)
                        setNewPasswordText("")
                    }}/>
                <Text style={styles.textValid}>{newPasswordText}</Text>
                <Input
                    placeholder={"Confirm password"}
                    borderColor={confirmPasswordText ? "red" : "#EEEEEE"}
                    backgroundColor={"#F8F8F8"}
                    onChangeText={(evt) => {
                        setConfirmPassword(evt)
                        setConfirmPasswordText("")
                    }}/>
                <Text style={styles.textValid}>{confirmPasswordText}</Text>
                <Button
                    title={"Save"}
                    color={"white"}
                    backgroundColor={"#569690"}
                    marginTop={20}
                    marginBottom={50}
                    onPress={() => {
                        validFunc()
                    }}/>
            </View>
        </ScrollView>
    );
}
