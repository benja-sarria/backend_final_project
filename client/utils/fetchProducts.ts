export const fetchProducts = async (
    setProductList: Function,
    filterProducts: boolean = false,
    productId: number | undefined = undefined
): Promise<any> => {
    if (!filterProducts) {
        const products = await fetch(
            "https://backendfinalproject.glitch.me/api/products"
        );
        const data = await products.json();
        setProductList(data);
    } else {
        const products = await fetch(
            `https://backendfinalproject.glitch.me/api/products/${productId}`
        );
        const data = await products.json();
        setProductList(data);
    }
};
