import React, { useContext } from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import { MessagesContext } from "../../screen/tabScreen/Messages";

export default function MessagesMapDataSeacrh(props) {

  const MessagesProps = useContext(MessagesContext);

  return (
    <TouchableOpacity style={{ backgroundColor: "rgb(250, 250, 250)", marginTop: 5 }} onPress={() => {
      MessagesProps.navigation.navigate("chat", { yourID: props.item.id, name: props.item.name });
    }}>
      <View style={styles.view_container}>
        <View style={styles.messMapView}>
          <Image
            source={{ uri: props.item.image }}
            style={styles.eclImg}
          />
          <View style={styles.messageProfileText}>
            <Text style={styles.nameText}>{props.item.name}</Text>
            <View style={styles.youView}>
              <Text style={styles.you}>YOU:</Text>
              <Text style={styles.description} numberOfLines={1}> {props.item.message}</Text>
            </View>
          </View>
        </View>
      </View>

      <View style={styles.line} />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  messMapView: {
    flexDirection: "row",
    marginHorizontal: 41,
  },
  eclImg: {
    width: 50,
    height: 50,
    borderRadius: 100,
    marginVertical: 8,
  },
  line: {
    borderWidth: 0.5,
    borderColor: "#EEEEEE",
  },
  nameText: {
    color: "#136A8A",
    fontWeight: "bold",
    marginBottom: 12,
    fontSize: 15,
  },
  youView: {
    flexDirection: "row",
    alignItems: "center",
  },
  you: {
    color: "black",
    fontWeight: "bold",
    fontFamily: "OpenSans-Regular",
  },
  view_container: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  description: {
    fontSize: 12,
    fontFamily: "OpenSans-Regular",
    maxWidth: 280,
  },
  messageProfileText: {
    justifyContent: "center",
    marginLeft: 12,
  },
  deleteText: {
    color: "white",
    fontSize: 16,
    marginRight: 13,
  },
  activeView: {
    alignItems: "center",
    justifyContent: "center",
    marginRight: 15,
  },
  rowBack: {
    backgroundColor: "red",
    flex: 1,
    alignItems: "flex-end",
    justifyContent: "center",
  },
  messagesActive: {
    backgroundColor:'red',
    paddingVertical:2,
    paddingHorizontal:8,
    borderRadius:100,
    fontWeight:'bold',
    color:'white',
    fontSize:15
  },
});
