import { useRouter } from "next/router";
import { useContext, useEffect, useState } from "react";
import { ProductsContext } from "../../components/context/ProductsProvider";
import { ProductDetail } from "../../components/ProductDetail/ProductDetail";
import { ProductCard } from "../../components/ProductList/ProductCard";
import { ProductModel } from "../../models/ProductModel";
import { fetchProducts } from "../../utils/fetchProducts";
import { handleCartRequests } from "../../utils/handleCartRequests";

const ProductDetailContainer = () => {
    const { productList, setProductList, cart, setCart } =
        useContext(ProductsContext);
    const [filteredProduct, setFilteredProduct] = useState<
        ProductModel | undefined
    >();
    const [filteredId, setFilteredId] = useState<number | undefined>(undefined);
    const router = useRouter();

    const backToList = () => {
        fetchProducts(setProductList);
        setFilteredProduct(undefined);
        router.push("/");
    };

    const handleAddToCart = async (id: number) => {
        if (!cart) {
            const addedProduct = await handleCartRequests(
                true,
                filteredProduct
            );
            console.log(addedProduct);
        }
        console.log(id);
    };

    useEffect(() => {
        const productId = +router.query.id!;
        console.log(productId);
        setFilteredId(productId);
        const filteredProductArray = productList.filter(
            (product: ProductModel) => {
                return product.id === productId;
            }
        );
        console.log(filteredProductArray);
        setFilteredProduct(filteredProductArray[0]);
    }, []);

    useEffect(() => {
        console.log(filteredProduct);
    }, [filteredProduct]);

    return (
        <div>
            <button
                className={`btn btn-primary`}
                onClick={() => {
                    backToList();
                }}
            >
                Back to list
            </button>
            {filteredProduct && filteredProduct.name && (
                <ProductDetail
                    filteredProduct={filteredProduct}
                    handleAddToCart={handleAddToCart}
                />
            )}
        </div>
    );
};

export default ProductDetailContainer;
