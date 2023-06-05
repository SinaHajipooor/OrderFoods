import { GlobalStyles } from "../../constants/colors";
import { FontAwesome } from "@expo/vector-icons";
import { View, Text, Pressable } from "react-native";
import { useContext } from "react";
import { OrderFoodsContext } from "../../data/order-context";

const BasketButton = ({ onPress }) => {
    //----------------------------------------------------------------------
    const orderCtx = useContext(OrderFoodsContext);
    //----------------------------------------------------------------------
    return (
        <Pressable onPress={onPress} style={{ marginRight: 10 }}>
            <FontAwesome name="shopping-basket" size={26} color={GlobalStyles.colors.green} />
            {/* counter */}
            <View
                style={{
                    backgroundColor: GlobalStyles.colors.darkGreen,
                    position: "absolute",
                    width: 20,
                    height: 20,
                    borderRadius: 10,
                    top: 15,
                    right: 20,
                    justifyContent: "center",
                    alignItems: "center",
                }}
            >
                <Text style={{ color: "white", textAlign: "center", justifyContent: "center", alignItems: "center" }}>{orderCtx.orderedIds.length}</Text>
            </View>
        </Pressable>
    );
};

export default BasketButton;
