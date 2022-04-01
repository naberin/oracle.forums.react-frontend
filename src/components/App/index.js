import './app.css';
import AppHeader from "../AppHeader";
import Dashboard from "../Dashboard";
import Thread from "../Thread";
import NewThread from "../NewThread";

import {Route, Routes} from "react-router-dom";
import {useState} from "react";

function Index() {
    const [ currentThread, setCurrentThread ] = useState(null);
    return (

        <div id="app" className="flex flex-col">

            <AppHeader className={"flex-grow-1"}/>
            <main className={"flex-grow-8"}>
                <Routes>
                    <Route path={"/"} element={<Dashboard setCurrentThread={setCurrentThread} /> }/>
                    <Route path={"/submit"} element={<NewThread/>}/>
                    <Route path={"/channels/:id"} element={<Thread currentThread={currentThread} />} />
                </Routes>
            </main>
        </div>

    );
}

export default Index;
