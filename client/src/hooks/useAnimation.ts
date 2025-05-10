import {type SetStateAction, useEffect} from "react";
import * as React from "react";

export const useFadeInOut = (
    visibilitySetter: React.Dispatch<SetStateAction<boolean>>,
    dropdown: boolean,
    setClass: React.Dispatch<React.SetStateAction<string>>,
    cssClassStart: string,
    cssClassEnd: string,
    timeout: number
) => {
    useEffect(() => {
        if (dropdown) {
            visibilitySetter(true);
            setTimeout(() => {
                setClass(cssClassStart);
            },10)
        } else {
            setClass(cssClassEnd);
            const timer = setTimeout(() => {
                visibilitySetter(false);
            },timeout)
            return () => {
                clearTimeout(timer)
            }
        }
    },[dropdown,setClass,visibilitySetter,timeout,cssClassStart,cssClassEnd]);
}