import React from 'react';
import {Platform, StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
    ScroolEdit: {
        flex: 1,
        backgroundColor: 'white',
    },
    editInput: {
        marginHorizontal: 40,
        marginVertical: Platform.OS === 'ios' ? 45 : 20
    },
    changeView: {
        flex: 1,
        alignItems: 'flex-end',
        marginRight: 2,
    },
    ChangePassword: {
        color: '#A8A2AC',
        fontSize: 12,
        textDecorationLine: 'underline',
        fontFamily: 'OpenSans-Regular',
    },
    valideText:{
        textAlign:"left",
        color:"#FF2E00",
        fontSize:12,
        marginVertical:1
    }
});
