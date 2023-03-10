import React, {useState} from "react";
import {Image, TouchableOpacity, StyleSheet, View} from 'react-native';
import ModalDriwer from '../modalDriwer/ModalDriwer';

export default function ListImg(props) {

    const [modalDriwer, setModalDriwer] = useState(false);


    let openModal = () => {
        setModalDriwer(true);
    };
    let closeModal = () => {
        setModalDriwer(false);
    };

    return (
        <View>
            <TouchableOpacity onPress={() => {
                openModal();
            }}>
                <Image source={require('../../assets/image/List.png')} style={styles.listUser}/>
            </TouchableOpacity>
            <ModalDriwer
                modalDriwer={modalDriwer}
                closeModal={closeModal}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    listUser: {
        width: 24,
        height: 24,
    },
});
