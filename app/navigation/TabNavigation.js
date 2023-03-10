import React, { useEffect, useState } from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Image, View, Platform, Text } from "react-native";
import UsersNavigation from "./usersNavigation/UsersNavigation";
import MessagesNavigation from "./messageNavigation/MessagesNavigation";
import UserNavigation from "./userNavigation/UserNavigation";
import HomePageNavigation from "./homePageNavigation/HomePageNavigation";
import CreatePostReviewNavigation from "./createPostReview/CreatePostReviewNavigation";
import axiosInstance from "../networking/axiosinstance";

export default function TabNavigation(props) {

  const Tab = createBottomTabNavigator();
  const [numberMessages,setNumberMessages] = useState(0)
  const [initialParams,setInitialParams] = useState('')

  const handle = async () => {
    try {
      const response = await axiosInstance.get("/getChatListUsers")
      const arr1 = []
      for (let i = 0; i < response.data.data.length ; i++) {
           arr1.push(response.data.data[i].new_message_count)
      }
      // console.log(response);
      const sum =  arr1.reduce((result,number)=> result+number);
      setNumberMessages(sum)
      // console.log(sum);
    } catch (e) {
      console.log(e)
    }
  }

  useEffect(() => {
       handle()
  }, [props])


    return (
    <Tab.Navigator
      screenOptions={({ route,  }) => ({
        headerShown: false,
        tabBarStyle: { height: Platform.OS === "ios" ? 85 : 58 },
      })}>
      <Tab.Screen
        initialParams={initialParams}
        name={"homePageNavigation"} component={HomePageNavigation}
                  options={{
                    tabBarIcon: ({ focused }) => (
                      <View style={{ padding: 10 }}>
                        {
                          focused ?
                            <Image
                              source={require("../assets/image/homePageActive.png")}
                              style={{ width: 18, height: 18.25 }}
                            />
                            :
                            <Image
                              source={require("../assets/image/homePage.png")}
                              style={{ width: 18, height: 18.25 }}
                            />
                        }
                      </View>
                    ),
                    tabBarLabel: "",
                  }}
      />
      <Tab.Screen name={"usersNavigation"} component={UsersNavigation}
                  options={{
                    tabBarIcon: ({ focused }) => (
                      <View style={{ padding: 8 }}>
                        {
                          focused ?
                            <Image
                              source={require("../assets/image/UsersActive.png")}
                              style={{ width: 24, height: 24 }}
                            />
                            :
                            <Image
                              source={require("../assets/image/Users.png")}
                              style={{ width: 24, height: 24 }}
                            />
                        }
                      </View>
                    ),
                    tabBarLabel: "",
                  }}
      />
      <Tab.Screen name={"createPostReviewNavigation"} component={CreatePostReviewNavigation}
                  options={{
                    tabBarIcon: ({ focused }) => (
                      <View style={{ padding: 8 }}>
                        {
                          focused ?
                            <Image
                              source={require("../assets/image/plusActive.png")}
                              style={{ width: 41, height: 41 }}
                            />
                            :
                            <Image
                              source={require("../assets/image/Plus.png")}
                              style={{ width: 24, height: 24 }}
                            />
                        }
                      </View>
                    ),
                    tabBarLabel: "",
                  }}
      />
      <Tab.Screen name={"MessagesNavigation"} component={MessagesNavigation}
                  options={{
                    tabBarIcon: ({ focused }) => (
                      <View style={{ padding: 8 }}>
                        {
                          focused ?
                            <Image
                              source={require("../assets/image/messagesActive.png")}
                              style={{ width: 17.25, height: 17.25 }}
                            />
                            :

                            <View style={{ position: "relative" }}>
                              {numberMessages ?
                                <View style={{
                                  backgroundColor: "red",
                                  width: 12,
                                  height: 12,
                                  zIndex: 10,
                                  borderBottomLeftRadius: 100,
                                  borderBottomRightRadius: 100,
                                  borderTopEndRadius: 100,
                                  borderTopStartRadius: 100,
                                  position: "absolute",
                                  bottom: -2,
                                  right: -3,
                                  alignItems:'center',
                                  justifyContent:'center'
                                }} >
                                  <Text style={{
                                    fontSize:8,
                                    fontWeight:'bold',
                                    color:'white'

                                  }}>{numberMessages}</Text>
                                </View>
                                :null}
                              <Image
                                source={require("../assets/image/messeges.png")}
                                style={{ position: "relative", width: 17.25, height: 17.25 }}
                              />
                            </View>
                        }
                      </View>
                    ),
                    tabBarLabel: "",
                  }}
      />
      <Tab.Screen name={"userNavigation"} component={UserNavigation}
                  options={{
                    tabBarIcon: ({ focused }) => (
                      <View style={{ padding: 8 }}>
                        {
                          focused ?
                            <Image
                              source={require("../assets/image/userActive.png")}
                              style={{ width: 19.65, height: 18.75 }}
                            />
                            :
                            <Image
                              source={require("../assets/image/User.png")}
                              style={{ width: 19.65, height: 18.75 }}
                            />
                        }
                      </View>
                    ),
                    tabBarLabel: "",
                  }}
      />
    </Tab.Navigator>
  );
}
