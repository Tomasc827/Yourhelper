import * as React from "react";
import {useEffect} from "react";
import type {NavigateFunction} from "react-router";

export const useClicks = <T extends HTMLElement>(
    ref: React.RefObject<T | null>,
    onClickOutside: () => void
) => {
useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
        if (ref.current && e.target instanceof Node && !ref.current.contains(e.target)) {
            onClickOutside();
        }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
        document.removeEventListener("mousedown", handleClickOutside);
    }
},[ref, onClickOutside]);
}

export const useNavigateClose = (
    dropdownSetter: React.Dispatch<React.SetStateAction<boolean>>,
    navigate: NavigateFunction
) => {
    useEffect(() => {
        dropdownSetter(false);
    },[navigate,dropdownSetter]);
}