import React from 'react';
import Hero from '../components/home/Hero';
import PopularTours from '../components/home/PopularTours';
import WhyChooseUs from '../components/home/WhyChooseUs';
import Testimonials from '../components/home/Testimonials';
import CallToAction from '../components/home/CallToAction';

const Home = () => {
  return (
    <div>
      <Hero />
      <PopularTours />
      <WhyChooseUs />
      <Testimonials />
      <CallToAction />
    </div>
  );
};

export default Home;
