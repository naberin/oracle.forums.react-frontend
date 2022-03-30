import Container from "./Container";

const component = function(props) {
    return (
        <header>
            <Container classes={"flex flex-row flex-justify-between"}>

                <div>
                    <h2>Oracle Forums</h2>
                </div>

                <div/>

            </Container>
        </header>
    )
}

export default component;