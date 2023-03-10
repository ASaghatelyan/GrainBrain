import React, {createRef, useEffect, useRef, useState} from "react";
import {Image, Platform, TouchableOpacity, View, Text, StatusBar} from "react-native";
import {ScrollView} from "react-native-gesture-handler";
import {styles} from "../../style/CommentStyles";
import Carousel from "react-native-snap-carousel";
import {useSelector} from "react-redux";

export default function CommentGuest(props) {


    const post = props.route.params.post
    const scrollViewRef = useRef();
    const MY_ID = useSelector((state) => state.customer.id)
    let carouselRef = useRef();

    const _renderItem = ({item}) => {
        return (
            <Image source={{uri: `${item}`}} style={[styles.imgeclips, {width: '100%', backgroundColor: 'black'}]}/>
        );
    }

    return (
        <View style={styles.container}>
            <StatusBar backgroundColor={"rgb(250, 250, 250)"} barStyle={"dark-content"}/>
            <View style={[styles.postDataView,{marginTop: Platform.OS === 'ios' ? 50 : 0}]}>

            <TouchableOpacity onPress={() => {
                    props.navigation.goBack()
                }} style={styles.touch}>
                    <Image source={require("../../assets/image/back.png")} style={styles.backIcon}/>
                </TouchableOpacity>
                <View>
                    <Text style={styles.title}>{post.category.name}</Text>
                </View>
            </View>
            <View style={styles.carousel}>
                <Carousel
                    ref={(c) => {
                        carouselRef = c
                    }}
                    data={[...post.image]}
                    renderItem={_renderItem}
                    sliderWidth={300}
                    itemWidth={300}
                    inactiveSlideShift={50}
                    inactiveSlideScale={1}
                    inactiveSlideOpacity={1}
                    enableMomentum
                    showsHorizontalScrollIndicator={false}
                    snapOnAndroid
                    removeClippedSubviews={false}
                    decelerationRate={'fast'}
                    renderToHardwareTextureAndroid
                />
            </View>
            <ScrollView
                showsVerticalScrollIndicator={false}
                ref={scrollViewRef}
                onContentSizeChange={() => scrollViewRef.current.scrollToEnd({animated: true})}
                style={styles.scroolComment}
            >
                {
                    post.comment.map((item, index) => {
                        return (
                            <View
                                style={[styles.placeHolderImageViewText, {alignItems: 'center'}]}
                                key={index}
                            >
                                <Text style={styles.commentText}>{item.user.name ? item.user.name : null}</Text>
                                <Text
                                    style={[styles.placeholderText, {alignItems: item.user_id === MY_ID ? 'flex-end' : `flex-start`}]}>{item.message}</Text>
                                <View style={[styles.commentViewWatch, {width: '100%', marginRight: 5}]}>
                                    <Text style={styles.commentText}>{item.ago}</Text>
                                    <TouchableOpacity style={styles.replyView}>

                                    </TouchableOpacity>
                                </View>
                            </View>
                        )
                    })
                }
            </ScrollView>
        </View>
    )

}
