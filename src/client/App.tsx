import React from 'react';

import '@/client/App.scss';
import axios from 'axios';

export function App(props: {}) {
    const submitAddress = async () => {
        const res = await axios.get('/address');
        if(res.status === 200) {
            let foo = res.data;
        }
        else {
            console.log(res);
        }
    }
    return (
        <>
            <header></header>
            <main>
                <section>
                    <ul>
                        <li><label htmlFor="address">Address: </label></li>
                        <li><input type="text" name="address" id="address" /></li>
                        <li><button onClick={submitAddress}>Submit</button></li>
                    </ul>
                </section>
            </main>
            <footer></footer>
        </>
    );
}