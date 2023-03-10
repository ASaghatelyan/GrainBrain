import React, {useState} from "react";
import Modal from "react-native-modal";
import {Image, TouchableOpacity, View, StyleSheet, Text} from "react-native";
import Input from "../input/Input";
import Button from "../button/Button";
import Axiosinstance from "../../networking/axiosinstance";

export default function ModalGroup(props) {
    const [groupName, setGroupName] = useState('')
    const [long, setLong] = useState('')
    const [short, setShort] = useState('')
    const [groupNameText, setGroupNameText] = useState('')

    const validateFunc = async () => {
        if (groupName.length < 3) {
            setGroupNameText('invalid Group Name')
        } else {
            try {
                const data = {
                    group_name:groupName,
                    state:'public',
                    summery:long,
                    description:short
                }
               const response = await Axiosinstance.post('/createChatGroup',data)
                console.log(response);
                props.groupNameFunc(response.data.message)
                props.modalFunc(false)
                setGroupName('')
                setGroupNameText('')
                setShort('')
                setLong('')
            } catch (e) {
                console.log(e)
            }

        }
    }

    return (
        <Modal
            isVisible={props.visibleModal}
            animationIn="slideInDown"
            animationOut="slideOutUp"
            testID={'modal'}
            swipeDirection="down"
            backdropColor={'rgba(250, 250, 250, 0.5)'}
            backdropOpacity={1}
            onSwipeComplete={() => {
                props.modalFunc(false)
            }}
            onBackButtonPress={() => {
                props.modalFunc(false)
            }}
        >
            <View style={styles.modalContainer}>
                <View style={styles.back_button_View}>
                    <TouchableOpacity onPress={() => {
                        props.modalFunc(false)
                    }}>
                        <Image source={require('../../assets/image/delete.png')} style={styles.back_button}/>
                    </TouchableOpacity>
                </View>
                <View style={styles.view_input}>
                    <Input
                        placeholder={"Group Name"}
                        borderColor={"#EEEEEE"}
                        backgroundColor={"#F8F8F8"}
                        marginBottom={16}
                        onChangeText={(evt) => {
                            setGroupName(evt)
                            setGroupNameText('')
                        }}/>
                    <Text style={styles.validateText}>{groupNameText}</Text>
                    <Input
                        placeholder={"Long Description"}
                        borderColor={"#EEEEEE"}
                        backgroundColor={"#F8F8F8"}
                        marginBottom={38}

                        onChangeText={(evt) => {
                            setLong(evt)
                        }}/>
                    <Input
                        placeholder={"Short Description"}
                        borderColor={"#EEEEEE"}
                        backgroundColor={"#F8F8F8"}
                        marginBottom={16}
                        onChangeText={(evt) => {
                            setShort(evt)
                        }}/>
                    <Button
                        title={"Add Group"}
                        color={"#FFFFFF"}
                        backgroundColor={"#569690"}
                        fontWeight={"bold"}
                        onPress={() => {
                            validateFunc()
                        }}/>
                </View>
            </View>
        </Modal>
    )
}

const styles = StyleSheet.create({
    modalContainer: {
        width: '100%',
        backgroundColor: '#EEEEEE',
        borderRadius: 20,
        height: 400
    },
    back_button: {
        width: 30,
        height: 30
    },
    back_button_View: {
        alignItems: 'flex-end',
        marginRight: 10,
        marginTop: 10
    },
    view_input: {
        flex: 1,
        marginVertical: 15,
        marginBottom: 35,
        justifyContent: 'space-between',
        marginHorizontal: 10
    },
    validateText: {
        textAlign: "left",
        color: "#FF2E00",
        fontSize: 12,
        marginVertical: 1,
    }
})
