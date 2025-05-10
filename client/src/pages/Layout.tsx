import {Outlet} from "react-router";
import Navbar from "../components/navbar/Navbar.tsx";
import {useAuth} from "../contexts/AuthContext.tsx";
import {type SyntheticEvent, useEffect, useState} from "react";
import Arrow from "../svgs/Arrow.tsx";

const Layout = () => {
    const [prompt, setPrompt] = useState<string>("")
    const [scrolledPast,setScrolledPast] = useState<boolean>(false)
    const {needsPrompt,checkAuth,setNeedsPrompt} = useAuth();

    const onSubmit = (e:SyntheticEvent) => {
        e.preventDefault()
        checkAuth(prompt);
        setNeedsPrompt(false);
    }

    useEffect(() => {
    const handleScroll = () => {
        setScrolledPast(window.pageYOffset > 300);
    }

    window.addEventListener("scroll", handleScroll);
    return () => {
        window.removeEventListener("scroll", handleScroll);
    }
    },[])

    const scrollToTop = () => {
        window.scrollTo({behavior: "smooth",top: 0});
    }



    return (
        <>
            <div className="min-h-screen bg-gradient-to-b from-teal-100 to-gray-100">
            <Navbar />
            {scrolledPast && <Arrow ariaLabel="Scroll To Top" onClick={scrollToTop} position={`fixed bottom-5 right-5 z-20`} direction={`rotate-180`} color={`#cbfbf1`}/>}
        <Outlet/>
            {needsPrompt && <div className="fixed w-full h-[100vh] bg-black/70 inset-0 flex justify-center items-center">
                <form onSubmit={onSubmit} className="bg-white">
                    <p>Enter Token:</p>
                    <input autoFocus onChange={e => setPrompt(e.target.value)}>

                    </input>
                    <button type="submit">submit</button>
                </form>

            </div>}
            </div>
        </>
    )
}

export default Layout;