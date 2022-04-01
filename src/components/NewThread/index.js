import React, {useEffect, useState} from "react";
import Container from "../Container";
import axios from "axios";
import {useNavigate} from "react-router-dom";
import {clear} from "@testing-library/user-event/dist/clear";

function Component() {
    let navigateTo = useNavigate();
    const [subject, setSubject] = useState("");
    const [message, setMessage] = useState("");
    const [error, setError] = useState(null);

    const handleSubjectChange = (e) => {
        setSubject(e.target.value);

    }
    const handleMessageChange = e => {
        setMessage(e.target.value);
    }

    const clearForm = () => {
        setSubject("");
        setMessage("");
    }

    const handleSubmit = e => {
        axios.post("/", {subject, message})
            .then( res => {
                let id = res.data.id;
                clearForm();
                navigateTo(`/channels/${id}`)
            })
            .catch( err => {
                setError(err);
            })
    }

    return (
        <section className={"page"}>
            <Container className={"flex flex-row"}>
                <div className={"thread-form-container"}>
                    <div className={"title paper"}>
                        Create a New Thread
                    </div>
                    <div className={"thread-form flex flex-col paper"}>
                        <input placeholder={"Subject"} className={"app-input"} required={true} value={subject} onChange={ handleSubjectChange }/>
                        <textarea placeholder={"Message"} id={""} className={"app-input"} value={message} onChange={ handleMessageChange }/>
                        <div className={"flex flex-row flex-justify-end"}>
                            <input type={"submit"} value={"Submit"} className={"app-button"} onClick={ handleSubmit }/>
                        </div>
                    </div>
                </div>
            </Container>
        </section>
    );

}

export default Component;