import Container from "@/components/dashboardComponents/Container"
import PricingPDF from "@/components/dashboardComponents/PricingPDF";
import { ArrowDown } from 'lucide-react';

const PricingPage = () => {
    return (
        <Container className="bg-white p-4 mt-6 min-h-[80vh] overflow-hidden md:overflow-auto">
            {/* Download Button
            <div className="flex justify-end mb-4">
                <a
                    href="/Straight Up Digital-pricelist.pdf"
                    download="Straight Up Digital Pricelist"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    <button
                        type="button"
                        className="relative w-40 sm:w-48 h-12 sm:h-14 rounded-2xl bg-white text-black text-base sm:text-lg font-semibold group border border-gray-300"
                    >
                        <div
                            className="bg-red rounded-xl h-10 sm:h-12 w-1/4 flex items-center justify-center absolute left-1 top-[4px] group-hover:w-[90%] z-10 duration-500"
                        >
                            <ArrowDown color="#ffffff" />
                        </div>
                        <p className="translate-x-2 text-sm sm:text-base">Download</p>
                    </button>
                </a>
            </div>

            {/* PDF Section */}
            <div className="w-full h-auto md:h-[70vh] overflow-hidden md:overflow-auto rounded-lg border border-gray-200">
                <PricingPDF />
            </div>

            {/* <p className="text-center text-black p-6">Coming Soon.</p> */}
        </Container>

    )
}

export default PricingPage