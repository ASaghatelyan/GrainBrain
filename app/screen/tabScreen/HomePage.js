import React, { createContext, useEffect, useState, useRef, useMemo } from "react";
import {
  View,
  ScrollView,
  StatusBar,
  Dimensions,
  SafeAreaView,
  Text,
  TouchableOpacity,
  Animated,
  Platform, Image, Linking,
} from "react-native";
import { styles } from "../../style/HomePageStyles";
import InputBlue from "../../component/inputBlue/InputBlue";
import { DataProfileFunc, SearchUserFunc } from "../../component/data/Data";
import axiosInstance from "../../networking/axiosinstance";
import Loading from "../../component/loading/Loading";
import axiosinstance from "../../networking/axiosinstance";
import { useSelector } from "react-redux";
import LikeModal from "../../component/likeModal/LikeModal";
import VideoPlayer from "react-native-video-player";
import Axiosinstance from "../../networking/axiosinstance";
import Modal from "react-native-modal";
import FastImage from "react-native-fast-image";


export const ContextHomePage = createContext();
export const Context = createContext();

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;
const Width = Dimensions.get("window").width;


export default function HomePage(props) {

  const [searchDataUser, setSearchDataUser] = useState([]);
  const [searchDataPost, setSearchDataPost] = useState([]);
  const [state, setState] = useState(false);
  const [dataPost, setDataPost] = useState([]);
  const [visible, setVisible] = useState(false);
  const [likeData, setLikeData] = useState(null);
  const [searchText, setSearchText] = useState("");
  const [modalState, setModalState] = useState(false);
  const [dataLike, setDataLike] = useState([]);
  const [videoModal, setVideoModal] = useState(false);
  const [lazy, setLazy] = useState(false);
  let [index, setIndex] = useState(0);
  const advertisement = useRef([]);
  const songSlider = useRef(null);
  const modalFunc = (state) => setModalState(state);
  const modalFuncVideo = (state) => setVideoModal(state);
  const my = useSelector((state) => state.customer);
  const likeDataFunc = (val) => setLikeData([...val]);
  const [imageModal, setImageModal] = useState(false);
  const [dataAnimated, setDataAnimated] = useState([]);
  let scrollX = useRef(new Animated.Value(0)).current;
  const [dataCategories, setDataCategories] = useState([]);
  const [dataCategoriesState, setDataCategoriesState] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState("Category");
  const [idCategory, setIdCategory] = useState("");
  const categoriesDataFunc = () => {
    setDataCategoriesState(!dataCategoriesState);
  };
  const selectFunc = (item, id) => {
    setSelectedLanguage(item);
    setIdCategory(id);
  };

  useEffect(() => {
    scrollX.addListener(({ value }) => setIndex(Math.round(value / Width)));
    return () => scrollX.removeAllListeners();
  }, []);

  const lazyFunc = () => {
    setLazy(!lazy);
  };

  const imageFunc = (val) => {
    setImageModal(val);
  };

  const imageAnimatedDataFunc = (val) => {
    setDataAnimated([...val]);
  };

  const funcModalLike = (likeArr) => {
    setDataLike([...likeArr]);
    setModalState(true);
  };

  const likedFuncIndex = async (val, postId, userId, Liked) => {
    if (!Liked) {
      try {
        const data = {
          id: postId,
          user_id: userId,
        };
        const response = await axiosinstance.post(`/post/postLike`, data);
        if (searchText) {
          const arr = searchDataPost;
          arr[val].iLiked = !arr[val].iLiked;
          arr[val].likedUsers.push(my);
          setSearchDataPost([...arr]);
        } else {
          const arr = dataPost;
          arr[val].iLiked = !arr[val].iLiked;
          arr[val].likedUsers.push(my);
          setDataPost([...arr]);
        }
      } catch (e) {
        console.log(e);
      }
    } else if (Liked) {
      try {
        const data = {
          id: postId,
          user_id: userId,
        };
        const response = await axiosinstance.post(`/post/postLike/dislike`, data);
        if (searchText) {
          const arr = searchDataPost;
          arr[val].iLiked = !arr[val].iLiked;
          let fill = arr[val].likedUsers.filter((item) => item.id !== my.id);
          arr[val].likedUsers = fill;
          setSearchDataPost([...arr]);
        } else {
          const arr = dataPost;
          arr[val].iLiked = !arr[val].iLiked;
          let fill = arr[val].likedUsers.filter((item) => item.id !== my.id);
          arr[val].likedUsers = fill;
          setDataPost([...arr]);
        }
      } catch (e) {
        console.log(e);
      }
    }
  };

  const category = async () => {
    try {
      const response = await axiosInstance.get("/post/getCategories");
      const arr = response.data;
      arr.push({
        name: "All Posts",
      });
      setDataCategories(response.data);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    advertisementFunc();
    category();
    modalFuncVideo(true);
  }, []);


  const advertisementFunc = async () => {
    try {
      const response = await Axiosinstance.get("/ads");
      advertisement.current = response.data.message;

    } catch (e) {
      console.log(e.response);
    }
  };

  useEffect(() => {
    const unsubscribe = props.navigation.addListener("focus", () => {
      userPost();
    });
    return unsubscribe;
  }, [props.navigation]);

  let renderSongs = ((item) => {
    const imagew = Width * 0.7;
    const imageH = imagew * .6;

    return (
      <Animated.View key={item.item} style={{
        width: windowWidth,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 2,
      }}>
        <View style={{
          height: 180,
          width: "90%",
        }}>
          <FastImage
            source={{
              uri: `${item.item}`,
              priority: FastImage.priority.normal,
              headers: { Authorization: "someAuthToken" },
            }}
            style={[styles.imgeclips, { width: imagew, height: imageH }]} />
        </View>
      </Animated.View>
    );
  });
  const funcAds = (item) => {
    if (+item.after_post == props.index) {
      if (item.ext == "video") {
        if (item.type == "pop_up") {
          return (
            <Modal
              isVisible={videoModal}
              animationIn="slideInDown"
              animationOut="slideOutUp"
              testID={"modal"}
              swipeDirection="down"
              backdropColor={"rgba(250, 250, 250, 0.5)"}
              backdropOpacity={1}
              onSwipeComplete={() => {
                modalFuncVideo(false);
              }}
              onBackButtonPress={() => {
                modalFuncVideo(false);
              }}>
              <View style={styles.modalContainer}>
                <View style={styles.back_button_View}>
                  <TouchableOpacity onPress={() => {
                    modalFuncVideo(false);
                  }}>
                    <Image source={require("../../assets/image/delete.png")}
                           style={styles.back_button} />
                  </TouchableOpacity>
                </View>
                <TouchableOpacity onPress={() => linkingFunc(item.web_link)}>
                  <VideoPlayer
                    video={{ uri: item.image }}
                    videoWidth={1600}
                    videoHeight={900}
                    thumbnail={{ uri: item.uri }}
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
                video={{ uri: item.image }}
                videoWidth={1600}
                videoHeight={900}
                thumbnail={{ uri: item.uri }}
              />
            </TouchableOpacity>
          );
        }
      }
      if (item.ext == "image") {
        if (item.type == "pop_up") {
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
                modalFuncVideo(false);
              }}
              onBackButtonPress={() => {
                modalFuncVideo(false);
              }}>
              <View style={styles.modalContainer}>
                <View style={styles.back_button_View}>
                  <TouchableOpacity onPress={() => {
                    modalFuncVideo(false);
                  }}>
                    <Image source={require("../../assets/image/delete.png")}
                           style={styles.back_button} />
                  </TouchableOpacity>
                </View>
                <TouchableOpacity onPress={() => linkingFunc(item.web_link)}>
                  <Image source={{ uri: item.image }}
                         style={{
                           width: windowWidth,
                           height: 100,
                           resizeMode: "contain",
                         }} />
                </TouchableOpacity>
              </View>
            </Modal>
          );
        } else if (item.type == "square" || item.type == "rectangular") {
          return (
            <TouchableOpacity onPress={() => linkingFunc(item.web_link)}
                              style={{ alignItems: "center" }}>
              <Image source={{ uri: item.image }}
                     style={{
                       width: item.type == "square" ? 150 : windowWidth,
                       height: item.type == "square" ? 100 : windowWidth / 1.5,
                       resizeMode: "contain",
                     }} />
            </TouchableOpacity>
          );
        }
      }
      if (item.ext == "gif") {
        if (item.type == "pop_up") {
          return (
            <Modal
              isVisible={videoModal}
              animationIn="slideInDown"
              animationOut="slideOutUp"
              testID={"modal"}
              swipeDirection="down"
              backdropColor={"rgba(250, 250, 250, 0.5)"}
              backdropOpacity={1}
              onSwipeComplete={() => {
                modalFuncVideo(false);
              }}
              onBackButtonPress={() => {
                modalFuncVideo(false);
              }}>
              <View style={styles.modalContainerImage}>
                <View style={styles.back_button_View}>
                  <TouchableOpacity onPress={() => {
                    modalFuncVideo(false);
                  }}>
                    <Image source={require("../../assets/image/delete.png")}
                           style={styles.back_button} />
                  </TouchableOpacity>
                </View>
                <TouchableOpacity onPress={() => linkingFunc(item.web_link)}>
                  <Image source={{ uri: item.image }}
                         style={{
                           width: windowWidth,
                           height: 100,
                           resizeMode: "contain",
                         }} />
                </TouchableOpacity>
              </View>
            </Modal>
          );
        } else if (item.type == "square" || item.type == "rectangular") {
          return (
            <TouchableOpacity onPress={() => linkingFunc(item.web_link)}
                              style={{ alignItems: "center" }}>
              <Image source={{ uri: item.image }}
                     style={{
                       width: item.type === "square" ? 150 : windowWidth - 65,
                       height: 150,
                     }} />
            </TouchableOpacity>
          );
        }
      }
    }
  };
  const linkingFunc = async (uri) => {
    if (uri) {
      const supported = await Linking.canOpenURL(uri);
      await Linking.openURL(uri);
    }
  };

  const handle = async (text, state1) => {
    setSearchText(text);
    if (state1) {
      if (text) {
        setVisible(true);
        if (text === "All Posts") {
          setSelectedLanguage("Category");
          setVisible(false);
          setState(false);
          setSearchDataPost([]);
          setSearchDataUser([]);
        } else {
          try {
            setState(true);
            const data = {
              "category": text,
            };
            const response = await Axiosinstance.post("/search/category", data);
            setSearchDataUser([]);
            setSearchDataPost(response.data.message.category[0].post);
            setVisible(false);
          } catch (e) {
            setVisible(false);
            console.log(e);
          }
        }
      } else if (!text) {
        setState(false);
        setVisible(false);
      } else {
        setState(false);
        setVisible(false);
      }
    } else {
      if (text) {
        setVisible(true);
        try {
          setState(true);
          const data = {
            "word": text,
          };
          console.log("d");
          const response = await axiosInstance.post(`search`, data);
          console.log(data);
          console.log(response);
          setSearchDataUser(response.data.message.user);
          setSearchDataPost(response.data.message.more);
          setVisible(false);
        } catch (e) {
          console.log(e.response, "ff");
          setVisible(false);
        }
      } else if (!text) {
        setState(false);
        setVisible(false);
      } else {
        setState(false);
        setVisible(false);
      }
    }

  };
  const userPost = async () => {
    try {
      const response = await axiosInstance.get(`timeLine`);
      setDataPost([...response.data.message]);
      setVisible(false);
    } catch (e) {
      console.log(e);
      setVisible(false);
      console.log(e, "1");
    }
  };

  let renderSongsAll = ((item) => {
    const width = windowWidth;
    const height = windowWidth / 1.5;

    return (
      <Animated.View style={{
        alignItems: "center",
        justifyContent: "center",
      }}>
        <FastImage
          key={item.item}
          source={{
            uri: `${item.item}`,
            priority: FastImage.priority.normal,
            headers: { Authorization: "someAuthToken" },
          }}
          resizeMode={Platform.OS == "ios" ? FastImage.resizeMode.contain : FastImage.resizeMode.center}
          style={[{ width: width, height: "100%" }]}
        />
      </Animated.View>
    );
  });

  return (
    <ContextHomePage.Provider value={props}>
      <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
        <View style={{ flex: 1, height: windowHeight }}>
          <StatusBar backgroundColor={"rgb(250, 250, 250)"} barStyle={"dark-content"} />
          <InputBlue
            selectFunc={selectFunc}
            categoriesDataFunc={categoriesDataFunc}
            dataCategoriesState={dataCategoriesState}
            handle={handle}
            selectedLanguage={selectedLanguage}
            state={true}
            dataCategories={dataCategories} />
          {state ?
            <View style={styles.dataMapView}>
              <SearchUserFunc
                searchDataPost={searchDataPost}
                searchDataUser={searchDataUser}
                renderSongsAll={renderSongsAll}
                imageModal={imageModal}
                dataAnimated={dataAnimated}
                likeData={likeData}
                songSlider={songSlider}
                likeDataFunc={likeDataFunc}
                imageAnimatedDataFunc={imageAnimatedDataFunc}
                propsNavigation={props.navigation}
                likedFuncIndex={likedFuncIndex}
                funcModalLike={funcModalLike}
                renderSongs={renderSongs}
                scrollX={scrollX}
                imageFunc={imageFunc}
              />
            </View>
            :
            <View style={styles.dataMapView}>
              <DataProfileFunc
                renderSongsAll={renderSongsAll}
                songSlider={songSlider}
                likeData={likeData}
                dataPost={dataPost}
                scrollX={scrollX}
                renderSongs={renderSongs}
                likeDataFunc={likeDataFunc}
                propsNavigation={props.navigation}
                likedFuncIndex={likedFuncIndex}
                funcModalLike={funcModalLike}
                adver={advertisement.current}
                modalFuncVideo={modalFuncVideo}
                videoModal={videoModal}
                lazyFunc={lazyFunc}
                lazy={lazy}
                imageFunc={imageFunc}
                imageModal={imageModal}
                imageAnimatedDataFunc={imageAnimatedDataFunc}
                dataAnimated={dataAnimated}
                funcAds={funcAds}
              />

            </View>}
          <Loading loading={visible} />
          <LikeModal
            visible={modalState}
            modalFunc={modalFunc}
            likesArr={dataLike}
            propsNavigation={props.navigation}
          />
        </View>
      </SafeAreaView>
    </ContextHomePage.Provider>
  );
}
