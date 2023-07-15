interface ISignInParams {
    email: string;
    password: string;
}

interface ISignInResponse {
    email: string;
    name: string;
    token: string;
}

export {
    ISignInParams,
    ISignInResponse
}