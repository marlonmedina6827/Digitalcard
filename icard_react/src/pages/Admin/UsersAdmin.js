import React, { useEffect } from 'react';
import { Loader } from "semantic-ui-react";
import { HeaderPage, TableUsers } from "../../components/Admin"
import { useUser } from "../../hooks";

export function UsersAdmin() {
  const {loading, users, getUsers} = useUser();
  //console.log("loading ->", loading);
  console.log(users);

  useEffect(() => {
    getUsers();
  }, []);

  return (
    <>
        <HeaderPage title="Usuarios" btnTitle="Nuevo Usuario" />
        {loading ? (
          <Loader active inline="centered">
            Cargando
          </Loader>
        ) : (
          <TableUsers users={users} />
        )}
    </>
  )
}
