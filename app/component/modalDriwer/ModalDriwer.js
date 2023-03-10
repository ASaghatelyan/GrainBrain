import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from "react-native";
import Modal from 'react-native-modal';
import ModalButton from '../modalButton/ModalButton';
import {StackActions, TabActions} from "@react-navigation/native";
import {useNavigation} from '@react-navigation/native';
import AsyncStorage from "@react-native-async-storage/async-storage";
import {get_Token_token} from "../notification_helper/helper";

export default function ModalDriwer(props) {

    const jumpToActionNotifications = TabActions.jumpTo("homePageNavigation", {screen: "notifications"})
    const jumpToActionHomepage = TabActions.jumpTo("homePageNavigation", {screen: "homePage"})
    const jumpToActionInvite = TabActions.jumpTo("usersNavigation", {screen: "invite"})
    const navigation = useNavigation()

    const logout = async () => {
        navigation.dispatch(StackActions.replace("firstPageNavigation"))
        await AsyncStorage.removeItem("token")
        await AsyncStorage.removeItem("tokenNotification")
        await get_Token_token()
    }
    return (
        <Modal
            isVisible={props.modalDriwer}
            onSwipeComplete={() => {
                props.closeModal();
            }}
            onBackButtonPress={() => {
                props.closeModal();
            }}
            animationIn="slideInLeft"
            animationOut="slideOutLeft"
            testID={'modal'}
            swipeDirection="left"
            backdropColor={'rgba(250, 250, 250, 0.5)'}
            backdropOpacity={1}
            style={{margin: 0, marginRight: 90}}
        >
            <View style={styles.modalView}>
                <View style={styles.textViewModal}>
                    <ModalButton
                        text={'MY ACCOUNT'}
                        onPress={() => {
                            props.closeModal();
                            navigation.dispatch(jumpToActionHomepage)
                        }}
                    />

                    {/*<ModalButton*/}
                    {/*    text={'NOTIFICATIONS'}*/}
                    {/*    onPress={() => {*/}
                    {/*        props.closeModal();*/}
                    {/*        navigation.dispatch(jumpToActionNotifications)*/}
                    {/*    }}*/}
                    {/*/>*/}

                    {/*<ModalButton*/}
                    {/*    text={'INVITE FRIENDS'}*/}
                    {/*    onPress={() => {*/}
                    {/*        navigation.dispatch(jumpToActionInvite)*/}
                    {/*    }}*/}
                    {/*/>*/}
                </View>
                <TouchableOpacity style={styles.logOutTouch} onPress={() => {
                    props.closeModal();
                     setTimeout(() => {
                        logout()
                    }, 300)

                }}>
                    <Text style={styles.modalTextLog}>LOG OUT</Text>
                </TouchableOpacity>
            </View>
        </Modal>
    );
}

const styles = StyleSheet.create({
    modalView: {
        backgroundColor: 'rgb(250, 250, 250)',
        flex: 1,
        justifyContent: 'space-around',
    },
    textViewModal: {
        marginBottom: 100,
    },
    modalTextLog: {
        color: '#6A6A6A',
        fontSize: 18,
        fontWeight: 'bold',
        fontFamily: 'OpenSans-Regular',
    },
    logOutTouch: {
        justifyContent: 'center',
        alignItems: 'center',
    }
});
