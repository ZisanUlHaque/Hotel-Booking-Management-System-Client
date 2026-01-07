import React from 'react';
import Banner from './Banner';
import PopularDestination from './PopularDestination';
import HowItWorks from './HowItWorks';
import TestimonialsPreview from './TestimonialsPreview';
import BlogPreview from './BlogPreview';


const Home = () => {
    return (
        <div>
            <Banner></Banner>
            <PopularDestination></PopularDestination>
            <HowItWorks></HowItWorks>
            <TestimonialsPreview></TestimonialsPreview>
            <BlogPreview></BlogPreview>
        </div>
    );
};

export default Home;