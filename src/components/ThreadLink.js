import {
    useNavigate
} from "react-router-dom";


const Component = function(props) {

    let navigate = useNavigate();
    let title = props.title;
    let id = props.id;
    let message = props.message;
    let setCurrentThread = props.setCurrentThread;

    return (
        <div className={"thread-component paper flex flex-row"}>
            <div
                className={"title"}
                onClick={() => {
                    setCurrentThread( {title, id, message} )
                    navigate(`/channels/${id}`);
                }}
            >
                <div className={"minified-details flex flex-col"}>
                    <h3>{title}</h3>
                    <span className={"details"}>{message}</span>
                </div>
            </div>

        </div>
    )
}

export default Component;
