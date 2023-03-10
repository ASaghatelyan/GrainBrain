import React, {useState} from "react";
import Modal from "react-native-modal";
import {Image, TouchableOpacity, View, StyleSheet, Text, TextInput} from "react-native";
import Input from "../input/Input";
import Button from "../button/Button";
import Axiosinstance from "../../networking/axiosinstance";

export default function ModalReport(props) {
    const [groupName, setGroupName] = useState('')
    const [long, setLong] = useState('')
    const [groupNameText, setGroupNameText] = useState('')

    const validateFunc = async () => {
        if (groupName.length < 3) {
            setGroupNameText('invalid Title')
        } else {
            try {
                const data = {
                    post_id: props.reportIndex,
                    title: groupName,
                    description: long
                }
                const response = await Axiosinstance.post('/post/postReport', data)
                props.modalFunc(false)
                setGroupName('')
                setGroupNameText('')
                setLong('')
                props.setReportIndex(null)
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
                        props.setReportIndex(null)
                        props.modalFunc(false)
                    }}>
                        <Image source={require('../../assets/image/delete.png')} style={styles.back_button}/>
                    </TouchableOpacity>
                </View>
                <View style={styles.view_input}>
                    <View>
                        <Input
                            placeholder={"Title"}
                            borderColor={"#EEEEEE"}
                            backgroundColor={"#F8F8F8"}
                            onChangeText={(evt) => {
                                setGroupName(evt)
                                setGroupNameText('')
                            }}/>
                        <Text style={styles.validateText}>{groupNameText}</Text>
                        <TextInput
                            textAlignVertical={'top'}
                            multiline={true}
                            placeholder="Description"
                            numberOfLines={10}
                            style={{
                                borderWidth: 1,
                                borderRadius: 4,
                                paddingLeft: 16,
                                fontFamily: 'OpenSans-Regular',
                                fontSize: 12,
                                color: "black",
                                backgroundColor: 'white',
                                height: 100,
                                borderColor: '#EEEEEE'
                            }}
                            onChangeText={(evt) => {
                                setLong(evt)
                            }}/>
                    </View>
                    <Button
                        title={"Report Post"}
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
        justifyContent: 'space-between',
        marginHorizontal: 10
    },
    validateText: {
        textAlign: "left",
        color: "#FF2E00",
        fontSize: 12,
        marginVertical: 3,
        marginBottom: 20
    }
})
