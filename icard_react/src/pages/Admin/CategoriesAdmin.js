import React, { useState, useEffect } from 'react';
import { Loader } from 'semantic-ui-react';
import { HeaderPage, TableCategoryAdmin, AddEditCategoryForm } from "../../components/Admin";
import { ModalBasic } from "../../components/Common"
import { useCategory } from "../../hooks";



export function CategoriesAdmin() {
    const [showModal, setShowModal] = useState(false);
    const [titleModal, setTitleModal] = useState(null);
    const [contentModal, setContentModal] = useState(null);
    const [refetch, setRefetch] = useState(false);
    const { loading, categories, getCategories, deleteCategory } = useCategory();
    
    //const [refetch, setRefetch] = useState(false);


    useEffect(() => {
        getCategories();
    }, [refetch]);

    const openCloseModal = () => setShowModal(prev => !prev)

    const onRefetch = () => setRefetch((prev) => !prev);

    const addCategory = () => {
        setTitleModal("Nueva Categoría");
        setContentModal(<AddEditCategoryForm onClose={openCloseModal} onRefetch={onRefetch} />)
        openCloseModal ()
    };

    const updateCategory = (data) =>{
        setTitleModal("Actualizar Categoría");
        setContentModal(
            <AddEditCategoryForm onClose={openCloseModal} onRefetch={onRefetch} category={data} />
        );
        openCloseModal();
    }
    
    const onDeleteCategory = async (data) => {
        const result = window.confirm(`Esta seguro que desea eliminar la categoría de ${data.title}`);
        if(result){
            await deleteCategory(data.id)
            onRefetch();
        }
            
    }

  return (
    <div>
        <HeaderPage 
            title ="Categorías"
            btnTitle="Nueva Categoría"
            btnClick={addCategory}
        />

        {loading ? (
            <Loader active inline="centered">
                Cargando...
            </Loader>
        ) : (
            <TableCategoryAdmin categories={categories} updateCategory={updateCategory} deleteCategory={onDeleteCategory} />
        )}

        <ModalBasic 
            show = {showModal}
            onClose = {openCloseModal}
            title = {titleModal}
            children = {contentModal}
        />


    </div>
  )
}
