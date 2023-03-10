import React, {createRef, useEffect, useRef, useState} from "react";
import {Image, TextInput, TouchableOpacity, View, Text, StatusBar, Platform, KeyboardAvoidingView} from "react-native";
import {ScrollView} from "react-native-gesture-handler";
import {styles} from "../../style/CommentStyles";
import ModalCamera from "../../component/modalCamera/ModalCamera";
import {componentDidMount, inputRef} from "../../component/keyboard/Keyboard";
import {useSelector} from "react-redux";
import axiosInstance from "../../networking/axiosinstance";
import {ReplyMap} from "../../component/data/Data";

export default function Comment(props) {
    const [addInput, setAddInput] = useState("")
    const [chat, setChat] = useState([])
    const [cameraModal, setCameraModal] = useState(false)
    const [photo, setPhoto] = useState("")
    const [replyIndex, setReplyIndex] = useState(null)
    const [scrollToEnd, setScrollToEnd] = useState(true)
    const store = useSelector((state) => state.firebaseToken.firebase)

    const post = props.route.params.post
    const scrollViewRef = useRef();
    const MY_ID = useSelector((state) => state.customer.id)

    useEffect(() => {
        handle()
    }, [])

    useEffect(() => {
        if (photo) {
            photoFuncAxios()
        }
    }, [photo])

    const handle = async () => {
        try {
            const response = await axiosInstance.get(`post/getReviewByPostId/${post.id}`)
            setChat(response.data.message)
        } catch (e) {
            console.log(e.response)
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

    const photoFuncAxios = async () => {
        console.log('mtav',photo,post.id)
        try {
            let formData = new FormData()
            formData.append("image", {
                name: `name.jpg`,
                uri: photo,
                type: "image/jpeg",
            })
            formData.append('post_id',  post.id)
            const response = await axiosInstance.post("/post/postReview", formData, {
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                }
            })
            console.log(  {
                path: response.data.message.path,
                time: response.data.message.ago,
                user_id: response.data.message.user.id,
                sender_id: response.data.message.sender_id,
                user: {name:response.data.message.user.name},
                reply: response.data.message.reply
            })
            setChat(prev =>[
                ...prev,
                {
                    path: response.data.message.path,
                    time: response.data.message.ago,
                    user_id: response.data.message.user.id,
                    user: {name:response.data.message.user.name},
                    reply: response.data.message.reply
                }

            ])
            setPhoto('')
        } catch (e) {
            console.log(e, e.response)
            setPhoto('')
        }
    }

    const addFunctionChat = async () => {
        if (addInput) {
            try {
                const data = {
                    post_id: post.id,
                    message: addInput
                }
                const response = await axiosInstance.post('/post/postReview', data)
                await notification(response)
                addFunction(
                    response.data.message.message,
                    response.data.message.user.id,
                    response.data.message.time,
                    response.data.message.user.name,
                    response.data.message.post_id,
                    response.data.message.reply
                )
                setAddInput("")
            } catch (e) {
                console.log(e)
            }
        }
    }

    let addFunction = (message, user_id, time, name, post_id) => {
        if (message) {
            setChat([
                ...chat,
                {
                    message,
                    user_id,
                    time,
                    post_id,
                    user: {name},
                    reply: []
                }
            ])
        }
    }

    const handleEveReply = async () => {
        try {
            let arr = chat
            if (addInput) {
                const data = {
                    reply_id: arr[replyIndex].id,
                    post_id: post.id,
                    message: addInput
                }
                const response = await axiosInstance.post("/post/commentReply", data, {
                    headers: {
                        'Content-Type': 'application/json',
                        'Accept': 'application/json'
                    }
                })
                await notification(response)
                arr[replyIndex].reply.push({
                    message: response.data.message.message,
                    reply_id: arr[replyIndex].reply_id,
                    post_id: arr[replyIndex].post_id,
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
            }
        } catch (e) {
            console.log(e.response);
        }
    }

        const notification = async (res) => {
            console.log(res)
            try {
                const data = {
                    firebase_Token: store,
                    YOUR_ID:post.user_id,
                    message: res.data.message.message,
                    title:res.data.message.user.name,
                }
                const response = await axiosInstance.post('/send-notification', data)
                console.log(response,'notification')
            } catch (e) {
                console.log(e.response)
            }
        }

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : null}
            style={{flex: 1}}
        >
            <View style={styles.container}>
                <StatusBar backgroundColor={"rgb(250, 250, 250)"} barStyle={"dark-content"}/>
                <View style={[styles.postDataView, {marginTop: Platform.OS === 'ios' ? 50 : 0}]}>
                    <TouchableOpacity onPress={() => {
                        props.navigation.goBack()
                    }} style={styles.touch}>
                        <Image source={require("../../assets/image/back.png")} style={styles.backIcon}/>
                    </TouchableOpacity>
                    <View>
                        {/*<Text style={styles.title}>{post.category.name}</Text>*/}
                    </View>
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
                    }}
                    style={styles.scroolComment}
                >
                    {chat.map((item, index) => {
                        return (
                            <View style={[styles.placeHolderImageViewText, {alignItems: 'center'}]} key={index}>
                                <Text style={styles.commentText}>{item?.user?.name}</Text>
                                <View style={[styles.messageView, {
                                    alignItems: item.user_id === MY_ID ? 'flex-end' : `flex-start`,
                                    width: '100%'
                                }]}>
                                    {item.message &&(
                                        <Text style={[styles.placeholderText]}>{item.message}</Text>
                                    )}
                                    {
                                        item.path ?
                                            <Image source={{uri:item.path}} style={styles.messageImage}/>

                                            :
                                            null
                                    }
                                </View>
                                <View style={[styles.commentViewWatch, {width: '100%', marginRight: 5}]}>
                                    <Text style={styles.commentText}>{item?.time}</Text>
                                    <TouchableOpacity
                                        style={styles.replyView}
                                        onPress={() => {
                                            componentDidMount()
                                            setReplyIndex(index)
                                        }}>
                                        <Image source={require("../../assets/image/reply.png")}
                                               style={styles.replyImage}/>
                                        <Text style={styles.replyText}>Reply</Text>
                                    </TouchableOpacity>
                                </View>
                                <ReplyMap dataChatComment={[...item.reply]}/>
                            </View>
                        )
                    })}
                </ScrollView>
                <View>
                    <View style={styles.chatInputView}>
                        <TouchableOpacity onPress={() => {
                            onPressModal(true)
                        }}>
                            <Image
                                source={require('../../assets/image/Chatplus.png')}
                                style={styles.chatPlusImg}
                            />
                        </TouchableOpacity>
                        <TextInput
                            style={styles.textInputChat}
                            ref={inputRef}
                            value={addInput}
                            onChangeText={(evt) => {
                                setAddInput(evt)
                            }}
                        />
                        <TouchableOpacity
                            onPress={() => {
                                if (replyIndex !== null) {
                                    handleEveReply()
                                } else {
                                    addFunctionChat()
                                }
                                setAddInput('')
                            }}>
                            <Image
                                source={require('../../assets/image/Chat.png')}
                                style={styles.chatIcon}
                            />
                        </TouchableOpacity>
                    </View>
                </View>
                <ModalCamera
                    onPressModal={onPressModal}
                    visible={cameraModal}
                    photoFunc={photoFunc}
                    cameraImageFunc={cameraImageFunc}
                    user={"user"}
                />
            </View>
        </KeyboardAvoidingView>
    )

}
