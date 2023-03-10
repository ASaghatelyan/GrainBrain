import React, { useEffect, useRef, useState } from "react";
import {
  Text,
  View,
  ScrollView,
  Image,
  StatusBar,
  TouchableOpacity,
  TextInput,
  Platform,
  KeyboardAvoidingView,
} from "react-native";
import { styles } from "../../style/CreatePostReviewStyles";
import StarRating from "react-native-star-rating";
import Input from "../../component/input/Input";
import Button from "../../component/button/Button";
import axiosInstance from "../../networking/axiosinstance";
import Loading from "../../component/loading/Loading";
import ModalCamera from "../../component/modalCamera/ModalCamera";
import Carousel from "react-native-snap-carousel";
import SelectDropdown from "react-native-select-dropdown";

export default function CreatePostReview(props) {

  const [ratingStar, setRatingStar] = useState(0);
  const [ratingStarState, setRatingStarState] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState("Category");
  const [title, setTitle] = useState("");
  const [location, setLocation] = useState("");
  const [description, setDescription] = useState("");
  const [titleText, setTitleText] = useState("");
  const [pickText, setPickText] = useState("");
  const [dataCategories, setDataCategories] = useState([]);
  const [locationText, setLocationText] = useState("");
  const [visible, setVisible] = useState(false);
  const [modalCamera, setModalCamera] = useState(false);
  const [idCategory, setIdCategory] = useState("");
  const [activePage, setActivePage] = useState(0);
  const [photo, setPhoto] = useState(null);
  const [cameraImage, setCameraImage] = useState(null);
  const [openInput, setOpenInput] = useState("");
  const [openTwoInput, setOpenTwoInput] = useState("");
  const [openInputText, setOpenInputText] = useState("");
  const [openTwoInputText, setOpenTwoInputText] = useState("");
  let carouselRef = useRef(null);

  const cameraImageFunc = (item) => {
    setPhoto(null);
    setCameraImage([{ path: item }]);
  };

  const photoFunc = (item) => {
    setCameraImage(null);
    setPhoto(item);
    setModalCamera(false);
  };

  const onPressModal = (item) => {
    setModalCamera(item);
  };

  useEffect(() => {
    category();
  }, []);

  const setValidate = () => {
    if (selectedLanguage !== "Category") {
      if (selectedLanguage == "Machine/Implement" || selectedLanguage == "Inputs/Materials" || selectedLanguage == "Machinery" || selectedLanguage == "Materials/Inputs") {
        if (openInput.length && openTwoInput.length && ratingStar) {
          handle();
        }
      } else if (selectedLanguage != "Machine/Implement" || selectedLanguage != "Inputs/Materials" || selectedLanguage != "Machinery" || selectedLanguage != "Materials/Inputs") {
        if (title.length >= 3 && ratingStar) {
          handle();

        }
      }
    }
    if (selectedLanguage == "Machinery" || selectedLanguage == "Machine/Implement" && !openInput.length) {
      setOpenInputText("The Make you’ve entered is incorrect.");
    }
    if (selectedLanguage == "Machinery" || selectedLanguage == "Machine/Implement" && !openTwoInput.length) {
      setOpenTwoInputText("The Model you’ve entered is incorrect.");
    }
    if (selectedLanguage == "Materials/Inputs" || selectedLanguage == "Inputs/Materials" && !openInput.length) {
      setOpenInputText("The Brand you’ve entered is incorrect.");
    }
    if (selectedLanguage == "Materials/Inputs" || selectedLanguage == "Inputs/Materials" && !openTwoInput.length) {
      setOpenTwoInputText("The Product Name... you’ve entered is incorrect.");
    }
    if (selectedLanguage === "Category") {
      setPickText("The category you’ve entered is incorrect.");
    }
    if (!ratingStar) {
      setRatingStarState(true);
    }
    if (selectedLanguage != "Machine/Implement" || selectedLanguage != "Machinery" || selectedLanguage != "Inputs/Materials" || selectedLanguage != "Materials/Inputs") {
      if (title.length < 3) {
        setTitleText("The title you’ve entered is incorrect.");
      }
    }
  };

  const d = new Date();
  const handle = async () => {
    setVisible(true);
    try {
      const formData = new FormData();
      formData.append("location", location ? location : "");
      formData.append(selectedLanguage == "Machine/Implement" || selectedLanguage == "Machinery" ? "make" : "brand", openInput ? openInput : "");
      formData.append(selectedLanguage == "Machine/Implement" || selectedLanguage == "Machinery" ? "model" : "product_name", openTwoInput ? openTwoInput : "");
      formData.append("description", description ? description : "");
      formData.append("title", title ? title : "");
      if (cameraImage) {
        cameraImage.map(data => {
          formData.append("image[]", {
            name: `${d.getTime()}_name.jpg`,
            uri: data.path ? data.path : data,
            type: "image/jpeg",
          });
        });
      } else if (photo) {
        photo.map(data => {
          formData.append("image[]", {
            name: `${d.getTime()}_name.jpg`,
            uri: data.path ? data.path : data,
            type: "image/jpeg",
          });
        });
      }
      formData.append("category_id", idCategory);
      formData.append("stars", ratingStar);
      const response = await axiosInstance.post("/post/createPost", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      props.navigation.reset({
        index: 0,
        routes: [{ name: "homePageNavigation" }],
      });
      setVisible(false);
    } catch (e) {
      console.log(e, e.response);
      setVisible(false);
    }
  };

  const category = async () => {
    try {
      const response = await axiosInstance.get("/post/getCategories");
      setDataCategories(response.data);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    if (selectedLanguage == "Machine/Implement" || selectedLanguage == "Inputs/Materials" || selectedLanguage == "Machinery" || selectedLanguage == "Materials/Inputs") {
      setTitleText("");
      setTitle("");
      setOpenTwoInputText("");
      setOpenInputText("");
      setOpenInput("");
      setOpenTwoInput("");
    }
  }, [selectedLanguage]);

  const deleteFunctionArrImage = (indexImage) => {
    carouselRef.snapToItem(0);
    if (carouselRef.currentIndex == indexImage - 1) {
      const arr = photo;
      arr.splice(carouselRef.currentIndex, 1);
      photoFunc([...arr]);
      if (!Object.keys(arr).length) {
        photoFunc(["https://app.grain-brain.ca/image/nobackground.png"]);
      }
    } else {
      let arr = photo;
      arr.splice(carouselRef.currentIndex, 1);
      photoFunc([...arr]);
      if (!Object.keys(arr).length) {
        photoFunc(["https://app.grain-brain.ca/image/nobackground.png"]);
      }
    }
  };

  const deleteFunctionImage = () => {
    cameraImageFunc("https://app.grain-brain.ca/image/nobackground.png");
  };

  const _renderItem = ({ item }) => {
    return (
      <TouchableOpacity
        style={styles.cameraView}
        onPress={() => {
          onPressModal(true);
        }}>
        <Image source={{ uri: `${item.path ? item.path : item}` }} style={styles.galeriaPhoto} />
      </TouchableOpacity>
    );
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={{ flex: 1 }}
    >
      <ScrollView style={styles.ScroolViewPost} showsVerticalScrollIndicator={false}>
        <StatusBar backgroundColor={"rgb(250, 250, 250)"} barStyle={"dark-content"} />
        <View style={styles.allView}>
          <View style={styles.PostView}>
            <Text style={styles.post_text}>Post</Text>
            <View style={styles.linePost} />
            <View style={styles.starView}>
              <StarRating
                disabled={false}
                maxStars={5}
                rating={ratingStar}
                selectedStar={(rating) => {
                  setRatingStarState(false);
                  setRatingStar(rating);
                }}
                fullStar={require("../../assets/image/star.png")}
                starStyle={styles.starStyle}
                emptyStar={require("../../assets/image/starNone.png")}
                starSize={20}
              />
              {ratingStarState && (
                <Text style={styles.validateTExt}>Please rate!</Text>
              )}
            </View>
          </View>
          {
            photo ?
              <View>
                <View style={styles.deleteView}>
                  <TouchableOpacity
                    onPress={() => {
                      deleteFunctionArrImage(activePage);
                    }}
                    style={styles.deleteButton}>
                    <Image source={require("../../assets/image/close.png")}
                           style={{ width: 25, height: 25 }} />
                  </TouchableOpacity>
                </View>
                <Carousel
                  ref={(c) => {
                    carouselRef = c;
                  }}
                  onSnapToItem={(index) => {
                    setActivePage(index);
                  }}
                  data={photo}
                  renderItem={_renderItem}
                  sliderWidth={300}
                  itemWidth={300}
                  inactiveSlideShift={50}
                  useScrollView
                  inactiveSlideScale={1}
                  inactiveSlideOpacity={1}
                  enableMomentum
                  showsHorizontalScrollIndicator={false}
                  snapOnAndroid
                  removeClippedSubviews={false}
                  decelerationRate={"fast"}
                  renderToHardwareTextureAndroid
                />
              </View>
              :
              cameraImage ?
                <View>
                  <View style={styles.deleteView}>
                    <TouchableOpacity
                      onPress={() => {
                        deleteFunctionImage(activePage);
                      }}
                      style={styles.deleteButton}>
                      <Image source={require("../../assets/image/close.png")}
                             style={{ width: 25, height: 25 }} />
                    </TouchableOpacity>
                  </View>
                  <Carousel
                    ref={(c) => {
                      carouselRef = c;
                    }}
                    onSnapToItem={(index) => {
                      setActivePage(index);
                    }}
                    data={cameraImage}
                    renderItem={_renderItem}
                    sliderWidth={300}
                    itemWidth={300}
                    inactiveSlideShift={50}
                    useScrollView={true}
                  />
                </View>
                :
                <TouchableOpacity
                  style={styles.cameraView}
                  onPress={() => {
                    onPressModal(true);
                  }}>
                  <Image source={require("../../assets/image/Camera.png")} style={styles.camera} />
                  <Text style={styles.choosephotoText}>CHOOSE PHOTO</Text>
                </TouchableOpacity>
          }
          <SelectDropdown
            data={dataCategories}
            buttonStyle={{
              width: "100%",
              backgroundColor: "#F8F8F8",
              borderWidth: 1,
              borderRadius: 6,
              borderColor: pickText ? "red" : "#EEEEEE",
              color: "#A8A2AC",
            }}
            dropdownStyle={styles.categoryInput}
            defaultButtonText={"Category"}
            rowTextStyle={styles.choosephotoText}
            onSelect={(selectedItem) => {
              setSelectedLanguage(selectedItem.name);
              setIdCategory(selectedItem.id);
              setPickText("");
            }}
            buttonTextAfterSelection={(selectedItem) => {
              if (selectedItem.name == "Machine/Implement" || selectedItem.name == "Machinery") {
                return selectedItem.name = "Machine/Implement";
              } else if (selectedItem.name == "Inputs/Materials" || selectedItem.name == "Materials/Inputs") {
                return selectedItem.name = "Inputs/Materials";
              } else {
                return selectedItem.name;
              }
            }}
            rowTextForSelection={(selectedItem) => {
              if (selectedItem.name == "Machine/Implement" || selectedItem.name == "Machinery") {
                return selectedItem.name = "Machine/Implement";
              } else if (selectedItem.name == "Inputs/Materials" || selectedItem.name == "Materials/Inputs") {
                return selectedItem.name = "Inputs/Materials";
              } else {
                return selectedItem.name;
              }
            }} />
          <Text style={styles.validateTExt}>{pickText}</Text>
          {
            selectedLanguage == "Machine/Implement" || selectedLanguage == "Inputs/Materials" || selectedLanguage == "Machinery" || selectedLanguage == "Materials/Inputs" ?
              <View>
                <Input
                  placeholder={selectedLanguage == "Machine/Implement" || selectedLanguage == "Machinery" ? "Make..." : "Brand..."}
                  borderColor={openInputText ? "red" : "#EEEEEE"}
                  backgroundColor={"#F8F8F8"}
                  onChangeText={(evt) => {
                    setOpenInput(evt);
                    setOpenInputText("");
                  }} />
                <Text style={styles.validateTExt}>{openInputText}</Text>
                <Input
                  placeholder={selectedLanguage == "Machine/Implement" || selectedLanguage == "Machinery" ? "Model..." : "Product name..."}
                  borderColor={openTwoInputText ? "red" : "#EEEEEE"}
                  backgroundColor={"#F8F8F8"}
                  onChangeText={(evt) => {
                    setOpenTwoInputText("");
                    setOpenTwoInput(evt);
                  }} />
                <Text style={styles.validateTExt}>{openTwoInputText}</Text>
              </View>
              :
              null
          }
          {
            selectedLanguage == "Machine/Implement" || selectedLanguage == "Inputs/Materials" || selectedLanguage == "Machinery" || selectedLanguage == "Materials/Inputs" ?
              null
              :
              <View>
                <Input
                  placeholder={"What are you wanting to review..."}
                  borderColor={titleText ? "red" : "#EEEEEE"}
                  backgroundColor={"#F8F8F8"}
                  onChangeText={(evt) => {
                    setTitle(evt);
                    setTitleText("");
                  }} />
                <Text style={styles.validateTExt}>{titleText}</Text>
              </View>
          }
          <Input
            placeholder={"Location"}
            borderColor={"#EEEEEE"}
            backgroundColor={"#F8F8F8"}
            marginBottom={16}
            onChangeText={(evt) => {
              setLocation(evt);
              setLocationText("");
            }} />
          <Text>{locationText}</Text>
          <TextInput
            textAlignVertical={"top"}
            multiline={true}
            placeholder="Tell us about it.."
            numberOfLines={10}
            style={{
              borderWidth: 1,
              borderRadius: 4,
              paddingLeft: 16,
              fontFamily: "OpenSans-Regular",
              fontSize: 12,
              color: "black",
              height: 100,
              borderColor: "#EEEEEE",
            }}
            onChangeText={(evt) => {
              setDescription(evt);
            }} />
          <Button
            title={"POST"}
            color={"#FFFFFF"}
            backgroundColor={"#569690"}
            fontWeight={"bold"}
            marginBottom={18}
            marginTop={75}
            onPress={() => {
              setValidate();
            }} />
        </View>
        <ModalCamera
          visible={modalCamera}
          onPressModal={onPressModal}
          cameraImageFunc={cameraImageFunc}
          photoFunc={photoFunc}
        />
        <Loading loading={visible} />
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
