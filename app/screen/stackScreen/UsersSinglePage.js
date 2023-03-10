import React, {useEffect, useState} from 'react';
import {Text, View, ScrollView, Image, StatusBar, TouchableOpacity, ActivityIndicator, Alert} from 'react-native';
import {styles} from '../../style/UsersSinglePageStyles';
import Button from '../../component/button/Button';
import {ReviewsDataFunc} from '../../component/data/Data';
import ListImg from "../../component/list/List";
import axiosInstance from "../../networking/axiosinstance";
import Loading from "../../component/loading/Loading";
import {useSelector} from "react-redux";
import Axiosinstance from "../../networking/axiosinstance";
import LikeModal from "../../component/likeModal/LikeModal";

export default function UsersSinglePage(props) {
    const id = props.route.params.id
    const [user, setUser] = useState([])
    const [loading, setLoading] = useState(false)
    const [folowing, setFolowing] = useState(user.IsFollower ? user.IsFollower : null);
    const [post, setPost] = useState([])
    const [indexPost, setIndexPost] = useState(1)
    const [block, setBlock] = useState(user.IsBlockedUser ? user.IsBlockedUser : null)
    const store = useSelector((state) => state.customer)
    const [loadingPostState, setLoadingPostState] = useState(true)
    const [modalState, setModalState] = useState(false)
    const [dataLike,setDataLike] = useState([])
    const modalFunc = (state) => setModalState(state)

    const isCloseToBottom = ({
                                 layoutMeasurement,
                                 contentOffset,
                                 contentSize
                             }) => layoutMeasurement.height + contentOffset.y >= contentSize.height - 1

    useEffect(() => {
        userPost()
    }, [id]);

    const folow = async () => {
        if (!folowing) {
            try {
                let data = {
                    "following_id": id
                }
                const response = await axiosInstance.post(`follow/following`, data)
                user.IsFollower = !user.IsFollower
                setFolowing(true)
            } catch (e) {
                console.log(e.response)
            }
        } else if (folowing) {
            try {
                let data = {
                    "following_id": id
                }
                const response = await axiosInstance.post(`follow/unfollow`, data)
                user.IsFollower = !user.IsFollower
                setFolowing(false)
            } catch (e) {
                console.log(e.response)
            }
        }
    }

    const funcModalLike = (likeArr) => {
        setDataLike([...likeArr])
        setModalState(true)
    }

    const blockFunc = async () => {
        try {
            if (!user.IsBlockedUser) {
                const response = await Axiosinstance.post(`/blockUser/${id}`)
                user.IsBlockedUser = !user.IsBlockedUser
                setBlock(true)
            } else if (user.IsBlockedUser) {
                const response = await Axiosinstance.post(`/unblockUser/${id}`)
                user.IsBlockedUser = !user.IsBlockedUser
                setBlock(false)
            }
        } catch (e) {
            setBlock(true)
        }
    }

    const userPost = async () => {
        setLoading(true)
        try {
            let data = {
                "id": id
            }
            const response = await axiosInstance.post(`me`, data)
            setUser(response.data.message)
            setPost(response.data.message.post)
            setLoading(false)
        } catch (e) {
            console.log(e.response)
            setLoading(false)
        }
    }

    const loadingPost = async () => {
        if (loadingPostState) {
            let data = {
                "id": id
            }
            try {
                const response = await axiosInstance.post(`/me/${indexPost}`, data)
                if (!Object.keys(response.data.message.post).length) {
                    setLoadingPostState(false)
                }
                setPost([...post, ...response.data.message.post])
                setIndexPost(indexPost + 1)
            } catch (e) {
                console.log(e)
            }
        }
    }

    return (
        id ?
            <ScrollView
                style={styles.ScrollViewAll}
                showsVerticalScrollIndicator={false}
                onScroll={({nativeEvent}) => {
                    if (isCloseToBottom(nativeEvent)) {
                        loadingPost()
                    }
                }}>
                <StatusBar backgroundColor={'rgb(250, 250, 250)'} barStyle={'dark-content'}/>
                <View style={styles.viewReview}>
                    <View style={styles.HeaderUsersSinglePage}>
                        <TouchableOpacity onPress={() => props.navigation.goBack(null)} style={styles.backButton}>
                            <Image source={require('../../assets/image/back.png')} style={styles.backUser}/>
                        </TouchableOpacity>
                        <ListImg/>
                    </View>
                    <View style={styles.containerView}>
                        <View style={styles.ProfileImgName}>
                            <Image source={{uri: user.image}} style={styles.eclipse3Profile}/>
                        </View>
                        {
                            user?.follower ?
                                user?.follower?.length === 0 ?
                                    <View style={styles.viewFolowers}>
                                        <Text style={styles.textChild}>Followers</Text>
                                        <Text style={styles.quantity}>{user.follower.length}</Text>
                                    </View>
                                    :
                                    <TouchableOpacity
                                        onPress={() => props.navigation.navigate("usersFolow", {users: user.follower})}
                                        style={styles.viewFolowers}>
                                        <Text style={styles.textChild}>Followers</Text>
                                        <Text style={styles.quantity}>{user.follower.length}</Text>
                                    </TouchableOpacity>
                                : null}
                        {user?.following ?
                            user?.following?.length === 0 ?
                                <View style={styles.viewFolowers}>
                                    <Text style={styles.textChild}>Followings</Text>
                                    <Text style={styles.quantity}>{user.following.length}</Text>
                                </View>
                                :
                                <TouchableOpacity
                                    onPress={() => props.navigation.navigate("usersFolow", {users: user.following})}
                                    style={styles.viewFolowers}>
                                    <Text style={styles.textChild}>Followings</Text>
                                    <Text style={styles.quantity}>{user.following.length}</Text>
                                </TouchableOpacity> : null}
                    </View>
                    <Text style={styles.firstnameLastname}>{user.name}</Text>
                    {user.id !== store.id ?
                        <View style={styles.buttView}>
                            {user.IsFollower ?
                                <Button
                                    title={'FOLLOWING'}
                                    width={143}
                                    color={'#569690'}
                                    backgroundColor={'#D4D8D7'}
                                    fontWeight={'bold'}
                                    onPress={() => {
                                        folow()
                                    }}/>
                                :
                                <Button
                                    width={143}
                                    title={'FOLLOW'}
                                    color={'white'}
                                    backgroundColor={'#569690'}
                                    fontWeight={'bold'}
                                    onPress={() => {
                                        folow()
                                    }}/>}
                            <Button
                                title={'SEND MESSAGE'}
                                fontWeight={'bold'}
                                width={143}
                                color={'#569690'}
                                borderWidth={1}
                                borderColor={'#569690'}
                                onPress={() => props.navigation.navigate("chat", {yourID: user.id, name: user.name})}/>
                        </View>
                        :
                        <View style={styles.myProfileView}>
                            <Text style={styles.myProfileText}>MY PROFILE</Text>
                        </View>}
                    {id === store.id ?
                        null :
                        <View style={[styles.blocked_button]}>
                            <TouchableOpacity onPress={blockFunc} style={styles.viewBlock}>
                                <Image source={require('../../assets/image/block.png')} style={styles.blocked_Image}/>
                                <Text
                                    style={styles.block_text}>{user.IsBlockedUser ? 'Unblock User' : 'Block User'}</Text>
                            </TouchableOpacity>
                        </View>}
                    <Text style={styles.reviews}>LATEST REVIEWS</Text>
                    {post ? <ReviewsDataFunc
                        posts={post}
                        funcModalLike={funcModalLike}
                        userid={user.id}
                        propsNavigation={props.navigation}
                    /> : null}
                    {post.length >= 5 && loadingPostState ?
                        <View style={{marginBottom: 10}}>
                            <ActivityIndicator size="small" color="#0000ff"/>
                        </View> : null}
                </View>
                <Loading loading={loading}/>
                <LikeModal
                    visible={modalState}
                    modalFunc={modalFunc}
                    likesArr={dataLike}
                    propsNavigation={props.navigation}
                />
            </ScrollView> : null
    );
}
