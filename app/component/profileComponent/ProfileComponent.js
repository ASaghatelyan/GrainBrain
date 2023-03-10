import React, {useEffect, useState} from 'react';
import {Image, Text, View, StyleSheet, TouchableOpacity, AsyncStorage} from 'react-native';
import ListImg from '../list/List';
import {useSelector} from "react-redux";
import ModalCamera from "../modalCamera/ModalCamera";

export default function ProfileComponent(props) {
    const [modalCamera,setModalCamera] = useState(false)
    const [buttonState,setButtonState] = useState(true)
    const onPressModal = (item) =>{
        setModalCamera(item)
    }

    let store = useSelector((state) => {
        return state.customer
    })

    return (
        <View>
            <View style={styles.HeaderUsersSinglePage}>
                <TouchableOpacity
                    onPress={() => {
                        props.navigation.goBack()
                    }}>
                    <Image source={require('../../assets/image/back.png')} style={styles.backUser}/>
                </TouchableOpacity>
                <ListImg/>
            </View>
            <View style={styles.ProfileImgName}>
                <View style={styles.deleteView}>
                    <TouchableOpacity
                        onPress={() => {
                            props.cameraImageFunc(`https://app.grain-brain.ca/image/noavatar.png`)
                        }}
                        style={styles.deleteButton}>
                        <Image source={require('../../assets/image/close.png')}
                               style={{width: 25, height: 25}}/>
                    </TouchableOpacity>
                </View>
                <TouchableOpacity onPress={() => {
                    setModalCamera(true)
                }}>
                    {
                        props.cameraUserImage ?
                        <Image source={{uri: props.cameraUserImage}} style={styles.eclipse3Profile}/>
                        :
                        <Image source={{uri: props.photo ? props.photo : store.image}} style={styles.eclipse3Profile}/>
                    }
                </TouchableOpacity>
                <Text style={styles.firstnameLastname}>{store.name}</Text>
            </View>
            <ModalCamera
                visible={modalCamera}
                onPressModal={onPressModal}
                photoFunc={props.photofunc}
                cameraImageFunc={props.cameraImageFunc}
                cameraImage={props.cameraImageFunc}
                user={"user"}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    HeaderUsersSinglePage: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginHorizontal: 7.5,
        marginVertical: 30,
    },
    backUser: {
        width: 15,
        height: 25,
    },
    ProfileImgName: {
        alignItems: 'center',
    },
    eclipse3Profile: {
        width: 162,
        height: 162,
        borderRadius: 100
    },
    firstnameLastname: {
        color: '#136A8A',
        fontSize: 20,
        fontWeight: 'bold',
        marginTop: 10,
    },
    deleteView:{
        width:'100%',
        alignItems:"flex-end",
    },
    deleteButton:{
        width:30,
        alignItems:"center",
        justifyContent:"center",
        marginRight:80
    }

});


