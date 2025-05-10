

const HeaderTwo = ({className = "text-black",content = "Header"}) => {

    return (
        <h2 className={`${className}`}>{content}</h2>
    )
}
export default HeaderTwo;