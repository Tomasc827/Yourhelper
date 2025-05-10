import {useEffect, useState} from "react";

const LoadingSpinner = () => {
    const [dots, setDots] = useState<string>("")

    useEffect(() => {
     const interval = setInterval(() => {
         setDots(prev => {
             if (prev.length >= 3)
                 return ""
             else {
                 return prev + "."
             }
         })
     },750)
        return () => clearInterval(interval)

    },[])

    return (
        <>
        <div className="modal-backdrop">
            <div className="relative">
                <div className="loading-spinner"></div>
                <p className="loading-text">Loading{dots}</p>
            </div>
        </div>
        </>
    )
}
export default LoadingSpinner