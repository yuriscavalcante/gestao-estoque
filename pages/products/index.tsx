import { MockedProducts } from '@/api/mockedData';
import { Navbar } from '@/components/navbar'
import { Button, Card, CardBody, Table, TableBody, TableCell, TableColumn, TableHeader, TableRow } from "@nextui-org/react";
import { useEffect, useState } from 'react';
import { IoMdAddCircleOutline } from "react-icons/io";
import * as Datefns from 'date-fns'

const Products = () => {
    const [products, setProducts] = useState<any[]>([])

    useEffect(() => {
        setProducts(MockedProducts)
    }, [])

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
            >
              Produto
            </Button>
          </div>
          <div className="flex w-full">
            <Table removeWrapper>
              <TableHeader>
                <TableColumn>Nome</TableColumn>
                <TableColumn>Preço</TableColumn>
                <TableColumn>Quantidade</TableColumn>
                <TableColumn>Marca</TableColumn>
                <TableColumn>Última atualização</TableColumn>
              </TableHeader>
              <TableBody emptyContent={"No rows to display."}>
                {products.map((product, index) => (
                  <TableRow key={index}>
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
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardBody>
      </Card>
    </section>
  );
}

export default Products