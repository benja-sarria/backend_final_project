import { ProductModel } from "../models/ProductModel";

export const fetchFunction = async ({
    url,
    method,
    addProduct = false,
    productToAdd = undefined,
}: {
    url: string;
    method: string;
    addProduct?: boolean;
    productToAdd?: ProductModel | undefined;
}) => {
    console.log(productToAdd);
    let finalProduct;
    if (addProduct) {
        finalProduct = { ...productToAdd, quantity: 2 };
    }

    const response = await fetch(url, {
        method: method, // *GET, POST, PUT, DELETE, etc.
        mode: "cors", // no-cors, *cors, same-origin
        cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
        credentials: "same-origin", // include, *same-origin, omit
        headers: {
            "Content-Type": "application/json",
            // 'Content-Type': 'application/x-www-form-urlencoded',
        },
        redirect: "follow", // manual, *follow, error
        referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
        body: `${!addProduct ? "" : JSON.stringify(finalProduct)}`, // body data type must match "Content-Type" header
    });
    return response;
};
