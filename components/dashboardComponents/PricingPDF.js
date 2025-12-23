const PricingPDF = () => {

    const pdfUrl = '/sud-pricelist.pdf'

    return (
        <embed
            src={pdfUrl + "#toolbar=0&navpanes=0&scrollbar=0"}
            type="application/pdf"
            className="w-full h-full"
        />
    )
}

export default PricingPDF