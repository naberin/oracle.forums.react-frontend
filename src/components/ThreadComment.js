
const Component = function(props) {

    let id = props.id;
    let message = props.message;
    let author = "anonymous";
    let created = props.created ? props.created : "";
    let edited = props.edited;

    return (
        <div className={"thread-comment paper flex flex-row"}>
            <div className={"title"} >
                <div className={"comment flex flex-col"}>
                    <div className={"info flex flex-row"}>
                        <span className={"author"}>{author}</span>
                        <span className={"audit"}>{edited ? edited : created}</span>
                    </div>
                    <span className={"comment-details"}>{message}</span>
                </div>
            </div>

        </div>
    )
}

export default Component;
