import React from "react";
import {Image, ScrollView, StatusBar, StyleSheet, Text, TouchableOpacity, View,Platform} from "react-native";
import {useSelector} from "react-redux";

export default function UsersFolow(props) {
    const users = props.route.params.users

    return (
        <View style={styles.containerAll}>
            <View style={{ marginTop:Platform.OS === 'ios' ?30 :10}}>
            <StatusBar backgroundColor={'rgb(250, 250, 250)'} barStyle={'dark-content'}/>
            <View style={styles.backView}>
                <TouchableOpacity onPress={() => {
                    props.navigation.goBack(null)
                }}>
                    <Image source={require("../../assets/image/back.png")} style={styles.backButt}/>
                </TouchableOpacity>
            </View>
            <ScrollView>
                {users.map((item, i) => {
                    return (
                        <TouchableOpacity style={styles.ProfileView}
                                          onPress={() => {
                                              props.navigation.navigate("usersSinglePage", {id: item.id})
                                          }}
                                          key={i}
                        >
                            <View style={styles.container}>
                                <Image
                                    source={{uri: item.image}}
                                    style={{width: 30, height: 30, borderRadius: 100}}
                                />
                                <View style={styles.textView}>
                                    <Text style={styles.nameText}>{item.name}</Text>
                                </View>
                            </View>
                        </TouchableOpacity>
                    )
                })}
            </ScrollView>
        </View>
        </View>
    )
}


const styles = StyleSheet.create({
    ProfileView: {
        flexDirection: "row",
        alignItems: "center",
        marginVertical: 8,
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
    },
    backView: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginLeft: 10,
        marginVertical: 20
    },
    backButt: {
        width: 15,
        height: 25,
    },
    containerAll: {
        backgroundColor: "white",
        flex: 1,
    }
})
