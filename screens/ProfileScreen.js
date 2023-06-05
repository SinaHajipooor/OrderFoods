import {
    Text,
    TextInput,
    StyleSheet,
    View,
    Pressable,
    ScrollView,
    Alert,
} from "react-native";
import { GlobalStyles } from "../constants/colors";
import { useState, useEffect, useCallback, useLayoutEffect } from "react";
import ImagePicker from "../components/Image/ImagePicker";
import { getFormattedDate } from "../util/date";
import IconButton from "../components/UI/IconButton";
import { useContext } from "react";
import { AuthContext } from "../data/auth-context";
import { Ionicons } from "@expo/vector-icons";
import { logout } from "../util/auth";
//---------------------------------------------------------------------------------------------------
const ProfileScreen = ({ navigation }) => {
    //--------------------------------------------------
    const authCtx = useContext(AuthContext);

    const confirmLogout = () => {
        return Alert.alert("آیا می خواهید از حساب خود خارج شوید ؟", "", [
            {
                text: "لغو",

                onPress: () => {},
                style: "cancel",
            },
            { text: "بله", onPress: authCtx.logout },
        ]);
    };
    //--------------------------------------------------

    useLayoutEffect(() => {
        navigation.setOptions({
            headerLeft: () => (
                <Pressable style={{ marginLeft: 18 }} onPress={confirmLogout}>
                    <Ionicons
                        name="exit-outline"
                        size={26}
                        color={GlobalStyles.colors.darkblue}
                    />
                </Pressable>
            ),
        });
    }, []);
    //--------------------------------------------------
    // picked Location
    const [pickedLocation, setPickedLocation] = useState();
    const pickLocationHandler = useCallback((location) => {
        setPickedLocation(location);
    }, []);
    // call the onPickLocation prop when ever the location is picked
    useEffect(() => {
        const handleLocation = async () => {
            if (pickedLocation) {
                // const address = await getAddress(pickedLocation.lat, pickedLocation.lng);
                pickLocationHandler(pickedLocation);
            }
        };
        handleLocation();
    }, [pickedLocation, pickLocationHandler]);
    // to open the map and allowing the user to picking a location
    const pickOnMapHandler = () => {
        // open the map screen
        navigation.navigate("Map");
    };
    //------------------------------------------------------
    //selected image
    const [selectedImage, setSelectedImage] = useState();
    const takeImageHandler = (imageUri) => {
        setSelectedImage(imageUri);
    };
    //------------------------------------------------------
    //entered address
    const [enteredAddress, setEnteredAddress] = useState("");
    const changeAddressHandler = (enteredAddress) => {
        setEnteredAddress(enteredAddress);
    };
    //------------------------------------------------------
    // save button on the top
    useLayoutEffect(() => {
        navigation.setOptions({
            headerRight: () => {
                return (
                    <Pressable style={styles.Button}>
                        <Text
                            style={{
                                color: GlobalStyles.colors.darkblue,
                                fontWeight: "bold",
                            }}
                        >
                            ثبت اطلاعات
                        </Text>
                    </Pressable>
                );
            },
        });
    }, []);
    //------------------------------------------------------

    return (
        <ScrollView>
            <View style={styles.root}>
                <View style={styles.profileContainer}>
                    <ImagePicker onTakeImage={takeImageHandler} />
                    <View style={styles.dateContainer}>
                        <Text>{getFormattedDate(new Date())}</Text>
                    </View>
                    <View style={styles.userInfo}>
                        <View style={styles.phoneContainer}>
                            <Text style={styles.phone}>شماره تماس : </Text>
                            <Text style={styles.phone}>شماره موبایل کاربر</Text>
                        </View>
                        <View style={styles.titleContainer}>
                            <TextInput placeholder="نام و نام خانوادگی" />
                        </View>
                        <View style={styles.address}>
                            <View style={styles.addressContainer}>
                                <TextInput
                                    style={{
                                        minHeight: 140,
                                        textAlignVertical: "top",
                                    }}
                                    multiline={true}
                                    numberOfLines={3}
                                    placeholder="آدرس"
                                    value={enteredAddress}
                                    onChangeText={changeAddressHandler}
                                />
                            </View>
                            <Pressable
                                style={styles.locationButton}
                                onPress={pickOnMapHandler}
                            >
                                <Text style={{ textAlign: "center" }}>
                                    نقشه
                                </Text>
                                <IconButton icon="map-marker" />
                            </Pressable>
                        </View>
                    </View>
                </View>
            </View>
        </ScrollView>
    );
};

//---------------------------------------------------------------------------------------------------

export default ProfileScreen;

const styles = StyleSheet.create({
    root: {
        flex: 1,
        justifyContent: "flex-start",
    },
    Button: {
        marginRight: 15,
    },
    profileContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        padding: 20,
    },

    dateContainer: {
        marginTop: 10,
    },
    userInfo: {
        width: "100%",
        flex: 1,
        justifyContent: "flex-start",
        marginTop: 50,
    },
    titleContainer: {
        width: "100%",
        backgroundColor: GlobalStyles.colors.white,
        borderWidth: 0.5,
        borderColor: GlobalStyles.colors.gray,
        borderRadius: 15,
        elevation: 4,
        shadowColor: "gray",
        shadowOffset: { width: 1, height: 1 },
        shadowOpacity: 0.2,
        padding: 10,
        marginTop: 10,
    },
    title: {
        textAlign: "center",
        fontSize: 18,
        fontWeight: "bold",
    },
    phoneContainer: {
        flexDirection: "row",
        justifyContent: "space-around",
        width: "100%",
        backgroundColor: GlobalStyles.colors.white,
        borderWidth: 0.5,
        borderColor: GlobalStyles.colors.gray,
        borderRadius: 15,
        elevation: 4,
        shadowColor: "gray",
        shadowOffset: { width: 1, height: 1 },
        shadowOpacity: 0.2,
        padding: 10,
        marginTop: 10,
    },
    phone: {
        fontWeight: "bold",
    },
    addressContainer: {
        height: "30%",
        width: "100%",
        backgroundColor: GlobalStyles.colors.white,
        borderWidth: 0.5,
        borderColor: GlobalStyles.colors.gray,
        borderRadius: 15,
        elevation: 4,
        shadowColor: "gray",
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 0.2,
        padding: 10,
        marginTop: 20,
    },
    address: {
        flexDirection: "row",
        justifyContent: "space-around",
        alignItems: "center",
        height: "50%",
        width: "100%",
    },
    addressContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        elevation: 4,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 0.2,
        height: "90%",
        width: "80%",
        backgroundColor: GlobalStyles.colors.white,
        borderWidth: 0.5,
        borderColor: GlobalStyles.colors.gray,
        borderRadius: 10,
        padding: 10,
        marginTop: 5,
    },
    locationButton: {
        alignItems: "center",
        justifyContent: "center",
        height: "90%",
        width: "15%",
        marginTop: 5,
        borderRadius: 10,
        elevation: 4,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 0.2,
        backgroundColor: GlobalStyles.colors.white,
    },
});
