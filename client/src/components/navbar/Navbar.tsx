import NavButton from "./NavButton.tsx";
import {useRef, useState} from "react";
import {useClicks, useNavigateClose} from "../../hooks/useClicks.ts";
import {useNavigate} from "react-router";
import {useFadeInOut} from "../../hooks/useAnimation.ts";

const Navbar = () => {
    const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(false);
    const [isVisible, setIsVisible] = useState<boolean>(false);
    const [animationClass, setAnimationClass] = useState<string>("");
    const dropdownRef = useRef<HTMLDivElement>(null);

    const navigate = useNavigate();

    // useAnimation.ts
    useFadeInOut(setIsVisible,isDropdownOpen,setAnimationClass,"opacity-100","opacity-0",350)

    // useClicks.ts
    useClicks(dropdownRef, () => setIsDropdownOpen(false));
    useNavigateClose(setIsDropdownOpen,navigate);

    return (
        <>
            <nav>
                <div className="navbar">
                    <NavButton location={`/`} name={"Home"}/>
                    <NavButton location={`/asda`} name={"Jobs"}/>
                    <NavButton location={`/services`} name={"Services"}/>
                    <NavButton location={`/dasd`} name={"Contacts"}/>
                </div>
                <div className="navbar-burger">
                    <div ref={dropdownRef}>
                    <div className="space-y-2 border relative border-white p-2 rounded-xl cursor-pointer"
                         onClick={() => setIsDropdownOpen(!isDropdownOpen)}>
                        <span
                            className={`navbar-burger-animation ${isDropdownOpen ? 'rotate-45 translate-y-2.5' : ''}`}></span>
                        <span
                            className={`navbar-burger-animation ${isDropdownOpen ? 'opacity-0' : ''}`}></span>
                        <span
                            className={`navbar-burger-animation ${isDropdownOpen ? '-rotate-45 -translate-y-2.5' : ''}`}></span>
                    </div>
                    {isVisible && (
                        <div className={`navbar-dropdown duration-350 ${animationClass}`}>
                            <NavButton location={`/`} name={"Home"}/>
                            <NavButton location={`/asda`} name={"Jobs"}/>
                            <NavButton location={`/services`} name={"Services"}/>
                            <NavButton location={`/dasd`} name={"Contacts"}/>
                        </div>
                    )}
                    </div>
                </div>
            </nav>
        </>
    );
};

export default Navbar;