import { useRouter } from "next/router";
import { DbAdminForm } from "../../components/DbAdminForm/DbAdminForm";

const Manager = () => {
    const router = useRouter();
    const { type } = router.query;

    return (
        <div className={`container`}>
            <h1>Database Manager</h1>
            <DbAdminForm type={type} />
        </div>
    );
};
export default Manager;
