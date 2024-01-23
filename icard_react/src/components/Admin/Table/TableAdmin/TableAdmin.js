import React, { useState, useEffect } from 'react';
import { size } from "lodash";
import classNames from "classnames";
import { Link } from "react-router-dom";
import { getOrdersbyTableApi } from "../../../../api/order";
import { ORDER_STATUS } from "../../../../utils/constants";
import { Label } from "semantic-ui-react";
import { ReactComponent as IcTable } from "../../../../assets/table.svg"
import "./TableAdmin.scss";

export function TableAdmin(props) {
  const { table, reload } = props;
  const [orders, setOrders] = useState([]);
  const [tableBusy, setTableBusy] = useState(false);

  useEffect(() => {
    (async() => {
      const response = await getOrdersbyTableApi(table.id, ORDER_STATUS.PENDING);
      setOrders(response);
    })()
  }, [reload]);

  useEffect(() => {
    (async() => {
      const response = await getOrdersbyTableApi(table.id, ORDER_STATUS.DELIVERED);
    
      if(size(response) > 0) setTableBusy(response)
      else setTableBusy(false);
    })()
  }, [reload]);
  
  
  return (
    <Link className='table-admin' to= {`/admin/table/${table.id}`} >
      {size(orders) > 0 ? (
        <Label circular color="orange">
          {size(orders)}
        </Label>
      ) : null}

      <IcTable className={classNames({
        pending: size(orders) > 0,
        busy: tableBusy,
      })} />
      <p> Mesa {table.number} </p>
    </Link>
  )
}
