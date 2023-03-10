import React, {useState} from 'react';
import {Text, ScrollView, StatusBar, View, Image, TextInput,} from 'react-native';
import InputBlue from '../../component/inputBlue/InputBlue';
import {styles} from '../../style/InviteStyles';
import {InviteDataFunc} from '../../component/data/Data';
import Button from "../../component/button/Button";
import ListImg from "../../component/list/List";

export default function Invite() {
    const [text,setText] = useState("")
    return (
        <ScrollView style={styles.inviteScrool} showsVerticalScrollIndicator={false}>
            <StatusBar backgroundColor={"rgb(250, 250, 250)"} barStyle={"dark-content"}/>
            {/*<InputBlue/>*/}
            <View style={styles.inputViewBlue}>
                <View style={styles.textinputPosition}>
                    <Image
                        source={require('../../assets/image/iconfinder.png')}
                        style={styles.vectorIcons}
                    />
                    <TextInput
                        style={styles.TextInputBlue}

                        onChangeText={(evt) => {
                            setText(evt)
                        }}
                    />
                </View>
                <ListImg/>
            </View>
            <Text style={styles.inviteText}>INVITE FRIENDS</Text>
            <InviteDataFunc/>
            <Button
                title={"INVITE"}
                color={"#FFFFFF"}
                backgroundColor={"#569690"}
                fontWeight={"bold"}
                marginBottom={18}
                marginTop={75}
                marginHorizontal={40}
            />
        </ScrollView>
    );
}

