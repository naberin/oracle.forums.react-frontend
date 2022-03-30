import Container from "./Container";
import {Link, useLocation} from "react-router-dom";

const Component = function(props) {
    let location = useLocation();

    return (
        <header>
            <Container classes={"flex flex-row flex-justify-between"}>

                <div className={"links flex flex-row"}>
                    <h2 className={"title"}>Oracle Forums</h2>
                    <Link to={"/"} className={"app-button"}>Home</Link>
                    <Link to={"submit"} className={"app-button"}>New Thread</Link>
                </div>

                <div/>

            </Container>
        </header>
    )
}

export default Component;