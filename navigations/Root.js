import { useState, useContext, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { AuthContext } from "../data/auth-context";
import LoadingOverlay from "../components/UI/LoadingOverlay";
import Navigation from "./Navigation";
//-----------------------------------------------------------------------------------------------------------------
const Root = () => {
    //---------------------------------------------------------
    const [isTryingLogin, setIsTryingLogin] = useState(true);
    const authCtx = useContext(AuthContext);
    //--------------------------------------------------------
    useEffect(() => {
        const fetchToken = async () => {
            const storedToken = await AsyncStorage.getItem("token");
            if (storedToken) {
                authCtx.authenticate(storedToken);
            }
            setIsTryingLogin(false);
        };
        fetchToken();
    }, []);
    //--------------------------------------------------------
    if (isTryingLogin) {
        return <LoadingOverlay message="منتظر بمانید" />;
    }
    //--------------------------------------------------------
    return <Navigation />;
};
//-------------------------------------------------------------------------------------------------------------------
export default Root;
