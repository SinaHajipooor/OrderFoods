import { StatusBar } from "expo-status-bar";
import { I18nManager } from "react-native";
import OrderFoodsContextProvider from "./data/order-context";
import AuthContextProvider from "./data/auth-context";
import Root from "./navigations/Root";
//------------------------------------------------------------------------------------------------------------------
// Right to left
I18nManager.forceRTL(true);
I18nManager.allowRTL(true);
//-------------------------------------------------------
export default function App() {
    return (
        <>
            <StatusBar style="dark" />
            <AuthContextProvider>
                <OrderFoodsContextProvider>
                    <Root />
                </OrderFoodsContextProvider>
            </AuthContextProvider>
        </>
    );
}
//-------------------------------------------------------
