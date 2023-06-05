import { useEffect, useState, useCallback, useContext, useLayoutEffect } from "react";
import { FlatList, Pressable, ScrollView, StyleSheet, Text, TextInput, View } from "react-native";
import Button from "../components/UI/Button";
import IconButton from "../components/UI/IconButton";
import { GlobalStyles } from "../constants/colors";
import OrderItem from "../components/Foods/OrderItem";
import LoadingOverlay from "../components/UI/LoadingOverlay";
import { addOrder, fetchFoodDetails } from "../data/http";
import { OrderFoodsContext } from "../data/order-context";
import { useIsFocused } from "@react-navigation/native";
//-------------------------------------------------------------------------------------------------------
const OrderFormScreen = ({ navigation, route }) => {
    // const orderItem = route.params.selectedItems;
    // const catId = route.params.catId;
    const [isSubmiting, setIsSubmiting] = useState(false);
    const orderCtx = useContext(OrderFoodsContext);
    const isFocused = useIsFocused();
    //-----------------------------------------------
    const initialTotalPrice = orderCtx.items?.reduce((a, b) => {
        // console.log(typeof b.item_price);
        return a + b.food.price;
    }, 0);
    const [totalPrice, setTotalPrice] = useState(initialTotalPrice);
    //-----------------------------------------------
    const cancelHandler = () => {
        navigation.goBack();
    };
    //-----------------------------------------------
    //entered phone number
    const [enteredPhoneNumber, setEnteredPhoneNumber] = useState();
    const changePhoneNumber = (enteredPhoneNumber) => {
        setEnteredPhoneNumber(enteredPhoneNumber);
    };

    //entered address
    const [enteredAddress, setEnteredAddress] = useState("");
    const changeAddressHandler = (enteredAddress) => {
        setEnteredAddress(enteredAddress);
    };

    //--------------------------location-----------------------------------
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
    //-------------------------------------------------------------------
    //save handler
    const saveOrderHandler = async () => {
        const orderData = {
            foods: orderCtx.items.map((item) => {
                return { count: item.count, food_id: item.food.id };
            }),
            address: enteredAddress,
            phone_number: enteredPhoneNumber,
            request_from: "apk",
        };
        setIsSubmiting(true);
        const id = await addOrder(orderData);
        orderCtx.items = [];
        setIsSubmiting(false);
        navigation.navigate("OrdersList", { orderId: id });
    };
    //-------------------------------------------------------------------
    //order items
    const itemRenderHandler = (itemData) => {
        const item = itemData.item;
        return <OrderItem item={item} setTotalPrice={setTotalPrice} />;
    };
    //---------------------------------------------
    if (isSubmiting) {
        return <LoadingOverlay message="در حال بارگذاری" />;
    }
    //---------------------------------------------
    if (orderCtx.items.length == 0) {
        return (
            <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
                <Text>غذایی در سبد خرید وجود ندارد !!</Text>
            </View>
        );
    }
    //---------------------------------------------
    return (
        <View style={styles.root}>
            <View style={styles.formCard}>
                <View style={styles.orderItems}>
                    <FlatList
                        style={{ flex: 1, borderRadius: 15, height: "100%", overflow: "hidden" }}
                        data={orderCtx.items}
                        keyExtractor={(item) => item.food.id}
                        renderItem={itemRenderHandler}
                    />
                </View>
            </View>

            <ScrollView style={{ width: "95%" }}>
                <View style={styles.infoContainer}>
                    <View style={styles.priceContainer}>
                        <View style={{ width: "40%" }}>
                            <Text style={{ marginVertical: 5 }}>{`قیمت کل : ${totalPrice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`}</Text>
                            <Text>{`مبلغ تخفیف :`}</Text>
                        </View>
                        <Text style={{ width: "55%", fontWeight: "bold" }}>{`مبلغ قابل پرداخت : ${totalPrice
                            .toString()
                            .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`}</Text>
                    </View>
                    <View style={styles.phoneContainer}>
                        <TextInput
                            style={styles.input}
                            placeholder="شماره موبایل"
                            keyboardType="phone-pad"
                            value={enteredPhoneNumber}
                            onChangeText={changePhoneNumber}
                        />
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
                        <Pressable style={styles.locationButton} onPress={pickOnMapHandler}>
                            <Text style={{ textAlign: "center" }}>نقشه</Text>
                            <IconButton icon="map-marker" />
                        </Pressable>
                    </View>
                    <View style={styles.buttonsContainer}>
                        <Button onPress={saveOrderHandler} style={{ width: "45%", backgroundColor: GlobalStyles.colors.lightgreen }}>
                            ثبت سفارش
                        </Button>
                        <Button style={{ width: "45%", backgroundColor: "lightcoral" }} onPress={cancelHandler}>
                            لغو
                        </Button>
                    </View>
                </View>
            </ScrollView>
        </View>
    );
};

//----------------------------------------------------------------------------------------------------------
export default OrderFormScreen;

const styles = StyleSheet.create({
    root: {
        flex: 1,
        alignItems: "center",
        justifyContent: "flex-start",
    },
    //------------------------------------------------------------------------

    formCard: {
        flexDirection: "row",
        justifyContent: "flex-start",
        marginTop: 40,
        width: "95%",
        borderRadius: 15,
        height: "40%",
        elevation: 4,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 0.2,
        backgroundColor: GlobalStyles.colors.background,
    },
    //-----------------------------------------------------------------------
    orderItems: {
        width: "100%",
        borderRadius: 15,
        height: "100%",
    },

    //------------------------------------------------------------------------
    infoContainer: {
        alignItems: "center",
        justifyContent: "flex-start",
        marginTop: 5,
        width: "100%",
        borderRadius: 15,
        height: "45%",
    },
    priceContainer: {
        elevation: 4,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 0.2,
        backgroundColor: GlobalStyles.colors.white,
        borderColor: GlobalStyles.colors.gray,
        borderRadius: 10,
        padding: 10,
        marginTop: 10,
        width: "95%",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
    },
    phoneContainer: {
        elevation: 4,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 0.2,
        backgroundColor: GlobalStyles.colors.white,
        borderColor: GlobalStyles.colors.gray,
        borderRadius: 10,
        padding: 10,
        marginTop: 10,
        width: "95%",
    },
    address: {
        flexDirection: "row",
        justifyContent: "space-around",
        alignItems: "center",
        height: "100%",
        width: "95%",
        // borderWidth: 1,
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
        borderRadius: 10,
        elevation: 4,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 0.2,
        backgroundColor: GlobalStyles.colors.white,
    },
    buttonsContainer: {
        marginTop: 10,
        flexDirection: "row",
        justifyContent: "space-between",
        width: "80%",
    },
    button: {
        width: "45%",
    },
});
