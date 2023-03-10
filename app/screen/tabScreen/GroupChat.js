import React, {useEffect, useMemo, useRef, useState} from 'react';
import {View, Text, ScrollView, Image, TextInput, TouchableOpacity, StatusBar, Platform,KeyboardAvoidingView} from 'react-native';
import {styles} from '../../style/ChatStyle';
import {inputRef, componentDidMount} from "../../component/keyboard/Keyboard";
import ModalCamera from "../../component/modalCamera/ModalCamera";
import {useSelector} from "react-redux";
import axiosInstance from "../../networking/axiosinstance";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Pusher from 'pusher-js/react-native';
import Loading from "../../component/loading/Loading";
import {ReplyMap} from "../../component/data/Data";
import ListImg from "../../component/list/List";

export default function GroupChat(props) {

    const scrollViewRef = useRef();
    const YOUR_ID = props.route.params.yourID
    const name = props.route.params.name
    const group_id = props.route.params.group_id
    const MY_ID = useSelector((state) => state.customer.id)
    const [visible, setVisible] = useState(false)
    const [addInput, setAddInput] = useState("")
    const [chat, setChat] = useState([])
    const [chatSecond, setChatSecond] = useState(null)
    const [photo, setPhoto] = useState("")
    const [cameraModal, setCameraModal] = useState(false)
    const [groupId, setGroupId] = useState(0)
    const [replyIndex, setReplyIndex] = useState(null)
    const [SearchText, setSearchText] = useState('')

    const filteredChat = useMemo(() => chat.filter((contact) =>
            contact.message ?
                contact.message.toLowerCase().indexOf(SearchText.toLowerCase()) > -1
                :
                contact.path
        ),
        [SearchText, chat]);

    useEffect(() => {
        if (chatSecond !== null) {
            if (groupId === group_id) {
                setChat([...chat, chatSecond])
            }
        }
    }, [chatSecond])

    useEffect(() => {
        loadChats()
    }, [])

    let getToken = async () => {
        try {
            let data = await AsyncStorage.getItem("token");
            return data;
        } catch (error) {
            console.log(error);
        }
    }

    const cameraImageFunc = (item) => {
        setPhoto(item)
    }

    const photoFunc = (item) => {
        setPhoto(item)
    }

    const onPressModal = (item) => {
        setCameraModal(item)
    }

    let addFunction = (message, name, time, user_id) => {
        if (message) {
            setChat([
                ...chat,
                {
                    message, time,
                    reply:[],
                    user_id,
                    user: {
                        name,
                    }
                }
            ])
        }
    }


    const handleEve = async () => {
        if (addInput) {
            try {
                const data = {
                    message: addInput
                }
                const response = await axiosInstance.post("/send_message/" + group_id, data, {
                    headers: {
                        'Content-Type': 'application/json',
                        'Accept': 'application/json'
                    }
                })
                await addFunction(response.data.message.message, response.data.message.user.name, response.data.message.time, response.data.message.user.id)
                setAddInput("")
            } catch (e) {
                console.log(e)
            }
        }
    }


    const loadChats = async () => {
        setVisible(true)
        try {
            const response = await axiosInstance.get("/group/" + group_id, {}, {
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                }
            })
            console.log(response)
            setChat([...response.data.messages])
            setGroupId(response.data.group.id)
            setVisible(false)
            await subscribeToPusher()
        } catch (error) {
            console.log(error);
            setVisible(false)
        }
    }


    const subscribeToPusher = async () => {
        let a_tok = await getToken()
        Pusher.logToConsole = true;
        var pusher = new Pusher('532c15703984b6c41207', {
            cluster: 'ap2',
            authEndpoint: 'https://app.grain-brain.ca/api//broadcasting/auth',
            encrypted: true,
            auth: {
                headers: {
                    'Authorization': 'Bearer ' + a_tok,
                }
            }
        })
        var channel = pusher.subscribe('private-message-channel');
        channel.bind('groupMessage', (d) => {
            setChatSecond(d.message)
        });
    }

    useEffect(() => {
        if (photo) {
            photoFuncAxios()
        }
    }, [photo])

    const photoFuncAxios = async () => {
        console.log('mtav')
        try {
            let formData = new FormData()
            formData.append("image", {
                name: `name.jpg`,
                uri: photo,
                type: "image/jpeg",
            })
            formData.append('rec_id', YOUR_ID)
            const response = await axiosInstance.post("/send_message/" + group_id, formData, {
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                }
            })
            console.log(response)
            setChat(prev =>[
                ...prev,
                {
                    path: response.data.message.path,
                    time: response.data.message.time,
                    rec_id: response.data.message.rec_id,
                    user_id: response.data.message.user.id,
                    username: response.data.message.username,
                    reply: response.data.message.reply
                }
            ])
            console.log(response)
            setPhoto('')
        } catch (e) {
            console.log(e, e.response)
            setPhoto('')
        }
    }

    const handleEveReply = async (e) => {
        try {
            let arr = chat
            if (addInput) {
                const data = {
                    group_id: group_id,
                    message: addInput,
                    reply_id: chat[replyIndex].id
                }
                const response = await axiosInstance.post("/replyToGroupMessage", data, {
                    headers: {
                        'Content-Type': 'application/json',
                        'Accept': 'application/json'
                    }
                })
                arr[replyIndex].reply.push({
                    message: response.data.message.message,
                    rec_id: arr[replyIndex].rec_id,
                    reply_id: arr[replyIndex].reply_id,
                    sender_id: arr[replyIndex].sender_id,
                    reply: [],
                    time: response.data.message.time,
                    user: {
                        id: response.data.message.user.id,
                        name: response.data.message.user.name,
                        image: response.data.message.user.image,
                    }
                })
                setReplyIndex(null)
                setChat([...arr])
            }
        } catch (e) {
            console.log(e.response,'ff');
        }
    }

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : null}
            style={{ flex: 1}}
        >
        <View style={styles.chatScrool}>
            <StatusBar backgroundColor={"rgb(250, 250, 250)"} barStyle={"dark-content"}/>
            <View style={styles.inputViewBlue}>
                <View style={styles.textinputPosition}>
                    <Image
                        source={require('../../assets/image/iconfinder.png')}
                        style={styles.vectorIcons}
                    />
                    <TextInput
                        style={styles.TextInputBlue}
                        ref={inputRef}
                        onChangeText={(evt) => {
                            setSearchText(evt)
                        }}/>
                </View>
                <ListImg/>
            </View>
            <View style={styles.backJaneView}>
                <TouchableOpacity style={styles.backButton} onPress={() => props.navigation.replace('users')}>
                    <Image source={require('../../assets/image/backblue.png')} style={styles.backimage}/>
                </TouchableOpacity>
                <Text style={styles.lastnameText}>{name}</Text>
            </View>
            <ScrollView showsVerticalScrollIndicator={false} ref={scrollViewRef}
                        onContentSizeChange={() => scrollViewRef.current.scrollToEnd({y: 0, animated: true})}>
                {filteredChat.map((item, index) => {

                    return (
                        <View
                            style={[styles.placeHolderImageViewText, {alignItems: item.user_id == MY_ID ? 'flex-end' : 'flex-start'}]}
                            key={index}>
                            <Text style={styles.commentText}>{item?.user?.name}</Text>
                            {item.message && (
                                <View style={[styles.messageView, {
                                    backgroundColor: item.user_id == MY_ID ? 'gray' : '#136A8A',
                                }]}>
                                    <Text style={styles.placeholderText}>{item.message}</Text>
                                </View>
                            )}
                            {
                                item.path ?
                                    <Image source={{uri:item.path}} style={styles.messageImage}/>

                                    :
                                    null
                            }

                            <View style={[styles.commentViewWatch, {width: 210, marginRight: 5}]}>
                                <Text style={styles.commentText}>{item.time}</Text>
                                <TouchableOpacity style={styles.replyView} onPress={() => {
                                    componentDidMount()
                                    setReplyIndex(index)
                                }}>
                                    <Image source={require("../../assets/image/reply.png")} style={styles.replyImage}/>
                                    <Text style={styles.replyText}>Reply</Text>
                                </TouchableOpacity>
                            </View>
                            <ReplyMap dataChatComment={item.reply}/>
                        </View>
                    )
                })}
            </ScrollView>
            <View style={styles.chatInputView}>
                <TouchableOpacity onPress={() => {
                    onPressModal(true)
                }}>
                    <Image source={require('../../assets/image/Chatplus.png')} style={styles.chatPlusImg}/>
                </TouchableOpacity>
                <TextInput
                    style={styles.textInputChat}
                    ref={inputRef}
                    value={addInput}
                    onChangeText={(evt) => setAddInput(evt)}/>
                <TouchableOpacity onPress={() => {
                    if (replyIndex !== null) {
                        handleEveReply()
                    } else {
                        handleEve()
                    }
                    setAddInput('')
                }}>
                    <Image source={require('../../assets/image/Chat.png')} style={styles.chatIcon}/>
                </TouchableOpacity>
            </View>

            <ModalCamera onPressModal={onPressModal} visible={cameraModal} photoFunc={photoFunc}
                         cameraImageFunc={cameraImageFunc} user={"user"}/>
            <Loading loading={visible}/>
        </View>
        </KeyboardAvoidingView>
    );
}
