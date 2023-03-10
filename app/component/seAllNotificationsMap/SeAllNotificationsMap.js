import React from 'react';
import {View, Text, StyleSheet, Image} from 'react-native';

export default function SeAllNotificationsMap(props) {

    return (
        <View>
            <View style={styles.viewProfilSeall}>
                <View style={styles.viewProfileSeAll}>
                    <Image
                        source={props.item.imgEclipse}
                        style={styles.imgeclipsSeAll}
                    />
                    <Text style={styles.nameSeAll}>{props.item.name} {props.item.lastName}</Text>
                </View>
                <Text style={styles.descriptionSeAll}>{props.item.description}</Text>
                <View style={styles.dayViewSeAll}>
                    <Text style={styles.textDaySeAll}>{props.item.day} day ago</Text>
                </View>
            </View>
            <View style={styles.SeAllLine} />
        </View>
    );
}

const styles = StyleSheet.create({
    viewProfileSeAll: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    imgeclipsSeAll: {
        width: 21,
        height: 21,
    },
    nameSeAll: {
        color: '#136A8A',
        fontSize: 12,
        fontWeight: 'bold',
        marginLeft: 12,
    },
    descriptionSeAll: {
        color: 'black',
        fontSize: 12,
        marginLeft: 33,
        fontFamily: 'OpenSans-Regular',
    },
    dayViewSeAll: {
        flex: 1,
        alignItems: 'flex-end',
    },
    textDaySeAll: {
        color: '#595959',
        fontSize: 12,
    },
    SeAllLine: {
        borderColor: '#EEEEEE',
        borderWidth: 0.5,
        marginVertical: 13,
    },
    viewProfilSeall: {
        marginHorizontal: 40,
    },
});
