import { useRouter } from "next/router";
import { useContext, useEffect, useState } from "react";
import { ProductsContext } from "../../components/context/ProductsProvider";
import { DatabaseCard } from "../../components/DatabaseCard/DatabaseCard";
import { DbAdminForm } from "../../components/DbAdminForm/DbAdminForm";
import { ProductModel } from "../../models/ProductModel";
import { fetchProducts } from "../../utils/fetchProducts";
import style from "./manager.module.scss";

const Manager = () => {
    const router = useRouter();
    const { type } = router.query;

    const { productList, setProductList } = useContext(ProductsContext);

    const [actualInput, setActualInput] = useState(["inputs"]);
    const [valuesToModify, setValuesToModify] = useState({});
    console.log(type);

    const handleInputs = (evt?: any, value?: number) => {
        console.log(evt);
        console.log(value);

        if (evt) {
            console.log(evt.nativeEvent.srcElement.id);

            if (evt.nativeEvent.srcElement.id === "formName") {
                console.log("entrando en form name");

                setValuesToModify({
                    ...valuesToModify,
                    name: evt.target.value,
                    id: value,
                });
            } else if (evt.nativeEvent.srcElement.id === "formDesc") {
                console.log("entrando en form desc");
                console.log(evt.target.value);

                setValuesToModify({
                    ...valuesToModify,
                    desc: evt.target.value,
                    id: value,
                });
            } else if (evt.nativeEvent.srcElement.id === "formPrice") {
                setValuesToModify({
                    ...valuesToModify,
                    price: evt.target.value,
                    id: value,
                });
            } else if (evt.nativeEvent.srcElement.id === "formStock") {
                setValuesToModify({
                    ...valuesToModify,
                    stock: evt.target.value,
                    id: value,
                });
            } else if (evt.nativeEvent.srcElement.id === "formImg") {
                setValuesToModify({
                    ...valuesToModify,
                    thumbnail: evt.target.value,
                    id: value,
                });
            } else if (evt.nativeEvent.srcElement.id === "formProdId") {
                setValuesToModify({ ...valuesToModify, id: value });
            }
        } else {
            setValuesToModify({ ...valuesToModify, id: value });
        }
    };

    useEffect(() => {
        fetchProducts(setProductList);
    }, []);

    useEffect(() => {
        console.log(valuesToModify);
    }, [valuesToModify, productList]);

    return (
        <div className={`container`}>
            <h1>Database Manager</h1>

            {type === "Agregar Productos" ? (
                <DbAdminForm
                    type={type}
                    handleInputs={handleInputs}
                    actualInput={actualInput}
                    valuesToModify={valuesToModify}
                    setActualInput={setActualInput}
                    setProductList={setProductList}
                />
            ) : (
                productList && (
                    <div
                        className={`${style["custom-product-list-container"]}`}
                    >
                        {productList.map(
                            (product: ProductModel, index: number) => {
                                return (
                                    <DatabaseCard
                                        handleInputs={handleInputs}
                                        key={index}
                                        product={product}
                                        valuesToModify={valuesToModify}
                                        type={type}
                                        setValuesToModify={setValuesToModify}
                                        setProductList={setProductList}
                                        productList={productList}
                                    />
                                );
                            }
                        )}
                    </div>
                )
            )}
        </div>
    );
};
export default Manager;
