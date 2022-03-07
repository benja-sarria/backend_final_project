import { useRouter } from "next/router";
import { useContext, useEffect, useState } from "react";
import { ProductModel } from "../../models/ProductModel";
import { fetchProducts } from "../../utils/fetchProducts";
import { ProductsContext } from "../context/ProductsProvider";
import { ProductCard } from "../ProductList/ProductCard";
import style from "./ProductListContainer.module.scss";

export const ProductListContainer = () => {
    const { productList, setProductList } = useContext(ProductsContext);

    const router = useRouter();

    const handleProductDetail = (productId: number) => {
        router.push(`/productDetail/${productId}`);
    };

    useEffect(() => {}, []);

    return (
        <div className={`${style["section-container"]}`}>
            <div
                className={` container ${style["custom-product-list-container"]}`}
            >
                {productList &&
                    productList.map((product: ProductModel, index: number) => {
                        return (
                            <ProductCard
                                product={product}
                                key={index}
                                handleProductDetail={handleProductDetail}
                            />
                        );
                    })}
            </div>
        </div>
    );
};
