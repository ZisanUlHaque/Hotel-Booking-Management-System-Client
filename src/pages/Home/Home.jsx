import React from 'react';
import Banner from './Banner';
import PopularDestination from './PopularDestination';
import HowItWorks from './HowItWorks';
import TestimonialsPreview from './TestimonialsPreview';
import BlogPreview from './BlogPreview';
import Marque from './Marque';



const Home = () => {
    return (
        <div>
            <Banner></Banner>
                        <HowItWorks></HowItWorks>
            <PopularDestination></PopularDestination>
            <Marque></Marque>
            <TestimonialsPreview></TestimonialsPreview>
            <BlogPreview></BlogPreview>
        </div>
    );
};

export default Home;