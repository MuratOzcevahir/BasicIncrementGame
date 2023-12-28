import { createContext } from "react";
var itemObj = {
    id: 15,
    title: "testtt",
    amount: 99,
    price: 99

};

var obj = {
    itemObj,
    activeItem: {}
}
var FoundItem = createContext(obj);

export default FoundItem;


