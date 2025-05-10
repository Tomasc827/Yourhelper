

const HeaderOne = ({className = "text-black",title = "Header"}) => {

    return (
        <h1 className={`${className}`}>{title}</h1>
    )
}
export default HeaderOne;