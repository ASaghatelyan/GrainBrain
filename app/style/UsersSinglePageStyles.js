import React from 'react';
import {Platform, StyleSheet} from 'react-native';

export const styles = StyleSheet.create({

    ScrollViewAll: {
        flex: 1,
        backgroundColor: "rgb(250, 250, 250)",
    },
    viewReview: {
        marginHorizontal: 40,
        marginVertical: Platform.OS === 'ios' ? 25 : 0,

    },
    HeaderUsersSinglePage: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginVertical: Platform.OS === 'ios' ? 40 : 20,
    },
    reviews: {
        color: '#03635A',
        fontWeight: 'bold',
        fontSize: 15,
        marginVertical: 30,
        marginLeft: 1,
    },
    backUser: {
        width: 15,
        height: 25,
    },
    ProfileImgName: {
        alignItems: 'flex-start',
    },
    eclipse3Profile: {
        width: 90,
        height: 90,
        borderRadius: 100,
        marginLeft: 20,
        backgroundColor: "black"
    },
    firstnameLastname: {
        color: '#136A8A',
        fontSize: 15,
        marginTop: 5,
        marginLeft: 22,
        marginBottom: 15,
        fontWeight: "bold",

    },
    buttView: {
        justifyContent: "space-evenly",
        alignItems: "center",
        flexDirection: 'row'
    },
    folowText: {
        color: "white",
        fontFamily: 'OpenSans-Regular',
        fontWeight: "bold"
    },
    containerView: {
        flexDirection: "row",
        justifyContent: "space-between",
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
    },
    myProfileView: {
        borderWidth: 1,
        height: 40,
        borderColor: "#569690",
        borderRadius: 6,
        justifyContent: "center",
        alignItems: "center"
    },
    myProfileText: {
        color: "#569690",
        fontSize: 15,
        fontWeight: "bold"
    },
    backButton: {
        width: 30,
        alignItems: "center",
        justifyContent: "center",
        height: 30
    },
    blocked_Image: {
        width: 15,
        height: 15,
    },
    blocked_button: {
        alignItems: 'center',
        justifyContent: 'center',
        height: 45,
        marginTop: 20
    },
    viewBlock: {
        marginBottom: 3,
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center'
    },
    blocked_container: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    block_text: {
        fontWeight: 'bold',
        fontSize: 13,
        padding: 3,
        color: 'gray'
    }
});
