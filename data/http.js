import AsyncStorage from "@react-native-async-storage/async-storage";
//-------------------------------------------------------------------------------------------------
const token = AsyncStorage.getItem("token");
export const BASE_URL = "http://192.168.133.58/api/";

// const foods = axios.create({
//     baseURL: "http://192.168.166.58/api",
//     headers: {
//         Authorization: `Bearer `,
//     },
// });

//-------------------------------------------------------------------------------------------------
//  get categories
export const fetchCategories = async () => {
    return fetch(`${BASE_URL}category`, {
        headers: {
            Authorization: `Bearer ${token._z}`,
        },
    })
        .then((response) => response.json())
        .then((data) => data.result);
};
//-------------------------------------------------------------------------------------------------
//  get foods
export const fetchFoods = async (catId) => {
    return fetch(`${BASE_URL}category/${catId}/foods`, {
        headers: {
            Authorization: `Bearer ${token._z}`,
        },
    })
        .then((response) => response.json())
        .then((data) => data.result);
};

// get food details
export const fetchFoodDetails = async (catId, foodId) => {
    return fetch(`${BASE_URL}category/${catId}/foods/show/${foodId}`, {
        headers: {
            Authorization: `Bearer ${token._z}`,
        },
    })
        .then((response) => response.json())
        .then((data) => data.result);
};
//-------------------------------------------------------------------------------------------------
// add order
export const addOrder = async (orderData) => {
    return await fetch(`${BASE_URL}payment/store`, {
        method: "POST",
        headers: {
            Authorization: `Bearer ${token._z}`,
            "Content-Type": "application/json",
        },
        body: JSON.stringify(orderData),
    })
        .then((response) => response.json())
        .then((data) => data.result.order_id)
        .catch((err) => console.log(err));
};

// get all the orders
export const fetchOrders = async () => {
    return fetch(`${BASE_URL}order/list-order`, {
        headers: {
            Authorization: `Bearer ${token._z}`,
        },
    })
        .then((response) => response.json())
        .then((data) => data.result);
};

// get the order detail
export const fetchOrderDetails = async (orderId) => {
    return fetch(`${BASE_URL}order/show/${orderId}`, {
        headers: {
            Authorization: `Bearer ${token._z}`,
        },
    })
        .then((response) => response.json())
        .then((data) => data.result);
};
//-------------------------------------------------------------------------------------------------
