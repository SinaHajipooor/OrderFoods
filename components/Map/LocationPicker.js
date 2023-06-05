import { View, StyleSheet, Alert, Image, Text, Pressable } from "react-native";
import OutlinedButton from "../UI/OutlinedButton";
import { useEffect, useState } from "react";
import { useIsFocused, useNavigation, useRoute } from "@react-navigation/native";
import { GlobalStyles } from "../../constants/colors";
import IconButton from "../UI/IconButton";

//------------------------------------------------------------------------------------------------------------------------------
const LocationPicker = ({ onPickLocation }) => {
    //-------------------------------------------------------------------
    // to check if we have a picked Location or not
    const [pickedLocation, setPickedLocation] = useState();
    //-------------------------------------------------------------------

    // to access the navigation obj
    const navigation = useNavigation();

    //-------------------------------------------------------------------
    // call the onPickLocation prop when ever the location is picked
    useEffect(() => {
        const handleLocation = async () => {
            if (pickedLocation) {
                // const address = await getAddress(pickedLocation.lat, pickedLocation.lng);
                onPickLocation(pickedLocation);
            }
        };
        handleLocation();
    }, [pickedLocation, onPickLocation]);
    // to open the map and allowing the user to picking a location
    const pickOnMapHandler = () => {
        // open the map screen
        navigation.navigate("Map");
    };
    //-------------------------------------------------------------------

    return (
        <Pressable onPress={pickOnMapHandler} style={styles.mapContainer}>
            <IconButton icon="map-marker" />
        </Pressable>
    );
};
//------------------------------------------------------------------------------------------------------------------------------

export default LocationPicker;

const styles = StyleSheet.create({
    // map
    mapPreview: {
        width: "100%",
        height: 200,
        marginVertical: 8,
        justifyContent: "center",
        alignItems: "center",
        borderWidth: 1,
        borderColor: GlobalStyles.colors.gray,
        borderRadius: 15,
        backgroundColor: "white",
        elevation: 4,
        shadowColor: "#000",
        shadowOffset: { width: 1, height: 1 },
        shadowOpacity: 0.5,
    },
    mapContainer: {
        alignItems: "center",
        justifyContent: "center",
        width: 70,
        height: 70,
        borderRadius: 35,
        marginTop: 30,
        marginHorizontal: 160,
        backgroundColor: GlobalStyles.colors.white,
        elevation: 4,
        shadowColor: "black",
        shadowOffset: { width: 1, height: 1 },
        shadowOpacity: 0.5,
    },
});
