import { RegisterForm } from "../../components/RegisterForm/RegisterForm";

const register = ({ backendUrl }: { backendUrl: string | undefined }) => {
    return (
        <>
            <RegisterForm backendUrl={backendUrl} />
        </>
    );
};

export default register;

export async function getServerSideProps(context: any) {
    const backendUrl: string | undefined = process.env.DEVELOPMENT_BACKEND_URL;

    return {
        props: {
            backendUrl: backendUrl,
        }, // will be passed to the page component as props
    };
}
