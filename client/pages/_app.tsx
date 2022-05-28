import "../styles/globals.css";
import "bootstrap/dist/css/bootstrap.css";
import type { AppProps } from "next/app";
import { ProductsProvider } from "../components/context/ProductsProvider";
import { UserProvider } from "../components/context/UserProvider";

function MyApp({ Component, pageProps }: AppProps) {
    return (
        <UserProvider>
            <ProductsProvider>
                <Component {...pageProps} />
            </ProductsProvider>
        </UserProvider>
    );
}

export default MyApp;
