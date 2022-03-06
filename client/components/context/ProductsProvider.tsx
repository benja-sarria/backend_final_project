import { createContext, ReactChildren, useEffect, useState } from "react";
import { ProductModel } from "../../models/ProductModel";
import { fetchProducts } from "../../utils/fetchProducts";

export const ProductsContext = createContext<any>(null);

export const ProductsProvider = ({ children }: { children: any }) => {
    const [productList, setProductList] = useState<any>(null);

    useEffect(() => {
        fetchProducts(setProductList);
    }, []);

    return (
        <ProductsContext.Provider value={{ productList, setProductList }}>
            {children}
        </ProductsContext.Provider>
    );
};
