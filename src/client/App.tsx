import React, { useState } from 'react';

import '@/client/App.scss';
import axios from 'axios';

export function App(props: {}) {
    const [address, setAddress] = useState('');
    const submitAddress = async () => {
        try {
            const res = await axios.get(`/geospatial?address=${address}`);
            if(res.status === 200) {
                let foo = res.data;
            }
            else {
                console.log(res);
            }
        }
        catch (e) {
            console.log(e);
            const err = e;
        }
    }
    const getNeighbourRestarants = async () => {
        try {
            const res = await axios.get(`/currentNeighborhoodRestarants`);
            if(res.status === 200) {
                let foo = res.data;
            }
            else {
                console.log(res);
            }
        }
        catch (e) {
            console.log(e);
            const err = e;
        }
    }
    return (
        <>
            <header></header>
            <main>
                <section>
                    <ul>
                        <li><label htmlFor="address">Address: </label></li>
                        <li><input type="text" name="address" id="address" value={address} onChange={(e) => setAddress(e.target.value)} /></li>
                        <li><button onClick={submitAddress}>Submit</button></li>
                        <li><button onClick={getNeighbourRestarants}>Neighbour</button></li>
                    </ul>
                </section>
            </main>
            <footer></footer>
        </>
    );
}