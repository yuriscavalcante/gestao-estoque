import { Button, Input, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader } from "@nextui-org/react"
import { useFormik } from "formik"
import { useState } from "react"
import * as Yup from 'yup'

type Props = {
    isOpen: boolean
    onSave: (data: any) => void
    onClose: () => void
    isLoading: boolean
}

type FormData = {
    name: string
    brand: string
    price: number
    stock: number
}

const formInitialData: FormData ={
    name: '',
    brand: '',
    price: 0,
    stock: 0
 }

const NewProductsModal = (props: Props) => {
    const user =
      typeof window !== "undefined"
        ? JSON.parse(String(localStorage.getItem("auth")))
        : null;
    const saveProductsFormik = useFormik({
      initialValues: formInitialData,
      validationSchema: Yup.object().shape({
        name: Yup.string().required("Nome é um campo obrigatório"),
        brand: Yup.string().required("Marca é um campo obrigatório"),
        price: Yup.number().required("Preço é um campo obrigatório"),
        stock: Yup.number().required("Estoque é um campo obrigatório"),
      }),
      onSubmit: (values) => handleSubmit(values),
    });

    const handleSubmit = async (values: any) => {
      Object.assign(values, {
        lastUpdate: String(new Date()),
        companyId: user.companyId,
        status: 'active'
      });
      props.onSave(values);
    }

  return (
    <Modal isOpen={props.isOpen} onClose={props.onClose} size="5xl">
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="flex flex-col gap-1">
             Novo produto
            </ModalHeader>
            <ModalBody>
              <form
                onSubmit={saveProductsFormik.handleSubmit}
                className="flex flex-col gap-10 w-full justify-center items-center p-10"
              >
                <Input
                  name="name"
                  label="Nome"
                  type="text"
                  className="w-3/4"
                  value={saveProductsFormik.values.name}
                  onChange={saveProductsFormik.handleChange}
                  isRequired={true}
                  isInvalid={
                    saveProductsFormik.touched.name &&
                    Boolean(saveProductsFormik.errors.name)
                  }
                  errorMessage={saveProductsFormik.errors.name}
                  onBlur={saveProductsFormik.handleBlur}
                />
                <Input
                  name="brand"
                  label="Marca"
                  type="text"
                  className="w-3/4"
                  value={saveProductsFormik.values.brand}
                  onChange={saveProductsFormik.handleChange}
                  isRequired={true}
                  isInvalid={
                    saveProductsFormik.touched.brand &&
                    Boolean(saveProductsFormik.errors.brand)
                  }
                  errorMessage={saveProductsFormik.errors.brand}
                  onBlur={saveProductsFormik.handleBlur}
                />
                <Input
                  name="price"
                  label="Preço"
                  type="number"
                  className="w-3/4"
                  value={String(saveProductsFormik.values.price)}
                  onChange={saveProductsFormik.handleChange}
                  isRequired={true}
                  isInvalid={
                    saveProductsFormik.touched.price &&
                    Boolean(saveProductsFormik.errors.price)
                  }
                  errorMessage={saveProductsFormik.errors.price}
                  onBlur={saveProductsFormik.handleBlur}
                />
                <Input
                  name="stock"
                  label="Estoque"
                  type="text"
                  className="w-3/4"
                  value={String(saveProductsFormik.values.stock)}
                  onChange={saveProductsFormik.handleChange}
                  isRequired={true}
                  isInvalid={
                    saveProductsFormik.touched.stock &&
                    Boolean(saveProductsFormik.errors.stock)
                  }
                  errorMessage={saveProductsFormik.errors.stock}
                  onBlur={saveProductsFormik.handleBlur}
                />

                <Button
                  color="primary"
                  className="w-3/4"
                  type="submit"
                  isLoading={props.isLoading}
                >
                  Salvar
                </Button>
              </form>
            </ModalBody>
          </>
        )}
      </ModalContent>
    </Modal>
  );
}

export default NewProductsModal