import React, { useContext } from 'react'
import AppContext from '../../../context/Appcontext'

function MenuItem(prop) {

    var ctx = useContext(AppContext);

    function pageChanged() {

        ctx.pageChanger(prop.page);

        console.log(prop.text);

    }

    return (

        < div >
            <li>
                <a href={prop.href} onClick={pageChanged}> {prop.text}</a>

            </li>

        </div >


    )
}

export default MenuItem