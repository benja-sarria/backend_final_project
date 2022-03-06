import { ValuesToModifyModel } from "../models/ValuesToModifyModel";

export const handleRequests = async (
    data: { id?: number } = {},
    type: string | string[] | undefined
) => {
    const receivedData: ValuesToModifyModel = data;
    console.log(receivedData);
    const dataKeys = Object.keys(data);
    dataKeys.forEach((key: string) => {
        if (receivedData[key as keyof ValuesToModifyModel] === "") {
            delete receivedData[key as keyof ValuesToModifyModel];
        }
    });
    console.log(JSON.stringify(receivedData));
    console.log(data);

    const url =
        type === "Agregar Productos"
            ? "https://node-backend-project.glitch.me/api/products"
            : type === "Modificar Productos"
            ? `https://node-backend-project.glitch.me/api/products`
            : `https://node-backend-project.glitch.me/api/products/${data.id}`;

    // Opciones por defecto estan marcadas con un *
    const response = await fetch(url, {
        method:
            type === "Agregar Productos"
                ? "POST"
                : type === "Modificar Productos"
                ? "PUT"
                : "DELETE", // *GET, POST, PUT, DELETE, etc.
        mode: "cors", // no-cors, *cors, same-origin
        cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
        credentials: "same-origin", // include, *same-origin, omit
        headers: {
            "Content-Type": "application/json",
            // 'Content-Type': 'application/x-www-form-urlencoded',
        },
        redirect: "follow", // manual, *follow, error
        referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
        body: JSON.stringify(receivedData), // body data type must match "Content-Type" header
    });

    return await response.json(); // parses JSON response into native JavaScript objects
};
