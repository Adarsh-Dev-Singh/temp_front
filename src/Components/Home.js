import React, { useState, useEffect } from 'react';
import Gallery from './Gallery'
import Info from './Info'
import Support from './Support'
import Explore from './Explore'
import ExplorePhone from './ExplorePhone';
import Para from './para';
import TrendLineGraph from './TrendLineGraph';
const Home = () => {
  const [isDestop, setIsDestop] = useState(false);

  useEffect(() => {
   
    const handleResize = () => {
      setIsDestop(window.innerWidth >= 768);
    };

    handleResize();
    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div>
      {isDestop && <DesktopComponent />}
      {!isDestop && <MobileComponent />}
    </div>
  );
};

const DesktopComponent = () => {
  return (
    <>
    {/* <Gallery sli_de={3} /> */}
    {/* <Para/>
    <Explore/>
    <Info/>
    <Support/> */}
    </>
  );
};

const MobileComponent = () => {
  return (
   <>
    <Para/>
    <TrendLineGraph/>
   <Gallery sli_de={1} />
   <ExplorePhone/>

   
   </>
  );
};

export default Home;
