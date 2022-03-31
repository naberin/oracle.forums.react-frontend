import Thread from "../ThreadLink";
import Container from "../Container";

import React, {useEffect, useState} from "react";
import axios from "axios";

function Dashboard() {
    const [message, setMessage] = useState("");
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [threads, setThreads] = useState([{title: "this is nice", id:12}])

    useEffect( () => {
        let getAllThreads = () => {
            axios.get("/api/threads")
                .then(res => {
                    let threads = res.data.threads;
                    setThreads(threads);

                    if (!threads) setMessage("There are currently no threads.");
                })
                .catch(err => {
                    setError(err);
                    setMessage("Error: Encountered an error in fetching threads.");
                })
                .finally(() => {
                    setIsLoaded(true)
                })
        }
        getAllThreads();

    }, []);

    // Map list of threads to threadComponent for display
    let threadsListing = threads.length ?
        threads.map((thread, index) => {
            return (
                <Thread title={thread.title} id={thread.id} key={index}/>
            )
        }) :
        <div className={"message"}>{ message }</div>;

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