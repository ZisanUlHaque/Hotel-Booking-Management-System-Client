import React from 'react';
import Banner from './Banner';
import PopularDestination from './PopularDestination';
import HowItWorks from './HowItWorks';
import TestimonialsPreview from './TestimonialsPreview';


const Home = () => {
    return (
        <div>
            <Banner></Banner>
            <PopularDestination></PopularDestination>
            <HowItWorks></HowItWorks>
            <TestimonialsPreview></TestimonialsPreview>
            
        </div>
    );
};

export default Home;