import { InputLabel, MenuItem, Select } from "@mui/material";
import { SyntheticEvent, useEffect, useState } from "react";
import { Button, Form } from "react-bootstrap";
import { handleRequests } from "../../utils/handleRequests";

export const DbAdminForm = ({
    type,
}: {
    type: string | string[] | undefined;
}) => {
    const [actualInput, setActualInput] = useState(["inputs"]);
    const [valuesToModify, setValuesToModify] = useState({});
    console.log(type);

    const handleInputs = (evt: any) => {
        if (evt.nativeEvent.srcElement.id === "formName") {
            setValuesToModify({ ...valuesToModify, name: evt.target.value });
        } else if (evt.nativeEvent.srcElement.id === "formDesc") {
            setValuesToModify({ ...valuesToModify, desc: evt.target.value });
        } else if (evt.nativeEvent.srcElement.id === "formPrice") {
            setValuesToModify({ ...valuesToModify, price: evt.target.value });
        } else if (evt.nativeEvent.srcElement.id === "formStock") {
            setValuesToModify({ ...valuesToModify, stock: evt.target.value });
        } else if (evt.nativeEvent.srcElement.id === "formImg") {
            setValuesToModify({ ...valuesToModify, img: evt.target.value });
        } else if (evt.nativeEvent.srcElement.id === "formProdId") {
            setValuesToModify({ ...valuesToModify, id: evt.target.value });
        }
    };
    useEffect(() => {
        console.log(valuesToModify);
        console.log(actualInput);
    }, [valuesToModify]);

    return (
        <Form
            onSubmit={async (evt) => {
                evt.preventDefault();
                const res = await handleRequests(valuesToModify, type);
                console.log(res);
            }}
        >
            {type === "Agregar Productos" ? (
                <>
                    <Form.Group className="mb-3" controlId="formName">
                        <Form.Label>Nombre</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Ingresa el nombre del producto"
                        />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formDescription">
                        <Form.Label>Descripción</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Ingresa la descripción del producto"
                        />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formPrice">
                        <Form.Label>Precio</Form.Label>
                        <Form.Control
                            type="number"
                            placeholder="Ingresa el precio del producto"
                        />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formStock">
                        <Form.Label>Stock</Form.Label>
                        <Form.Control
                            type="number"
                            placeholder="Ingresa el stock del producto"
                        />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formImg">
                        <Form.Label>Imagen</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Ingresa la url de la imagen del producto"
                        />
                    </Form.Group>
                </>
            ) : type === "Modificar Productos" ? (
                <>
                    <Form.Group className="mb-3" controlId="formProdId">
                        <Form.Label>Id de Producto</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Ingresa el ID del producto a modificar"
                            onChange={(evt) => {
                                handleInputs(evt);
                            }}
                        />
                    </Form.Group>
                    <InputLabel id="input">Input</InputLabel>
                    <Select
                        labelId="input"
                        id="demo-simple-select"
                        label="input"
                        onChange={() => {}}
                        value={actualInput[actualInput.indexOf("inputs")]}
                    >
                        <MenuItem value={"inputs"}>Inputs</MenuItem>
                        <MenuItem
                            value={"name"}
                            onClick={(evt: any) => {
                                if (
                                    !actualInput.includes(
                                        evt.target.dataset.value
                                    )
                                ) {
                                    setActualInput([
                                        ...actualInput,
                                        evt.target.dataset.value,
                                    ]);
                                }
                                console.log(actualInput);
                            }}
                        >
                            Nombre
                        </MenuItem>
                        <MenuItem
                            value={"desc"}
                            onClick={(evt: any) => {
                                if (
                                    !actualInput.includes(
                                        evt.target.dataset.value
                                    )
                                ) {
                                    setActualInput([
                                        ...actualInput,
                                        evt.target.dataset.value,
                                    ]);
                                }
                            }}
                        >
                            Descripción
                        </MenuItem>
                        <MenuItem
                            value={"price"}
                            onClick={(evt: any) => {
                                if (
                                    !actualInput.includes(
                                        evt.target.dataset.value
                                    )
                                ) {
                                    setActualInput([
                                        ...actualInput,
                                        evt.target.dataset.value,
                                    ]);
                                }
                            }}
                        >
                            Precio
                        </MenuItem>
                        <MenuItem
                            value={"stock"}
                            onClick={(evt: any) => {
                                if (
                                    !actualInput.includes(
                                        evt.target.dataset.value
                                    )
                                ) {
                                    setActualInput([
                                        ...actualInput,
                                        evt.target.dataset.value,
                                    ]);
                                }
                            }}
                        >
                            Stock
                        </MenuItem>
                        <MenuItem
                            value={"img"}
                            onClick={(evt: any) => {
                                if (
                                    !actualInput.includes(
                                        evt.target.dataset.value
                                    )
                                ) {
                                    setActualInput([
                                        ...actualInput,
                                        evt.target.dataset.value,
                                    ]);
                                }
                            }}
                        >
                            Imagen
                        </MenuItem>
                    </Select>
                    {actualInput.includes("name") && (
                        <Form.Group className="mb-3" controlId="formName">
                            <Form.Label>Nombre</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Ingresa el nuevo nombre del producto"
                                data-id="name"
                                onChange={(evt) => {
                                    handleInputs(evt);
                                }}
                            />
                        </Form.Group>
                    )}
                    {actualInput.includes("desc") && (
                        <Form.Group className="mb-3" controlId="formDesc">
                            <Form.Label>Descripción</Form.Label>
                            <Form.Control
                                type="text"
                                data-id="desc"
                                placeholder="Ingresa la nueva descripción del producto"
                                onChange={(evt) => {
                                    handleInputs(evt);
                                }}
                            />
                        </Form.Group>
                    )}
                    {actualInput.includes("price") && (
                        <Form.Group className="mb-3" controlId="formPrice">
                            <Form.Label>Precio</Form.Label>
                            <Form.Control
                                type="number"
                                data-id="price"
                                placeholder="Ingresa el nuevo precio del producto"
                                onChange={(evt) => {
                                    handleInputs(evt);
                                }}
                            />
                        </Form.Group>
                    )}
                    {actualInput.includes("stock") && (
                        <Form.Group className="mb-3" controlId="formStock">
                            <Form.Label>Stock</Form.Label>
                            <Form.Control
                                type="number"
                                data-id="stock"
                                placeholder="Ingresa el nuevo stock del producto"
                                onChange={(evt) => {
                                    handleInputs(evt);
                                }}
                            />
                        </Form.Group>
                    )}
                    {actualInput.includes("img") && (
                        <Form.Group className="mb-3" controlId="formImg">
                            <Form.Label>Imagen</Form.Label>
                            <Form.Control
                                type="text"
                                data-id="img"
                                placeholder="Ingresa la nueva imagen del producto"
                                onChange={(evt) => {
                                    handleInputs(evt);
                                }}
                            />
                        </Form.Group>
                    )}
                </>
            ) : (
                <>
                    <Form.Group className="mb-3" controlId="formName">
                        <Form.Label>Nombre</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Ingresa el nombre del producto"
                        />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formDescription">
                        <Form.Label>Descripción</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Ingresa la descripción del producto"
                        />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formPrice">
                        <Form.Label>Precio</Form.Label>
                        <Form.Control
                            type="number"
                            placeholder="Ingresa el precio del producto"
                        />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formStock">
                        <Form.Label>Stock</Form.Label>
                        <Form.Control
                            type="number"
                            placeholder="Ingresa el stock del producto"
                        />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formImg">
                        <Form.Label>Imagen</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Ingresa la url de la imagen del producto"
                        />
                    </Form.Group>
                </>
            )}

            <Button variant="primary" type="submit">
                Submit
            </Button>
        </Form>
    );
};
