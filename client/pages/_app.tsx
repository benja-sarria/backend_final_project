import "../styles/globals.css";
import "bootstrap/dist/css/bootstrap.css";
import type { AppProps } from "next/app";
import { ProductsProvider } from "../components/context/ProductsProvider";

function MyApp({ Component, pageProps }: AppProps) {
    return (
        <ProductsProvider>
            <Component {...pageProps} />
        </ProductsProvider>
    );
}

export default MyApp;
