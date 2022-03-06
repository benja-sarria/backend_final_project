import { useEffect } from "react";
import { Button, Card, Form } from "react-bootstrap";
import { ProductModel } from "../../models/ProductModel";
import { ValuesToModifyModel } from "../../models/ValuesToModifyModel";
import { handleRequests } from "../../utils/handleRequests";
import style from "./DatabaseCard.module.scss";

export const DatabaseCard = ({
    handleInputs,
    product,
    valuesToModify,
    type,
    setValuesToModify,
}: {
    handleInputs: Function;
    product: ProductModel;
    valuesToModify: ValuesToModifyModel;
    type: string | string[] | undefined;
    setValuesToModify: Function;
}) => {
    const { name, desc, price, stock, thumbnail, id } = product;

    useEffect(() => {}, []);

    return (
        <Card style={{ width: "18rem" }} className={`${style["custom-card"]}`}>
            <Card.Img variant="top" src={thumbnail} />
            <Card.Body>
                <Form
                    onSubmit={async (evt) => {
                        evt.preventDefault();
                        const res = await handleRequests(valuesToModify, type);
                        console.log(res);

                        const allInputsNodeList =
                            document.querySelectorAll("input");
                        const parsedList = Array.from(allInputsNodeList);
                        const filteredInputs = parsedList.filter(
                            (input) => +input?.dataset?.cardProduct === id
                        );
                        console.log(filteredInputs);
                        filteredInputs.forEach((input) => {
                            input.value = "";
                        });
                    }}
                >
                    <Form.Group className="mb-3" controlId="formProdId">
                        <Form.Label>Id de Producto</Form.Label>
                        <Form.Control type="text" value={id} disabled />
                    </Form.Group>
                    <Card.Title>
                        <Form.Group className="mb-3" controlId="formName">
                            <Form.Label>Nombre</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder={name}
                                data-id="name"
                                onChange={(evt) => {
                                    handleInputs(evt, id);
                                }}
                                data-card-product={id}
                            />
                        </Form.Group>
                    </Card.Title>
                    <Card.Text>
                        <Form.Group className="mb-3" controlId="formDesc">
                            <Form.Label>Descripción</Form.Label>
                            <Form.Control
                                type="text"
                                data-id="desc"
                                placeholder={desc}
                                onChange={(evt) => {
                                    handleInputs(evt, id);
                                }}
                                data-card-product={id}
                            />
                        </Form.Group>
                    </Card.Text>
                    <Card.Text>
                        <Form.Group className="mb-3" controlId="formStock">
                            <Form.Label>Stock</Form.Label>
                            <Form.Control
                                type="number"
                                data-id="stock"
                                placeholder={`${stock}`}
                                onChange={(evt) => {
                                    handleInputs(evt, id);
                                }}
                                data-card-product={id}
                            />
                        </Form.Group>
                    </Card.Text>
                    <Card.Text>
                        <Form.Group className="mb-3" controlId="formPrice">
                            <Form.Label>Precio</Form.Label>
                            <Form.Control
                                type="number"
                                data-id="price"
                                placeholder={`${price}`}
                                onChange={(evt) => {
                                    handleInputs(evt, id);
                                }}
                                data-card-product={id}
                            />
                        </Form.Group>
                    </Card.Text>
                    <Card.Text>
                        <Form.Group className="mb-3" controlId="formImg">
                            <Form.Label>Imagen</Form.Label>
                            <Form.Control
                                type="text"
                                data-id="img"
                                placeholder={thumbnail}
                                onChange={(evt) => {
                                    handleInputs(evt, id);
                                }}
                                data-card-product={id}
                            />
                        </Form.Group>
                    </Card.Text>
                    <Button variant="primary" type="submit">
                        Submit
                    </Button>
                </Form>
            </Card.Body>
        </Card>
    );
};
