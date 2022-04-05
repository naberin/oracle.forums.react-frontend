import React, {useEffect, useState} from "react";
import Container from "../Container";
import {useParams} from "react-router-dom";
import axios from "axios";
import ThreadComment from "../ThreadComment";

function Thread(props) {

    let {title, message, id} = props.currentThread ? props.currentThread : {title: "", message: "", id: ""};
    let params = useParams();

    const [threadComments, setThreadComments] = useState([]);
    const [threadMessage, setThreadMessage] = useState(message);
    const [threadTitle, setThreadTitle] = useState(title);
    const [newCommentMessage, setNewCommentMessage] = useState("");
    const [newCommentAuthor, setNewCommentAuthor] = useState("anonymous");

    const [initialFetchError, setInitialFetchError] = useState(null);
    const [postCommentError, setPostCommentError] = useState(null);

    useEffect(() => {
        let getThread = () => {
            axios.get(`${process.env.REACT_APP_API_ENDPOINT}/api/threads/${params.id}`)
                .then(res => {
                    let details = res.data;
                    setThreadTitle(details.title);
                    setThreadMessage(details.message);
                    setThreadComments(details.comments);
                })
                .catch(err => {
                    setInitialFetchError(err);

                })
        }

        getThread();
    }, [])


    let commentsListing = () => {
        if (threadComments && threadComments.length) {

            function commentComparison(a, b) {
                if (a.id > b.id) return 1;

                else if (b.id > a.id) return -1;

                return 0;
            }

            threadComments.sort( commentComparison );
            return threadComments.map( (comment, index) => {
                return (
                    <ThreadComment {...comment} key={index}/>
                )
            });
        }
        else if (initialFetchError !== null) {
            return ( <div className={"message paper"}>Error: Unable to retrieve thread comments.</div> )
        }
        else {
            return ( <div className={"message paper"}>No comments found. Be the first the share a comment
            above.</div> )
        }

    }

    let clearNewCommentForm = () => {
        setNewCommentMessage("");
    }

    let addNewCommentToThreadComments = c => {
        if (threadComments.length > 0) {
            setThreadComments(old => [...old, c])
        }
        else {
            setThreadComments([c])
        }
    }

    let handleNewCommentMessageChange = e => {
        setNewCommentMessage(e.target.value);
    }

    let handleSubmitComment = e => {
        axios.post(`${process.env.REACT_APP_API_ENDPOINT}/api/threads/${params.id}`, {message: newCommentMessage})
            .then(res => {
                let id = res.data.message_id;
                addNewCommentToThreadComments({id: id, message: newCommentMessage, author: newCommentAuthor})

                clearNewCommentForm();
            })
            .catch(err => {
                e.preventDefault();
                setPostCommentError(err);
            });
    }

    return (
        <section className={"page"}>
            <Container className={"flex flex-col"}>
                <div className={"thread-details paper flex flex-col"}>
                    <div className={""}>
                        <h3>{threadTitle}</h3>
                        <div className={"details"}>{threadMessage}</div>
                    </div>
                    {initialFetchError && !threadTitle && <div className={"message"}>Error: Unable to retrieve thread details.</div>}

                </div>
                {}
                <div className={"thread-comments flex flex-col"}>
                    <h4 className={"title paper"}>Comments</h4>
                    <div className={"thread-comment-form paper"} >
                        <textarea placeholder={"Share a comment"} className={"app-input"} required={true} onChange={ handleNewCommentMessageChange } value={newCommentMessage}/>
                        <div className={"flex flex-row flex-justify-end"}>
                            <input className={"app-button"} type={"submit"} value={"Submit"} onClick={ e => handleSubmitComment(e) }/>
                        </div>
                    </div>
                    { commentsListing() }
                </div>

            </Container>
        </section>
    );

}

export default Thread;