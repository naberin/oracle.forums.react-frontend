import thread from "../ThreadLink";
import Container from "../Container";

import React from "react";

class Dashboard extends React.Component {

    render() {
        // Map list of threads to threadComponent for display
        let threads = [].map( (thread) => {
            return (
                <thread />
            )
        });

        return (
            <section>
                <Container>
                    T
                </Container>
            </section>
        );
    }
}
export default Dashboard;