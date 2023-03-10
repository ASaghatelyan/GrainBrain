import React from 'react';
import {Dimensions, Platform, StyleSheet} from "react-native";

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

export const styles = StyleSheet.create({
    ScrollHomePage: {
        backgroundColor: "rgb(250, 250, 250)",
    },
    dataMapView: {
        height:Platform.OS === 'ios' ? windowHeight -160 :windowHeight -115 ,
    },
    imgEclips: {
        width: 50,
        height: 50,
        borderRadius: 100,
    },
});
