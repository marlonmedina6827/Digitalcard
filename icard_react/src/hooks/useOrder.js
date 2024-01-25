import { useState } from "react";
import { getOrdersbyTableApi, checkDeliveredOrderApi, addOrderToTableApi, addPaymentToOrderApi, closeOrderApi } from "../api/order";

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

    const addPaymentToOrder = async (idOrder, idPayment) => {
        try {
            await addPaymentToOrderApi(idOrder, idPayment)
        } catch (error) {
            setError(error);
        }
    }

    const closeOrder = async (idOrder) => {
        try {
            await closeOrderApi(idOrder);
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
        addPaymentToOrder,
        closeOrder,
    }
}