import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import Cookies from "cookies";
import { ReactPropTypes, useContext, useEffect } from "react";
import { ProductsContext } from "../components/context/ProductsProvider";
import { PageDrawer } from "../components/PageDrawer/PageDrawer";
import { ProductListContainer } from "../components/ProductListContainer/ProductListContainer";
import styles from "../styles/Home.module.css";
import { authFunction } from "../utils/authFunction";
import { ServerResponse } from "http";
import { useRouter } from "next/router";

const Home: any = (props: { props: ReactPropTypes }) => {
    const { productList } = useContext(ProductsContext);
    const { backendUrl }: any = props;

    console.log("[PROPS] => ", props);

    useEffect(() => {}, [productList]);

    return (
        <div className={styles.container}>
            <Head>
                <title>e-commerce</title>
                <meta
                    name="description"
                    content="Generated by create next app"
                />

                <link rel="icon" href="/favicon.ico" />
            </Head>

            <main className={styles.main}>
                <PageDrawer />
                <h1>E-commerce</h1>
                <ProductListContainer />
            </main>

            <footer className={styles.footer}>
                <a
                    href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    Powered by{" "}
                    <span className={styles.logo}>
                        <Image
                            src="/vercel.svg"
                            alt="Vercel Logo"
                            width={72}
                            height={16}
                        />
                    </span>
                </a>
            </footer>
        </div>
    );
};

export default Home;

export async function getServerSideProps(context: any) {
    const backendUrl: string | undefined = process.env.DEVELOPMENT_BACKEND_URL;
    console.log(process.env.DEVELOPMENT_BACKEND_URL);
    const cookies = new Cookies(context.req, context.res);

    const isAuth: string | undefined = cookies.get("tkn");

    if (isAuth) {
        return {
            props: {
                isAuth: true,
            }, // will be passed to the page component as props
        };
    } else {
        return {
            redirect: {
                permanent: false,
                destination: "/login",
            },
        };
    }
}
