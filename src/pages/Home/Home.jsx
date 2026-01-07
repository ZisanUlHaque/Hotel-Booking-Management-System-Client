import React from 'react';
import Banner from './Banner';
import PopularDestination from './PopularDestination';
import HowItWorks from './HowItWorks';


const Home = () => {
    return (
        <div>
            <Banner></Banner>
            <PopularDestination></PopularDestination>
            <HowItWorks></HowItWorks>
        </div>
    );
};

export default Home;