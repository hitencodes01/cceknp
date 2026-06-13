import dynamic from "next/dynamic";

const Form = dynamic(() => import("../../components/Form"))
const Navbar = dynamic(() => import("../../components/Navbar"))
const Footer = dynamic(() => import("../../components/Footer"))


export default function CertificateVerification() {
    return (
        <div>
            <Navbar />
            <Form />
            <Footer />
        </div>
    )
}
