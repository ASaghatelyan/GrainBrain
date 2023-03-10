import React, { useState } from "react";
import Modal from "react-native-modal";
import { Image, TouchableOpacity, View, StyleSheet, } from "react-native";
import Button from "../button/Button";
import PasswordButton from "../passwordButton/PasswordButton";

export default function PrivateModal(props) {


  return (
    <Modal
      isVisible={props.modalState}
      animationIn="slideInDown"
      animationOut="slideOutUp"
      testID={"modal"}
      swipeDirection="down"
      backdropColor={"rgba(250, 250, 250, 0.5)"}
      backdropOpacity={1}
      onSwipeComplete={() => {
        props.modalFunc(false);
      }}
      onBackButtonPress={() => {
        props.modalFunc(false);
      }}>
      <View style={styles.modalContainer}>
        <View style={styles.back_button_View}>
          <TouchableOpacity onPress={() => {
            props.modalFunc(false)
          }}>
            <Image source={require('../../assets/image/delete.png')} style={styles.back_button}/>
          </TouchableOpacity>
        </View>
        <View style={styles.content}>
          <PasswordButton
            placeholder={"Password"}
            borderColor={"#EEEEEE"}
            backgroundColor={'white'}

            fontWeight={"bold"}
            onChangeText={(evt) => {
              props.setPassword(evt)
            }}/>
          <Button
            title={"Password Save"}
            color={"#FFFFFF"}
            borderColor={'black'}
            backgroundColor={"#569690"}
            marginVertical={30}
            marginTop={50}
            fontWeight={"bold"}
            onPress={() => {
              props.accessGroupPublic()
            }}/>
          {props.joinDAtaState ?
            <Button
              title={"access group"}
              color={"#FFFFFF"}
              backgroundColor={"#569690"}
              fontWeight={"bold"}
              marginBottom={25}
              onPress={() => {
                props.accessGroup()
                props.setJoinDAtaState(false)
                props.modalFunc(false);
              }}/>
            :null
          }
        </View>


      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalContainer: {

    width: "100%",
    backgroundColor: "#EEEEEE",
    borderRadius: 20,
    paddingHorizontal:24,
    height: 400,
  },
  back_button: {
    width: 30,
    height: 30,
  },
  back_button_View: {
    alignItems: "flex-end",
    marginRight: 10,
    marginTop: 10,
  },
  content:{
    flex:1,
    justifyContent:'center',

  },
  view_input: {
    flex: 1,
    marginVertical: 15,
    justifyContent: "space-between",
    marginHorizontal: 10,
  },
  validateText: {
    textAlign: "left",
    color: "#FF2E00",
    fontSize: 12,
    marginVertical: 3,
    marginBottom: 20,
  },
});
