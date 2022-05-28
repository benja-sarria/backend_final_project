export const authenticate = async (setContext: Function) => {
    const response = await fetch("/api/auth/validate");
    const parsedResponse = await response.json();

    console.log(parsedResponse);
    setContext(parsedResponse);
};
