import React from 'react';
import {View, Text, ScrollView,StatusBar} from 'react-native';
import InputBlue from '../../component/inputBlue/InputBlue';
import {styles} from '../../style/NotificationsStyles';
import {NewNotificationsFunc, SeAllNotificationsFunc} from '../../component/data/Data';

export default function Notifications() {

    return (
        <ScrollView style={styles.ScrolNotifications} showsVerticalScrollIndicator={false}>
            <StatusBar backgroundColor={"rgb(250, 250, 250)"} barStyle={"dark-content"}/>
            {/*<InputBlue/>*/}
            <View style={styles.viewNotifications}>
                <Text style={styles.notificationsText}>Notifications</Text>
                <Text style={styles.newNotificationsText}>New notifications</Text>
            </View>
            <NewNotificationsFunc/>
            <Text style={styles.seeAllText}>See all</Text>
            <SeAllNotificationsFunc/>
        </ScrollView>
    );
}
