import debounce from "lodash.debounce";
import { useRouter } from "next/router";
import { useCallback, useEffect } from "react";
import { Button, Card, Form } from "react-bootstrap";
import { ProductModel } from "../../models/ProductModel";
import { ValuesToModifyModel } from "../../models/ValuesToModifyModel";
import { fetchProducts } from "../../utils/fetchProducts";
import { handleRequests } from "../../utils/handleRequests";
import style from "./DatabaseCard.module.scss";

export const DatabaseCard = ({
    handleInputs,
    product,
    valuesToModify,
    type,
    setValuesToModify,
    setProductList,
    productList,
}: {
    handleInputs: Function;
    product: ProductModel;
    valuesToModify: ValuesToModifyModel;
    type: string | string[] | undefined;
    setValuesToModify: Function;
    setProductList: Function;
    productList: ProductModel[];
}) => {
    const { name, desc, price, stock, thumbnail, id } = product;

    const router = useRouter();
    console.log(router.pathname);

    const debounceRequest = useCallback(
        debounce(
            async (valuesToModify, type) =>
                await handleRequests(valuesToModify, type),
            1000
        ),
        []
    );
    const debounceRedirect = useCallback(
        debounce(() => {
            fetchProducts(setProductList);
            router.push(router.pathname + "?type=" + type);
        }, 5000),
        []
    );

    return (
        <Card style={{ width: "18rem" }} className={`${style["custom-card"]}`}>
            <Card.Img variant="top" src={thumbnail} />
            <Card.Body>
                {type === "Modificar Productos" ? (
                    <Form
                        onSubmit={async (evt) => {
                            evt.preventDefault();
                            const res = await handleRequests(
                                valuesToModify,
                                type
                            );
                            console.log(res);

                            const allInputsNodeList =
                                document.querySelectorAll("input");
                            const parsedList = Array.from(allInputsNodeList);
                            const filteredInputs = parsedList.filter(
                                (input) => {
                                    return +input.dataset.cardProduct! === id;
                                }
                            );
                            console.log(filteredInputs);
                            filteredInputs.forEach((input) => {
                                input.value = "";
                            });

                            debounceRedirect();
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
                ) : (
                    <Form
                        onSubmit={async (evt) => {
                            evt.preventDefault();
                            const res = await debounceRequest(
                                valuesToModify,
                                type
                            );
                            console.log(res);

                            const allInputsNodeList =
                                document.querySelectorAll("input");
                            const parsedList = Array.from(allInputsNodeList);
                            const filteredInputs = parsedList.filter(
                                (input) => {
                                    return +input.dataset.cardProduct! === id;
                                }
                            );
                            console.log(filteredInputs);
                            filteredInputs.forEach((input) => {
                                input.value = "";
                            });
                            debounceRedirect();
                        }}
                    >
                        <Form.Group className="mb-3" controlId="formProdId">
                            <Form.Label>Id de Producto</Form.Label>
                            <Form.Control type="text" value={id} disabled />
                        </Form.Group>
                        <Card.Title>Nombre: {name}</Card.Title>
                        <Card.Text>{desc}</Card.Text>
                        <Card.Text>Stock: {stock}</Card.Text>
                        <Card.Text>
                            Precio: <b>${price}</b>
                        </Card.Text>

                        <Button
                            variant="primary"
                            type="submit"
                            onClick={(evt: any) => {
                                handleInputs(undefined, id);
                            }}
                        >
                            Eliminar
                        </Button>
                    </Form>
                )}
            </Card.Body>
        </Card>
    );
};
