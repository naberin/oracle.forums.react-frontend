import {
    useNavigate
} from "react-router-dom";


const Component = function(props) {

    let navigate = useNavigate();

    let title = props.title;
    let id = props.id;

    return (
        <div className={"thread-component paper flex flex-row"}>
            <div className={"title"}  onClick={() => {navigate("/threads/" + id)}}><h3>{title}</h3></div>

        </div>
    )
}

export default Component;
