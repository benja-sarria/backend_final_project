import { Button, Card } from "react-bootstrap";
import { ProductModel } from "../../models/ProductModel";
import style from "./ProductCard.module.scss";

export const ProductCard = ({
    product,
    handleProductDetail,
}: {
    product: ProductModel;
    handleProductDetail: Function;
}) => {
    const { id, desc, name, price, thumbnail, stock } = product;

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
                        handleProductDetail(id);
                    }}
                >
                    Go somewhere
                </Button>
            </Card.Body>
        </Card>
    );
};
