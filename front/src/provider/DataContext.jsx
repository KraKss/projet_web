import { createContext, useState, useEffect } from "react";
import { getAllProfiles } from "../API/controller/profile.js";
import { getAllProducts } from "../API/controller/product.js";
import { getAllOrders } from "../API/controller/order.js";
import { getAllReviews } from "../API/controller/review.js";
import {getOrderItemsByOrderId} from "../API/controller/orderItems.js";
import {data} from "react-router-dom";


export const DataContext = createContext();

export const DataProvider = ({ children }) => {

    const [profiles, setProfiles] = useState([]);
    const [products, setProducts] = useState([]);
    const [orders, setOrders] = useState([]);
    const [reviews, setReviews] = useState([]);
    const [ordersItems, setOrdersItems] = useState([]);
    const [isDataLoaded, setIsDataLoaded] = useState(false);

    const loadData = async () => {
        try {
            const [profilesData, productsData, ordersData, reviewsData,orderItemData] = await Promise.all([
                getAllProfiles(),
                getAllProducts(),
                getAllOrders(),
                getAllReviews(),
                getOrderItemsByOrderId(ordersData.id),
            ]);
            setProfiles(profilesData);
            setProducts(productsData);
            setOrders(ordersData);
            setReviews(reviewsData);
            setOrdersItems(orderItemData);
            setIsDataLoaded(true);
        } catch (error) {
            console.error("Erreur lors du chargement des données :", error);
        }
    };

    useEffect(() => {
        if (!isDataLoaded) {
            loadData();
        }
    }, [isDataLoaded]);

    return (
        <DataContext.Provider
            value={{
                profiles,
                setProfiles,
                products,
                setProducts,
                orders,
                setOrders,
                reviews,
                setReviews,
                ordersItems,
                setOrdersItems,
                loadData,
            }}
        >
            {children}
        </DataContext.Provider>
    );
};
