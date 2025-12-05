import Container from "@/components/dashboardComponents/Container"
import { unslugify } from "@/utils/formUtils";
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion"
import { faqs } from "@/constants";


const FAQDetailPage = async ({ params }) => {
    const { slug } = await params;
    const serviceFaqs = faqs[slug] || [];
    return (
        <Container className={'bg-white p-4 rounded-lg'}>
            <div className="flex items-center justify-between gap-4">
                <h1 className="text-xl font-medium">FAQs of {unslugify(slug)}</h1>
            </div>
            <Accordion
                type="single"
                collapsible
                className="w-full mt-6"
                defaultValue="item-1"
            >
                {serviceFaqs.length === 0 && (
                    <p className="text-center">No FAQs available for this service.</p>
                )}
                {serviceFaqs.map((faq, index) => (
                    <AccordionItem key={index} value={`item-${index + 1}`}>
                        <AccordionTrigger className='font-bold'>{faq.question}</AccordionTrigger>
                        <AccordionContent className="flex flex-col gap-4 text-balance">
                            <p>{faq.answer}</p>
                        </AccordionContent>
                    </AccordionItem>
                ))}
            </Accordion>
        </Container>
    )
}

export default FAQDetailPage