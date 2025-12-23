

const PricingPDF = () => {

    const isMobile =
        typeof window !== "undefined" &&
        /Android|iPhone|iPad|iPod/i.test(navigator.userAgent);

    const pdfUrl = '/sud-pricelist.pdf'

    return (
        <>
            {!isMobile && <iframe
                src={`${pdfUrl}#toolbar=0&navpanes=0&scrollbar=0`}
                className="w-full h-full"
                title="PDF Preview"
            />}
            {isMobile && <div className="flex items-center justify-center h-full">
                <a
                    href={pdfUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-4 py-2 rounded-md bg-black text-white text-sm"
                >
                    Open PDF
                </a>
            </div>}
        </>
    )
}

export default PricingPDF