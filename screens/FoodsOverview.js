import { FlatList, View, StyleSheet, Text } from "react-native";
import { GlobalStyles } from "../constants/colors";
import FoodItem from "../components/Foods/FoodItem";
import { useEffect, useState } from "react";
import { fetchFoods } from "../data/http";
import LoadingOverlay from "../components/UI/LoadingOverlay";

//--------------------------------------------------------------------------------------------------------
const FoodsOverview = ({ route, navigation }) => {
    //-------------------------------------------------
    const [foods, setFoods] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    //-------------------------------------------------
    // get the category id
    const catId = route.params.catId;

    //  get the foods
    useEffect(() => {
        setIsLoading(true);
        const getFoods = async () => {
            const foods = await fetchFoods(catId);
            setFoods(foods);
            setIsLoading(false);
        };
        getFoods();
    }, [catId]);
    //-------------------------------------------------
    // render food item
    const renderFoodItem = (itemData) => {
        const item = itemData.item;

        const foodPressHandler = () => {
            navigation.navigate("FoodDetails", {
                foodId: item.id,
                catId: catId,
            });
        };
        return <FoodItem item={item} foodPressHandler={foodPressHandler} />;
    };
    //------------------------------------------------
    if (isLoading) {
        return <LoadingOverlay message="در حال بارگذاری" />;
    }
    //------------------------------------------------
    if (foods?.length == 0) {
        return (
            <View
                style={{
                    flex: 1,
                    justifyContent: "center",
                    alignItems: "center",
                }}
            >
                <Text>غذایی وجود ندارد !!</Text>
            </View>
        );
    }
    //------------------------------------------------
    return (
        <>
            <FlatList
                style={styles.root}
                numColumns={2}
                data={foods}
                keyExtractor={(item) => item.id}
                renderItem={renderFoodItem}
            />
        </>
    );
};

//--------------------------------------------------------------------------------------------------------

export default FoodsOverview;

const styles = StyleSheet.create({
    root: {
        marginTop: 8,
        padding: 10,
    },
    flatButton: {
        marginRight: 10,
        paddingVertical: 6,
        paddingHorizontal: 12,
    },
    pressed: {
        opacity: 0.7,
    },
    buttonText: {
        fontWeight: "bold",
        textAlign: "center",
        color: GlobalStyles.colors.darkGreen,
    },
    button: {},
});
