import React, { useContext, useEffect, useState } from "react";
import FoundItem from "./components/context/ItemContext";
import { RandomItemGenerate, foundItem } from "./components/pages/random-generator/RandomItemGenerate";
var GameData = [];
var StatsGameData = [];

var OldStatsGameData = [];
var OldGameSaveData = [];
var gameAutoSaved;
var oldDate = new Date();
var timer;
// satts
var statBuy = 0;
var statClick = 0;
var statTick = 0;
var bought = 0;
var statPrestigeBuy = 0;
var a;
// stats
var price = 25;
var multipler = 1;
var total = 1;
var abc = 1;
var prestige = 1;
var prestigePrice = 1;
var GetStatsSavedData = localStorage.getItem("StatsSaveGame");

var GetGameSavedData = localStorage.getItem("GameSaveData");
function App() {
    var TESTITEM = useContext(FoundItem);

    console.log("app tekrar yüklendi");


    var [gameSave, setgameSave] = useState(0);
    var [changed, setchanged] = useState(0);
    const [ACTIVEITEM, setACTIVEITEM] = useState(TESTITEM.itemObj);

    console.log(ACTIVEITEM);
    function SetItemMethod(item) {
        setACTIVEITEM(item);
    }




    useEffect(() => {

        if (GetStatsSavedData !== null) {
            OldStatsGameData = JSON.parse(GetStatsSavedData);
        }
        else {
            OldStatsGameData = [
                {
                    Save_Tick: 0,
                    Save_Click: 0,
                    Save_Bought: 0,
                    Save_Prestige: 0
                }
            ]
        }
        if (GetGameSavedData !== null) {
            OldGameSaveData = JSON.parse(GetGameSavedData);

            multipler = OldGameSaveData[0].Save_Multiplier;
            prestige = OldGameSaveData[0].Save_Prestige;
            total = OldGameSaveData[0].Save_Total;
            oldDate = OldGameSaveData[0].Save_Date;

            prestigePrice = prestigePrice * (100 * prestige * 1.9);
            price = price * multipler * 2;

            console.log("satın alma poarası " + price);
            var newEnterDate = new Date();
        }
        var msDiff = newEnterDate - oldDate;
        var diff =
            Math.round(
                msDiff / 1000
            );
        document.getElementById("text_offline_time").append("önceki total " + total + " <br>");
        var offlineTotal = (diff * prestige * multipler);

        if (isNaN(diff)) {
            diff = 1;
        }
        total = total + (diff * prestige * multipler);

        console.log("geçen süre " + diff + " şu an" + newEnterDate + " önceki kayıt " + oldDate);
        document.getElementById("text_offline_time").append("çevrimdışı toplamı: " + offlineTotal + " ,,,,, şimdiki toplam : " + total + " ,,,,,,," + diff + " saniye çevrimdışıydın");


        document.getElementById("text_multiply_amount").innerText = "Artım =  " + multipler + " Prestij =" + prestige;

    }, []);

    useEffect(() => {

        document.getElementById("stat_total_tick_Current").innerText = "Tick = " + statTick;
        document.getElementById("stat_total_click_Current").innerText = "Click = " + statClick;
        document.getElementById("stat_total_buy_Current").innerText = "Bought = " + statBuy;
        document.getElementById("stat_total_prestige_Current").innerText = "Prestige = " + statPrestigeBuy;
        document.getElementById("hata").innerText = "";
        document.getElementById("btn_prestige").innerText = "  PRESTIGE FOR : " + prestigePrice;

    }, [changed]);
    useEffect(() => {
        timer = setInterval(() => {


            total += (multipler * prestige);
            statTick++;

            document.getElementById("text_per_seconds").innerHTML = "| " + (multipler * prestige) + "/s";

            document.getElementById("timegone").innerText = " " + total.toLocaleString() + "  |";

        }, 1000);
        gameAutoSaved = setInterval(() => {
            SaveGame();
            document.getElementById("is_game_saved").innerText = "Autosave!";
        }, 5000);

        return () => { clearInterval(timer); clearInterval(gameAutoSaved); };
    }, []);

    function Increase() {
        console.log(foundItem);

        total += (multipler * prestige);
        statClick++;
        document.getElementById("timegone").innerText = total + " |";

    }
    function Buy() {
        if (total >= price) {
            bought++;
            total = total - price;
            multipler++;
            price = 25;
            price = price * multipler * 2 * 5.9;
            statBuy++;
            document.getElementById("btn_buy").innerText = "Satın al for = " + price;
            document.getElementById("text_multiply_amount").innerText = "Artım =  " + multipler + " Prestij =" + prestige;
        }
        else {
            document.getElementById("hata").innerText = "Yükseltme için yetersiz";

        }
    }
    function Prestige() {
        if (total >= prestigePrice) {
            prestige++;
            statPrestigeBuy++;
            total = total - prestigePrice;
            prestigePrice = 1;
            prestigePrice = prestigePrice * (100 * prestige * 1.9);


            console.log("prestij parası " + prestigePrice + " prestige" + prestige);
            document.getElementById("btn_prestige").innerText = " PRESTIGE FOR : " + prestigePrice;
        }
        else {
            document.getElementById("hata").innerText = "Prestij için para yetersiz";
        }

    }
    function SaveGame() {
        var today = new Date();

        GameData = [
            {
                Save_Total: total,
                Save_Prestige: prestige,
                Save_Multiplier: multipler,
                Save_Date: Date.parse(today)
            }
        ];
        StatsGameData = [
            {
                Save_Click: (statClick + OldStatsGameData[0].Save_Click),
                Save_Tick: (statTick + OldStatsGameData[0].Save_Tick),
                Save_Bought: (statBuy + OldStatsGameData[0].Save_Bought),
                Save_Prestige: (statPrestigeBuy + OldStatsGameData[0].Save_Prestige),
            }
        ];
        localStorage.setItem("StatsSaveGame", JSON.stringify(StatsGameData));
        localStorage.setItem("GameSaveData", JSON.stringify(GameData));
    }
    useEffect(() => {
        document.getElementById("stat_total_tick").innerText = "Tick = " + (OldStatsGameData[0].Save_Tick + statTick);
        document.getElementById("stat_total_click").innerText = "Click = " + (OldStatsGameData[0].Save_Click + statClick);
        document.getElementById("stat_total_buy").innerText = "Bought = " + (OldStatsGameData[0].Save_Bought + statBuy);
        document.getElementById("stat_total_prestige").innerText = "Prestige = " + (OldStatsGameData[0].Save_Prestige + statPrestigeBuy);

    }, [gameSave, changed]);


    return (
        < >
            <span>AKTİF İTEm :  {ACTIVEITEM.amount}</span>
            <div>
                ASD ASD asd
            </div>
            <button onClick={Increase}> Arttır</button>
            <button id="btn_buy" onClick={Buy}> Satın al for = {price}</button>
            <span id="text_multiply_amount"> </span><br></br>
            <div className="d-flex">
                <div id="timegone">
                    sayı
                </div>
                <span id="text_per_seconds">  </span>
            </div>


            <span id="hata"> </span>

            <div className="container">
                <div className="row">
                    <div className="col-2">

                        <hr />
                        Statistic - Current
                        <hr />
                        <span id="stat_total_click_Current">Click = {statClick}</span><br></br>
                        <span id="stat_total_tick_Current">Tick = {statTick}</span><br></br>
                        <span id="stat_total_buy_Current">Bought = {statBuy}</span><br></br>
                        <span id="stat_total_prestige_Current">Prestige = {statBuy}</span>

                        <hr />

                    </div>
                    <div className="col-2">


                        <hr />
                        Statistic - Total
                        <hr />
                        <span id="stat_total_click"> </span><br></br>
                        <span id="stat_total_tick"> </span><br></br>
                        <span id="stat_total_buy"> </span><br></br>
                        <span id="stat_total_prestige"> </span>

                        <hr />
                    </div>
                </div>
            </div>
            <button id="btn_prestige" onClick={Prestige}> PRESTIGE FOR :  {prestigePrice}</button>


            <button type="button" onClick={SaveGame}> Save Game</button>
            <span id="is_game_saved"></span>

            <hr />

            <span id="text_offline_time">  </span>
            <hr></hr>
            <FoundItem.Provider value={{ activeItem: SetItemMethod }}>
                <RandomItemGenerate />
            </FoundItem.Provider>

        </ >
    );
}
export default App;
