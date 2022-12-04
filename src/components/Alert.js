import '../App.css';

const Alert = (props) => {

    return (
        <h4 className={`alert  ${props.data.type}`}>{props.data.msg}</h4>
    )
}
export default Alert