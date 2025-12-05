'use client';

import { useCountry } from "@/hooks/useCountry";

const PricingPDF = () => {
    const { countryCode, loading, error } = useCountry();

    if (loading) return <p className="text-center p-4">Loading pricing document...</p>;
    if (error) return <p className="text-center p-4">Unable to load pricing document</p>;

    const pdfUrl =
        countryCode?.trim() === "ZA"
            ? "/Straight Up Digital-pricelist-south-africa.pdf"
            : "/Straight Up Digital-pricelist.pdf";

    return (
        <embed
            src={pdfUrl + "#toolbar=0&navpanes=0&scrollbar=0"}
            type="application/pdf"
            className="w-full h-full"
        />
    )
}

export default PricingPDF