import React, {useState} from 'react';
import {Image, TextInput, TouchableOpacity, View} from 'react-native';

export default function PasswordButton(props) {
    const [secureTextEntry, setSecureTextEntry] = useState(true);
    const [passwordButton, setPasswordButton] = useState(true)


    return (
        <View style={{
            position: 'relative',
            borderColor: props.borderColor,
            borderRadius: 4,
            borderWidth: 1,
            flexDirection: "row",
            alignItems: "center",
            backgroundColor: props.backgroundColor

        }}>
            <TextInput
                placeholder={props.placeholder}
                onChangeText={props.onChangeText}
                style={{
                  ...props.style,
                    width: "92%",
                    paddingLeft: 16,
                    fontFamily: 'OpenSans-Regular',
                    fontWeight: props.fontWeight,
                    fontSize: 12,
                    color:"black",
                    height:50
                }}
                placeholderTextColor="#A8A2AC"
                secureTextEntry={secureTextEntry}
            />
            {passwordButton ?
                <TouchableOpacity
                    onPress={() => {
                        setSecureTextEntry(!secureTextEntry);
                        setPasswordButton(false)
                    }}
                    style={{
                        marginLeft: 5
                    }}>
                    <Image
                        source={require('../../assets/image/Vector.png')}
                        style={{height: 14, width: 15}}
                    />
                </TouchableOpacity>
                :
                <TouchableOpacity
                    onPress={() => {
                        setSecureTextEntry(!secureTextEntry);
                        setPasswordButton(true)
                    }}
                    style={{
                        marginLeft: 5

                    }}>
                    <Image
                        source={require('../../assets/image/vectorInActive.png')}
                        style={{height: 14, width: 15}}
                    />
                </TouchableOpacity>
            }

        </View>
    );
}
