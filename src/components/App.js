import './App.css';
import AppHeader from "./AppHeader";
import Dashboard from "./Dashboard";
import Thread from "./Thread";
import NewThread from "./NewThread";

import {Route, Routes} from "react-router-dom";

function App() {
  return (
    <div id="app" className="flex flex-col">
        <AppHeader className={"flex-grow-1"}/>
        <main className={"flex-grow-8"}>
            <Routes>
                <Route path={"/"} element={ <Dashboard/> }/>
                <Route path={"/submit"} element={ <NewThread/> }/>
                <Route path={"/user/:id"} element={ <Thread/> }/>
            </Routes>
        </main>

    </div>
  );
}

export default App;
