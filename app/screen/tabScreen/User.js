import React, {createContext, useEffect, useState} from 'react';
import {View, Text, ScrollView, TouchableOpacity, Image, ActivityIndicator} from 'react-native';
import Button from '../../component/button/Button';
import {UserDataFunc} from '../../component/data/Data';
import {styles} from '../../style/UserStyles';
import {useSelector} from "react-redux";
import axiosInstance from "../../networking/axiosinstance";
import ListImg from "../../component/list/List";
import Loading from "../../component/loading/Loading";
import LikeModal from "../../component/likeModal/LikeModal";

export const Context = createContext()
export const ContextProps = createContext()

export default function User(props) {

    const [data, setData] = useState([])
    const [visible, setVisible] = useState(false)
    const [locationText, setLocationText] = useState(false)
    const [indexPost, setIndexPost] = useState(1)
    const [loadingPostState, setLoadingPostState] = useState(true)
    const [modalState, setModalState] = useState(false)
    const [dataLike,setDataLike] = useState([])
    const modalFunc = (state) => setModalState(state)

    const funcModalLike = (likeArr) => {
        setDataLike([...likeArr])
        setModalState(true)
    }

    useEffect(() => {
        const unsubscribe = props.navigation.addListener('focus', () => {
            getDataMy()
        });
        return unsubscribe;
    }, [props.navigation]);

    const locationFunc = () => {
        setLocationText(!locationText)
    }

    const store = useSelector((state) => state.customer)
    const DataFunc = (copyData) => {
        setData(copyData)
    }

    let getDataMy = async () => {
        setVisible(true)
        try {
            const response = await axiosInstance.get('/post/getPostByUserId')
            setData(response.data)
            setVisible(false)
        } catch (e) {
            console.log(e.response)
            setVisible(false)
        }
    }

    const loadingPost = async () => {
        if (loadingPostState) {
            try {
                const response = await axiosInstance.get(`/post/getPostByUserId/${indexPost}`)
                setData([...data, ...response.data])
                setIndexPost(indexPost + 1)
                if (!Object.keys(response.data).length) {
                    setLoadingPostState(false)
                }
            } catch (e) {
                console.log(e.response)
            }
        }
    }

    const isCloseToBottom = ({layoutMeasurement, contentOffset, contentSize}) => {
        return layoutMeasurement.height + contentOffset.y >= contentSize.height - 1
    }

    return (
        <ContextProps.Provider value={props}>
            <ScrollView
                style={styles.userScrool}
                showsVerticalScrollIndicator={false}
                onScroll={({nativeEvent}) => {
                    if (isCloseToBottom(nativeEvent)) {
                        loadingPost()
                    }
                }}>
                <View style={styles.viewUser}>
                    <View style={styles.HeaderUsersSinglePage}>
                        <TouchableOpacity
                            onPress={() => {
                                props.navigation.goBack()
                            }}>
                            <Image source={require('../../assets/image/back.png')} style={styles.backUser}/>
                        </TouchableOpacity>
                        <ListImg/>
                    </View>
                    <View>
                        <View style={styles.containerView}>
                            <View style={styles.ProfileImgName}>
                                <Image source={{uri: props.photo ? props.photo : store.image}}
                                       style={styles.eclipse3Profile}/>
                            </View>
                            {
                                store?.follower?.length === 0 ?
                                    <View style={styles.viewFolowers}>
                                        <Text style={styles.textChild}>Followers</Text>
                                        <Text style={styles.quantity}>{store.follower.length}</Text>
                                    </View>
                                    :
                                    <TouchableOpacity
                                        onPress={() => {
                                            props.navigation.navigate("usersFolow", {users: store.follower})
                                        }}
                                        style={styles.viewFolowers}>
                                        <Text style={styles.textChild}>Followers</Text>
                                        <Text style={styles.quantity}>{store.follower.length}</Text>
                                    </TouchableOpacity>
                            }
                            {
                                store.following.length === 0 ?
                                    <View style={styles.viewFolowers}>
                                        <Text style={styles.textChild}>Followings</Text>
                                        <Text style={styles.quantity}>{store.following.length}</Text>
                                    </View>
                                    :
                                    <TouchableOpacity
                                        onPress={() => {
                                            props.navigation.navigate("usersFolow", {users: store.following})
                                        }}
                                        style={styles.viewFolowers}>
                                        <Text style={styles.textChild}>Followings</Text>
                                        <Text style={styles.quantity}>{store.following.length}</Text>
                                    </TouchableOpacity>
                            }
                        </View>
                    </View>
                    <Text style={styles.firstnameLastname}>{store.name}</Text>
                    <Button
                        title={'EDIT PROFILE'}
                        color={'#569690'}
                        borderWidth={1}
                        borderColor={'#569690'}
                        marginTop={28}
                        onPress={() => {
                            props.navigation.navigate("editPage")
                        }}/>
                    <Text style={styles.myReviewsText}>My Posts</Text>
                    <UserDataFunc
                        data={data}
                        DataFunc={DataFunc}
                        locationFunc={locationFunc}
                        locationText={locationText}
                        propsNavigation={props.navigation}
                        funcModalLike={funcModalLike}
                    />
                    {data.length >= 5 && loadingPostState ?
                        <View style={{marginBottom: 10}}><ActivityIndicator size="small"
                                                                            color="#0000ff"/></View> : null}
                </View>
                <Loading loading={visible}/>
            </ScrollView>
            <LikeModal
                visible={modalState}
                modalFunc={modalFunc}
                likesArr={dataLike}
                propsNavigation={props.navigation}
            />
        </ContextProps.Provider>
    );
}
