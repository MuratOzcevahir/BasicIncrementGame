import { createContext } from "react";

var contextObj = {
    clickIncrease: () => { }
}

var GameContext = createContext(contextObj);

export default GameContext;