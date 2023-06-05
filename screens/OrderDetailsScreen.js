import { useEffect, useLayoutEffect, useState } from "react";
import { View, Text, StyleSheet, TextInput, FlatList } from "react-native";
import LoadingOverlay from "../components/UI/LoadingOverlay";
import { fetchOrderDetails } from "../data/http";
import { GlobalStyles } from "../constants/colors";
import OrderedItem from "../components/Foods/OrderedItem";
//----------------------------------------------------
const OrderDetailsScreen = ({ navigation, route }) => {
    //----------------------------------------------------
    const orderId = route.params.orderId;
    const statusText = route.params.statusText;
    const [order, setOrder] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    //----------------------------------------------------
    useEffect(() => {
        const getOrderDetails = async () => {
            setIsLoading(true);
            const order = await fetchOrderDetails(orderId);
            setOrder(order);
            setIsLoading(false);
        };
        getOrderDetails();
    }, [orderId]);

    useLayoutEffect(() => {
        let statusColor;
        if (statusText == "بسته شده") {
            statusColor = GlobalStyles.colors.darkGreen;
        } else {
            statusColor = GlobalStyles.colors.orange;
        }
        navigation.setOptions({
            headerRight: () => {
                return <Text style={{ color: statusColor, fontWeight: "bold" }}>{statusText}</Text>;
            },
        });
    }, [statusText]);

    //----------------------------------------------------
    if (isLoading) {
        return <LoadingOverlay message="منتظر بمانید" />;
    }
    //----------------------------------------------------
    const renderOrderedItems = (itemData) => {
        const item = itemData.item;
        return <OrderedItem item={item} />;
    };
    //----------------------------------------------------

    return (
        <View style={styles.root}>
            <View style={styles.itemsContainer}>
                <FlatList data={order?.items} keyExtractor={(item) => item.id} renderItem={renderOrderedItems} />
            </View>
            <View style={styles.priceContainer}>
                <Text style={{ fontWeight: "bold", marginLeft: 15 }}>قیمت :</Text>
                <Text style={{ fontWeight: "bold", marginRight: 15 }}>{order?.order?.order_price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</Text>
            </View>
            <View style={styles.phoneContainer}>
                <Text style={{ fontWeight: "bold", marginLeft: 15 }}>شماره همراه :</Text>
                <Text style={{ fontWeight: "bold", marginRight: 15 }}>{order?.order?.phone_number}</Text>
            </View>
            <View style={styles.addressContainer}>
                <TextInput
                    style={{
                        minHeight: 50,
                        textAlignVertical: "top",
                        fontWeight: "bold",
                    }}
                    multiline={true}
                    numberOfLines={3}
                    placeholder="آدرس"
                    value={order?.order?.address}
                />
            </View>
            <View style={styles.dateContainer}>
                <View style={{ flexDirection: "row", justifyContent: "space-around", width: "25%" }}>
                    <Text>ساعت :</Text>
                    <Text>{order?.order?.order_time}</Text>
                </View>
                <View style={{ flexDirection: "row", justifyContent: "space-around", width: "40%" }}>
                    <Text>تاریخ :</Text>
                    <Text>{order?.order?.order_date}</Text>
                </View>
            </View>
        </View>
    );

    //----------------------------------------------------
};

export default OrderDetailsScreen;

const styles = StyleSheet.create({
    root: {
        flex: 1,
        alignItems: "center",
        justifyContent: "flex-start",
    },
    itemsContainer: {
        width: "95%",
        height: "42%",
        marginTop: 20,
        borderRadius: 10,
        // borderWidth: 1,
        elevation: 2,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 0.2,
        backgroundColor: GlobalStyles.colors.background,
    },
    phoneContainer: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        height: "7%",
        width: "95%",
        marginTop: 10,
        borderRadius: 10,
        elevation: 2,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 0.2,
        backgroundColor: GlobalStyles.colors.background,
    },
    addressContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        elevation: 2,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 0.2,
        height: "15%",
        width: "95%",
        backgroundColor: GlobalStyles.colors.background,
        borderWidth: 0.5,
        borderColor: GlobalStyles.colors.gray,
        borderRadius: 10,
        padding: 10,
        marginTop: 5,
    },
    priceContainer: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        height: "7%",
        width: "95%",
        marginTop: 15,
        borderRadius: 10,
        elevation: 2,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 0.2,
        backgroundColor: GlobalStyles.colors.background,
    },
    dateContainer: {
        marginTop: 10,
        width: "80%",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
    },
});
