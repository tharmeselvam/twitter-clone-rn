type AuthContextType = {
    isLoggedIn: boolean;
    isLoading: boolean;
    logIn: (username: string, password: string) => Promise<void>;
}