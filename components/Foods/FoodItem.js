import { StyleSheet, View, Pressable, Image, Text } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { GlobalStyles } from "../../constants/colors";
import { useContext, useEffect, useLayoutEffect, useState } from "react";
import { OrderFoodsContext } from "../../data/order-context";
//------------------------------------------------------------------------------------------------------------------------------------
const FoodItem = ({ item, foodPressHandler }) => {
    //---------------------------------------------------
    const orderCtx = useContext(OrderFoodsContext);
    //---------------------------------------------------
    // // to check if the item is selected or not
    const [isSelected, setIsSelected] = useState(false);
    // //---------------------------------------------------
    useEffect(() => {
        setIsSelected(orderCtx.orderedIds?.includes(item.id) ? true : false);
    });

    let buttonText = isSelected ? "اضافه شد" : "افزودن به سبد خرید";
    let buttonColor = isSelected ? [GlobalStyles.colors.green, GlobalStyles.colors.darkGreen] : [GlobalStyles.colors.orange, GlobalStyles.colors.lightOrange];

    // selectItem
    const selectItemHandler = () => {
        setIsSelected((pv) => !pv);
        if (isSelected) {
            // remove
            orderCtx.removeFood(item.id);
        } else {
            // add
            orderCtx.addFood(item);
        }
    };

    //---------------------------------------------------

    return (
        <Pressable style={styles.rootScreen} onPress={foodPressHandler}>
            <View style={styles.foodCard}>
                <View style={styles.imageContainer}>
                    <Image source={{ uri: item.image_url }} style={styles.image} />
                </View>
                <View style={styles.description}>
                    <View>
                        <View>
                            <Text style={styles.title}>{item.title}</Text>
                        </View>
                        <View style={styles.priceContainer}>
                            <Text style={{ fontSize: 10 }}>{`قیمت : ${item.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`}</Text>
                        </View>
                    </View>
                    <Pressable style={styles.buttonContainer} onPress={selectItemHandler}>
                        <LinearGradient
                            style={{ width: "100%", height: "100%", borderBottomRightRadius: 15, borderBottomLeftRadius: 15, justifyContent: "center" }}
                            start={{ x: 0, y: 0 }}
                            end={{ x: 1, y: 1 }}
                            colors={buttonColor}
                        >
                            <Text style={{ textAlign: "center", color: "white" }}>{buttonText}</Text>
                        </LinearGradient>
                    </Pressable>
                </View>
            </View>
        </Pressable>
    );
};

//------------------------------------------------------------------------------------------------------------------------------------

export default FoodItem;

const styles = StyleSheet.create({
    rootScreen: {
        // flex: 1,
        width: "50%",
        justifyContent: "flex-start",
        alignItems: "center",
        marginBottom: 20,
    },
    foodCard: {
        width: "95%",
        height: 250,
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
        height: "60%",
        borderTopRightRadius: 15,
        borderTopLeftRadius: 15,
        width: "100%",
    },
    image: {
        borderTopRightRadius: 15,
        borderTopLeftRadius: 15,
        height: "100%",
        width: "100%",
    },
    description: {
        justifyContent: "space-between",
        flex: 1,
        width: "100%",
        borderBottomRightRadius: 15,
        borderBottomLeftRadius: 15,
        // borderWidth: 1,
    },
    title: {
        marginTop: 5,
        textAlign: "center",
        fontWeight: "bold",
        // borderWidth: 1,
    },
    priceContainer: {
        marginTop: 4,
        width: "100%",
        alignItems: "center",
        justifyContent: "center",
        // borderWidth: 1,
    },
    buttonContainer: {
        height: 50,
        // borderWidth: 1,
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
