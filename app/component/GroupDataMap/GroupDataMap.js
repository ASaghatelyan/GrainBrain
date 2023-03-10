import React, {useContext} from 'react';
import {Image, Text, View, StyleSheet, TouchableOpacity} from 'react-native';

export default function GroupDataMap(props) {

    return (
        <TouchableOpacity
            onPress={() => {
                props.handle(props.item.id, props.item.group_name)
            }}>
            <View style={styles.groupDataMapAllView}>
                <View style={styles.ImageView}>
                    <View>
                        <Image source={props.item.img1} style={styles.img1Style}/>
                        <Image source={props.item.img3} style={styles.img3Style}/>
                    </View>
                    <View>
                        <Image source={props.item.img2} style={styles.img2Style}/>
                        <Image source={props.item.img4} style={styles.img4Style}/>
                    </View>
                </View>
                <View style={styles.groupTextView}>
                    <Text style={styles.groupText}>{props.item.group_name}</Text>
                    <Text style={styles.nameGroup}>{props.item.name1} {props.item.name2} MC
                        and {props.item.quantity} others</Text>
                </View>
            </View>
            <View style={styles.lineAll}/>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    ImageView: {
        flexDirection: 'row',
        borderRadius: 50,
    },
    groupDataMapAllView: {
        flexDirection: 'row',
        marginHorizontal: 40,
    },
    groupText: {
        color: '#136A8A',
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 5,
        fontFamily: 'OpenSans-Regular',
    },
    nameGroup: {
        color: '#595959',
        fontFamily: 'OpenSans-Regular',
    },
    lineAll: {
        borderWidth: 0.5,
        borderColor: '#EEEEEE',
        marginVertical: 12,
    },
    groupTextView: {
        marginLeft: 12,
    },
    img3Style: {
        borderBottomLeftRadius: 50,
        width: 27,
        height: 26,
    },
    img1Style: {
        borderTopLeftRadius: 50,
        width: 27,
        height: 26,
    },
    img4Style: {
        borderBottomRightRadius: 50,
        width: 27,
        height: 26,
    },
    img2Style: {
        borderTopRightRadius: 50,
        width: 27,
        height: 26,
    },
});
