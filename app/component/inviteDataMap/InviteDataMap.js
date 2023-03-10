import React, {useState} from 'react';
import {View, Text, Image, StyleSheet} from 'react-native';
import CheckBox from '@react-native-community/checkbox';

export default function InviteDataMap(props) {

    const [isSelected, setIsSelected] = useState(false);

    return (
        <View>
            <View style={styles.InviteView}>
                <View style={styles.InviteImageView}>
                    <Image source={props.item.img} style={styles.InviteImage}/>
                    <Text style={styles.gmailText}>{props.item.Gmail}</Text>
                </View>
                <CheckBox
                    disabled={false}
                    value={isSelected}
                    onValueChange={(newValue) => setIsSelected(newValue)}
                    style={{transform: [{scaleX: 1.2}, {scaleY: 1.2}]}}
                    tintColors={{true: '#136A8A', false: '#136A8A'}}
                />
            </View>
            <View style={styles.InviteLine}/>
        </View>

    );
}

const styles = StyleSheet.create({
    InviteView: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginHorizontal: 42,
    },
    InviteImageView: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    InviteImage: {
        width: 35,
        height: 35,
        marginRight: 15,
    },
    InviteLine: {
        borderWidth: 1,
        borderColor: '#EEEEEE',
        marginVertical: 6,
    },
    gmailText: {
        color: '#136A8A',
        fontFamily: 'OpenSans-Regular',
    },
});
