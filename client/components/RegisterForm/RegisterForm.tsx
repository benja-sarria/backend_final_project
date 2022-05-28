import { useRouter } from "next/router";
import { SyntheticEvent } from "react";
import style from "./RegisterForm.module.scss";
export const RegisterForm = ({
    backendUrl,
}: {
    backendUrl: string | undefined;
}) => {
    const router = useRouter();

    return (
        <>
            <h1 className={style["custom-heading"]}>Te damos la bienvenida!</h1>
            <form
                className={style["custom-form"]}
                action={`${backendUrl}/api/register`}
                method="post"
                encType="multipart/form-data"
                onSubmit={async (e: any) => {
                    try {
                        e.preventDefault();
                        const form = new FormData();
                        console.dir(e.target.avatar);

                        form.append("username", e.target?.username.value);
                        form.append("email", e.target?.username.value);
                        form.append("name", e.target?.name.value);
                        form.append("address", e.target?.address.value);
                        form.append("age", e.target?.age.value);
                        form.append("phoneNumber", e.target?.phoneNumber.value);
                        form.append("password", e.target?.password.value);
                        form.append(
                            "passwordCheck",
                            e.target?.passwordCheck.value
                        );
                        form.append("avatar", e.target?.avatar.files[0]);

                        const response = await fetch(
                            `${backendUrl}/api/register`,
                            {
                                method: "POST",
                                headers: {},
                                body: form,
                                credentials: "include",
                            }
                        );
                        const parsedResponse = await response.json();

                        console.log(parsedResponse);

                        console.log(e);
                        if (response.status === 200) {
                            router.push("/");
                        }
                    } catch (error) {}
                }}
            >
                <div className={style["custom-input-container"]}>
                    <label htmlFor="name">Cuéntanos quién eres</label>
                    <input
                        type="text"
                        name="name"
                        id="name"
                        placeholder="Ingresa nombre y apellido"
                    />
                </div>
                <div className={style["custom-input-container"]}>
                    <label htmlFor="address">
                        Me suenas familiar, de dónde eres?
                    </label>
                    <input
                        type="text"
                        name="address"
                        id="address"
                        placeholder="Ingresa tu dirección"
                    />
                </div>
                <div className={style["custom-input-container"]}>
                    <label htmlFor="age">Y cuántos años tienes?</label>
                    <input
                        type="number"
                        name="age"
                        id="age"
                        placeholder="Ingresa tu edad"
                    />
                </div>
                <div className={style["custom-input-container"]}>
                    <label htmlFor="username">Y si queremos contactarte?</label>
                    <input
                        type="text"
                        name="username"
                        id="username"
                        placeholder="Ingresa tu e-mail"
                    />
                </div>
                <div className={style["custom-input-container"]}>
                    <label htmlFor="phoneNumber">
                        Nadie revisa el correo, no nos das tu número?
                    </label>
                    <input
                        type="text"
                        name="phoneNumber"
                        id="phoneNumber"
                        placeholder="Ingresa tu teléfono"
                    />
                </div>
                <div className={style["custom-input-container"]}>
                    <label htmlFor="password">
                        Es imposible que revelemos tus claves
                    </label>
                    <input
                        type="password"
                        name="password"
                        id="password"
                        placeholder="Ingresa tu clave"
                    />
                </div>
                <div className={style["custom-input-container"]}>
                    <label htmlFor="passwordCheck">Confirmemos tu clave</label>
                    <input
                        type="password"
                        name="passwordCheck"
                        id="passwordCheck"
                        placeholder="Ingresa nuevamente la clave"
                    />
                </div>
                <div className={style["custom-input-container"]}>
                    <label htmlFor="avatar">Sube tu mejor foto</label>
                    <input type="file" name="avatar" id="avatar" />
                </div>
                <div className={style["custom-input-container"]}>
                    <input
                        type="submit"
                        value={"Tenemos todo, estamos listos"}
                    />
                </div>
            </form>
        </>
    );
};
