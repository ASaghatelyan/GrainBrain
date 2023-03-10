import React from 'react';
import {Dimensions, StyleSheet} from 'react-native';
const windowWidth = Dimensions.get('window').width;
export const styles = StyleSheet.create({

    inviteScrool: {
        flex: 1,
        backgroundColor: "rgb(250, 250, 250)",
    },
    inviteText: {
        color: '#03635A',
        fontWeight: 'bold',
        marginVertical: 30,
        marginHorizontal: 40,
        fontFamily: 'OpenSans-Regular',
    },
    line: {
        marginVertical: 6,
    },
    inputViewBlue: {
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginTop: 31,
        paddingHorizontal: 41,
    },
    TextInputBlue: {
        width: '100%',
        fontSize: 12,
        paddingVertical: 0,
        fontFamily: 'OpenSans-Regular',
    },
    textinputPosition: {
        width: windowWidth - 122,
        flexDirection: 'row',
        alignItems: 'center',
        borderColor: '#60B4CF',
        borderWidth: 1,
        borderRadius: 52,
    },
    vectorIcons: {
        marginLeft: 18,
        width: 15,
        height: 16,
    },
    list: {
        height: 24,
        width: 24,
    },
});
