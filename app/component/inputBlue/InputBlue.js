import React, { useEffect, useState } from "react";
import { Image, TextInput, View, StyleSheet, Dimensions, Platform, TouchableOpacity } from "react-native";
import ListImg from "../list/List";
import SelectDropdown from "react-native-select-dropdown";


const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

export default function InputBlue(props) {
  const [text, setText] = useState("");

  const inputRef = React.createRef();

  useEffect(() => {
    props.handle ? props.handle(text ? text : props.selectedLanguage !== "Category" ? props.selectedLanguage : null, props.selectedLanguage !== "Category" ? true : null) : null;
    if (props.selectedLanguage !== "Category") {
      setText("");
      props.handle(props.selectedLanguage, true);
    }
  }, [props.selectedLanguage]);

  useEffect(() => {
    let time = setTimeout(() => {
      props.handle(text, false);
    }, 200);
    return () => {
      clearTimeout(time);
    };
  }, [text]);
  return (
    <View style={[styles.inputViewBlue, { marginTop: !props.state && Platform.OS === "ios" ? 53 : null }]}>
      <View style={styles.textinputPosition}>
        <Image
          source={require("../../assets/image/iconfinder.png")}
          style={styles.vectorIcons}
        />
        <TextInput
          style={styles.TextInputBlue}
          ref={inputRef}
          onChangeText={(evt) => {
            setText(evt);
          }} />
      </View>
      {props.state ?
        <View style={styles.dropView}>
          <View style={styles.drop_down_view}>
            <Image source={require("../../assets/image/edit_post.png")} style={styles.listUser} />
          </View>
          <View>
            <SelectDropdown
              data={[...props.dataCategories]}
              buttonStyle={{
                backgroundColor: "transparent",
                zIndex: 50,
                posittion: "relative",
                borderColor: "#EEEEEE",
                color: "#A8A2AC",
              }}
              dropdownStyle={styles.categoryInput}
              defaultButtonText={" "}
              rowTextStyle={styles.choosephotoText}
              onSelect={(selectedItem) => {
                props.selectFunc(selectedItem.name, selectedItem.id);
                props.handle(selectedItem.name, true);
              }}
              buttonTextAfterSelection={(selectedItem) => {
              }}
              rowTextForSelection={(selectedItem) => {
                return selectedItem.name;
              }} />
          </View>
        </View>
        :
        <ListImg />
      }
    </View>
  );
}

const styles = StyleSheet.create({
  inputViewBlue: {
    position: "relative",
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: Platform.OS === "ios" ? 53 : 15,
    paddingHorizontal: 41,
  },
  TextInputBlue: {
    width: "85%",
    height: 40,
    fontSize: 16,
    fontFamily: "OpenSans-Regular",
    color: "black",
  },
  categoryInput: {
    width: "52%",
    fontFamily: "OpenSans-Regular",
    marginLeft: -150,
  },
  choosephotoText: {
    borderRadius: 100,
    color: "black",
    fontSize: 13,
    marginTop: 7,
    textTransform: "uppercase",
    fontFamily: "OpenSans-Regular",
  },
  listUser: {
    width: 24,
    height: 24,
  },
  dropView: {
    position: "relative",
    height: 30,
  },
  textinputPosition: {
    width: windowWidth - 122,
    flexDirection: "row",
    alignItems: "center",
    borderColor: "#60B4CF",
    borderWidth: 1,
    borderRadius: 52,
    height: 30,
  },
  vectorIcons: {
    marginLeft: 18,
    marginRight: Platform.OS === "ios" ? 5 : 0,
    width: 15,
    height: 16,
  },
  drop_down_view: {
    position: "absolute",
    zIndex: Platform.OS === "ios" ? -1 : 10,
    left: 20,
    top: 2,
    width: 24,
  },
  list: {
    height: 24,
    width: 24,
  },
});
