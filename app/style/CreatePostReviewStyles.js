import React from 'react';
import {Dimensions, StyleSheet} from 'react-native';
import Input from "../component/input/Input";

const windowWidth = Dimensions.get('window').width;

export const styles = StyleSheet.create({

    ScroolViewPost: {
        flex: 1,
        backgroundColor: "rgb(250, 250, 250)",
    },
    allView: {
        marginHorizontal: 40,
    },
    linePost: {
        width: 50,
        borderWidth: 2,
        borderColor: '#136A8A',
        borderRadius: 38,
        marginBottom: 39,
    },
    starStylePost: {
        width: 26,
        height: 25,
        marginRight: 13,
    },
    PostView: {
        alignItems: 'center',
    },
    postReviewImg: {
        marginBottom: 11,
        marginTop: 55,
    },
    cameraView: {
        backgroundColor: '#F8F8F8',
        height: 99,
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 6,
        marginVertical: 16,
        borderColor: '#EEEEEE',
        borderWidth: 1,
        position: "relative"
    },
    inputImgView: {
        backgroundColor: '#F8F8F8',
        width: windowWidth - 80,
        flexDirection: 'row',
        alignItems: 'center',
        borderColor: '#EEEEEE',
        borderWidth: 1,
        borderRadius: 6,
    },
    categoryInput: {
        width: '80%',
        fontFamily: 'OpenSans-Regular',
    },
    choosephotoText: {
        color: '#595959',
        marginTop: 7,
        fontFamily: 'OpenSans-Regular',
    },
    camera: {
        width: 24,
        height: 24,
    },
    vectorInput: {
        width: 15,
        height: 8,
    },
    selectView: {
        borderWidth: 1,
        borderRadius: 6,
        backgroundColor: "#F8F8F8",
        position: "relative"
    },
    selectedPicker: {
        placeholderTextColor: '#A8A2AC',
        fontFamily: "OpenSans-Regular",
        opacity: 0
    },
    inputVector: {
        width: 15,
        height: 8.5,
        position: "absolute",
        right: 16,
        marginVertical: 20,
        opacity: 0.9
    },
    selectText: {
        position: 'absolute',
        color: "#A8A2AC",
        fontSize: 12,
        paddingLeft: 16,
        paddingTop: 17
    },
    validateTExt: {
        textAlign: "left",
        color: "#FF2E00",
        fontSize: 12,
        marginVertical: 2,
    },
    galeriaPhoto:{
        height:99  ,
        width:"100%",
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 6,
        marginVertical: 16,

    },
    starView: {
        flex: 1,
        alignItems: "flex-start"
    },
    starStyle: {
        marginHorizontal: 3.5
    },
    deleteView:{
        alignItems:"flex-end"
    },
    deleteButton:{
        width:30,
        alignItems:"center",
        justifyContent:"center",
    },
    post_text:{
        marginBottom: 11,
        marginTop: 55,
        color:'#136A8A',
        fontSize:24,
        fontWeight:'700',
        textAlign:'center'
    }
});
