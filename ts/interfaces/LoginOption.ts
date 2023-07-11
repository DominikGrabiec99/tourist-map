interface ILoginOptions {
    id: number;
    name: string;
    icon: string;
    loginFn: () => void;
}

export default ILoginOptions;