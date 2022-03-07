import { createContext, ReactChildren, useEffect, useState } from "react";
import { CartModel } from "../../models/CartModel";
import { ProductModel } from "../../models/ProductModel";
import { fetchProducts } from "../../utils/fetchProducts";

export const ProductsContext = createContext<any>(null);

export const ProductsProvider = ({ children }: { children: any }) => {
    const [productList, setProductList] = useState<ProductModel[]>([]);
    const [cart, setCart] = useState<CartModel>();

    useEffect(() => {
        fetchProducts(setProductList);
        const currentCart = localStorage.getItem("currentCart");
        console.log(currentCart);
        if (currentCart) {
            const parsedCart = JSON.parse(currentCart);
            setCart({ ...parsedCart });
            console.log(cart);
        }
    }, []);

    return (
        <ProductsContext.Provider
            value={{ productList, setProductList, cart, setCart }}
        >
            {children}
        </ProductsContext.Provider>
    );
};
