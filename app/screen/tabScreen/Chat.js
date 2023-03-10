import React, {useEffect, useRef, useState, useMemo} from 'react';
import {
    View,
    Text,
    ScrollView,
    Image,
    TextInput,
    TouchableOpacity,
    StatusBar,
    KeyboardAvoidingView,
    Platform
} from 'react-native';
import {styles} from '../../style/ChatStyle';
import {inputRef, componentDidMount} from "../../component/keyboard/Keyboard";
import ModalCamera from "../../component/modalCamera/ModalCamera";
import {useSelector} from "react-redux";
import axiosInstance from "../../networking/axiosinstance";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Pusher from 'pusher-js/react-native';
import {ReplyMap} from "../../component/data/Data";
import Loading from "../../component/loading/Loading";
import ListImg from "../../component/list/List";


export default function Chat(props) {

    const scrollViewRef = useRef();
    const YOUR_ID = props.route.params.yourID
    const name = props.route.params.name
    const MY_ID = useSelector((state) => state.customer.id)
    const [addInput, setAddInput] = useState("")
    const [chat, setChat] = useState([])
    const [replyIndex, setReplyIndex] = useState(null)
    const [chatSecond, setChatSecond] = useState(null)
    const [photo, setPhoto] = useState("")
    const [cameraModal, setCameraModal] = useState(false)
    const [visible, setVisible] = useState(false)
    const [text, setText] = useState('')
    const [SearchText, setSearchText] = useState('')
    const [scrollToEnd, setScrollToEnd] = useState(true)


    useEffect(() => {
        if (chatSecond !== null) {
            if (chatSecond.sender_id != MY_ID) {
                if (YOUR_ID == chatSecond.sender_id) {
                    setChat([...chat, chatSecond])
                }
            }
        }
    }, [chatSecond])

    useEffect(() => {
        loadChats()
    }, [])

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
            const response = await axiosInstance.post("/messages", formData, {
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                }
            })
            setChat(prev =>[
                ...prev,
                {
                    path: response.data.success.path,
                    time: response.data.success.time,
                    rec_id: response.data.success.rec_id,
                    sender_id: response.data.success.sender_id,
                    username: response.data.success.username,
                    reply: response.data.success.reply
                }
            ])
            setPhoto('')
        } catch (e) {
            console.log(e, e.response)
            setPhoto('')
        }
    }

    let getToken = async () => {
        try {
            let data = await AsyncStorage.getItem("token");
            return data;
        } catch (error) {
            console.log(error.response);
        }
    }

    const firebaseToken = async () => {
        try {
            const value = await AsyncStorage.getItem('firebaseToken')
            if (value !== null) {
                return value
            }
        } catch (e) {
            return null
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

    let addFunction = (message, time, rec_id, sender_id, username, reply) => {
        if (message) {
              setChat([
                ...chat,
                {
                    message, time, rec_id, sender_id, username, reply
                }
            ])
        }
    }

    const handleEve = async (e) => {
        if (addInput) {
            try {
                const data = {
                    rec_id: YOUR_ID,
                    msg: addInput
                }
                const response = await axiosInstance.post("/messages", data, {
                    headers: {
                        'Content-Type': 'application/json',
                        'Accept': 'application/json'
                    }
                })
                await notificationsFunc(response)
                addFunction(response.data.success.message, response.data.success.time, response.data.success.rec_id, response.data.success.sender_id, response.data.success.username, response.data.success.reply)
                setAddInput("")
                setScrollToEnd(true)
            } catch (e) {
                console.log(e.response)
            }
        }
    }

    const notificationsFunc = async (res) => {
        const firebase = await firebaseToken()
        try {
            const data = {
                firebase_Token: firebase,
                YOUR_ID,
                message: res.data.success.message,
                title: res.data.success.username,
                image: res.data.success.user.image
            }
            const response = await axiosInstance.post('/send-notification', data)
            console.log(response, 'notification')
        } catch (e) {
            console.log(e.response)
        }
    }

    const handleEveReply = async () => {
        try {
            let arr = chat
            if (addInput) {
                const data = {
                    reply_id: arr[replyIndex].id,
                    message: addInput
                }
                const response = await axiosInstance.post("/reply", data, {
                    headers: {
                        'Content-Type': 'application/json',
                        'Accept': 'application/json'
                    }
                })
                const res = {
                    data: {
                        success: {
                            message: response.data.message.message,
                            username: response.data.message.user.name,
                            user: {
                                image: response.data.message.user.image
                            }
                        }
                    }
                }
                await notificationsFunc(res)
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
                        IsFollower: false
                    }
                })
                setReplyIndex(null)
                setChat([...arr])
                setScrollToEnd(true)
            }
        } catch (e) {
            console.log(e);
        }
    }

    const loadChats = async () => {
        setVisible(true)
        try {
            const response = await axiosInstance.post("/fetchMessages/" + YOUR_ID, {}, {
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                }
            })
            setChat([...response.data.data])
            setVisible(false)
            await subscribeToPusher()
        }catch (e){
            console.log(error.response, YOUR_ID);
            setVisible(false)
        }
    }

    const filteredChat = useMemo(() => chat.filter((contact) =>
            contact.message ?
                contact.message.toLowerCase().indexOf(SearchText.toLowerCase()) > -1
                :
                contact.path
        ),
        [SearchText, chat]);


    const subscribeToPusher = async () => {
        let a_tok = await getToken()
        const user_id = MY_ID
        Pusher.logToConsole = true;
        var pusher = new Pusher('532c15703984b6c41207', {
            cluster: 'ap2',
            authEndpoint: 'https://app.grain-brain.ca/api/broadcasting/auth',
            encrypted: true,
            auth: {
                headers: {
                    'Authorization': 'Bearer ' + a_tok,
                }
            }
        })
        var channel = pusher.subscribe('private-chat-' + user_id);
        channel.bind('messageSend', (d) => {
            setChatSecond(d)
        });
    }

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : null}
            style={{flex: 1}}
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
                    <TouchableOpacity
                        style={styles.backButton}
                        onPress={() => {
                            props.navigation.goBack();
                        }}>
                        <Image
                            source={require('../../assets/image/backblue.png')}
                            style={styles.backimage}
                        />
                    </TouchableOpacity>
                    <Text style={styles.lastnameText}>{name}</Text>
                </View>
                <ScrollView
                    showsVerticalScrollIndicator={false}
                    ref={scrollViewRef}
                    onContentSizeChange={() => {
                        if (scrollToEnd && chat.length) {
                            scrollViewRef.current.scrollToEnd({
                                y: 0,
                                animated: true,
                            });
                            setScrollToEnd(false)
                        }
                    }}>
                    {filteredChat.map((item, index) => {
                        return (
                            <View key={index}>
                                <View
                                    style={[styles.placeHolderImageViewText, {alignItems: item.sender_id == MY_ID ? 'flex-end' : `flex-start`}]}
                                >
                                    <Text style={styles.commentText}>{item.username}</Text>
                                    <View style={[styles.messageView, {
                                        backgroundColor: item.sender_id == MY_ID ? 'gray' : '#136A8A',
                                    }]}>
                                        {item.message &&(
                                            <Text style={[styles.placeholderText,]}>{item.message}</Text>)}

                                        {
                                            item.path ?
                                                <Image source={{uri:item.path}} style={styles.messageImage}/>

                                                :
                                                null
                                        }
                                    </View>
                                    <View style={[styles.commentViewWatch, {width: 210, marginRight: 5}]}>
                                        <Text style={styles.commentText}>{item.time}</Text>
                                        <TouchableOpacity style={styles.replyView} onPress={() => {
                                            componentDidMount()
                                            setReplyIndex(index)
                                        }}>
                                            <Image source={require("../../assets/image/reply.png")}
                                                   style={styles.replyImage}/>
                                            <Text style={styles.replyText}>Reply</Text>
                                        </TouchableOpacity>
                                    </View>
                                    <ReplyMap dataChatComment={item.reply}/>
                                </View>
                            </View>
                        )
                    })}
                </ScrollView>
                <View style={styles.chatInputView}>
                    <TouchableOpacity onPress={() => onPressModal(true)}>
                        <Image source={require('../../assets/image/Chatplus.png')} style={styles.chatPlusImg}/>
                    </TouchableOpacity>
                    <TextInput
                        style={styles.textInputChat}
                        ref={inputRef}
                        value={addInput}
                        onChangeText={(evt) => {
                            setAddInput(evt)
                            setText('')
                        }}/>
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
            </View>
            <Loading loading={visible}/>
            <ModalCamera onPressModal={onPressModal} visible={cameraModal} photoFunc={photoFunc}
                         cameraImageFunc={cameraImageFunc} user={"user"}/>
        </KeyboardAvoidingView>
    );
}
