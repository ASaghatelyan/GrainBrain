import React, {useEffect, useRef, useState} from "react";
import {Image, ScrollView, StatusBar, Text, TouchableOpacity, View} from "react-native";
import {styles} from "../../style/editUserStyles";
import StarRating from "react-native-star-rating";
import Input from "../../component/input/Input";
import Button from "../../component/button/Button";
import SelectDropdown from 'react-native-select-dropdown'
import axiosInstance from "../../networking/axiosinstance";
import Loading from "../../component/loading/Loading";
import ModalCamera from "../../component/modalCamera/ModalCamera";
import Carousel from "react-native-snap-carousel";

export default function EditPage(props) {

    const post = props.route.params;
    const [modalCamera, setModalCamera] = useState(false)
    const [UserRatingStar, setUserRatingStar] = useState(post.stars);
    const [userSelectedLanguage, setUserSelectedLanguage] = useState(post.category.name);
    const [userTitle, setUserTitle] = useState(post.title ? post.title : '');
    const [userLocation, setUserLocation] = useState(post.location);
    const [userDescription, setUserDescription] = useState(post.description);
    const [userTitleText, setUserTitleText] = useState("");
    const [userLocationText, setUserLocationText] = useState("");
    const [userPickText, setUserPickText] = useState("");
    const [userDescriptionText, setUserDescriptionText] = useState("");
    const [categoriesData, setCategoriesData] = useState([]);
    const [selected, setSelected] = useState(false)
    const [photo, setPhoto] = useState(post.image ? [...post.image] : null);
    const [idCategory, setIdCategory] = useState(post.category.id)
    const [cameraImage, setCameraImage] = useState(null)
    const [activePage, setActivePage] = useState(0)
    const [openInput, setOpenInput] = useState(post.make ? post.make : '')
    const [openTwoInput, setOpenTwoInput] = useState(post.model ? post.model : '')
    const [openInputText, setOpenInputText] = useState('')
    const [openTwoInputText, setOpenTwoInputText] = useState('')
    let carouselRef = useRef();

    useEffect(() => {
        category()
        // setIdCategory(post.category.id)
    }, [])

    const cameraImageFunc = (item) => {
        setPhoto(null)
        setCameraImage([item])
    }

    const photoFunc = (item) => {
        setCameraImage(null)
        setPhoto(item)
        setModalCamera(false)
    }

    const onPressModal = (item) => {
        setModalCamera(item)
    }

    const category = async () => {
        setSelected(true)
        try {
            const response = await axiosInstance.get('/post/getCategories')
            setCategoriesData(response.data)
            setSelected(false)
        } catch (e) {
            setSelected(false)
        }
    }

    const deleteFunctionArrImage = (indexImage) => {
        carouselRef.snapToItem(0)
        if (carouselRef.currentIndex == indexImage - 1) {
            const arr = photo
            arr.splice(carouselRef.currentIndex, 1)
            photoFunc([...arr])
            if (!Object.keys(arr).length) {
                photoFunc(['https://app.grain-brain.ca/image/nobackground.png'])
            }
        } else {
            let arr = photo
            arr.splice(carouselRef.currentIndex, 1)
            photoFunc([...arr])
            if (!Object.keys(arr).length) {
                photoFunc(['https://app.grain-brain.ca/image/nobackground.png'])
            }
        }
    }

    const deleteFunctionImage = () => {
        cameraImageFunc('https://app.grain-brain.ca/image/nobackground.png')
    }

    const handle = async () => {
        setOpenInput('')
        setOpenTwoInput('')
        setSelected(true)
        try {
            const d = new Date()
            const formData = new FormData()
            if (cameraImage) {
                setPhoto(null)
                cameraImage.map(data => {
                    formData.append('image[]', {
                        name: `${d.getTime()}_name.jpg`,
                        uri: data,
                        type: 'image/jpeg'
                    })
                })
            } else if (photo) {
                setCameraImage(null)
                photo.map(data => {
                    formData.append('image[]', {
                        name: `${d.getTime()}_name.jpg`,
                        uri: data.path ? data.path : data,
                        type: 'image/jpeg'
                    })
                })
            }
            formData.append("title", userTitle ? userTitle : '')
            formData.append("description", userDescription ? userDescription : '')
            formData.append("location", userLocation ? userLocation : '')
            formData.append(userSelectedLanguage == 'Machine/Implement' || userSelectedLanguage == 'Machinery' ? "make" : 'brand', openInput ? openInput : '')
            formData.append(userSelectedLanguage == 'Machine/Implement' || userSelectedLanguage == 'Machinery' ? "model" : 'product_name', openTwoInput ? openTwoInput : '')
            formData.append("stars", UserRatingStar)
            formData.append("category_id", idCategory)
            formData.append("id", post.id)
            const response = await axiosInstance.post("/post/updatePost", formData, {
                headers: {
                    "Content-Type": "multipart/form-data"
                }
            })
            setSelected(false)
            props.navigation.navigate("user")
        } catch (e) {
            console.log(e.message)
            setSelected(false)
        }
    }

    useEffect(() => {
        if (userSelectedLanguage == 'Machine/Implement' || userSelectedLanguage == 'Inputs/Materials' || userSelectedLanguage == 'Machinery' || userSelectedLanguage == 'Materials/Inputs') {
            setUserTitleText('')
            setUserTitle('')
            setOpenTwoInputText('')
            setOpenInputText('')
            setOpenInput('')
            setOpenTwoInput('')
        }
    }, [userSelectedLanguage])

    const setValidate = async () => {
        if (userSelectedLanguage !== "Category") {
            if (userSelectedLanguage == 'Machine/Implement' || userSelectedLanguage == 'Inputs/Materials' || userSelectedLanguage == 'Machinery' || userSelectedLanguage == 'Materials/Inputs') {
                if (openInput.length >= 3 && openTwoInput.length >= 3) {
                    handle()
                }
            } else if (userSelectedLanguage != 'Machine/Implement' || userSelectedLanguage != 'Inputs/Materials' || userSelectedLanguage != 'Machinery' || userSelectedLanguage != 'Materials/Inputs') {
                if (userTitle.length >= 3) {
                    handle()
                }
            }
        }
        if (userSelectedLanguage != 'Machine/Implement' || userSelectedLanguage != 'Inputs/Materials' || userSelectedLanguage != 'Machinery' || userSelectedLanguage != 'Materials/Inputs') {
            if (userTitle.length < 3) {
                setUserTitleText("The title you’ve entered is incorrect.")
            }
        }
        if (userSelectedLanguage == 'Machine/Implement' || userSelectedLanguage == 'Machinery' && openInput.length < 3) {
            setOpenInputText('The Make you’ve entered is incorrect.')
        }
        if (userSelectedLanguage == 'Machine/Implement' || userSelectedLanguage == 'Machinery' && openTwoInput.length < 3) {
            setOpenTwoInputText('The Model you’ve entered is incorrect.')
        }
        if (userSelectedLanguage == 'Inputs/Materials' || userSelectedLanguage == 'Materials/Inputs' && openInput.length < 3) {
            setOpenInputText('The Brand you’ve entered is incorrect.')
        }
        if (userSelectedLanguage == 'Inputs/Materials' || userSelectedLanguage == 'Materials/Inputs' && openTwoInput.length < 3) {
            setOpenTwoInputText('The Product Name... you’ve entered is incorrect.')
        }
        if (userSelectedLanguage === "Category") {
            setUserPickText("The category you’ve entered is incorrect.")
        }
    }

    const _renderItem = ({item}) => {
        return (
            <TouchableOpacity
                style={styles.cameraView}
                onPress={() => {
                    onPressModal(true)
                }}>
                <Image source={{uri: `${item.path ? item.path : item}`}} style={styles.galeriaPhoto}/>
            </TouchableOpacity>
        );
    }

    return (
        <ScrollView style={styles.ScroolViewPost} showsVerticalScrollIndicator={false}>
            <StatusBar backgroundColor={"rgb(250, 250, 250)"} barStyle={"dark-content"}/>
            <TouchableOpacity onPress={() => {
                props.navigation.goBack()
            }}>
                <Image source={require("../../assets/image/back.png")} style={styles.backUser}/>
            </TouchableOpacity>
            <View style={styles.allView}>
                <View style={styles.PostView}>
                    <Image source={require("../../assets/image/postReview.png")} style={styles.postReviewImg}/>
                    <View style={styles.linePost}/>
                    <View style={styles.starView}>
                        <StarRating
                            disabled={false}
                            maxStars={5}
                            rating={UserRatingStar}
                            selectedStar={(rating) => setUserRatingStar(rating)}
                            fullStar={require('../../assets/image/star.png')}
                            starStyle={styles.starStyle}
                            emptyStar={require('../../assets/image/starNone.png')}
                            starSize={10}
                        />
                    </View>
                </View>
                {cameraImage ?
                    <View>
                        <View style={styles.deleteView}>
                            <TouchableOpacity
                                onPress={() => {
                                    deleteFunctionImage(activePage)
                                }}
                                style={styles.deleteButton}
                            >
                                <Image source={require('../../assets/image/close.png')}
                                       style={{width: 25, height: 25}}
                                />
                            </TouchableOpacity>
                        </View>
                        <Carousel
                            ref={(c) => {
                                carouselRef = c
                            }}
                            onSnapToItem={(index) => {
                                setActivePage(index)
                            }}
                            data={cameraImage}
                            renderItem={_renderItem}
                            sliderWidth={330}
                            itemWidth={300}
                            inactiveSlideShift={50}
                            useScrollView={true}
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
                    :
                    <View>
                        <View style={styles.deleteView}>
                            <TouchableOpacity
                                onPress={() => {
                                    deleteFunctionArrImage(activePage)
                                }}
                                style={styles.deleteButton}>
                                <Image source={require('../../assets/image/close.png')}
                                       style={{width: 25, height: 25}}/>
                            </TouchableOpacity>
                        </View>
                        <Carousel
                            ref={(c) => {
                                carouselRef = c
                            }}
                            onSnapToItem={(index) => {
                                setActivePage(index)
                            }}
                            data={photo}
                            renderItem={_renderItem}
                            sliderWidth={330}
                            itemWidth={300}
                        />
                    </View>
                }
                <SelectDropdown
                    data={categoriesData}
                    buttonStyle={{
                        width: '100%',
                        backgroundColor: "#F8F8F8",
                        borderWidth: 1,
                        borderRadius: 6,
                        borderColor: userPickText ? 'red' : "#EEEEEE",
                        color: '#A8A2AC'
                    }}
                    dropdownStyle={styles.categoryInput}
                    defaultButtonText={post.category.name}
                    rowTextStyle={styles.choosephotoText}
                    onSelect={(selectedItem) => {
                        setUserSelectedLanguage(selectedItem.name)
                        setIdCategory(selectedItem.id)
                        setUserPickText("")
                    }}
                    buttonTextAfterSelection={(selectedItem) => {
                        if (selectedItem.name == 'Machine/Implement' || selectedItem.name == "Machinery") {
                            return selectedItem.name = 'Machine/Implement'
                        } else if (selectedItem.name == 'Inputs/Materials' || selectedItem.name == 'Materials/Inputs') {
                            return selectedItem.name = 'Inputs/Materials'
                        } else {
                            return selectedItem.name
                        }
                    }}
                    rowTextForSelection={(selectedItem) => {
                        if (selectedItem.name == 'Machine/Implement' || selectedItem.name == "Machinery") {
                            return selectedItem.name = 'Machine/Implement'
                        } else if (selectedItem.name == 'Inputs/Materials' || selectedItem.name == 'Materials/Inputs') {
                            return selectedItem.name = 'Inputs/Materials'
                        } else {
                            return selectedItem.name
                        }
                    }}
                />
                <Text style={styles.validateTExt}>{userPickText}</Text>
                {
                    userSelectedLanguage == 'Machine/Implement' || userSelectedLanguage == 'Inputs/Materials' || userSelectedLanguage == 'Machinery' || userSelectedLanguage == 'Materials/Inputs' ?
                        <View>
                            <Input
                                placeholder={userSelectedLanguage == 'Machine/Implement' || userSelectedLanguage == 'Machinery' ? 'Make...' : 'Brand...'}
                                borderColor={openInputText ? 'red' : "#EEEEEE"}
                                value={post.category.name != userSelectedLanguage ? null : openInput}
                                backgroundColor={"#F8F8F8"}
                                onChangeText={(evt) => {
                                    setOpenInput(evt)
                                    setOpenInputText('')
                                }}/>
                            <Text style={styles.validateTExt}>{openInputText}</Text>
                            <Input
                                placeholder={userSelectedLanguage == 'Machine/Implement' || userSelectedLanguage == 'Machinery' ? 'Model...' : 'Product name...'}
                                borderColor={openTwoInputText ? 'red' : "#EEEEEE"}
                                value={post.category.name != userSelectedLanguage ? null : openTwoInput}
                                backgroundColor={"#F8F8F8"}
                                onChangeText={(evt) => {
                                    setOpenTwoInput(evt)
                                    setOpenTwoInputText('')
                                }}/>
                            <Text style={styles.validateTExt}>{openTwoInputText}</Text>
                        </View>
                        : null
                }
                {
                    userSelectedLanguage == 'Machine/Implement' || userSelectedLanguage == 'Inputs/Materials'
                    || userSelectedLanguage == 'Machinery' || userSelectedLanguage == 'Materials/Inputs' ?
                        null
                        :
                        <View>
                            <Input
                                placeholder={"Title"}
                                borderColor={userTitleText ? "red" : "#EEEEEE"}
                                backgroundColor={"#F8F8F8"}
                                value={userTitle}
                                onChangeText={(evt) => {
                                    setUserTitle(evt)
                                    setUserTitleText("")
                                }}/>
                            <Text style={styles.validateTExt}>{userTitleText}</Text>
                        </View>
                }
                <Input
                    placeholder={"Location"}
                    borderColor={userLocationText ? "red" : "#EEEEEE"}
                    backgroundColor={"#F8F8F8"}
                    value={userLocation}
                    onChangeText={(evt) => {
                        setUserLocation(evt)
                        setUserLocationText("")
                    }}/>
                <Text style={styles.validateTExt}>{userLocationText}</Text>
                <Input
                    placeholder="Description"
                    textAlignVertical={'top'}
                    multiline={true}
                    numberOfLines={10}
                    value={userDescription}
                    borderColor={userDescriptionText ? "red" : "#EEEEEE"}
                    onChangeText={(evt) => {
                        setUserDescription(evt)
                        setUserDescriptionText("")
                    }}/>
                <Text style={styles.validateTExt}>{userDescriptionText}</Text>
                <Button
                    title={"SAVE CHANGES"}
                    color={"#FFFFFF"}
                    backgroundColor={"#569690"}
                    fontWeight={"bold"}
                    marginBottom={18}
                    marginTop={75}
                    onPress={() => {
                        setValidate()
                    }}/>
            </View>
            <ModalCamera
                visible={modalCamera}
                onPressModal={onPressModal}
                photoFunc={photoFunc}
                cameraImageFunc={cameraImageFunc}
            />
            <Loading loading={selected}/>
        </ScrollView>
    );
}
