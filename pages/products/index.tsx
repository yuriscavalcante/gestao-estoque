import { MockedProducts } from '@/api/mockedData';
import { Navbar } from '@/components/navbar'
import { Button, ButtonGroup, Card, CardBody, Chip, Table, TableBody, TableCell, TableColumn, TableHeader, TableRow } from "@nextui-org/react";
import { useEffect, useState } from 'react';
import { IoMdAddCircleOutline } from "react-icons/io";
import { MdEdit } from "react-icons/md";
import { IoCloseCircleOutline } from "react-icons/io5";
import { IoCheckmarkCircleOutline } from "react-icons/io5";
import * as Datefns from 'date-fns'
import NewProductsModal from '@/components/products/new-products-modal';
import { ProductService } from '@/api/products/productsService';
import { PRODUCTS_STATUS_LABELS } from '@/types/constants';

const Products = () => {
  const user = typeof window !== 'undefined' ? JSON.parse(String(localStorage.getItem("auth"))) : null;
  const productService = new ProductService()
    const [products, setProducts] = useState<any[]>([])
    const [isOpen, setIsOpen] = useState<boolean>(false)
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [isReload, setIsReload] = useState<boolean>(false)

    useEffect(() => {
      const init = async () => {
        const response = await productService.listProduct(user.companyId);
        setProducts(response);
      };
      init();
    }, [isReload]);

    const handleOpenModal = () => {
      setIsOpen(previous => !previous)
    }

    const handleSaveProduct = async (value: any) => {
      setIsLoading(true)
      try {
        const response = await productService.createProduct(value)
        setIsLoading(false);
        setIsReload(previous => !previous)
      } catch (err: any) {
        setIsLoading(false);
        console.error(err.message);
      }
    }

  return (
    <section className="flex flex-col items-center gap-4 w-full min-h-screen">
      <Navbar />
      <Card
        className="flex flex-col items-center justify-center gap-4 w-5/6 p-5"
        style={{ height: "90vh" }}
      >
        <CardBody className="flex flex-col items-center gap-4 w-full p-5">
          <div className="flex w-full justify-end">
            <Button
              color="success"
              style={{ color: "#fff" }}
              startContent={<IoMdAddCircleOutline size={20} />}
              onClick={handleOpenModal}
            >
              Produto
            </Button>
          </div>
          <div className="flex w-full">
            <Table removeWrapper>
              <TableHeader>
                <TableColumn width={350}>Nome</TableColumn>
                <TableColumn>Preço</TableColumn>
                <TableColumn>Quantidade</TableColumn>
                <TableColumn width={150}>Marca</TableColumn>
                <TableColumn>Última atualização</TableColumn>
                <TableColumn>Status</TableColumn>
                <TableColumn> </TableColumn>
              </TableHeader>
              <TableBody emptyContent={"Sem produtos para listar!"}>
                {products.map((product) => (
                  <TableRow key={product.id}>
                    <TableCell>{product.name}</TableCell>
                    <TableCell>{product.price}</TableCell>
                    <TableCell>{product.stock}</TableCell>
                    <TableCell>{product.brand}</TableCell>
                    <TableCell>
                      {Datefns.format(
                        new Date(product.lastUpdate),
                        "dd/MM/yyyy hh:mm"
                      )}
                    </TableCell>
                    <TableCell>
                      <Chip
                        size="sm"
                        color={
                          product.status == "active" ? "success" : "danger"
                        }
                      >
                        {PRODUCTS_STATUS_LABELS[product.status]}
                      </Chip>
                    </TableCell>
                    <TableCell>
                      <ButtonGroup>
                        <Button isIconOnly style={{ width: 50 }}>
                          <MdEdit size={20} />
                        </Button>
                        <Button
                          isIconOnly
                          style={{ width: 50 }}
                          color={
                            product.status == "active" ? "danger" : "success"
                          }
                        >
                          {product.status === "active" ? (
                            <IoCloseCircleOutline size={20} />
                          ) : (
                            <IoCheckmarkCircleOutline size={20} />
                          )}
                        </Button>
                      </ButtonGroup>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardBody>
      </Card>
      <NewProductsModal
        isLoading={isLoading}
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        onSave={(data) => handleSaveProduct(data)}
      />
    </section>
  );
}

export default Products;