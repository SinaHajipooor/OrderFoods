import { LinearGradient } from "expo-linear-gradient";
import { useState } from "react";
import { View, StyleSheet, Text, Pressable } from "react-native";
import { GlobalStyles } from "../../constants/colors";
import { FontAwesome } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
//---------------------------------------------------------------------------------------------------------------
const Order = ({ item }) => {
    const navigation = useNavigation();
    //---------------------------------------------------
    const [status, setStatus] = useState(!!item.status);
    //--------------------------------------------------
    let statusText = status ? "در حال انجام" : "بسته شده";
    let backgroundColor = status
        ? [GlobalStyles.colors.yellow, GlobalStyles.colors.lightyellow, GlobalStyles.colors.yellow]
        : [GlobalStyles.colors.green, GlobalStyles.colors.lightgreen];

    //---------------------------------------------------
    const infoPressHandler = () => {
        navigation.navigate("OrderDetails", { orderId: item.id, statusText: statusText });
    };
    //--------------------------------------------------
    return (
        <View style={styles.root}>
            <View style={styles.orderCardContainer}>
                <LinearGradient style={styles.orderCard} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }} colors={backgroundColor}>
                    <View style={styles.infoContainer}>
                        <View style={{ flexDirection: "row", justifyContent: "space-around" }}>
                            <Text style={{ color: "black", fontWeight: "bold" }}>{`وضعیت : ${statusText}`}</Text>
                            <Text style={{ color: "black", marginRight: 10, fontWeight: "bold" }}>{`مبلغ کل : ${item.order_price
                                .toString()
                                .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`}</Text>
                        </View>
                        <View>
                            <Text style={{ marginLeft: 15, color: "black", fontWeight: "bold" }}>{`آدرس : ${item.address}`}</Text>
                        </View>
                    </View>
                    <View style={styles.buttonsContainer}>
                        <Pressable style={styles.buttonContainer} onPress={infoPressHandler}>
                            <FontAwesome name="info" size={22} color="orange" />
                        </Pressable>
                        <Pressable style={styles.buttonContainer}>
                            <FontAwesome name="trash" size={22} color="red" />
                        </Pressable>
                    </View>
                </LinearGradient>
            </View>
        </View>
    );
};
//---------------------------------------------------------------------------------------------------------------

export default Order;

const styles = StyleSheet.create({
    root: {
        flex: 1,
        justifyContent: "flex-start",
        alignItems: "center",
    },
    orderCardContainer: {
        width: "97%",
        marginVertical: 7,
        marginHorizontal: 7,
        borderRadius: 15,
        height: 95,
        flexDirection: "row",
        elevation: 5,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 0.5,
        overflow: "hidden",
    },
    orderCard: {
        width: "100%",
        borderRadius: 15,
        height: "100%",
        flexDirection: "row",
        backgroundColor: "white",
    },
    infoContainer: {
        justifyContent: "space-around",
        width: "85%",
        borderTopLeftRadius: 15,
        borderBottomLeftRadius: 15,
    },
    buttonsContainer: {
        width: "12%",
        borderTopRightRadius: 15,
        borderBottomRightRadius: 15,
    },
    buttonContainer: {
        marginVertical: 5,
        padding: 5,
        backgroundColor: GlobalStyles.colors.white,
        borderWidth: 0.5,
        borderColor: GlobalStyles.colors.gray,
        borderRadius: 10,
        elevation: 4,
        shadowColor: "#000",
        shadowOffset: { width: 1, height: 1 },
        shadowOpacity: 0.5,
        marginLeft: 10,
        alignItems: "center",
    },
    cancelButton: {
        backgroundColor: GlobalStyles.colors.red,
    },
});
