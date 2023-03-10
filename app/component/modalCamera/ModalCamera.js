import React, {useEffect} from 'react';
import {View, Text, StyleSheet, TouchableOpacity, PermissionsAndroid, Platform} from "react-native";
import Modal from 'react-native-modal';
import {launchImageLibrary, launchCamera} from "react-native-image-picker";
import ImagePicker from 'react-native-image-crop-picker';


export default function ModalCamera(props) {

    let options = ([{
        title: "Select Image",
        customButtons: [
            {name: "customOptionKey", title: "Choose Photo from Custom Option"}
        ],
        storageOptions: {
            skipBackup: true,
            path: "images",
        }
    }]);

    const requestCameraPermission = async () => {
        try {
            const granted = await PermissionsAndroid.request(
                PermissionsAndroid.PERMISSIONS.CAMERA,
                {
                    title: "App Camera Permission",
                    message: "App needs access to your camera ",
                    buttonNeutral: "Ask Me Later",
                    buttonNegative: "Cancel",
                    buttonPositive: "OK"
                }
            );
            if (granted === PermissionsAndroid.RESULTS.GRANTED) {
                console.log("Camera permission given");
            } else {
                console.log("Camera permission denied");
            }
        } catch (err) {
            console.warn(err);
        }
    };

    useEffect(() => {
        if (Platform.OS !== 'ios') {
            requestCameraPermission()
        } else {

        }
    }, [])

    const response = (response) => {
        if (response.didCancel) {
            console.log("User cancelled image picker");
        } else if (response.error) {
            console.log("ImagePicker Error: ", response.error);
        } else if (response.customButton) {
            console.log("User tapped custom button: ", response.customButton);
        } else {
            const source = response.assets[0].uri
            props.cameraImageFunc(source)
            props.onPressModal(false)
        }
    }

    const GaleriaOpenOne = async () => {
        await launchImageLibrary(options, response)
    };

    const Galeriaopen =  () => {
        ImagePicker.openPicker({
            multiple: true
        }).then(images => {
            props.photoFunc(images)
        })
    };

    const cameraOpen = () => {
        launchCamera(options, response);
    }

    return (
        <Modal
            visible={props.visible}
            animationIn="slideInDown"
            animationOut="slideOutUp"
            testID={'modal'}
            swipeDirection="down"
            backdropColor={'rgba(250, 250, 250, 0.5)'}
            backdropOpacity={1}
            style={{margin: 0, marginTop: 480}}
            onSwipeComplete={() => {
                props.onPressModal(false)
            }}
            onBackButtonPress={() => {
                props.onPressModal(false)
            }}>
            <View style={styles.modalView}>
                <TouchableOpacity
                    onPress={() => {
                        cameraOpen()
                    }}
                    style={{
                        borderBottomWidth: 1,
                        fontWeight: "bold",
                        borderColor: "#EDEDED",
                        justifyContent: "center",
                        alignItems: "center",
                        height: 50
                    }}>
                    <Text style={{fontSize: 20, color: "#136A8A"}}>Camera</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={() => {
                        props.user === "user" ?
                            GaleriaOpenOne()
                            :
                            Galeriaopen()
                    }}
                    style={{
                        borderBottomWidth: 1,
                        fontWeight: "bold",
                        borderColor: "#EDEDED",
                        justifyContent: "center",
                        alignItems: "center",
                        height: 50
                    }}>
                    <Text style={{fontSize: 20, color: "#136A8A"}}>Photo Library</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={{
                        borderBottomWidth: 1,
                        borderColor: "#EDEDED",
                        justifyContent: "center",
                        alignItems: "center",
                        height: 50
                    }}
                    onPress={() => {
                        props.onPressModal(false)
                    }}>
                    <Text style={{fontSize: 20, color: "#136A8A", fontWeight: "bold",}}>Cancel</Text>
                </TouchableOpacity>
            </View>
        </Modal>
    );
}

const styles = StyleSheet.create({
    modalView: {
        justifyContent: "center",
        backgroundColor: 'white',
    },
    textViewModal: {
        marginBottom: 100,
    },
    modalTextLog: {
        color: '#6A6A6A',
        fontSize: 18,
        fontWeight: 'bold',
        fontFamily: 'OpenSans-Regular',
    },
    logOutTouch: {
        justifyContent: 'center',
        alignItems: 'center',
    },
});
