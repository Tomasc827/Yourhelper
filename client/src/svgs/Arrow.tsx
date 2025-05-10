import type {ArrowProps} from "../types/componentTypes.ts";

const Arrow = ({onClick,direction,color,position,hover,ariaLabel}:ArrowProps) => {
    return (
        <>
            <svg id="Layer_1" version="1.1" viewBox="0 0 26 26" xmlSpace="preserve" xmlns="http://www.w3.org/2000/svg"
                 aria-label={ariaLabel}
                 onClick={onClick}
                 className={`arrow ${direction} ${position} ${hover}`}
                 xmlnsXlink="http://www.w3.org/1999/xlink"><g><polygon fill={color} points="0.046,2.582 2.13,0.498 12.967,11.334 23.803,0.498 25.887,2.582 12.967,15.502  "/><polygon
                fill={color}
                points="0.046,13.582 2.13,11.498 12.967,22.334 23.803,11.498 25.887,13.582 12.967,26.502  "/></g></svg>
        </>
    )
}
export default Arrow;