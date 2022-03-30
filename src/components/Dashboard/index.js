import Thread from "../ThreadLink";
import Container from "../Container";

import React, {useEffect, useState} from "react";
import axios from "axios";

function Dashboard() {
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [threads, setThreads] = useState([])

    useEffect( () => {
        axios.get("/api/threads")
            .then(res => {
                let threads = res.data.threads;
                setThreads(threads);
            })
            .catch(err => {
                setError(err);
            })
            .finally(() => {
                setIsLoaded(true)
            })
    });

    // Map list of threads to threadComponent for display
    let threadsListing = threads.length ?
        threads.map((thread, index) => {
            return (
                <Thread title={thread.title} id={thread.id} key={index}/>
            )
        }) :
        <div className={"message"}>There are currently no threads.</div>;

    return (
        <section className={"page"}>
            <Container>
                <div className={"flex flex-row"}>
                    <div id="forum-threads-list" className={"column flex-grow-6"}>
                        {threadsListing}
                    </div>
                    <div id="forum-details" className={"column flex-grow-4"}>
                    </div>
                </div>
            </Container>
        </section>
    );
}

export default Dashboard;