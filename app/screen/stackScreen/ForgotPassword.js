import React, { useState } from "react";
import { ScrollView, Text } from "react-native";
import LinearGradient from "react-native-linear-gradient";
import { styles } from "../../style/ForgotPasswordStyles";
import GrainBrainLogoHeader from "../../component/grainBrainlogoHeader/GrainBrainLogoHeader";
import { StatusBar } from "react-native";
import Input from "../../component/input/Input";
import Button from "../../component/button/Button";
import { validateEmail } from "../../component/validate/Validate";
import axios from "axios";
import Loading from "../../component/loading/Loading";

export default function ForgotPassword(props) {

  const [email, setEmail] = useState("");
  const [emailText, setEmailText] = useState("");
  const [registerText, setRegisterText] = useState("");
  const [visible, setVisible] = useState(false);

  const data = {
    "email": email,
  };

  const validateFunc = () => {
    if (validateEmail(email)) {
      setVisible(true);
      axios.post("https://app.grain-brain.ca/api/forgotPassword", data)
        .then((response) => {
          setVisible(false);
          setRegisterText(response.data.message);
          setTimeout(() => {
            props.navigation.replace("resetPassword");
          }, 4000);
        })
        .catch((err) => {
          console.log(err);
          setVisible(false);
          setRegisterText(err.response.data.message);
        });
    } else if (!validateEmail(email)) {
      setEmailText("The email you’ve entered is incorrect.");
    } else {
      setVisible(false);
    }
  };

  return (
    <LinearGradient
      colors={["#136A8A", "#267871C2"]}
      style={styles.linearGradient}
    >
      <ScrollView showsVerticalScrollIndicator={false}>
        <StatusBar backgroundColor={"#136A8A"} barStyle={"light-content"} />
        <GrainBrainLogoHeader
          logo={require("../../assets/image/GrainBrainlogo.png")}
          Welcome={require("../../assets/image/FORGOT.png")}
          marginTop={57}
          marginTopWelcome={58}
        />
        <Input
          placeholder={"Email"}
          marginTop={58}
          borderColor={emailText ? "red" : "white"}
          marginHorizontal={20}
          fontWeight={"bold"}
          onChangeText={(evt) => {
            setEmail(evt);
            setEmailText("");
            setRegisterText("");
          }}
        />
        <Text style={styles.validateText}>{emailText}</Text>
        <Text style={styles.emailverfic}>{registerText} </Text>
        <Button
          title={"RESET PASSWORD"}
          color={"#136A8A"}
          backgroundColor={"white"}
          fontWeight={"bold"}
          marginHorizontal={40}
          marginVertical={75}
          onPress={() => {
            validateFunc();
          }}
        />
        <Loading loading={visible} />
      </ScrollView>
    </LinearGradient>
  );
}
