const component = function(props) {
    let classes = props.classes ? props.classes : "";
    return (
        <div className={"container " + classes}>
            { props.children }
        </div>
    )
}
export default component;