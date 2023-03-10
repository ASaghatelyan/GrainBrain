import React, {useContext} from "react";
import {View, Text, TouchableOpacity, Image, StyleSheet, FlatList} from "react-native"
import {TabActions} from "@react-navigation/native";
import {ContextHomePage} from "../../screen/tabScreen/HomePage";

export default function SearchUserMap(propsAll) {

    const context = useContext(ContextHomePage)


    const data = (props) => {
        return (
            <View>
                <TouchableOpacity style={styles.ProfileView}
                                  onPress={() => {
                                      context.navigation.navigate("usersSinglePage", {id: props.item.id})
                                  }}>
                    <Image
                        source={{uri: props.item.image}}
                        style={{width: 60, height: 60, borderRadius: 100}}
                    />
                    <View>
                        <Text style={styles.nameText}>{props.item.name}</Text>
                    </View>
                </TouchableOpacity>
            </View>
        )
    }
    return (
        <FlatList data={propsAll.searchDataUser} renderItem={data}/>
    )
}

const styles = StyleSheet.create({
    ProfileView: {
        flexDirection: "row",
        alignItems: "center",
        marginVertical: 5,
        marginLeft: 40
    },
    imgEclips: {
        width: 50,
        height: 50,
    },
    nameText: {
        fontSize: 15,
        color: "#136A8A",
        fontWeight: "bold",
        marginLeft: 7,
    },
    dayText: {
        color: "#595959",
        marginLeft: 7,
        fontFamily: "OpenSans-Regular",
    },
})
