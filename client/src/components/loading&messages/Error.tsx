import "../../styles/animate-border.css"
import {useEffect, useState} from "react";
import type {ErrorState} from "../../types/types.ts";
import Failure from "../../svgs/Failure.tsx";

const Error = ({error, setError}: ErrorState) => {
    const [isAnimating, setIsAnimating] = useState<boolean>(false);

    useEffect(() => {
        setIsAnimating(true);
        const animation = setTimeout(() => {
            setIsAnimating(false);
            setTimeout(() => {
                setError("");
            }, 500)
        }, 2500)
        return () => {
            clearTimeout(animation);
        }
    }, [setError])

    return (
        <>
            <div
                onClick={() => setError("")}
                aria-live="polite"
                role="status"
                className={`error-message ${isAnimating ? "opacity-100 translate-x-4" +
                    "" : "opacity-0 -translate-x-4"}`}>
                <Failure/>{error}
            </div>
            <div
                onClick={() => setError("")}
                aria-live="polite"
                role="status"
                className={`error-message-phone ${isAnimating ? "opacity-100 -translate-y-4" +
                    "" : "opacity-0 translate-y-4"}`}>
                <Failure/>{error}
            </div>
        </>
    )
}
export default Error;