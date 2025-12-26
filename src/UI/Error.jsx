export default function Error({title, errorMsg}){
    return(
        <div className="error">
            <h2>{title}</h2>
            <p>{errorMsg}</p>
        </div>
    )
}