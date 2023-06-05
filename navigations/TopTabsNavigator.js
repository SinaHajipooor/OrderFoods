import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { useEffect, useState } from "react";
import { View, Text } from "react-native";
import LoadingOverlay from "../components/UI/LoadingOverlay";
import { GlobalStyles } from "../constants/colors";
import { fetchCategories } from "../data/http";
import FoodsOverview from "../screens/FoodsOverview";
//------------------------------------------------------------------------------------------------------------
const TopTabsNavigator = () => {
    //---------------------------------------------------
    const TopTabs = createMaterialTopTabNavigator();
    //---------------------------------------------------
    const [categories, setCategories] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    //---------------------------------------------------
    // get the categories
    useEffect(() => {
        const getCategories = async () => {
            setIsLoading(true);
            const categories = await fetchCategories();
            setCategories(categories);
            setIsLoading(false);
        };
        getCategories();
    }, []);
    //---------------------------------------------------
    if (isLoading) {
        return <LoadingOverlay message="درحال بارگذاری" />;
    }
    //---------------------------------------------------
    if (categories?.length > 0) {
        const tabs = categories.map((tab) => (
            <TopTabs.Screen
                name={tab.title}
                options={{
                    tabBarIcon: () => (
                        <View
                            style={{
                                position: "absolute",
                                top: 35,
                                right: 40,
                                // borderWidth: 1,
                                width: 16,
                                height: 16,
                                borderRadius: 8,
                                alignItems: "center",
                                justifyContent: "center",
                                backgroundColor: GlobalStyles.colors.yellow,
                            }}
                        >
                            <Text style={{ fontWeight: "bold", fontSize: 10, color: GlobalStyles.colors.orange }}>{tab.foods_count}</Text>
                        </View>
                    ),
                }}
                component={FoodsOverview}
                key={tab.id}
                initialParams={{ catId: tab.id }}
            />
        ));
        return (
            <TopTabs.Navigator
                screenOptions={{
                    swipeEnabled: true,
                    tabBarScrollEnabled: true,
                    tabBarIndicatorStyle: {
                        borderColor: GlobalStyles.colors.orange,
                        borderWidth: 1,
                    },
                    tabBarPressColor: GlobalStyles.colors.yellow,
                }}
            >
                {tabs}
            </TopTabs.Navigator>
        );
    }
};

//------------------------------------------------------------------------------------------------------------

export default TopTabsNavigator;
