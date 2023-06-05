import { View, Text, Image, StyleSheet, ImageBackground } from "react-native";
import { GlobalStyles } from "../constants/colors";
import { useLayoutEffect, useState } from "react";
import { fetchFoodDetails } from "../data/http";
import LoadingOverlay from "../components/UI/LoadingOverlay";
//-----------------------------------------------------------------------------------------------------------------------
const FoodDetailsScreen = ({ navigation, route }) => {
    //-------------------------------------------------------
    const foodId = route.params.foodId;
    const catId = route.params.catId;
    const [selectedFood, setSelectedFood] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    //-------------------------------------------------------
    // get the food details
    useLayoutEffect(() => {
        const getFood = async () => {
            setIsLoading(true);
            const food = await fetchFoodDetails(catId, foodId);
            setSelectedFood(food);
            setIsLoading(false);
        };
        getFood();
    }, [foodId, catId]);
    //-------------------------------------------------------
    // set the title
    useLayoutEffect(() => {
        navigation.setOptions({
            title: selectedFood.title,
            headerTitleAlign: "center",
        });
    }, [navigation, foodId, selectedFood]);

    //-------------------------------------------------------
    if (isLoading) {
        return <LoadingOverlay message="در حال بارگذاری" />;
    }
    //-------------------------------------------------------

    return (
        <ImageBackground style={{ flex: 1 }} source={{ uri: selectedFood.image_url }} resizeMode="cover" imageStyle={{ opacity: 0.45 }}>
            <View style={styles.root}>
                <View style={styles.imageContainer}>
                    <Image source={{ uri: selectedFood.image_url }} style={styles.image} />
                </View>
                <View style={styles.description}>
                    <View style={styles.infoContainer}>
                        <Text style={styles.info}>{selectedFood.description}</Text>
                    </View>
                    <View style={styles.priceContainer}>
                        <Text style={{ fontWeight: "bold" }}>قیمت : </Text>
                        <Text style={{ fontWeight: "bold" }}>{selectedFood.price?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</Text>
                    </View>
                </View>
            </View>
        </ImageBackground>
    );
};

export default FoodDetailsScreen;

const styles = StyleSheet.create({
    root: {
        flex: 1,
        justifyContent: "flex-start",
        alignItems: "center",
    },
    imageContainer: {
        marginTop: 30,
        flex: 2,
        borderRadius: 15,
        width: "90%",
        borderColor: "black",
        elevation: 4,
        shadowColor: "#000",
        shadowOffset: { width: 1, height: 1 },
        shadowOpacity: 0.5,
    },
    image: {
        borderRadius: 15,
        height: "100%",
        width: "100%",
    },
    description: {
        flex: 4,
        // borderWidth: 1,
        width: "90%",
        alignItems: "center",
        justifyContent: "flex-start",
    },
    infoContainer: {
        marginTop: 20,
        minHeight: 150,
        width: "100%",
        padding: 15,
        borderRadius: 15,
        elevation: 4,
        shadowColor: "#000",
        shadowOffset: { width: 1, height: 1 },
        shadowOpacity: 0.5,
        backgroundColor: GlobalStyles.colors.white,
        marginBottom: 15,
    },
    info: {
        textAlign: "center",
        fontSize: 15,
        textAlignVertical: "top",
    },
    priceContainer: {
        flexDirection: "row",
        justifyContent: "space-around",
        width: "50%",
        backgroundColor: GlobalStyles.colors.white,
        borderWidth: 0.5,
        borderColor: GlobalStyles.colors.gray,
        borderRadius: 15,
        elevation: 4,
        shadowColor: "#000",
        shadowOffset: { width: 1, height: 1 },
        shadowOpacity: 0.5,
        padding: 10,
        marginTop: 10,
    },
});
