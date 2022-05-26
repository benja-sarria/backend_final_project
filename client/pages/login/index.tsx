import Link from "next/link";
import { LoginForm } from "../../components/LoginForm/LoginForm";

const login = ({ backendUrl }: { backendUrl: string | undefined }) => {
    return (
        <>
            <LoginForm backendUrl={backendUrl} />
            <Link href="/register">
                <a>¿No tienes cuenta? Crea una en un momento</a>
            </Link>
        </>
    );
};

export default login;

export async function getServerSideProps(context: any) {
    const backendUrl: string | undefined = process.env.DEVELOPMENT_BACKEND_URL;

    return {
        props: {
            backendUrl: backendUrl,
        }, // will be passed to the page component as props
    };
}
