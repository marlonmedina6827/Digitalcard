import React, { useState, useEffect } from 'react';
import { Loader } from "semantic-ui-react";
import { useParams } from "react-router-dom";
import { forEach, size } from "lodash";
import { HeaderPage, AddOrderForm } from "../../components/Admin";
import { ModalBasic } from "../../components/Common";
import { ListOrderAdmin, PaymentDetailsAdmin } from "../../components/Admin/TableDetails/";
import { useOrder, useTable, usePayment } from "../../hooks";

export function TableDetailsAdmin() {
  const [reloadOrders, setReloadOrders] = useState(false);
  const [paymentData, setPaymentData] = useState(null);
  const { id } = useParams();
  const { loading, orders, getOrdersbyTable, addPaymentToOrder } = useOrder();
  const { table, getTable } = useTable();
  const { createPayment, getPaymentByTable }  = usePayment();

  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    getOrdersbyTable(id, "", "ordering=-status,created_at")
  }, [id, reloadOrders])

  useEffect(() => {
    getTable(id);
}, [id]);

  useEffect(() => {
      (async () => {
        const response = await getPaymentByTable(id);
        if(size(response) > 0) setPaymentData(response[0]);
      })()
}, [reloadOrders]);

  
  const onReloadOrders = () => setReloadOrders((prev) => !prev);
  const openCloseModal = () => setShowModal((prev) => !prev);

  const onCreatePayment = async () => {
    const result = window.confirm('¿Estás seguro que deseas generar la cuenta de esta mesa?')

    if(result) {
      
      let totalPayment = 0;
      forEach(orders, (order) => {
        totalPayment += Number(order.product_data.price)
      })

      const resultTypePayment = window.confirm('Si deseas pagar con tarjeta presiona ACEPTAR, si desea pagar con efectivo presiona CANCELAR')
      
      const paymentData = {
        table: id,
        totalPayment: totalPayment.toFixed(2),
        paymentType: resultTypePayment ? "CARD" : "CASH",
        statusPayment: "PENDING",
      }

      const payment = await createPayment(paymentData);
      
      for await (const order of orders) {
        await addPaymentToOrder(order.id, payment.id);
      }
      onReloadOrders();

    }
  }


  return (
    <>
    <HeaderPage title={`Mesa ${table?.number || ""}`} btnTitle={paymentData ? "Ver la cuenta" : "Añadir pedido"}  btnClick={openCloseModal} btnTitleTwo={!paymentData ? "Generar cuenta" : null} btnClickTwo={onCreatePayment} />
        {loading ? (
          <Loader active inline="centered">
            Cargando...
          </Loader>
        ) : (
          <ListOrderAdmin orders={orders} onReloadOrders={onReloadOrders} />
        )}

        <ModalBasic show={showModal} onClose={openCloseModal} title="Generar pedido" >
          {paymentData ? (
            <PaymentDetailsAdmin payment={paymentData} orders={orders} openCloseModal={openCloseModal} onReloadOrders={onReloadOrders} />
          ) : (
            <AddOrderForm idTable={id} openCloseModal={openCloseModal} onReloadOrders={onReloadOrders} />
          )}
        </ModalBasic>
    </>
  );
}
