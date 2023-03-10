import React from 'react';
import {Platform, StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
    userScrool: {
        flex: 1,
        backgroundColor: "rgb(250, 250, 250)",
    },
    myReviewsText: {
        color: '#03635A',
        fontWeight: 'bold',
        fontSize:15,
        marginLeft: 14,
        marginTop: 52,
        marginBottom: 20,
    },
    viewUser: {
        marginHorizontal: 40,
    },
    HeaderUsersSinglePage: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginHorizontal: 7.5,
        marginVertical: Platform.OS === 'ios' ? 60 : 30
    },
    backUser: {
        width: 15,
        height: 25,
    },
    ProfileImgName: {
        alignItems: 'center',
    },
    firstnameLastname: {
        color: '#136A8A',
        fontSize: 15,
        marginTop: 5,
        marginLeft: 22,
        fontWeight: "bold",

    },
    containerView: {
        flexDirection: "row",
        justifyContent: "space-between",
    },
    eclipse3Profile: {
        width: 90,
        height: 90,
        borderRadius: 100,
        backgroundColor: "black",
        marginLeft: 20,
    },
    viewFolowers: {
        alignItems: "center",
        marginTop: 12
    },
    textChild: {
        fontWeight: "bold",
        fontFamily: "OpenSans-Regular",
        color: "#003346"
    },
    quantity: {
        color: "#003346",
        fontFamily: "OpenSans-Regular",
    }
});
