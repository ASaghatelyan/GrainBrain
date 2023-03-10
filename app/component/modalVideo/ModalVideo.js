import React, {useState} from "react";
import Modal from "react-native-modal";
import {Image, TouchableOpacity, View, StyleSheet, Text, TextInput} from "react-native";


export default function ModalReport(props) {


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
