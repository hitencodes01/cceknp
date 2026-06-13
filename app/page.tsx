import dynamic from "next/dynamic"
const Navbar = dynamic(() => import("../components/Navbar"))
const Footer = dynamic(() => import("../components/Footer"))
const AboutUs = dynamic(() => import("../components/AboutUs"))
const DonateSection = dynamic(() => import("../components/BuyMeACoffee"))
const Gallery = dynamic(() => import("../components/Gallery"))
const HeroSection = dynamic(() => import("../components/HeroSection"))
const ISOBanner = dynamic(() => import("../components/ISOBanner"))
function App() {
  return (
    <>
      <Navbar />
      <div className='mt-15'>
        <HeroSection />
      </div>
      <ISOBanner />
      <AboutUs />
      <DonateSection />
      <Gallery />
      <Footer />
    </>
  )
}

export default App