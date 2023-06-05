import { useNavigation } from "@react-navigation/native";
import { useLayoutEffect } from "react";
import { View, Pressable, Image, Text, StyleSheet } from "react-native";
import { GlobalStyles } from "../../constants/colors";
//------------------------------------------------------------------------------------------

const OrderedItem = ({ item }) => {
    //----------------------------------------------
    const navigation = useNavigation();
    //----------------------------------------------
    // go to food details screen
    const itemPressHandler = () => {
        // console.log(item);
        navigation.navigate("FoodDetails", { foodId: item.food.id, catId: item.food.category_id });
    };
    //----------------------------------------------

    return (
        <View style={styles.item}>
            <Pressable style={styles.imageContainer} onPress={itemPressHandler}>
                <Image style={styles.image} source={{ uri: item.food.image_url }} />
            </Pressable>
            <View style={{ alignItems: "center", justifyContent: "space-around", width: "65%" }}>
                <Text style={{ fontWeight: "bold", marginTop: 8 }}>{item.food.title}</Text>
                <View style={{ flexDirection: "row", justifyContent: "space-between", width: "100%" }}>
                    <Text style={{ marginLeft: 10 }}>{`تعداد : ${item.count}`}</Text>
                    <Text style={{ marginRight: 15 }}>{`قیمت کل  : ${item.total_item_price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`}</Text>
                </View>
            </View>
        </View>
    );
};
//------------------------------------------------------------------------------------------

export default OrderedItem;
const styles = StyleSheet.create({
    item: {
        // borderWidth: 1,
        marginVertical: 7,
        marginHorizontal: 5,
        borderRadius: 15,
        height: 95,
        flexDirection: "row",
        elevation: 4,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 0.5,
        backgroundColor: GlobalStyles.colors.white,
        overflow: "hidden",
        // width: "98%",
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
