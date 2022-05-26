import Link from "next/link";
import { LoginForm } from "../../components/LoginForm/LoginForm";

const loginError = ({ backendUrl }: { backendUrl: string | undefined }) => {
    return (
        <>
            <h1>There has been a problem with your login, try again</h1>
            <Link href={"/login"}>
                <a>Iniciar sesión</a>
            </Link>
        </>
    );
};

export default loginError;

export async function getServerSideProps(context: any) {
    const backendUrl: string | undefined = process.env.DEVELOPMENT_BACKEND_URL;

    return {
        props: {
            backendUrl: backendUrl,
        }, // will be passed to the page component as props
    };
}
