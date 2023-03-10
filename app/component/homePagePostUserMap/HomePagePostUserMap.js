import React, {createRef, useCallback, useContext, useEffect, useRef, useState} from "react";
import {
    Animated,
    Dimensions,
    FlatList,
    Image,
    StyleSheet,
    Text,
    Linking,
    TouchableOpacity,
    View,
    Alert, ActivityIndicator, Platform,
} from "react-native";
import StarRating from "react-native-star-rating";
import {ContextHomePage} from "../../screen/tabScreen/HomePage";
import LikeModal from "../likeModal/LikeModal";
import {useSelector} from "react-redux";
import ModalGroup from "../modalGroup/ModalGroup";
import ModalReport from "../modalReport/ModalReport";
import Modal from "react-native-modal";
import VideoPlayer from "react-native-video-player";
import FastImage from "react-native-fast-image";


export default function HomePagePostUserMap(propsAll) {

    const homePageProps = useContext(ContextHomePage);


    const windowWidth = Dimensions.get("window").width;
    const [reportIndex, setReportIndex] = useState(null);
    const store = useSelector((state) => state.customer);

    const [visibleModal, setVisibleModal] = useState(false);
    const [imageAllIndex, setImageAllIndex] = useState(0);


    const modalFuncReport = (val) => {
        setVisibleModal(val);
    };


    const renderFlatlist = (props) => {
        return (
            <View style={styles.mapAllView}>
                <View style={{marginLeft: 15}}>
                    <View style={styles.viewProfile}>
                        <TouchableOpacity style={styles.ProfileView}
                                          onPress={() => {
                                              if (props?.item?.user?.id) {
                                                  homePageProps.navigation.navigate("usersSinglePage", {id: props.item.user.id})
                                              } else {
                                                  Alert.alert(
                                                      "non-registered user",
                                                      "",
                                                      [
                                                          {text: "OK", onPress: () => console.log("OK Pressed")}
                                                      ]
                                                  );
                                              }
                                          }}>
                            <Image
                                source={{uri: props?.item?.user?.image ? props?.item?.user?.image : "http://app.grain-brain.ca.site/image/noavatar.png"}}
                                style={styles.imgEclips}/>
                            <View>
                                <Text
                                    style={styles.nameText}>{props?.item?.user?.name ? props?.item?.user?.name : "anonymous"}</Text>
                                <Text style={styles.dayText}>{props?.item?.time}</Text>
                            </View>
                        </TouchableOpacity>
                        <View>
                            <TouchableOpacity style={styles.report_touch} onPress={() => {
                                setReportIndex(props.item.id);
                                setVisibleModal(true);
                            }}>
                                <Text style={styles.report_text}>Report</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                    <View>
                        {props.item.make || props.item.model || props.item.brand || props.item.product_name ? null :
                            <Text style={styles.FoodStarBucks}>{props.item.title}</Text>}
                    </View>
                    {props.item.make || props.item.model || props.item.brand || props.item.product_name ?
                        <Text style={styles.FoodStarBucks}>
                            {props.item.make ? props.item.make : props.item.brand} {props.item.model ? props.item.model : props.item.product_name}</Text> : null}
                    <View style={styles.starView}>
                        <StarRating
                            disabled={true}
                            maxStars={5}
                            rating={+props.item.stars}
                            fullStar={require("../../assets/image/star.png")}
                            starStyle={styles.starStyle}
                            emptyStar={require("../../assets/image/starNone.png")}
                            starSize={10}
                        />
                    </View>
                    {props.item.description ? <Text style={styles.status}>{props.item.description}</Text> : null}
                </View>
                <View style={{width: windowWidth}}>

                        <TouchableOpacity onPress={() => {
                            propsAll.imageFunc(true);
                            propsAll.imageAnimatedDataFunc(props.item.image);
                        }}>
                            <Animated.FlatList
                                data={props.item.image}
                                ref={propsAll.songSlider}
                                renderItem={propsAll.renderSongs}
                                keyExtractor={(item, index) => {
                                    return  index.toString();
                                }}
                                horizontal
                                pagingEnabled
                                showsHorizontalScrollIndicator={false}
                                scrollEventThrottle={16}
                                onScroll={Animated.event(
                                    [{
                                        nativeEvent: {contentOffset: {x: propsAll.scrollX}},
                                    }],
                                    {useNativeDriver: false},
                                )}/>
                        </TouchableOpacity>

                </View>
                <View style={[styles.likesCommentView, {marginLeft: 15}]}>
                    <View style={styles.likesView}>
                        {props.item.iLiked ?
                            <TouchableOpacity onPress={() => {
                                propsAll.likedFuncIndex(props.index, props.item.id, props.item?.user?.id, props.item.iLiked);
                            }}>
                                <Image source={require("../../assets/image/likeRed.png")}/>
                            </TouchableOpacity>
                            :
                            store.id !== props?.item?.user?.id ?
                                <TouchableOpacity onPress={() => {
                                    propsAll.likedFuncIndex(props.index, props.item.id, props.item.user.id, props.item.iLiked);
                                }}>
                                    <Image source={require("../../assets/image/like.png")}/>
                                </TouchableOpacity>
                                : null}
                        {props.item.likedUsers.length ?
                            <TouchableOpacity onPress={() => {
                                propsAll.likeDataFunc(props.item.likedUsers);
                                propsAll.funcModalLike(props.item.likedUsers);
                            }}>
                                <Text style={styles.likesText}>{props.item.likedUsers.length} Likes</Text>
                            </TouchableOpacity>
                            :
                            <Text style={styles.likesText}>{props.item.likedUsers.length} Likes</Text>
                        }
                    </View>
                    <TouchableOpacity onPress={() => {
                        homePageProps.navigation.navigate("comment", {post: props.item});
                    }}>
                        <Text
                            style={styles.commentText}>{props.item.get_comment_count ? props.item.get_comment_count : 0} comment</Text>
                    </TouchableOpacity>
                </View>
                <FlatList data={propsAll.adver}
                          renderItem={({item}) => {
                              if (+item.after_post == props.index) {
                                  if (item.ext == "video") {
                                      if (item.type == "pop_up") {
                                          return (
                                              <Modal
                                                  isVisible={propsAll.videoModal}
                                                  animationIn="slideInDown"
                                                  animationOut="slideOutUp"
                                                  testID={"modal"}
                                                  swipeDirection="down"
                                                  backdropColor={"rgba(250, 250, 250, 0.5)"}
                                                  backdropOpacity={1}
                                                  onSwipeComplete={() => {
                                                      propsAll.modalFuncVideo(false);
                                                  }}
                                                  onBackButtonPress={() => {
                                                      propsAll.modalFuncVideo(false);
                                                  }}>
                                                  <View style={styles.modalContainer}>
                                                      <View style={styles.back_button_View}>
                                                          <TouchableOpacity onPress={() => {
                                                              propsAll.modalFuncVideo(false);
                                                          }}>
                                                              <Image source={require("../../assets/image/delete.png")}
                                                                     style={styles.back_button}/>
                                                          </TouchableOpacity>
                                                      </View>
                                                      <TouchableOpacity onPress={() => linkingFunc(item.web_link)}>
                                                          <VideoPlayer
                                                              video={{uri: item.image}}
                                                              videoWidth={1600}
                                                              videoHeight={900}
                                                              thumbnail={{uri: item.uri}}
                                                              autoplay={true}
                                                          />
                                                      </TouchableOpacity>
                                                  </View>
                                              </Modal>
                                          );
                                      } else if (item.type == "square" || item.type == "rectangular") {
                                          return (
                                              <TouchableOpacity onPress={() => linkingFunc(item.web_link)}>
                                                  <VideoPlayer
                                                      video={{uri: item.image}}
                                                      videoWidth={1600}
                                                      videoHeight={900}
                                                      thumbnail={{uri: item.uri}}
                                                  />
                                              </TouchableOpacity>
                                          );
                                      }
                                  }
                                  if (item.ext === "image") {
                                      if (item.type === "pop_up") {
                                          return (
                                              <Modal
                                                  isVisible={propsAll.videoModal}
                                                  animationIn="slideInDown"
                                                  animationOut="slideOutUp"
                                                  testID="modal"
                                                  swipeDirection="down"
                                                  backdropColor={"rgba(250, 250, 250, 0.5)"}
                                                  backdropOpacity={1}
                                                  onSwipeComplete={() => {
                                                      propsAll.modalFuncVideo(false);
                                                  }}
                                                  onBackButtonPress={() => {
                                                      propsAll.modalFuncVideo(false);
                                                  }}>
                                                  <View style={styles.modalContainer}>
                                                      <View style={styles.back_button_View}>
                                                          <TouchableOpacity onPress={() => {
                                                              propsAll.modalFuncVideo(false);
                                                          }}>
                                                              <Image source={require("../../assets/image/delete.png")}
                                                                     style={styles.back_button}/>
                                                          </TouchableOpacity>
                                                      </View>
                                                      <TouchableOpacity onPress={() => linkingFunc(item.web_link)}>
                                                          <Image source={{uri: item.image}}
                                                                 style={{
                                                                     width: windowWidth,
                                                                     height: 100,
                                                                     resizeMode: "contain",
                                                                 }}/>
                                                      </TouchableOpacity>
                                                  </View>
                                              </Modal>
                                          );
                                      } else if (item.type == "square" || item.type == "rectangular") {
                                          return (
                                              <TouchableOpacity onPress={() => linkingFunc(item.web_link)}
                                                                style={{alignItems: "center",}}>
                                                  <Image source={{uri: item.image}}
                                                         style={{
                                                             width: item.type === "square" ? 150 : windowWidth,
                                                             height: item.type === "square" ? 100 : windowWidth / 1.5,
                                                             resizeMode: "contain",
                                                         }}/>
                                              </TouchableOpacity>
                                          );
                                      }
                                  }
                                  if (item.ext == "gif") {
                                      if (item.type == "pop_up") {
                                          return (
                                              <Modal
                                                  isVisible={propsAll.videoModal}
                                                  animationIn="slideInDown"
                                                  animationOut="slideOutUp"
                                                  testID={"modal"}
                                                  swipeDirection="down"
                                                  backdropColor={"rgba(250, 250, 250, 0.5)"}
                                                  backdropOpacity={1}
                                                  onSwipeComplete={() => {
                                                      propsAll.modalFuncVideo(false);
                                                  }}
                                                  onBackButtonPress={() => {
                                                      propsAll.modalFuncVideo(false);
                                                  }}>
                                                  <View style={styles.modalContainerImage}>
                                                      <View style={styles.back_button_View}>
                                                          <TouchableOpacity onPress={() => {
                                                              propsAll.modalFuncVideo(false);
                                                          }}>
                                                              <Image source={require("../../assets/image/delete.png")}
                                                                     style={styles.back_button}/>
                                                          </TouchableOpacity>
                                                      </View>
                                                      <TouchableOpacity onPress={() => linkingFunc(item.web_link)}>
                                                          <Image source={{uri: item.image}}
                                                                 style={{
                                                                     width: windowWidth,
                                                                     height: 100,
                                                                     resizeMode: "contain",
                                                                 }}/>
                                                      </TouchableOpacity>
                                                  </View>
                                              </Modal>
                                          );
                                      } else if (item.type == "square" || item.type == "rectangular") {
                                          return (
                                              <TouchableOpacity onPress={() => linkingFunc(item.web_link)}
                                                                style={{alignItems: "center", borderWidth: 1}}>
                                                  <Image source={{uri: item.image}}
                                                         style={{
                                                             width: item.type === "square" ? 150 : windowWidth - 65,
                                                             height: 150,
                                                         }}/>
                                              </TouchableOpacity>
                                          );
                                      }
                                  }
                              }
                          }}/>
            </View>
        );
    };

    const linkingFunc = async (uri) => {
        if (uri) {
            const supported = await Linking.canOpenURL(uri);
            await Linking.openURL(uri);
        }
    };

    return (<>
        <FlatList data={propsAll.dataPost} renderItem={renderFlatlist} />
        <ModalReport
            visibleModal={visibleModal}
            modalFunc={modalFuncReport}
            reportIndex={reportIndex}
            setReportIndex={setReportIndex}
        />
        <Modal
            isVisible={propsAll.imageModal}
            testID={"modal"}
            backdropColor={"rgba(0, 0, 0, 0.3)"}
            statusBarTranslucent={true}
            enableSwipeDown={true}
            style={{margin: 0}}
            transparent={true}
            backdropOpacity={1}>
            <View style={[{
                padding: 0,
                flex: 1,
            }]}>
                <View style={styles.back_button_View}>
                    <TouchableOpacity onPress={() => {
                        propsAll.imageFunc(false);
                    }}>
                        <Image source={require("../../assets/image/delete.png")}
                               style={styles.back_button}/>
                    </TouchableOpacity>
                </View>
                <View style={{alignItems: "center", justifyContent: "center", flex: 1}}>
                    <Animated.FlatList
                        data={propsAll.dataAnimated}
                        ref={propsAll.songSlider}
                        renderItem={propsAll.renderSongsAll}
                        keyExtractor={(item, index) => {
                            return  index.toString();
                        }}
                        horizontal
                        pagingEnabled
                        showsHorizontalScrollIndicator={false}
                        scrollEventThrottle={16}
                        onScroll={Animated.event(
                            [{
                                nativeEvent: {contentOffset: {x: propsAll.scrollX}},
                            }],
                            {useNativeDriver: false},
                        )}/>
                </View>
            </View>
        </Modal>
    </>);
}

