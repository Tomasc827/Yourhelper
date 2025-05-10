import {createContext, type ReactNode, useContext, useEffect, useState} from "react";

const AuthContext = createContext({
    isAdmin: false,
    needsPrompt: false,
    setNeedsPrompt: (needsPrompt:boolean) => {},
    checkAuth: (tokenPrompt:string) => {}
})

export const useAuth = () => {
    return useContext(AuthContext)
}

export const AuthProvider = ({children}: { children: ReactNode }) => {
    const [isAdmin, setIsAdmin] = useState<boolean>(false)
    const [needsPrompt, setNeedsPrompt] = useState<boolean>(false)

    useEffect(() => {
        const initializeAuth = async () => {
            const savedToken = localStorage.getItem("adminToken");

            if (savedToken) {
                await checkAuth(savedToken);
                return;
            }
            try {
                const res = await fetch(`${import.meta.env.VITE_BASE_URL}/auth/check-ip`);
                const data = await res.json();
                if (data.isPossibleAdmin) {
                    setNeedsPrompt(true);
                }
            } catch {
                console.error("Failure")
            }
        };

        initializeAuth();
    }, []);


    const checkAuth = async (tokenPrompt:string) => {
        try {
            const savedToken = localStorage.getItem("adminToken")
            const token = savedToken

            const response = await fetch(`${import.meta.env.VITE_BASE_URL}/auth/check-admin`, {
                headers: {
                    "Admin-Token": token || tokenPrompt
                },
                credentials: 'include',
            })
            const data = await response.json()
            console.log(data)
            setIsAdmin(data.isAdmin)
            setNeedsPrompt(false);

            if (data.isAdmin && !savedToken) {
                localStorage.setItem("adminToken", token || tokenPrompt);
            }
        } catch {
            setIsAdmin(false);
        }
    }

    console.log("isPossibleAdmin", needsPrompt)
    console.log("Is admin? " + isAdmin)

    return <AuthContext.Provider value={{isAdmin,needsPrompt,setNeedsPrompt,checkAuth}}>
        {children}
    </AuthContext.Provider>
}