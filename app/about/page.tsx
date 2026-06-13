import dynamic from 'next/dynamic'

const Navbar = dynamic(() => import("../../components/Navbar"))
const Footer = dynamic(() => import("../../components/Footer"))
const AboutUs = dynamic(() => import("../../components/AboutUs"))
const Gallery = dynamic(() => import("../../components/Gallery"))

export default function About() {
    return (
        <>
            <Navbar />
            <div className='mt-16'>
                <AboutUs />
            </div>
            <Gallery />
            <Footer />
        </>
    )
}