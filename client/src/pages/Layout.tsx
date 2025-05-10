import {Outlet} from "react-router";
import Navbar from "../components/navbar/Navbar.tsx";
import {useAuth} from "../contexts/AuthContext.tsx";
import {type SyntheticEvent, useState} from "react";

const Layout = () => {
    const [prompt, setPrompt] = useState<string>("")
    const {needsPrompt,checkAuth} = useAuth();

    const onSubmit = (e:SyntheticEvent) => {
        e.preventDefault()
        checkAuth(prompt);
    }

    return (
        <>
            <Navbar />
        <Outlet/>
            {needsPrompt && <div className="fixed w-full h-[100vh] bg-black/70 inset-0 flex justify-center items-center">
                <form onSubmit={onSubmit} className="bg-white">
                    <p>Enter Token:</p>
                    <input autoFocus onChange={e => setPrompt(e.target.value)}>

                    </input>
                    <button type="submit">submit</button>
                </form>

            </div>}
        </>
    )
}

export default Layout;