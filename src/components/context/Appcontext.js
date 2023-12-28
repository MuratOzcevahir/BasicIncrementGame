import { createContext } from "react";
import Home from "../pages/page-home/Home";

var contextObject = {

    activePage: <Home />,
    pageChanger: () => { }

};
var AppContext = createContext(contextObject);

export default AppContext;



