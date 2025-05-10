import type {MainPageInterface} from "../types/types.ts";
import defaultImage from "../assets/herosection2.png"
import {useRef} from "react";
import {useAuth} from "../contexts/AuthContext.tsx";
import HeaderOne from "../components/elements/HeaderOne.tsx";
import HeaderTwo from "../components/elements/HeaderTwo.tsx";
import Arrow from "../svgs/Arrow.tsx";

interface MainWithImage extends MainPageInterface {
    image: string;
}

const MainPage = ({title,subtitle,postCarouselDescription,carouselHeading,image}: MainWithImage) => {
    const {isAdmin} = useAuth();


    const afterImage = useRef<HTMLDivElement>(null);

    const scrollBelowImage = () => {
        if (!afterImage.current) return;
        const includeNavbar = afterImage.current.getBoundingClientRect().top + window.pageYOffset - 65;
        window.scrollTo({top: includeNavbar,behavior: "smooth"});
    }

    return (
        <>
           <div className="center-flex select-none">
               <HeaderOne className={"absolute text-teal-100 md:top-[40%] top-[20%]"}
               title={title}/>
               <HeaderTwo className={"absolute md:top-[50%] text-teal-100 top-[50%]"} content={subtitle}/>
            <img className={`w-full h-[100vh]`} alt="hero section" src={image || defaultImage}></img>
               <Arrow onClick={scrollBelowImage} position={`absolute md:bottom-10 bottom-20`} ariaLabel="Scroll Down" hover={`hover:translate-y-1`}  color={`#cbfbf1`}/>
           </div>
            <div ref={afterImage}>{subtitle}</div>
            <div>{postCarouselDescription}</div>
            <div>{carouselHeading}</div>
            <img className={"w-full h-[100vh]"} src={defaultImage}/>
            {isAdmin && (<p>Test</p>)}
        </>
    )
}
export default MainPage;