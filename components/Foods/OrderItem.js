import { useNavigation } from "@react-navigation/native";
import { useContext, useState } from "react";
import { StyleSheet, View, Text, Image, Pressable } from "react-native";
import { GlobalStyles } from "../../constants/colors";
import LoadingOverlay from "../UI/LoadingOverlay";
import { OrderFoodsContext } from "../../data/order-context";
import { FontAwesome } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";

//-----------------------------------------------------------------------------------------------------------------------
const OrderItem = ({ item, setTotalPrice }) => {
    //-------------------------------------------------------
    const [totalItemPrice, setTotalItemPrice] = useState(item.food.price);
    const [isLoading, setIsLoading] = useState(false);
    const orderCtx = useContext(OrderFoodsContext);
    const [count, setCount] = useState(item.count);
    //------------------------------------------------------
    const navigation = useNavigation();
    //------------------------------------------------------
    const increaseHandler = () => {
        orderCtx.increaseCount(item);
        setCount((prev) => prev + 1);
        setTotalItemPrice(item.food.price * item.count);
        setTotalPrice((prev) => prev + item.food.price);
    };
    const decreaseHandler = () => {
        orderCtx.decreaseCount(item);
        setCount((prev) => prev - 1);
        setTotalItemPrice(item.food.price * item.count);
        setTotalPrice((prev) => prev - item.food.price);
    };
    //------------------------------------------------------
    const itemPressHandler = () => {
        // navigation.navigate("FoodDetails", {
        //     foodId: item.food.id,
        //     catId: catId,
        // });
    };
    //------------------------------------------------------
    const removeItemHandler = () => {
        orderCtx.removeFood(item.food.id);
        setTotalPrice((prev) => prev - item.food.price);
    };
    //------------------------------------------------------

    if (isLoading) {
        return <LoadingOverlay message="در حال بارگذاری" />;
    }
    //------------------------------------------------------

    return (
        <View>
            <Pressable style={styles.removeButton} onPress={removeItemHandler}>
                <FontAwesome name="remove" size={19} color="white" />
            </Pressable>
            <View style={styles.item}>
                <Pressable style={styles.imageContainer} onPress={itemPressHandler}>
                    <Image style={styles.image} source={{ uri: item.food.image_url }} />
                </Pressable>
                <View style={{ alignItems: "center", justifyContent: "space-around", width: "55%" }}>
                    <Text style={{ fontWeight: "bold", marginTop: 8 }}>{item.food.title}</Text>
                    <View style={{ flexDirection: "row", justifyContent: "space-around", width: "100%" }}>
                        <Text style={{ marginRight: 15 }}>{`قیمت : ${totalItemPrice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`}</Text>
                        <Text>{`تعداد : ${count}`}</Text>
                    </View>
                </View>
                <View style={{ width: "13%", borderTopRightRadius: 15, borderBottomRightRadius: 15 }}>
                    <Pressable
                        onPress={increaseHandler}
                        style={{
                            borderTopRightRadius: 15,
                            height: "50%",
                            alignItems: "center",
                            justifyContent: "center",
                            backgroundColor: GlobalStyles.colors.green,
                        }}
                    >
                        <AntDesign name="pluscircle" size={24} color="white" />
                    </Pressable>
                    <Pressable
                        onPress={decreaseHandler}
                        style={{
                            borderBottomRightRadius: 15,
                            height: "50%",
                            alignItems: "center",
                            justifyContent: "center",
                            backgroundColor: GlobalStyles.colors.red,
                        }}
                    >
                        <AntDesign name="minuscircle" size={24} color="white" />
                    </Pressable>
                </View>
            </View>
        </View>
    );
};
//-----------------------------------------------------------------------------------------------------------------------

export default OrderItem;

const styles = StyleSheet.create({
    item: {
        // borderWidth: 1,
        marginVertical: 7,
        marginHorizontal: 7,
        borderRadius: 15,
        height: 95,
        flexDirection: "row",
        elevation: 4,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 0.5,
        backgroundColor: GlobalStyles.colors.white,
        overflow: "hidden",
        // width: "92%",
    },
    removeButton: {
        position: "absolute",
        top: 2,
        left: 5,
        zIndex: 999,
        // borderWidth: 1,
        height: 24,
        width: 24,
        borderRadius: 12,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "red",
    },
    button: {
        position: "absolute",
        top: 12,
        left: 0,
        // right: 100,
        bottom: 0,
    },
    imageContainer: {
        height: "100%",
        width: "32%",
        borderBottomLeftRadius: 15,
        borderTopLeftRadius: 15,
        flexDirection: "row",
    },
    image: {
        width: "100%",
        borderBottomRightRadius: 15,
        borderTopRightRadius: 15,
        height: "100%",
        borderWidth: 0.5,
        borderColor: GlobalStyles.colors.gray,
        elevation: 4,
        shadowColor: "#000",
        shadowOffset: { width: 1, height: 1 },
        shadowOpacity: 0.5,
    },
});
