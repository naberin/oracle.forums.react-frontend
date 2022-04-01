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
            axios.get(`/api/channels/${params.id}`)
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


    let commentsListing = threadComments.map((comment, index) => {
        return (
            <ThreadComment {...comment} key={index}/>
        )
    });

    let clearNewCommentForm = () => {
        console.log("g");
        setNewCommentMessage("");
    }

    let addNewCommentToThreadComments = c => {
        setThreadComments(old => [...old, c])
    }

    let handleNewCommentMessageChange = e => {
        setNewCommentMessage(e.target.value);
    }

    let handleSubmitComment = e => {
        axios.post(`/api/channels/${params.id}`, {message: message})
            .then(res => {
                let id = res.data.id;
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
                    {!initialFetchError || threadTitle != null && <div className={""}>
                        <h3>{threadTitle}</h3>
                        <div className={"details"}>{threadMessage}</div>
                    </div> }
                    {initialFetchError && !threadTitle && <div className={"message"}>Error: Unable to retrieve thread details.</div>}

                </div>
                {}
                <div className={"thread-comments flex flex-col"}>
                    <div className={"thread-comment-form paper"} >
                        <textarea placeholder={"Share a comment"} className={"app-input"} required={true} onChange={ handleNewCommentMessageChange } value={newCommentMessage}/>
                        <div className={"flex flex-row flex-justify-end"}>
                            <input className={"app-button"} type={"submit"} value={"Submit"} onClick={ e => handleSubmitComment(e) }/>
                        </div>
                    </div>
                    <h4 className={"title paper"}>Comments</h4>
                    { threadComments.length > 0 && commentsListing}
                    { initialFetchError && !threadComments.length &&
                        <div className={"message paper"}>Error: Unable to retrieve thread comments.</div>}
                    { !initialFetchError && !threadComments.length &&
                        <div className={"message paper"}>No comments found. Be the first the share a comment
                            above.</div>}
                </div>

            </Container>
        </section>
    );

}

export default Thread;