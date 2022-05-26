export const authFunction = async (url: string) => {
    const response = await fetch(url, {
        method: "GET", // *GET, POST, PUT, DELETE, etc.
        mode: "cors", // no-cors, *cors, same-origin
        cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
        credentials: "same-origin", // include, *same-origin, omit
        headers: {
            "Content-Type": "application/json",
            // 'Content-Type': 'application/x-www-form-urlencoded',
        },
        redirect: "follow", // manual, *follow, error
        referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
        //body: `${!addProduct ? "" : JSON.stringify(finalProduct)}`, // body data type must match "Content-Type" header
    });
    const parsedResponse = await response.json();
    console.log(parsedResponse);
    const responseObject = {
        status: response.status,
        data: parsedResponse,
    };
    return responseObject;
};
