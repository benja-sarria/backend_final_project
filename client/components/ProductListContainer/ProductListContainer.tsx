import { useContext, useEffect, useState } from "react";
import { ProductModel } from "../../models/ProductModel";
import { fetchProducts } from "../../utils/fetchProducts";
import { ProductsContext } from "../context/ProductsProvider";
import { ProductCard } from "../ProductList/ProductCard";
import style from "./ProductListContainer.module.scss";

export const ProductListContainer = () => {
    const { productList, setProductList } = useContext(ProductsContext);
    const [filteredProduct, setFilteredProduct] = useState<
        ProductModel | undefined
    >();

    const handleProductDetail = (productId: number) => {
        fetchProducts(setFilteredProduct, true, productId);
    };

    const backToList = () => {
        fetchProducts(setProductList);
        setFilteredProduct(undefined);
    };

    useEffect(() => {}, []);

    return (
        <div className={`${style["section-container"]}`}>
            <button
                className={`btn btn-primary`}
                onClick={() => {
                    backToList();
                }}
            >
                Back to list
            </button>

            <div
                className={` container ${style["custom-product-list-container"]}`}
            >
                {filteredProduct ? (
                    <ProductCard
                        product={filteredProduct}
                        handleProductDetail={handleProductDetail}
                    />
                ) : (
                    productList &&
                    productList.map((product: ProductModel, index: number) => {
                        return (
                            <ProductCard
                                product={product}
                                key={index}
                                handleProductDetail={handleProductDetail}
                            />
                        );
                    })
                )}
            </div>
        </div>
    );
};
