import { useState } from "react";
import { getOrdersbyTableApi, checkDeliveredOrderApi, addOrderToTableApi } from "../api/order";

export function useOrder () {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [orders, setOrders] = useState(null);

    const getOrdersbyTable = async (idTable, status, ordering) => {
        try {
            setLoading(true);
            const response = await getOrdersbyTableApi(idTable, status, ordering);
            setLoading(false);
            setOrders(response);
        } catch (error) {
            setLoading(false);
            setError(error);
        }
    };

    const checkDeliveredOrder = async (idOrder) => {
        try {
            await checkDeliveredOrderApi(idOrder);
        } catch (error) {
            setError(error);
        }
    }

    const addOrderToTable = async (idTable, idProduct) => {
        try {
            await addOrderToTableApi(idTable, idProduct);
        } catch (error) {
            setError(error);
        }
    }

    return {
        loading,
        error,
        orders,
        getOrdersbyTable,
        checkDeliveredOrder,
        addOrderToTable,
    }
}