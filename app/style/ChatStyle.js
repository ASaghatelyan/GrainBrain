import React from 'react';
import {Dimensions, Platform, StyleSheet} from 'react-native';

const windowWidth = Dimensions.get('window').width;

export const styles = StyleSheet.create({
    line: {
        marginVertical: 6,
    },
    inputViewBlue: {
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginTop: Platform.OS === "ios" ? 50 : 31,
        paddingHorizontal: 41
    },
    messageView: {
        borderBottomLeftRadius: 10,
        borderBottomRightRadius: 10,
        borderTopRightRadius: 10,
        borderTopLeftRadius:10
    },
    TextInputBlue: {
        width: '100%',
        fontSize: 12,
        paddingVertical: 0,
        fontFamily: 'OpenSans-Regular',
        height: Platform.OS === "ios" ? 28 : 28
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
    placeHolderImage: {
        width: 246,
        height: 150,
    },
    commentText: {
        color: '#ADB5BD',
        fontSize: 12,
        fontFamily: 'Mulish-Regular',
    },
    placeholderText: {
        fontFamily: 'Mulish-Regular',
        width: 212,
        textAlign: 'center',
        borderWidth: 1,
        borderColor: "transparent",
        color: 'white',
        fontSize: 16,
    },
    placeHolderImg: {
        width: 246,
        height: 150,
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
    placeHolderImageViewText: {
        marginHorizontal: 30,
        paddingHorizontal: 4,
        marginVertical: 5
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
    chatScrool: {
        flex: 1,
        backgroundColor: "rgb(250, 250, 250)",
    },
    backJaneView: {
        flexDirection: 'row',
        marginTop: 30,
        alignItems: 'center',
        marginLeft: 30,
        marginBottom: 10
    },
    backimage: {
        width: 15,
        height: 25,
    },
    lastnameText: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#136A8A',
        marginLeft: 29
    },
    audioView: {
        marginBottom: 33,
        alignItems: 'flex-end',
        marginRight: 40
    },
    goodView: {
        marginLeft: 51,
        marginVertical: 8
    },
    goodText: {
        color: '#0F1828',
        marginBottom: 4,
        fontFamily: 'Mulish-Regular',
    },
    chatPlusImg: {
        width: 14,
        height: 14,
        marginHorizontal: 17,
    },
    chatIcon: {
        width: 18,
        height: 18,
        marginLeft: 15,
    },
    chatInputView: {
        alignItems: 'center',
        flexDirection: 'row',
        marginVertical: 10,
    },
    textInputChat: {
        backgroundColor: '#F7F7FC',
        height: 36,
        width: '76%',
        color: "black"
    },
    backButton: {
        width: 20,
        alignItems: "center",
        justifyContent: "center",
        height: 20
    },
    messageImage:{
        height:200,
        width:200,
        resizeMode:'contain',
        borderRadius:8
    }
});
