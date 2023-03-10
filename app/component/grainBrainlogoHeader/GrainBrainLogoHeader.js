import React from 'react';
import {Image, View} from 'react-native';

export default function GrainBrainLogoHeader(props) {
    return (
        <View style={{
            alignItems: 'center',
            marginTop: props.marginTop,
            marginBottom: props.marginBottom
        }}>
            <Image
                source={props.logo}
                style={{
                    width: 200,
                    height: 200,
                }}/>
            <Image
                source={props.Welcome}
                style={{
                    marginTop: props.marginTopWelcome,
                    marginBottom: 10,

                }}/>
            <View
                style={{
                    borderWidth: 2,
                    borderRadius: 38,
                    width: 59,
                    borderColor: 'white',
                }}/>
        </View>
    );
}
