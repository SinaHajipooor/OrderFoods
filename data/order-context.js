import { createContext, useState } from "react";
import { GlobalStyles } from "../constants/colors";
export const OrderFoodsContext = createContext({
    items: [],
    addFood: (food) => {},
    removeFood: (id) => {},
    count: 1,
    addOrderedItems: (item) => {},
    increaseCount: (id) => {},
    decreaseCount: (id) => {},
    orderedIds: [],
});

const OrderFoodsContextProvider = ({ children }) => {
    const [count, setCount] = useState(1);
    const [orderedIds, setOrderedIds] = useState([]);
    // add food to orderForm
    const [orderedFoods, setOrderedFoods] = useState([]);
    const addFood = (food) => {
        setOrderedFoods((currentOrderedFoods) => [...currentOrderedFoods, { food, count }]);
        setOrderedIds((prev) => [...prev, food.id]);
    };
    const removeFood = (id) => {
        setOrderedFoods((currentOrderedFoods) => currentOrderedFoods.filter((item) => item.food.id !== id));
        setOrderedIds((prev) => prev.filter((orderedId) => orderedId !== id));
    };

    const increaseCount = (item) => {
        setCount(item.count++);
    };

    const decreaseCount = (item) => {
        setCount(item.count--);
    };

    const value = {
        items: orderedFoods,
        addFood: addFood,
        removeFood: removeFood,
        //
        count: count,
        increaseCount: increaseCount,
        decreaseCount: decreaseCount,
        orderedIds: orderedIds,
    };

    return <OrderFoodsContext.Provider value={value}>{children}</OrderFoodsContext.Provider>;
};

export default OrderFoodsContextProvider;
