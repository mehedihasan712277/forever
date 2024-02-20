import React from 'react'
import Banner from './Banner';
import CountdownTimer from './CountdownTimer';
import Deals from './Deals';
import Products from './Products';

const Home = () => {
    return (
        <>
            <Banner></Banner>
            {/* <CountdownTimer></CountdownTimer>
            <Deals></Deals> */}
            <Products></Products>
        </>
    )
}

export default Home