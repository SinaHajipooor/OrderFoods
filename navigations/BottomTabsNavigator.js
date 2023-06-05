import { useNavigation } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { GlobalStyles } from "../constants/colors";
import ProfileScreen from "../screens/ProfileScreen";
import OrdersListScreen from "../screens/OrdersListScreen";
import TopTabsNavigator from "./TopTabsNavigator";
import BasketButton from "../components/UI/BasketButton";
import { Ionicons } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";
import OrderFormScreen from "../screens/OrderFormScreen";
import { Pressable, View, Text } from "react-native";
import { useContext, useRef } from "react";
import { OrderFoodsContext } from "../data/order-context";
//-----------------------------------------------------------------------------------------------------------
const BottomTabsNavigator = () => {
    //-------------------------------------------------
    const BottomTabs = createBottomTabNavigator();
    const navigation = useNavigation();
    const orderCtx = useContext(OrderFoodsContext);
    //-------------------------------------------------
    const confirmOrderHandler = () => {
        navigation.navigate("OrderForm");
    };
    //-------------------------------------------------
    return (
        <>
            <BottomTabs.Navigator initialRouteName="CategoriesList">
                <BottomTabs.Screen
                    name="Profile"
                    component={ProfileScreen}
                    options={{
                        headerShown: true,
                        title: "",
                        tabBarIcon: ({ focused, color }) => <FontAwesome name="user" size={28} color={focused ? GlobalStyles.colors.orange : color} />,
                        tabBarIconStyle: { marginTop: 5 },
                    }}
                />
                <BottomTabs.Screen
                    name="CategoriesList"
                    component={TopTabsNavigator}
                    options={{
                        title: "",
                        tabBarIcon: ({ focused, color }) => (
                            <Ionicons name="md-fast-food-sharp" size={30} color={focused ? GlobalStyles.colors.orange : color} />
                        ),
                        headerShown: false,
                        tabBarIconStyle: { marginTop: 3 },
                    }}
                />
                <BottomTabs.Screen
                    name="OrderForm"
                    component={OrderFormScreen}
                    options={{
                        tabBarIcon: ({ focused, color }) => (
                            <Pressable onPress={confirmOrderHandler}>
                                <FontAwesome name="shopping-basket" size={26} color={focused ? GlobalStyles.colors.orange : color} />
                                {/* show counter only when there is a food in order basket  */}
                                {orderCtx.orderedIds?.length > 0 ? (
                                    <View
                                        style={{
                                            backgroundColor: GlobalStyles.colors.lightyellow,
                                            position: "absolute",
                                            width: 18,
                                            height: 18,
                                            borderRadius: 9,
                                            top: 20,
                                            right: 20,
                                            justifyContent: "center",
                                            alignItems: "center",
                                        }}
                                    >
                                        <Text style={{ color: "white", textAlign: "center", justifyContent: "center", alignItems: "center" }}>
                                            {orderCtx.orderedIds?.length}
                                        </Text>
                                    </View>
                                ) : null}
                            </Pressable>
                        ),
                        headerShown: false,
                        title: "",
                        tabBarIconStyle: { marginTop: 5 },
                    }}
                />

                <BottomTabs.Screen
                    name="OrdersList"
                    component={OrdersListScreen}
                    options={{
                        headerShown: true,
                        title: "",
                        tabBarIcon: ({ focused, color }) => <Ionicons name="menu" size={35} color={focused ? GlobalStyles.colors.orange : color} />,
                        tabBarIconStyle: { marginTop: 3 },
                    }}
                />
            </BottomTabs.Navigator>
        </>
    );
    //-------------------------------------------------
};

export default BottomTabsNavigator;
