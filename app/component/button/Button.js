import React from 'react';
import {TouchableOpacity, Text} from 'react-native';

export default function (props) {

    return (
        <TouchableOpacity style={{
            backgroundColor: props.backgroundColor,
            color: props.color,
            height: 50,
            width:props.width,
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: 6,
            borderWidth: props.borderWidth,
            borderColor: props.borderColor,
            marginTop: props.marginTop,
            marginBottom: props.marginBottom,
            marginHorizontal:props.marginHorizontal,
            marginVertical:props.marginVertical
        }}
                          onPress={props.onPress}
        >
            <Text style={{
                color: props.color,
                fontWeight: props.fontWeight,
                fontFamily: 'OpenSans-Regular',
            }}>{props.title}</Text>
        </TouchableOpacity>
    );

}





