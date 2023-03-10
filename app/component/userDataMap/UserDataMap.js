import React, {useContext, useEffect, useRef, useState} from 'react';
import {View, Text, Image, StyleSheet, TouchableOpacity, Alert, ScrollView, Dimensions, Animated} from 'react-native';
import StarRating from 'react-native-star-rating';
import {ContextProps} from "../../screen/tabScreen/User";
import axiosInstance from "../../networking/axiosinstance";
import Loading from "../loading/Loading";
import LikeModal from "../likeModal/LikeModal";
import Carousel from "react-native-snap-carousel";
import ReviewsDataMap from "../reviewsDataMap/ReviewsDataMap";

export default function UserDataMap(props) {

    const i = props.index
    const [rating, setRating] = useState(0);
    const context = useContext(ContextProps)
    const [selected, setSelected] = useState(false)
    const [likedNumber, setLikedNumber] = useState(props.item.likeCount)
    const [data, setData] = useState([...props.item.image])
    let [index, setIndex] = useState(0)
    let scrollX = useRef(new Animated.Value(0)).current
    const songSlider = useRef(null)
    const windowWidth = Dimensions.get('window').width;

    useEffect(() => {
        scrollX.addListener(({value}) => {
            setIndex(Math.round(value / windowWidth))
        })
        return (() => {
            scrollX.removeAllListeners()
        })
    }, [])

    const DeleteFunc = async (id) => {
        setSelected(true)
        try {
            const response = await axiosInstance.delete(`/post/deletePostById/${id}`)
            const data1 = props.data
            const dataFilter = data1.filter((item) => item.id !== id)
            props.DataFunc([...dataFilter])
            setSelected(false)
        } catch (e) {
            console.log(e)
            setSelected(false)
        }
    }

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
                <View style={styles.trashView}>
                    <TouchableOpacity onPress={() => {
                        context.navigation.navigate('editUser', {
                            category: props.data[i].category,
                            description: props.data[i].description,
                            location: props.data[i].location,
                            id: props.data[i].id,
                            image: props.data[i].image,
                            title: props.data[i].title,
                            stars: props.data[i].stars,
                            make: props.data[i].make,
                            model: props.data[i].model,
                        })
                    }}>
                        <Image source={require("../../assets/image/pencil.png")} style={styles.pencilImg}/>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => {
                        DeleteFunc(props.data[i].id, i)
                    }}>
                        <Image source={require("../../assets/image/TrashSimple.png")} style={styles.trashImg}/>
                    </TouchableOpacity>
                </View>
            </View>
            <View style={{paddingLeft: 22,}}>
                {props.item.title ? <Text style={styles.FoodStarBucks}>{props.item.title}</Text> : null}
                {props.item.make || props.item.model || props.item.brand || props.item.product_name ?
                    <Text style={styles.FoodStarBucks}>
                        {props.item.make ? props.item.make : props.item.brand} {props.item.model ? props.item.model : props.item.product_name}</Text> : null}
                {
                    props.item.location && props.item.location.length > 45 ?
                        <TouchableOpacity onPress={() => {
                            Alert.alert(
                                "",
                                `${props.item.location}`,
                            )
                        }}><Text numberOfLines={1} style={styles.FoodStarBucks}>{props.item.location}</Text>
                        </TouchableOpacity>
                        :
                        props.item.location ? <Text style={styles.FoodStarBucks}>{props.item.location}</Text> : null
                }
            </View>
            <View style={styles.starView}>
                <StarRating
                    disabled={true}
                    maxStars={5}
                    rating={props.item.stars}
                    selectedStar={(rating) => setRating(rating)}
                    fullStar={require('../../assets/image/star.png')}
                    starStyle={styles.starStyle}
                    emptyStar={require('../../assets/image/starNone.png')} starSize={10}
                />
            </View>
            {props.item.description ? <Text style={styles.descriptionReview}>{props.item.description}</Text> : null}
            <View style={{width: windowWidth}}>
                <Animated.FlatList
                    data={data}
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
                            nativeEvent: {contentOffset: {x: scrollX}}
                        }],
                        {useNativeDriver: false}
                    )}/>
            </View>
            <View style={styles.comlikeView}>
                {likedNumber === 0 ?
                    <Text style={styles.likesText}>{props.item.likeCount} Likes</Text>
                    :
                    <TouchableOpacity onPress={() => {
                        props.funcModalLike(props.item.likedUsers)
                    }}>
                        <Text style={styles.likesText}>{props.item.likeCount} Likes</Text>
                    </TouchableOpacity>}
                <TouchableOpacity onPress={() => props.propsNavigation.navigate("comment", {post: props.item})}>
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

    },
    descriptionReview: {
        fontSize: 12,
        color: 'black',
        textAlign: 'left',
        fontFamily: 'OpenSans-Regular',
        paddingRight: 22,
        paddingLeft: 22,
    },

    comlikeView: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 20,
        paddingRight: 22,
        paddingLeft: 10
    },
    likesText: {
        fontSize: 12,
        color: '#000000',
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
        paddingLeft: 22,
        justifyContent: 'space-between',
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
    }
});
