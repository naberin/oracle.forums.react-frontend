import Container from "./Container";
import {Link, useLocation} from "react-router-dom";

const Component = function(props) {
    let location = useLocation();

    return (
        <header>
            <Container classes={"flex flex-row flex-justify-between header-container"}>

                <div className={"links flex flex-row"}>
                    <div className={"app-title"}><h2 className={"title"}>Oracle Forums</h2></div>
                    <Link to={"/"} className={"app-button link"}>Home</Link>
                    <Link to={"submit"} className={"app-button link"}>New Thread</Link>
                </div>

                <div/>

            </Container>
        </header>
    )
}

export default Component;