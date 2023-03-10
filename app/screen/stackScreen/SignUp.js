import React, { useState } from "react";
import { ScrollView, StatusBar, Text, TouchableOpacity, View } from "react-native";
import LinearGradient from "react-native-linear-gradient";
import { styles } from "../../style/SignUpStyles";
import GrainBrainLogoHeader from "../../component/grainBrainlogoHeader/GrainBrainLogoHeader";
import Input from "../../component/input/Input";
import PasswordButton from "../../component/passwordButton/PasswordButton";
import Button from "../../component/button/Button";
import {
  validateEmail,
  nameValidation,
  lowerText,
  upperText, numberText, spaceTest,
} from "../../component/validate/Validate";
import axios from "axios";
import Loading from "../../component/loading/Loading";
import CheckBox from "@react-native-community/checkbox";

export default function SignUp(props) {

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repPassword, setRepPassword] = useState("");
  const [nameText, setNameText] = useState("");
  const [emailText, setEmailText] = useState("");
  const [passwordText, setPasswordText] = useState("");
  const [repPasswordText, setRepPasswordText] = useState("");
  const [nameValid, setNameValid] = useState("");
  const [registerText, setRegisterText] = useState("");
  const [isSelected, setIsSelected] = useState(false);
  const [visible, setVisible] = useState(false);
  const [colors, setColors] = useState("white");


  const register = () => {
   const b = name.replaceAll(' ', '');
    if (
      validateEmail(email) &&
      nameValidation.test(b) &&
      repPassword === password &&
      !passwordText && isSelected &&
      lowerText.test(password) &&
      lowerText.test(repPassword) &&
      upperText.test(password) &&
      upperText.test(repPassword) &&
      numberText.test(password) &&
      numberText.test(repPassword)

    ) {
      setVisible(true);
      const data = {
        name:b,
        email,
        password,
        "password_confirmation": repPassword,
      };
      axios.post(`https://app.grain-brain.ca/api/register`, data)
        .then((a) => {
          setVisible(false);
          props.navigation.navigate("login");
        })
        .catch((err) => {
          setVisible(false);
          console.log(err.response);
          if(err.response?.data?.message?.name){
            setNameValid(err.response?.data?.message?.name[0]);
          } else if(err.response?.data?.message?.email){
            setRegisterText(err.response?.data?.message?.email[0]);
          }
        });
    } else {
      setVisible(false);
    }
    if (repPassword !== password) {
      setPasswordText("Password and repeat password don't match");
      setRepPasswordText("Password and repeat password don't match");
    }

    if (!nameValidation.test(b)) {
      setNameText("The name you’ve entered is incorrect.");
    }
    if (!isSelected) {
      setColors("red");
    }
    if (!validateEmail(email)) {
      setEmailText("The email you’ve entered is incorrect.");
    }
    if (password.length < 8 || repPassword.length < 8) {
      setRepPasswordText("The Password should contain more than 8 characters");
      setPasswordText("The repeat Password should contain more than 8 characters");
    }

    if (!lowerText.test(password)) {
      setPasswordText("Letters should be lowercase.");
    }
    if (!lowerText.test(repPassword)) {
      setRepPasswordText("Letters should be lowercase.");
    }
    if (!upperText.test(password)) {
      setPasswordText("One of the letters should be uppercase.");
    }
    if (!upperText.test(repPassword)) {
      setRepPasswordText("One of the letters should be uppercase.");
    }
    if (!numberText.test(password)) {
      setPasswordText("Should contain a number.");
    }
    if (!numberText.test(repPassword)) {
      setRepPasswordText("Should contain a number.");
    }
  };

  return (
    <LinearGradient
      colors={["#136A8A", "#267871C2"]}
      style={styles.linearGradient}
    >
      <StatusBar backgroundColor={"#136A8A"} barStyle={"light-content"} />
      <ScrollView showsVerticalScrollIndicator={false}>
        <GrainBrainLogoHeader
          logo={require("../../assets/image/GrainBrainlogo.png")}
          Welcome={require("../../assets/image/Welcome.png")}
          marginTop={40}
        />
        <View style={styles.inputView}>
          <Input
            placeholder={"Username"}
            marginTop={24}
            borderColor={nameText ? "red" : "white"}
            fontWeight={"bold"}
            onChangeText={(evt) => {
              setNameText("");
              setName(evt.trim());
              setRegisterText("");
              setNameValid("");
            }} />
          <Text style={styles.valideText}>{nameText}</Text>
          <Input
            placeholder={"Email"}
            borderColor={emailText ? "red" : "white"}
            fontWeight={"bold"}
            onChangeText={(evt) => {
              setEmail(evt.trim());
              setEmailText("");
              setRegisterText("");
              setNameValid("");
            }} />
          <Text style={styles.valideText}>{emailText}</Text>
          <PasswordButton
            placeholder={"Password"}
            fontWeight={"bold"}
            borderColor={passwordText ? "red" : "white"}
            onChangeText={(evt) => {
              setPassword(evt.trim());
              setPasswordText("");
              setRegisterText("");
              setNameValid("");
            }} />
          <Text style={styles.valideText}>{passwordText}</Text>
          <PasswordButton
            placeholder={"Repeat password"}
            fontWeight={"bold"}
            borderColor={repPasswordText ? "red" : "white"}
            onChangeText={(evt) => {
              setRepPassword(evt.trim());
              setRepPasswordText("");
              setRegisterText("");
              setNameValid("");
            }} />
          <Text style={styles.valideText}>{repPasswordText}</Text>
          <View style={styles.terms}>
            <CheckBox
              disabled={false}
              value={isSelected}
              onValueChange={(newValue) => setIsSelected(newValue)}
              style={{ transform: [{ scaleX: Platform.OS === "ios" ? 0.7 : 0.9 }, { scaleY: Platform.OS === "ios" ? 0.7 : 0.9 }] }}
              tintColors={{ true: "#136A8A", false: "#C1C1C1" }}
              onFillColor="#136A8A"
              onCheckColor="white"
            />
            <Text style={{ color: isSelected ? "white" : colors }}>I agree to the </Text>
            <TouchableOpacity onPress={() => {
              props.navigation.navigate("termsAndConditions");
            }}>
              <Text style={[styles.termsText, { color: isSelected ? "white" : colors }]}>Terms and
                Conditions</Text>
            </TouchableOpacity>
          </View>

          <Text style={[styles.valideText, { marginBottom: 3 }]}>{registerText}</Text>
          <Text style={[styles.valideText, { marginBottom: 13 }]}>{nameValid}</Text>
          <Button
            title={"SIGN UP"}
            color={"#136A8A"}
            backgroundColor={"white"}
            fontWeight={"bold"}
            marginBottom={14}
            onPress={() => {
              register();
            }} />
          <View style={styles.loginViewSignUp}>
            <Text style={styles.loginText}>Already have an account? </Text>
            <TouchableOpacity onPress={() => {
              props.navigation.navigate("login");
            }}>
              <Text style={styles.loginTextSign}>Log In</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
      <Loading loading={visible} />
    </LinearGradient>
  );
}
