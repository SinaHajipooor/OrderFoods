import { createNativeStackNavigator } from "@react-navigation/native-stack";
import BottomTabsNavigator from "./BottomTabsNavigator";
import Map from "../screens/Map";
import FoodDetailsScreen from "../screens/FoodDetailsScreen";
import OrderFormScreen from "../screens/OrderFormScreen";
import FoodsOverview from "../screens/FoodsOverview";
import OrderDetailsScreen from "../screens/OrderDetailsScreen";
//---------------------------------------------------------------------------------------------------------
const StackNavigator = () => {
    //--------------------------------------------
    const Stack = createNativeStackNavigator();
    //--------------------------------------------
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="BottomTab" component={BottomTabsNavigator} />
            <Stack.Screen name="Map" component={Map} options={{ headerShown: true, title: "نقشه" }} />
            <Stack.Screen name="FoodDetails" component={FoodDetailsScreen} options={{ headerShown: true }} />
            {/* <Stack.Screen
                name="OrderForm"
                component={OrderFormScreen}
                options={{ animation: "slide_from_left", headerShown: true, title: "ثبت سفارش", headerTitleAlign: "center" }}
            /> */}
            <Stack.Screen name="FoodsOverview" component={FoodsOverview} options={{ headerShown: true, headerTitleAlign: "center" }} />
            <Stack.Screen name="OrderDetails" component={OrderDetailsScreen} options={{ headerShown: true, title: "اطلاعات سفارش" }} />
        </Stack.Navigator>
    );
    //--------------------------------------------
};
export default StackNavigator;
