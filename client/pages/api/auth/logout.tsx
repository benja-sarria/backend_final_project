import { NextApiRequest, NextApiResponse } from "next";
import { serialize } from "cookie";

interface Response {
    loggedOut: boolean;
}

const logout = async (req: NextApiRequest, res: NextApiResponse) => {
    const response = await fetch(
        `${process.env.DEVELOPMENT_BACKEND_URL}/api/logout`
    );
    const parsedResponse: Response = await response.json();

    if (parsedResponse?.loggedOut) {
        const serialized = serialize("tkn", "", {
            httpOnly: true,
            sameSite: "strict",
            maxAge: -50000,
            path: "/",
        });

        res.setHeader("Set-Cookie", serialized);
        console.log("User logged out");
        res.redirect("/");
    }
};

export default logout;
