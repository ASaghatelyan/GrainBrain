import React, {useContext, useEffect, useRef, useState} from 'react';
import {View, Text, Image, StyleSheet, TouchableOpacity, Alert, Dimensions, ScrollView, Animated} from 'react-native';
import StarRating from 'react-native-star-rating';
import LikeModal from "../likeModal/LikeModal";
import axiosInstance from "../../networking/axiosinstance";
import axiosinstance from "../../networking/axiosinstance";
import Loading from "../loading/Loading";
import {ContextHomePage} from "../../screen/tabScreen/HomePage";
import Carousel from "react-native-snap-carousel";
import {useSelector} from "react-redux";

export default function ReviewsDataMap(props) {

    const [rating, setRating] = useState(props.item.stars)
    const [homePageLike, setHomePageLike] = useState(props.item.iLiked)
    const [likedNumber, setLikedNumber] = useState(props.item.likeCount)
    const [likeData, setLikeData] = useState(props.item.likedUsers)
    // const [modalState, setModalState] = useState(false)
    let [index, setIndex] = useState(0)
    let scrollX = useRef(new Animated.Value(0)).current
    const songSlider = useRef(null)
    const store = useSelector((state) => state.customer)
    const Width = Dimensions.get('window').width;
    const windowWidth = Dimensions.get('window').width;
    // const modalFunc = (state) => setModalState(state)

    useEffect(() => {
        scrollX.addListener(({value}) => {
            setIndex(Math.round(value / Width))
        })
        return (() => {
            scrollX.removeAllListeners()
        })
    }, [])

    useEffect(() => {
        setLikeData(props.item.likedUsers)
    }, [])

    let likedFunc = async (postId, userId) => {
        if (!homePageLike) {
            try {
                const data = {
                    id: postId,
                    user_id: userId
                }
                const response = await axiosinstance.post(`/post/postLike`, data)
                setLikedNumber(response.data.message[0].likedUsers.length)
                setLikeData(response.data.message[0].likedUsers)
                setHomePageLike(true)
            } catch (e) {
                console.log(e.response)
            }
        } else if (homePageLike) {
            try {
                const data = {
                    id: postId,
                    user_id: userId
                }
                const response = await axiosinstance.post(`/post/postLike/dislike`, data)
                setLikedNumber(response.data.message[0].likedUsers.length)
                setLikeData(response.data.message[0].likedUsers)
                setHomePageLike(false)
            } catch (e) {
                console.log(e.response)
            }
        }
    }

    let renderSongs = ((item, i) => {

        const imagew = Width * 0.7
        const imageH = imagew * .6

        return (
            <Animated.View key={i} style={{
                width: windowWidth,
                justifyContent: "center",
                alignItems: 'center',
                marginTop: 10
            }}>
                <View style={{
                    height: 200,
                    width: '90%'
                }}>
                    <Image source={{uri: `${item.item}`}}
                           style={[styles.imgeclips, {width: imagew, height: imageH}]}/>
                </View>
            </Animated.View>
        )
    })

    return (
        <View style={styles.reviewsView}>
            <View style={styles.trashimgView}>
                {props.item.make || props.item.model || props.item.brand || props.item.product_name ?
                    <Text style={styles.FoodStarBucks}>
                        {props.item.make ? props.item.make : props.item.brand} {props.item.model ? props.item.model : props.item.product_name}</Text> :
                    <Text style={styles.FoodStarBucks}>{props.item.title}</Text>}
                <Text style={styles.categoryday}>{props.item.time}</Text>
            </View>
            <View>
                {
                    props.item.location && props.item.location.length > 45 ?
                        <TouchableOpacity onPress={() => {
                            Alert.alert(
                                "",
                                `${props.item.location}`,
                            );
                        }}>
                            <Text numberOfLines={1} style={styles.FoodStarBucks}>{props.item.location}</Text>
                        </TouchableOpacity>
                        :
                        props.item.location ? <Text style={styles.FoodStarBucks}>{props.item.location}</Text> : null
                }
            </View>
            <View style={styles.starView}>
                <StarRating
                    disabled={true}
                    maxStars={5}
                    rating={rating}
                    fullStar={require('../../assets/image/star.png')}
                    starStyle={styles.starStyle}
                    emptyStar={require('../../assets/image/starNone.png')}
                    starSize={10}
                    half={true}
                />
            </View>
            {props.item.description ? <Text style={styles.descriptionReview}>{props.item.description}</Text> : null}
            <View style={{width: windowWidth}}>
                <Animated.FlatList
                    data={props.item.image}
                    ref={songSlider}
                    renderItem={renderSongs}
                    keyExtractor={(item, index) => {
                        return  index.toString();
                    }}
                    horizontal
                    pagingEnabled
                    showsHorizontalScrollIndicator={false}
                    scrollEventThrottle={16}
                    onScroll={Animated.event(
                        [{
                            nativeEvent: {
                                contentOffset: {x: scrollX}
                            }
                        }],
                        {useNativeDriver: false}
                    )}
                />
            </View>
            <View style={styles.likesCommentView}>
                <View style={styles.likesView}>
                    {
                        homePageLike ?
                            <TouchableOpacity onPress={() => {
                                likedFunc(props.item.id, props.userid)
                            }}>
                                <Image source={require("../../assets/image/likeRed.png")}/>
                            </TouchableOpacity>
                            :
                            store.id !== props.userid ?
                                <TouchableOpacity onPress={() => {
                                    likedFunc(props.item.id, props.userid)
                                }}>
                                    <Image source={require("../../assets/image/like.png")}/>
                                </TouchableOpacity>
                                :
                                null
                    }{
                    likedNumber === 0 ?
                        <Text style={styles.likesText}>{likedNumber} Likes</Text>
                        :
                        <TouchableOpacity
                            onPress={() => {
                                props.funcModalLike(props.item.likedUsers)
                            }}>
                            <Text style={styles.likesText}>{likedNumber} Likes</Text>
                        </TouchableOpacity>
                }
                </View>
                <TouchableOpacity onPress={() => {
                    props.propsNavigation.navigate("comment", {post: props.item})
                }}>
                    <Text style={styles.commentText}>{props.item.get_comment_count ? props.item.get_comment_count : 0} comment</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    reviewsView: {
        flex: 1,
        backgroundColor: 'white',
        borderRadius: 6,
        marginBottom: 20,
    },
    categoryText: {
        textDecorationLine: 'underline',
        color: 'black',
        fontWeight: 'bold',
        fontSize: 12,
    },
    FoodStarBucks: {
        textDecorationLine: 'underline',
        color: 'black',
        fontWeight: 'bold',
        fontSize: 12,
        marginRight: 22,
        marginVertical: 5,
        fontFamily: 'OpenSans-Regular',
        paddingLeft: 22,

    },
    descriptionReview: {
        fontSize: 12,
        color: 'black',
        textAlign: 'left',
        fontFamily: 'OpenSans-Regular',
        paddingHorizontal: 22,
    },
    imgeclips: {
        marginVertical: 12,
        width: '100%',
        height: 178,
    },
    likesText: {
        fontSize: 12,
        color: '#000000',
        marginLeft: 12,
        fontFamily: 'OpenSans-Regular',
    },
    commentText: {
        fontSize: 12,
        color: '#000000',
        fontFamily: 'OpenSans-Regular',
    },
    widthHeightLike: {
        width: 19,
        height: 17,
    },
    starStyle: {
        marginVertical: 12,
        marginHorizontal: 3.5
    },
    starView: {
        flex: 1,
        alignItems: "flex-start",
        paddingLeft: 22,
    },
    foodView: {
        flexDirection: 'row',
    },
    trashimgView: {
        flexDirection: 'row',
        marginTop: 15,
        marginRight: 10,
        justifyContent: 'space-between',
        alignItems: "center",
        paddingRight: 22,
    },
    pencilImg: {
        width: 17,
        height: 17,
        marginRight: 17,
    },
    trashImg: {
        width: 17,
        height: 17,
    },
    trashView: {
        flexDirection: "row"
    },
    likesCommentView: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginTop: 13,
        marginBottom: 20,
        paddingRight: 22,
        paddingLeft: 10
    },
    likesView: {
        flexDirection: "row",
        alignItems: "center",
    },
    categoryday: {
        color: "#595959",
        marginLeft: 7,
        fontFamily: "OpenSans-Regular",
        fontSize: 12
    }
});
