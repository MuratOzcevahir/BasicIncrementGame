import React, { useContext, useEffect } from 'react'
import FoundItem from '../../context/ItemContext';
var number = 0;
var foundItem = [];
var sendItem = [];
var randomObj = [];
var a;
function RandomItemGenerate() {
    sendItem = useContext(FoundItem);


    var deneme = useContext(FoundItem);
    // useEffect(() => {
    //     RandomNumber();
    //     console.log("syfa yüklendi");

    //     console.log(randomObj);
    // }, []);
    console.log("ITEM SENDING " + sendItem);

    for (let i = 0; i < 10; i++) {

        randomObj.push({ id: i, title: "A item" + i, amount: Math.round((Math.random() * (1, 5000))), price: Math.round(Math.random() * (1, 50)) });
    }
    const BuyItem = (id) => {
        return () => {
            var foundItem = randomObj.filter((element) => { return element.id === id });
            console.log("item send" + sendItem);
            sendItem[0] = foundItem[0];
            var testItem = {

                id: foundItem[0].id,
                title: foundItem[0].title,
                amount: foundItem[0].amount,
                price: foundItem[0].price,
            };
            sendItem.id = foundItem[0].id;
            sendItem.title = foundItem[0].title;
            sendItem.amount = foundItem[0].amount;
            sendItem.price = foundItem[0].price;

            console.log(foundItem);

            console.log("contexlenen item " + sendItem);
            console.log("will send item " + sendItem + " testitem");

            console.log(testItem);
            console.log(id)
        }
    }
    return (
        <>
            <div className='container'>
                {
                    randomObj.map((items, i) => {
                        return (
                            <div key={i} className='row'>
                                <div className='col-1'>
                                    <span> {items.title}</span>

                                </div>      <div className='col-1'>

                                    <h5>{items.amount}</h5>
                                    <h5>{items.price}</h5>
                                </div>
                                <div className='col-3'>
                                    <b onClick={BuyItem(i)}  >   AL</b>

                                </div>
                            </div>
                        )
                    })
                }
                asd
            </div>
        </>
    );
}

export { RandomItemGenerate, foundItem };