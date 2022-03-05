import { createContext, ReactChildren, useEffect, useState } from "react";

const ProductsContext = createContext<any>(null);

export const ProductsProvider = ({ children }: { children: ReactChildren }) => {
    const [productList, setProductList] = useState([]);

    const fetchProducts = async () => {
        const products = await fetch(
            "https://backendfinalproject.glitch.me/api/products"
        );
        return products;
    };

    useEffect(() => {
        console.log(fetchProducts());

        return () => {};
    }, []);

    return (
        <ProductsContext.Provider value={{ ProductsContext, setProductList }}>
            {children}
        </ProductsContext.Provider>
    );
};
