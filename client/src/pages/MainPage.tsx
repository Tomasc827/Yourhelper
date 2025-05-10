import type {MainPageInterface} from "../types/types.ts";
import defaultImage from "../assets/herosection2.png"
import type {SyntheticEvent} from "react";
import {useAuth} from "../contexts/AuthContext.tsx";
import HeaderOne from "../components/elements/HeaderOne.tsx";
import ArrowDown from "../svgs/ArrowDown.tsx";

const MainPage = ({title,subtitle,postCarouselDescription,carouselHeading}: MainPageInterface) => {
    const {isAdmin} = useAuth();

    return (
        <>
           <div className="center-flex">
               <HeaderOne className={"absolute text-teal-100"}
               title={title}/>
            <img className={`w-full h-[100vh]`} alt="hero section" src={`${import.meta.env.VITE_BASE_URL}/main/image`} onError={ (e:SyntheticEvent<HTMLImageElement,Event>) => {
                e.currentTarget.onerror = null;
                e.currentTarget.src = defaultImage;
            }}></img>
               <ArrowDown/>
           </div>
            <div>{subtitle}</div>
            <div>{postCarouselDescription}</div>
            <div>{carouselHeading}</div>
            {isAdmin && (<p>Test</p>)}
        </>
    )
}
export default MainPage;