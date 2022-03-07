import { useEffect } from "react";
import { Button, Card } from "react-bootstrap";
import { ProductModel } from "../../models/ProductModel";
import style from "./ProductDetail.module.scss";

export const ProductDetail = ({
    filteredProduct,
    handleAddToCart,
}: {
    filteredProduct: ProductModel;
    handleAddToCart: Function;
}) => {
    const { name, thumbnail, stock, price, id } = filteredProduct;
    console.log(filteredProduct);
    useEffect(() => {}, [filteredProduct]);

    return (
        <Card style={{ width: "18rem" }} className={`${style["custom-card"]}`}>
            <Card.Img variant="top" src={thumbnail} />
            <Card.Body>
                <Card.Title>{name}</Card.Title>
                <Card.Text>
                    <div>Stock: {stock}</div>
                </Card.Text>
                <Card.Text>
                    <b>Precio: {price}</b>
                </Card.Text>
                <Button
                    variant="primary"
                    onClick={() => {
                        handleAddToCart(id);
                    }}
                >
                    Agregar al Carrito
                </Button>
            </Card.Body>
        </Card>
    );
};
