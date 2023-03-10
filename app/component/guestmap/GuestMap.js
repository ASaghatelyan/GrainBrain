import React, {useContext, useEffect, useRef, useState} from 'react';
import {View, Text, Image, StyleSheet, TouchableOpacity, Alert, Animated, Dimensions} from 'react-native';
import StarRating from 'react-native-star-rating';
import LikeModal from "../likeModal/LikeModal";
import axiosInstance from "../../networking/axiosinstance";
import axiosinstance from "../../networking/axiosinstance";
import Loading from "../loading/Loading";
import {ContextHomePage} from "../../screen/tabScreen/HomePage";
import Carousel from "react-native-snap-carousel";
import {useSelector} from "react-redux";

export default function GuestMap(props) {

    const [rating, setRating] = useState(props.item.stars)
    const [likedNumber, setLikedNumber] = useState(props.item.likeCount)
    let carouselRef = useRef();
    const propsContext = useContext(ContextHomePage)
    let scrollX = useRef(new Animated.Value(0)).current
    const songSlider = useRef(null)
    const windowWidth = Dimensions.get('window').width;
    let [index, setIndex] = useState(0)

    useEffect(() => {
        scrollX.addListener(({ value }) => {
            setIndex(Math.round(value / windowWidth))
        })
        return (() => {
            scrollX.removeAllListeners()
        })
    }, [])

    let renderSongs = ((item, i) => {

        const imagew = windowWidth * 0.7
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
                <Text style={styles.categoryText}>{props.item.category.name}</Text>
                <Text style={styles.categoryday}>{props.item.ago}</Text>
            </View>
            <View style={styles.FoodStarBucksViewImg}>
                <Text style={styles.FoodStarBucks}>{props.item.title}</Text>
                {props.item.location && props.item.location.length > 45 ?
                    <TouchableOpacity onPress={() => {
                        Alert.alert(
                            "",
                            `${props.item.location}`,
                        );
                    }}>
                        <Text numberOfLines={1} style={styles.FoodStarBucks}>{props.item.location}</Text>
                    </TouchableOpacity>
                    :
                    <Text style={styles.FoodStarBucks}>{props.item.location}</Text>
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
            {
                props.item.description ?
                    <Text style={styles.descriptionReview}>{props.item.description}</Text>
                    :
                    null
            }
            <View style={{width: windowWidth}}>
                <Animated.FlatList
                    data={props.item.image}
                    ref={songSlider}
                    renderItem={renderSongs}
                    keyExtractor={(item) => item.id}
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
                    <Text style={styles.likesText}>{likedNumber} Likes</Text>
                </View>
                <TouchableOpacity onPress={() => {
                    props.propsNav.navigate("commentGuest", {post: props.item})
                }}>
                    <Text style={styles.commentText}>{props.item.get_comment_count_count ? props.item.get_comment_count_count : 0} comment</Text>
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
        marginHorizontal: 40
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
        paddingRight: 22,
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
        paddingLeft: 22,
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