const styles = StyleSheet.create({
    mapAllView: {
        marginHorizontal: 35,
        paddingHorizontal: 5,
        marginVertical: 8,
        shadowColor: "gray",
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.20,
        shadowRadius: 1.41,
        elevation: 2,
    },
    ProfileView: {
        flexDirection: "row",
        alignItems: "center",
        width: 150,
    },
    nameText: {
        fontSize: 15,
        color: "#136A8A",
        marginLeft: 7,
        fontWeight: "bold",
    },
    dayText: {
        color: "#595959",
        marginLeft: 7,
        fontFamily: "OpenSans-Regular",
        fontSize: 12,
    },
    modalContainer: {
        width: "100%",
        backgroundColor: "white",
        borderRadius: 20,
        height: 300,
    },
    modalContainerImage: {
        width: "100%",
        backgroundColor: "white",
        borderRadius: 20,
        height: 300,
    },
    back_button: {
        marginRight: 10,
        marginTop: 50,
        width: 30,
        height: 30,
    },
    back_button_View: {
        alignItems: "flex-end",
        marginRight: 0,
        marginTop: 10,
    },
    FoodStarBucks: {
        color: "black",
        fontWeight: "bold",
        fontSize: 12,
        marginRight: 22,
        marginVertical: 3,
    },
    status: {
        color: "#000000",
        fontFamily: "OpenSans-Regular",
    },
    likesCommentView: {
        flexDirection: "row",
        justifyContent: "space-between",
    },
    likesView: {
        flexDirection: "row",
        alignItems: "center",
    },
    likesText: {
        color: "#000000",
        fontSize: 12,
        marginLeft: 12,
        fontFamily: "OpenSans-Regular",
    },
    commentText: {
        color: "#000000",
        fontFamily: "OpenSans-Regular",
        marginRight: 5,
    },
    imgEclips: {
        width: 50,
        height: 50,
        borderRadius: 100,
    },
    starView: {
        flex: 1,
        alignItems: "flex-start",
    },
    starStyle: {
        marginBottom: 7.5,
        marginHorizontal: 3.5,
    },
    viewProfile: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
    },
    report_touch: {
        borderWidth: 1,
        borderColor: "gray",
        borderRadius: 5,
    },
    report_text: {
        fontSize: 10,
        padding: 2,
    },
});
