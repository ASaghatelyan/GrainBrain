import React, {useState} from "react";
import Modal from 'react-native-modal';
import {View, Text, ScrollView, TouchableOpacity, Image} from "react-native";
import {LikeModalFunc} from "../data/Data";

export default function LikeModal(props) {
    return (
        <Modal
            visible={props.visible}
            animationIn="slideInDown"
            animationOut="slideOutUp"
            testID={'modal'}
            swipeDirection="down"
            backdropColor={'rgba(250, 250, 250, 0.5)'}
            backdropOpacity={1}
            style={{margin: 0, marginTop: 200}}
            onSwipeComplete={() => {
                props.modalFunc(false)
            }}
            onBackButtonPress={() => {
                props.modalFunc(false)
            }}>
            <ScrollView style={{
                backgroundColor: 'rgb(250, 250, 250)',
                flex: 1,
            }}>
                <View
                    style={{marginTop: 30}}
                    onPress={() => {
                        props.modalFunc(false)
                    }}>
                    <TouchableOpacity style={{
                        alignItems:'center',
                        transform: [{ rotate: '270deg' }]
                    }} onPress={() =>{
                        props.modalFunc(false)
                    }}>
                        <Image source={require('../../assets/image/back.png')}/>
                    </TouchableOpacity>
                    <LikeModalFunc
                        likeUser={props.likesArr}
                        propsNavigation={props.propsNavigation}
                        modalFunc={props.modalFunc}
                    />
                </View>
            </ScrollView>
        </Modal>
    )
}
