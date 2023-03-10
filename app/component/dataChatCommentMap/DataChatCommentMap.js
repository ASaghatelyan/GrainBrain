import React, {useState} from "react";
import {View, Text, StyleSheet, Image, TouchableOpacity} from "react-native";
import {componentDidMount} from "../keyboard/Keyboard";

export default function DataChatCommentMap(props) {

    return (
        <View style={[styles.container, {flexDirection: 'row', marginVertical: 10}]}>
            <View style={{alignItems: 'center', justifyContent: 'center'}}>
                <Image source={{uri: props.item?.user?.image}}
                       style={{width: 40, height: 40, borderRadius: 100, marginRight: 16}}/>
                <Text style={[styles.commentText, {marginRight: 20, maxWidth: 100}]}>
                    {props.item?.user?.name}
                </Text>
            </View>
            <View style={{
                backgroundColor: '#DADADA',
                width: 193,
                borderLeftWidth: 5,
                borderRadius: 3,
                borderColor: '#03635A'
            }}>
                <Text style={{fontSize: 13, color: '#0F1828', marginLeft: 16,}}>{props.item?.message}</Text>
                <View style={[styles.commentViewWatch, {width: 180, marginRight: 5}]}>
                    <Text style={[styles.commentText,]}>{props.item?.time}</Text>
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    timeText: {
        fontSize: 10,
        color: "#888888"
    },
    replyText: {
        fontSize: 10,
        color: "#0088B2"
    },
    commentView: {
        flexDirection: "row",
        justifyContent: "space-between",
        paddingLeft: 18,
        paddingRight: 6,
        marginBottom: 3
    },
    replyImage: {
        width: 15,
        height: 13,
        marginRight: 8
    },
    commentViewWatch: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
    },
    replyView: {
        flexDirection: "row"
    },
    viewChild: {
        maxWidth: 193,
        backgroundColor: "#DADADA",
        borderRadius: 3,
        marginTop: 10,
        borderLeftWidth: 5,
        borderLeftColor: "#03635A",
    },
    commentText: {
        fontSize: 12,
        color: "#0F1828",
        maxWidth: 166,
        paddingLeft: 18,
        paddingRight: 6,
        paddingVertical: 5
    },
    profileImg: {
        width: 50,
        height: 50,
        marginRight: 16
    },
    container: {
        flexDirection: "row",
        alignItems: "center"
    },
})
