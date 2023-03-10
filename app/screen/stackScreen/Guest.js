import React, {createContext, useEffect, useState} from 'react';
import {View, ScrollView, StatusBar, Image, TouchableOpacity, ActivityIndicator, Platform} from 'react-native';
import {styles} from '../../style/HomePageStyles';
import {GuestFunc} from '../../component/data/Data';
import axiosInstance from "../../networking/axiosinstance";
import Loading from "../../component/loading/Loading";

export const ContextHomePage = createContext()


export default function Guest(props) {

    const [dataPost, setDataPost] = useState([])
    const [visible, setVisible] = useState(false)
    const [indexPost, setIndexPost] = useState(1)
    const [loadingPostState, setLoadingPostState] = useState(true)

    useEffect(() => {
        handle()
    }, [])

    const handle = async () => {
        setVisible(true)
        try {
            const response = await axiosInstance.get(`/getPostsGuest`)
            setDataPost([...response.data])
            setVisible(false)
        } catch (e) {
            console.log(e.response)
            setVisible(false)
        }
    }

    const loadingPost = async () => {
        if (loadingPostState) {
            try {
                const response = await axiosInstance.get(`/getPostsGuest/${indexPost}`)
                setDataPost([...dataPost, ...response.data])
                setIndexPost(indexPost + 1)
                if (!Object.keys(response.data).length) {
                    setLoadingPostState(false)
                }
            } catch (e) {
                console.log(e)
            }
        }
    }

    const isCloseToBottom = ({layoutMeasurement, contentOffset, contentSize}) => {
        return layoutMeasurement.height + contentOffset.y >= contentSize.height - 1;
    };

    return (
        <ContextHomePage.Provider value={props}>
            <StatusBar backgroundColor={'rgb(250, 250, 250)'} barStyle={'dark-content'}/>
            <View style={{
                backgroundColor: "rgb(250, 250, 250)",
            }}>
                <View style={{marginTop: Platform.OS === 'ios' ? 40 : 0}}>
                    <TouchableOpacity style={{
                        marginLeft: 10,
                        marginVertical: 10,
                        width: 20,
                        alignItems: "center",
                        justifyContent: "center"
                    }}
                                      onPress={() => {
                                          props.navigation.goBack()
                                      }}>
                        <Image source={require("../../assets/image/back.png")} style={{
                            width: 7.5,
                            height: 15
                        }}/>
                    </TouchableOpacity>
                </View>
                <ScrollView
                    style={styles.ScrollHomePage}
                    showsVerticalScrollIndicator={false}
                    onScroll={({nativeEvent}) => {
                        if (isCloseToBottom(nativeEvent)) {
                            loadingPost()
                        }
                    }}>
                    <View style={styles.dataMapView}>
                        <GuestFunc
                            data={dataPost}
                            propsNav={props.navigation}
                        />
                    </View>
                    {
                        dataPost.length >= 5 && loadingPostState ?
                            <View style={{marginBottom: 10}}>
                                <ActivityIndicator size="small" color="#0000ff"/>
                            </View>
                            : null
                    }
                </ScrollView>
            </View>
            <Loading loading={visible}/>
        </ContextHomePage.Provider>
    )
}
