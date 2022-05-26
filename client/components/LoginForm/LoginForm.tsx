import style from "./LoginForm.module.scss";
export const LoginForm = ({
    backendUrl,
}: {
    backendUrl: string | undefined;
}) => {
    return (
        <>
            <h1 className={style["custom-heading"]}>Inicia sesión</h1>
            <form
                className={style["custom-form"]}
                action={`${backendUrl}/api/auth/login`}
                method="POST"
            >
                <div className={style["custom-input-container"]}>
                    <label htmlFor="email">E-mail</label>
                    <input type="text" name="email" id="email" />
                </div>
                <div className={style["custom-input-container"]}>
                    <label htmlFor="password"> Password </label>
                    <input type="text" name="password" id="password" />
                </div>
                <div className={style["custom-input-container"]}>
                    <input type="submit" />
                </div>
            </form>
        </>
    );
};
