import React, {useRef} from 'react';
import {TextInput} from 'react-native';

export default function Input(props) {

    return (
        <TextInput
            placeholder={props.placeholder}
            multiline={props.multiline}
            placeholderTextColor="#A8A2AC"
            underlineColorAndroid="transparent"
            onChangeText={props.onChangeText}
            numberOfLines={props.numberOfLines}
            value={props.value}
            style={{
                borderColor: props.borderColor,
                borderWidth: 1,
                borderRadius: 4,
                marginTop: props.marginTop,
                marginBottom: props.marginBottom,
                paddingLeft: 16,
                backgroundColor: props.backgroundColor,
                fontFamily: 'OpenSans-Regular',
                marginHorizontal:props.marginHorizontal,
                fontWeight:props.fontWeight,
                fontSize:12,
                textAlignVertical:props.textAlignVertical,
                color:"black",
                height:50
            }}
        />
    );
}
