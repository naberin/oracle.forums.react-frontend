import Thread from "../ThreadLink";
import Container from "../Container";

import React, {useEffect, useState} from "react";
import axios from "axios";

function Dashboard(props) {

    const [message, setMessage] = useState("");
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [threads, setThreads] = useState([])


    // Raising props up to App by setting currentThread
    let setCurrentThread = props.setCurrentThread

    useEffect( () => {
        let getAllThreads = () => {
            axios.get(`${process.env.REACT_APP_API_ENDPOINT}/api/threads`)
                .then(res => {
                    let threads = res.data.items;
                    setThreads(threads);

                    if (!threads.length) {
                        setMessage("There are currently no threads.");
                    }
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

        setCurrentThread(null);

    }, []);

    // Map list of threads to threadComponent for display
    let threadsListing = threads && threads.length > 0 ?
        threads.map((thread, index) => {
            return (
                <Thread
                    setCurrentThread = {setCurrentThread}
                    title={thread.title}
                    message={thread.message}
                    id={thread.id}
                    key={index}
                />
            )
        }) :
        <div className={"message"}>{ message }</div>;

    return (
        <section className={"page"}>
            <Container>
                <div className={"flex flex-row"}>
                    <div id="forum-threads-list" className={"column flex-grow-10"}>
                        {threadsListing}
                    </div>
                </div>
            </Container>
        </section>
    );
}

export default Dashboard;