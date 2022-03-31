import React, {useEffect, useState} from "react";
import Container from "../Container";
import axios from "axios";
import {useNavigate} from "react-router-dom";

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
    const handleSubmit = e => {
        axios.post("/submit", {subject, message})
            .then( res => {
                let id = res.data.id;
                navigateTo(`/users/${id}`)
            })
            .catch( err => {
                e.preventDefault()
                setError(err);
            })
    }

    return (
        <section className={"page"}>
            <Container className={"flex flex-row"}>
                <div className={"thread-form-container paper"}>
                    <div className={"title"}>
                        Create a New Thread
                    </div>
                    <form className={"thread-form flex flex-col"} onSubmit={ handleSubmit }>
                        <input placeholder={"Subject"} className={"app-input"} required={true} onChange={ handleSubjectChange }/>
                        <textarea placeholder={"Message"} id={""} className={"app-input"}/>
                        <div className={"flex flex-row flex-justify-end"}>
                            <input type={"submit"} value={"Submit"} className={"app-button"}/>
                        </div>
                    </form>
                </div>
            </Container>
        </section>
    );

}

export default Component;