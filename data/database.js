import { order } from "../models/order";
import * as SQLite from "expo-sqlite";

const database = SQLite.openDatabase("orderFoods.db");

// initialize
export const init = () => {
    const promise = new Promise((resolve, reject) => {
        database.transaction((tx) => {
            tx.executeSql(
                `CREATE TABLE IF NOT EXISTS orders (
                id INTEGER PRIMARY KEY NOT NULL,
                date TEXT NOT NULL,
                foods OBJECT NOT NULL,
                phoneNumber TEXT NOT NULL,
                address TEXT NOT NULL,
                totalPrice INTEGER NOT NULL
            )`,
                [],
                (_) => {
                    resolve();
                },
                (_, error) => {
                    reject(error);
                }
            );
        });
    });
    return promise;
};

// insert
export const insertOrder = (order) => {
    const promise = new Promise((resolve, reject) => {
        database.transaction((tx) => {
            tx.executeSql(
                `INSERT INTO orders (id , date , foods , phoneNumber , address , totalPrice) VALUES (? , ? , ? , ? , ? , ?)`,
                [order.id, order.date, order.foods, order.phoneNumber, order.address, order.totalPrice],
                (_, resault) => {
                    resolve(resault);
                },
                (_, error) => {
                    reject(error);
                }
            );
        });
    });
    return promise;
};

// fetch orders
export const fetchOrders = () => {
    const promise = new Promise((resolve, reject) => {
        database.transaction((tx) => {
            tx.executeSql(
                "SELECT * FROM orders",
                [],
                (_, resault) => {
                    const orders = [];
                    for (const dp of resault.rows._array) {
                        orders.unshift(new order(dp.id, dp.date, dp.foods, dp.phoneNumber, dp.address, dp.totalPrice));
                    }
                    resolve(orders);
                },
                (_, error) => {
                    reject(error);
                }
            );
        });
    });
    return promise;
};

// fetch details of order
export const fetchOrderDetails = (id) => {
    const promise = new Promise((resolve, reject) => {
        database.transaction((tx) => {
            tx.executeSql(
                "SELECT * FROM orders WHERE id = ? ",
                [id],
                (_, resault) => {
                    const dbOrder = resault.rows._array[0];
                    const order = new order(dbOrder.id, dbOrder.date, dbOrder.foods, dbOrder.phoneNumber, dbOrder.address, dbOrder.totalPrice);
                    resolve(order);
                },
                (_, error) => {
                    reject(error);
                }
            );
        });
    });
    return promise;
};
