import React from 'react';
import {View, Text, Image, StyleSheet} from 'react-native';

export default function NewNotificationsMap(props) {

    return (
        <View>
            <View style={styles.viewProfilenotificationsAll}>
                <View style={styles.viewProfilenotifications}>
                    <Image source={props.item.imgEclipse} style={styles.imgeclipsNewNotific}/>
                    <Text style={styles.nameNewNotifications}>{props.item.name} {props.item.lastName}</Text>
                </View>
                <Text style={styles.descriptionNotifications}>{props.item.description}</Text>
                <View style={styles.dayView}>
                    <Text style={styles.textDay}>{props.item.day} day ago</Text>
                </View>
            </View>
            <View style={styles.newNotificationsLine}/>
        </View>


    );
}

const styles = StyleSheet.create({
    viewProfilenotifications: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    imgeclipsNewNotific: {
        width: 21,
        height: 21,
    },
    nameNewNotifications: {
        color: '#136A8A',
        fontSize: 12,
        fontWeight: 'bold',
        marginLeft: 12,
        fontFamily: 'OpenSans-Regular',
    },
    descriptionNotifications: {
        color: 'black',
        fontSize: 12,
        marginLeft: 33,
        fontWeight: 'bold',
        fontFamily: 'OpenSans-Regular',
    },
    dayView: {
        flex: 1,
        alignItems: 'flex-end',
    },
    textDay: {
        color: '#595959',
        fontSize: 12,
        fontFamily: 'OpenSans-Regular',
    },
    newNotificationsLine: {
        borderColor: '#EEEEEE',
        borderWidth: 0.5,
        marginVertical: 13,
    },
    viewProfilenotificationsAll: {
        marginHorizontal: 40,
    },
});
