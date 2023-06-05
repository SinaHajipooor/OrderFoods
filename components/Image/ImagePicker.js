import { Button, View, StyleSheet, Alert, Image, Text, Pressable } from "react-native";
import { launchCameraAsync, launchImageLibraryAsync, useCameraPermissions, PermissionStatus } from "expo-image-picker";
import { useState } from "react";
import { GlobalStyles } from "../../constants/colors";
import OutlinedButton from "../UI/OutlinedButton";
import { AntDesign } from "@expo/vector-icons";

const ImagePicker = ({ onTakeImage }) => {
    //-----------------------------------------------------------------
    // to store the image that we take
    const [pickedImage, setPickedImage] = useState();

    //-----------------------------------------------------------------
    // this hook gives us an array with 2 elements the first one is the camera permission information and the sexond one is a request permission function(for ios )
    const [cameraPermissionInformation, requestPermission] = useCameraPermissions();

    // to check if we have permission to use the camera or not
    const verifyPermissions = async () => {
        // PermissionStatus.UNDETERMINED means that we dont know yet if we have access or not
        if (cameraPermissionInformation.status === PermissionStatus.UNDETERMINED) {
            const permissionResponse = await requestPermission();

            // granted is a property that will true if the permission has been accepted and it will false if it was rejected
            return permissionResponse.granted;
        } else if (cameraPermissionInformation.status === PermissionStatus.DENIED) {
            Alert.alert("Access denied !", "Tou need to accept camera permission to use this app ");
            return false;
        }
        return true;
    };
    //-----------------------------------------------------------------
    // to open the camera
    const takeImageHandler = async () => {
        // here we give a boolean that is true if we have the permission and false if we dont have the permission
        const hasPermission = await verifyPermissions();
        if (!hasPermission) {
            // here we dont have the permission and we just return nothing . because we want to cancel the execution
            return;
        }
        // this function will open the camera and wait for us to take photo . the execution of this function will not stop until the user take the photo
        // as a prameter we can pass an object to config camera
        const image = await launchCameraAsync({
            allowsEditing: true,
            aspect: [16, 9],
            quality: 0.5,
        });
        // the image that we taked uri
        setPickedImage(image.assets[0]?.uri);
        // send the image uri to the placeForm by the onTakeImage prop
        onTakeImage(image.assets[0]?.uri);
    };

    //-----------------------------------------------------------------
    // to open gallery
    const openGalleryHandler = async () => {
        const image = await launchImageLibraryAsync({
            allowsEditing: true,
            aspect: [4, 3],
            quality: 0.5,
        });
        // the image picked uri
        setPickedImage(image.assets[0].uri);
        // send the image uri to the placeForm by the onTakeImage prop
        onTakeImage(image.assets[0].uri);
    };
    //-----------------------------------------------------------------
    // a helper variable to show the image or not
    let imagePreview = (
        <View style={styles.imageContainer}>
            <Image style={styles.image} source={require("../../assets/userProfile.png")} />
        </View>
    );
    if (pickedImage) {
        imagePreview = (
            <View style={styles.imageContainer}>
                <Image style={styles.image} source={{ uri: pickedImage }} />
            </View>
        );
    }

    //-----------------------------------------------------------------

    return (
        <View style={styles.imageContainer}>
            {imagePreview}
            <Pressable style={{ alignItems: "flex-start", top: -20, right: -15 }} onPress={openGalleryHandler}>
                <AntDesign name="pluscircle" size={28} color={GlobalStyles.colors.darkblue} />
            </Pressable>
        </View>
    );
};

export default ImagePicker;

const styles = StyleSheet.create({
    imageContainer: {
        width: 260,
        height: 260,
        borderRadius: 130,
        // borderWidth: 1,
    },
    image: {
        width: 260,
        height: 260,
        borderRadius: 130,
    },
    //---------------------------------------------
    buttonsContainer: {
        flex: 1,
        flexDirection: "row",
        justifyContent: "space-around",
        alignItems: "center",
    },
});
