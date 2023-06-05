import { LinearGradient } from "expo-linear-gradient";
import { StyleSheet, View, Text, Pressable, Image, ImageBackground } from "react-native";
import { GlobalStyles } from "../../constants/colors";
//----------------------------------------------------------------------------------------------------
const CategoryItem = ({ item, categoryPressHandler, foodsCount }) => {
    return (
        <Pressable style={styles.rootScreen} onPress={categoryPressHandler}>
            <View style={styles.foodCard}>
                <View style={styles.imageContainer}>
                    <ImageBackground style={styles.image} source={{ uri: item.image_url }} imageStyle={{ borderRadius: 15 }}>
                        <LinearGradient
                            colors={["#00000000", "#6a6a6a"]}
                            style={{
                                height: "100%",
                                width: "100%",
                                borderRadius: 15,
                            }}
                        ></LinearGradient>
                    </ImageBackground>
                </View>
                <View style={styles.description}>
                    <Text style={styles.title}>{item.title}</Text>
                </View>
            </View>
            <View
                style={{
                    position: "absolute",
                    // borderWidth: 1,
                    width: 20,
                    height: 20,
                    borderRadius: 10,
                    alignItems: "center",
                    justifyContent: "center",
                    backgroundColor: GlobalStyles.colors.gray,
                    top: 145,
                    right: 20,
                    left: 170,
                }}
            >
                <Text style={{ color: "#6a6a6a", textAlign: "center", marginVertical: -3, fontWeight: "bold" }}>{foodsCount}</Text>
            </View>
        </Pressable>
    );
};
//----------------------------------------------------------------------------------------------------

export default CategoryItem;
const styles = StyleSheet.create({
    rootScreen: {
        width: "50%",
        justifyContent: "flex-start",
        alignItems: "center",
        marginBottom: 10,
        // marginTop: 10,
    },
    foodCard: {
        width: "95%",
        height: 170,
        alignItems: "center",
        justifyContent: "space-between",
        elevation: 4,
        marginVertical: 5,
        borderRadius: 15,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 0.5,
        backgroundColor: GlobalStyles.colors.white,
    },
    imageContainer: {
        height: "100%",
        borderRadius: 15,
        width: "100%",
    },
    image: {
        borderRadius: 15,
        height: "100%",
        width: "100%",
    },
    description: {
        position: "absolute",
        top: 120,
        left: 0,
        right: 100,
        bottom: 0,
        justifyContent: "center",
        alignItems: "center",
    },
    title: {
        marginTop: 5,
        textAlign: "center",
        fontWeight: "bold",
        fontSize: 20,
        color: GlobalStyles.colors.white,
    },
    priceContainer: {
        marginTop: 4,
        width: "100%",
        alignItems: "center",
        justifyContent: "center",
    },
    buttonContainer: {
        height: 50,
        width: "100%",
        elevation: 10,
        borderBottomLeftRadius: 15,
        borderBottomRightRadius: 15,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 0.5,
        backgroundColor: GlobalStyles.colors.white,
    },

    flatButton: {
        marginRight: 10,
        paddingVertical: 6,
        paddingHorizontal: 12,
    },
    pressed: {
        opacity: 0.7,
    },
    buttonText: {
        fontWeight: "bold",
        textAlign: "center",
        color: GlobalStyles.colors.darkGreen,
    },
});
