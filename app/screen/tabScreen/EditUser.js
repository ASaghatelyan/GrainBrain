import React, {useState} from 'react';
import {View, Text, ScrollView, TouchableOpacity} from 'react-native';
import ProfileComponent from '../../component/profileComponent/ProfileComponent';
import Input from '../../component/input/Input';
import {styles} from '../../style/EditPageStyles';
import Button from '../../component/button/Button';
import {nameValidation, passwordValidate, validateEmail} from "../../component/validate/Validate";
import {useDispatch, useSelector} from "react-redux";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axiosInstance from "../../networking/axiosinstance";
import PasswordButton from "../../component/passwordButton/PasswordButton";
import Loading from "../../component/loading/Loading";
import Axiosinstance from "../../networking/axiosinstance";

export default function EditUser(props) {

    let store = useSelector((state) => {
        return state.customer
    })
    const dispatch = useDispatch()
    const [state, setState] = useState(false)
    const [name, setName] = useState(store.name ? store.name : "")
    const [email, setEmail] = useState(store.email ? store.email : "")
    const [oldPassword, setOldPassword] = useState("")
    const [newPassword, setNewPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")
    const [nameText, setNameText] = useState("")
    const [emailText, setEmailText] = useState("")
    const [oldPasswordText, setOldPasswordText] = useState("")
    const [newPasswordText, setNewPasswordText] = useState("")
    const [confirmPasswordText, setConfirmPasswordText] = useState("")
    const [photo, setPhoto] = useState(store.image ? store.image : null)
    const [registrText, setRegistrText] = useState("")
    const [visible, setVisible] = useState(false)
    const [cameraImage, setCameraImage] = useState(null)
    const cameraImageFunc = (item) => {
        setPhoto(null)
        setCameraImage(item)
    }

    let photofunc = (image) => {
        setCameraImage(null)
        setPhoto(image)
    }

    const logOut = async () => {
        await AsyncStorage.removeItem("token")
        props.navigation.replace('firstPageNavigation');
    }

    const handle = async () => {
        setVisible(true)
        try {
            const d = new Date();
            d.getTime();
            const formData = new FormData()
            if (photo) {
                formData.append('image', {
                    name: `${d.getTime()}_name.jpg`,
                    uri: photo,
                    type: 'image/jpeg'
                })
            } else if (cameraImage) {
                formData.append('image', {
                    name: `${d.getTime()}_name.jpg`,
                    uri: cameraImage,
                    type: 'image/jpeg'
                })
            }
            formData.append("name", name)
            formData.append("email", email)
            if (state) {
                formData.append("old_password", oldPassword)
                formData.append("password", newPassword)
                formData.append("password_confirmation", confirmPassword)
            }
            const response = await axiosInstance.post('/editProfile', formData)
            setVisible(false)
            dispatch({
                type: "SET_CUSTOMER",
                payload: response.data.message
            })
            props.navigation.navigate("user")
        } catch (e) {
            setVisible(false)
        }
    }
    const DeleteAccount = async () => {
        try {
            const response = await Axiosinstance.delete('/delete/account')
            console.log(response)
            props.navigation.replace('firstPageNavigation');
            await AsyncStorage.removeItem("token")
            await AsyncStorage.removeItem("tokenNotification")

        }catch (e){
            console.log(e)
        }

    }

    let validFunc = () => {
        if (nameValidation.test(name) && validateEmail(email)) {
            if (state) {
                if (passwordValidate.test(oldPassword) && passwordValidate.test(newPassword) && passwordValidate.test(confirmPassword) && newPassword === confirmPassword) {
                    handle()
                }
            }
            handle()
        }
        if (!nameValidation.test(name)) {
            setNameText("The Name you’ve entered is incorrect.")
        }
        if (!validateEmail(email)) {
            setEmailText("The email you’ve entered is incorrect.")
        }
        if (!passwordValidate.test(oldPassword)) {
            setOldPasswordText("The old password you’ve entered is incorrect.")
        }
        if (!passwordValidate.test(newPassword)) {
            setNewPasswordText("The old password you’ve entered is incorrect.")
        }
        if (!passwordValidate.test(confirmPassword)) {
            setConfirmPasswordText("The old password you’ve entered is incorrect.")
        }
    }

    return (
        <ScrollView style={styles.ScroolEdit} showsVerticalScrollIndicator={false}>
            <View style={styles.editInput}>
                <ProfileComponent
                    navigation={props.navigation}
                    photofunc={photofunc}
                    photo={photo}
                    cameraUserImage={cameraImage}
                    cameraImageFunc={cameraImageFunc}
                />
                <Input
                    placeholder={"name"}
                    borderColor={nameText ? "red" : '#EEEEEE'}
                    backgroundColor={'#F8F8F8'}
                    value={name}
                    marginTop={35}
                    onChangeText={(evt) => {
                        setName(evt)
                        setNameText("")
                        setRegistrText("")
                    }}/>
                <Text style={styles.valideText}>{nameText}</Text>
                <Input
                    placeholder={"email"}
                    borderColor={emailText ? "red" : '#EEEEEE'}
                    backgroundColor={'#F8F8F8'}
                    value={email}
                    onChangeText={(evt) => {
                        setEmail(evt)
                        setEmailText("")
                        setRegistrText("")
                    }}/>
                <Text style={styles.valideText}>{emailText}</Text>
                {state ?
                    <View>
                        <PasswordButton
                            placeholder={'Old password'}
                            borderColor={oldPasswordText ? "red" : '#EEEEEE'}
                            backgroundColor={'#F8F8F8'}
                            onChangeText={(evt) => {
                                setOldPassword(evt)
                                setOldPasswordText("")
                                setRegistrText("")
                            }}/>
                        <Text style={styles.valideText}>{oldPasswordText}</Text>
                        <PasswordButton
                            placeholder={'New password'}
                            borderColor={newPasswordText ? "red" : '#EEEEEE'}
                            backgroundColor={'#F8F8F8'}
                            onChangeText={(evt) => {
                                setNewPassword(evt)
                                setNewPasswordText("")
                                setRegistrText("")
                            }}/>
                        <Text style={styles.valideText}>{newPasswordText}</Text>
                        <PasswordButton
                            placeholder={'Confirm password'}
                            borderColor={confirmPasswordText ? "red" : '#EEEEEE'}
                            backgroundColor={'#F8F8F8'}
                            onChangeText={(evt) => {
                                setConfirmPassword(evt)
                                setConfirmPasswordText("")
                                setRegistrText("")
                            }}/>
                        <Text style={styles.valideText}>{confirmPasswordText}</Text>
                    </View>
                    :
                    null
                }
                <View style={styles.changeView}>
                    <TouchableOpacity onPress={() => {
                        setState(!state)
                    }}>
                        <Text style={styles.ChangePassword}>Change password</Text>
                    </TouchableOpacity>
                </View>
                <Text style={styles.valideText}>{registrText}</Text>
                <Button
                    title={"Save"}
                    color={"white"}
                    backgroundColor={"#569690"}
                    marginBottom={20}
                    marginTop={59}
                    onPress={() => {
                        validFunc()
                    }}/>
                <Button
                    title={'LOG OUT'}
                    fontWeight={'bold'}
                    color={'#569690'}
                    borderWidth={1}
                    borderColor={'#569690'}
                    marginBottom={18}
                    onPress={() => {
                        logOut()
                    }}/>

                <Button
                    title={'Delete Account'}
                    fontWeight={'bold'}
                    color={'#569690'}
                    borderWidth={1}
                    borderColor={'#569690'}
                    marginBottom={60}
                    onPress={() => {
                        DeleteAccount()
                    }}/>
            </View>
            <Loading loading={visible}/>
        </ScrollView>
    );
}
