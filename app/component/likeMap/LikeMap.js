import {Text, View, StyleSheet, TouchableOpacity, Image} from "react-native";
import React, {useContext} from "react";


export default function LikeMap(props) {

    return (
        <TouchableOpacity style={styles.ProfileView}
                          onPress={() => {
                              props.propsNavigation.navigate("usersSinglePage", {id: props.item.id})
                              props.modalFunc(false)
                          }}>
            <View style={styles.container}>
                <Image
                    source={{uri: props.item.image}}
                    style={{width: 30, height: 30, borderRadius: 100}}
                />
                <View style={styles.textView}>
                    <Text style={styles.nameText}>{props.item.name}</Text>

                </View>
            </View>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    ProfileView: {
        flexDirection: "row",
        alignItems: "center",
        marginVertical: 3,
    },
    textView: {
        flex: 1,
        borderBottomWidth: 1,
        borderBottomColor: "#EEEEEE",
        padding: 5
    },
    imgEclips: {
        width: 50,
        height: 50,

    },
    nameText: {
        fontSize: 12,
        color: "#136A8A",
        fontWeight: "bold",
        marginLeft: 7,
        fontFamily: "OpenSans-Regular",
    },
    dayText: {
        color: "#595959",
        marginLeft: 7,
        fontFamily: "OpenSans-Regular",
        fontSize: 10
    },
    container: {
        marginLeft: 30,
        flexDirection: "row",
        alignItems: "center"
    }
})
