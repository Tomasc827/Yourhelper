import {NavLink} from "react-router";
import type {NavButtonInterface} from "../../types/types.ts";

const NavButton = ({location,name}: NavButtonInterface) => {


    return (
        <>
            <NavLink to={location} className={({isActive}) =>
            isActive ? "py-1 px-2 rounded-xl text-gray-700" : "hover:bg-white/50 py-1 px-2 duration-500 rounded-xl text-white"}>
                {name}
            </NavLink>
        </>
    )
}
export default NavButton;