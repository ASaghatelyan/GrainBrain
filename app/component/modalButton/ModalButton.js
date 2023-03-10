import React from 'react';
import {Text, TouchableOpacity, StyleSheet, View} from 'react-native';

export default function ModalButton(props) {
    return (
        <TouchableOpacity onPress={props.onPress}>
            <Text style={styles.modalText}>{props.text}</Text>
            <View style={styles.modalLine}/>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    modalText: {
        color: '#136A8A',
        fontSize: 18,
        fontWeight: 'bold',
        fontFamily: 'OpenSans-Regular',
        marginBottom: 13,
        marginLeft: 15,
    },
    modalLine: {
        borderWidth: 0.5,
        borderColor: '#EEEEEE',
        marginBottom: 34,
    },
});
