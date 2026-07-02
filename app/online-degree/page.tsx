"use client"
import Footer from '@/components/Footer'
import Navbar from '@/components/Navbar'
import { Download } from 'lucide-react';

export default function OnlineDegree() {
  const handleDownload = async () => {
    const response = await fetch("/OnlineDegree.jpeg");
    const blob = await response.blob();
    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = "CCE-Online.jpeg";
    a.click();

    URL.revokeObjectURL(url);
  };
  return (
    <div>
      <Navbar />
      <div className='mt-16'>
        <img className='w-full' src="/OnlineDegree.jpeg" alt="" />
        <button onClick={handleDownload} className="cursor-pointer fixed top-20 right-5 bg-white/60 text-black p-2 py-3 rounded-2xl"><Download className="inline" />{"   "}Download</button>
      </div>
      <Footer />
    </div>
  )
}
