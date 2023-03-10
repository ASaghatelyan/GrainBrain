import React from "react";
import {StyleSheet} from "react-native"

export const styles = StyleSheet.create({
    chatInputView: {
        alignItems: 'center',
        flexDirection: 'row',
        marginVertical: 10,
    },
    chatPlusImg: {
        width: 14,
        height: 14,
        marginHorizontal: 17,
    },
    textInputChat: {
        backgroundColor: '#F7F7FC',
        height: 36,
        width: '76%',
        borderRadius: 2,
        color: "black"
    },
    chatIcon: {
        width: 18,
        height: 18,
        marginLeft: 15,
    },
    container: {
        backgroundColor: "rgb(250, 250, 250)",
        flex: 1,
    },
    scroolComment: {
        marginVertical: 5,
    },
    title: {
        color: "#000000",
        fontWeight: "bold",
    },
    backIcon: {
        width: 15,
        height: 25,
    },
    touch: {
        alignItems: "center",
        justifyContent: "center",
        marginHorizontal: 10,
    },
    postDataView: {
        marginTop: 7,
        flexDirection: 'row'
    },
    carousel: {
        alignItems: "center",
        marginTop: 5
    },
    placeHolderImage: {
        width: 246,
        height: 150,
    },
    commentText: {
        color: '#ADB5BD',
        fontSize: 10,
        fontFamily: 'Mulish-Regular',
    },
    messageView:{
        borderBottomLeftRadius: 10,
        borderBottomRightRadius: 10,
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
        backgroundColor: '#136A8A',
    },
    placeholderText: {
        fontFamily: 'Mulish-Regular',
        width: '100%',
        textAlign: 'center',
        borderWidth: 1,
        borderColor: "transparent",
        fontSize: 16,
        color: "white"
    },
    placeHolderImg: {
        width: 246,
        height: 150
    },
    commentViewWatch: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
    },
    voiceMess: {
        width: 159,
        height: 77,
    },
    chatPadd: {
        marginVertical: 10,
        padding: 4
    },
    lineViewChat: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    lineChat: {
        borderWidth: 0.5,
        borderColor: '#EDEDED',
        width: 126.5,
    },
    years: {
        color: '#ADB5BD',
        fontSize: 12,
        marginHorizontal: 16,
        fontFamily: 'Mulish-Regular',
    },
    placeHolderImageView: {
        marginHorizontal: 51,
        padding: 4,
    },
    messageImage:{
        height:200,
        width:'100%',
        resizeMode:'cover',
        borderRadius:8
    },
    placeHolderImageViewText: {
        marginHorizontal: 30,
        paddingHorizontal: 4,
    },
    replyImage: {
        width: 15,
        height: 13,
        marginRight: 8
    },
    replyView: {
        flexDirection: "row",
        alignItems: "center"
    },
    replyText: {
        color: "#0088B2",
        fontSize: 10,
    },
    replyVector: {
        width: 15,
        height: 7.5
    },
    replyVectorView: {
        flexDirection: "row",
        alignItems: "center"
    },
    commentOpenText: {
        fontSize: 12,
        color: "#0F1828",
        fontFamily: "Mulish-Regular",
        marginRight: 10
    },
    replyCommentActive: {
        width: 15,
        height: 8.5,
    },
})
