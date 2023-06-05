import { useIsFocused } from "@react-navigation/native";
import { useEffect, useLayoutEffect, useState } from "react";
import { Pressable, Image, StyleSheet, Text, FlatList, View } from "react-native";
import Order from "../components/Foods/Order";
import LoadingOverlay from "../components/UI/LoadingOverlay";
import { fetchOrders } from "../data/http";

//---------------------------------------------------------------------------------------------------
const OrdersListScreen = ({ route, navigation }) => {
    //--------------------------------------------------
    const [orders, setOrders] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const isFocused = useIsFocused();
    //--------------------------------------------------
    // profile logo
    useLayoutEffect(() => {
        navigation.setOptions({
            headerRight: () => {
                return (
                    <Pressable style={styles.imageContainer} onPress={profilePressHandler}>
                        <Image style={styles.image} source={require("../assets/userProfile.png")} />
                    </Pressable>
                );
            },
        });
    }, [navigation]);
    //--------------------------------------------------
    // get all the orders
    useLayoutEffect(() => {
        if (isFocused) {
            const getOrders = async () => {
                setIsLoading(true);
                const orders = await fetchOrders();

                setOrders(orders);
                setIsLoading(false);
            };
            getOrders();
        }
    }, [isFocused]);
    //--------------------------------------------------
    const profilePressHandler = () => {
        navigation.navigate("Profile");
    };
    //--------------------------------------------------
    if (isLoading) {
        return <LoadingOverlay message="در حال بارگذاری" />;
    }
    if (orders?.length == 0) {
        return (
            <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
                <Text>سفارشی وجود ندارد !!</Text>
            </View>
        );
    }
    //--------------------------------------------------
    const renderOrder = (itemData) => {
        const item = itemData.item;

        return <Order item={item} />;
    };
    //--------------------------------------------------

    return (
        <View style={styles.root}>
            <FlatList style={styles.ordersList} data={orders} keyExtractor={(item) => item.id} renderItem={renderOrder} />
        </View>
    );
};

//---------------------------------------------------------------------------------------------------

export default OrdersListScreen;

const styles = StyleSheet.create({
    imageContainer: {
        width: 50,
        height: 50,
        borderRadius: 25,
        marginRight: 10,
    },
    image: {
        width: 50,
        height: 50,
        borderRadius: 25,
    },
    root: {
        flex: 1,
        padding: 10,
    },
    ordersList: {
        flex: 1,
        // borderWidth: 1,
    },
});
