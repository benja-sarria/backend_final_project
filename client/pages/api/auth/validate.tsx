import { NextApiRequest, NextApiResponse } from "next";
import { serialize } from "cookie";

interface body {
    tkn: string;
}

const validate = async (req: NextApiRequest, res: NextApiResponse) => {
    console.log(req.cookies);

    const tkn = JSON.stringify({
        tkn: req.cookies.tkn ? req.cookies.tkn : "",
    });

    console.log(tkn);

    const response = await fetch(
        `${process.env.DEVELOPMENT_BACKEND_URL}/api/user`,
        {
            method: "POST",
            credentials: "include",
            headers: {
                "Content-Type": "application/json",
            },

            body: tkn,
        }
    );
    const parsedResponse = await response.json();

    if (+response.status === 200) {
        const { password, createdAt, _v, id, ...finalResponse } =
            parsedResponse;
        console.log("[FINAL-RESPONSE] => ", finalResponse);

        res.json(finalResponse);
    }
};

export default validate;
