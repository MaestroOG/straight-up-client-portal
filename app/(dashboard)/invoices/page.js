import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import CreateInvoiceForm from "@/components/create-invoice-form"
import { getAllInvoices } from "@/lib/invoice"
import { getAllSimpleUsers } from "@/lib/admin"
import { formatDateToYMD } from "@/utils/formUtils"


const InvoicesPage = async () => {
    const initialInvoices = await getAllInvoices();
    const partners = await getAllSimpleUsers();

    console.log(initialInvoices)

    return (
        <div className="p-4">
            <h1 className="text-2xl font-bold mb-4">Invoices</h1>

            <Tabs defaultValue="all" className="w-full">
                {/* --- Tabs --- */}
                <TabsList className="grid grid-cols-2 w-full">
                    <TabsTrigger
                        value="all"
                        className="data-[state=active]:bg-primary data-[state=active]:text-white"
                    >
                        All Invoices
                    </TabsTrigger>
                    <TabsTrigger
                        value="add"
                        className="data-[state=active]:bg-primary data-[state=active]:text-white"
                    >
                        Add Invoice
                    </TabsTrigger>
                </TabsList>

                {/* --- All Invoices Tab --- */}
                <TabsContent value="all" className="mt-4">
                    {initialInvoices.length === 0 && <p className="p-4 text-center">No Invoices.</p>}
                    <div className="grid md:grid-cols-3 gap-4">
                        {initialInvoices.length > 0 && initialInvoices.map((invoice) => (
                            <Card key={invoice?._id} className="rounded-2xl shadow-md">
                                <CardHeader className="flex flex-row items-center justify-between">
                                    <CardTitle className="text-lg">INV-{invoice?._id}</CardTitle>
                                    <Badge
                                        variant={
                                            invoice.status === "Paid"
                                                ? "default"
                                                : invoice.status === "Pending"
                                                    ? "secondary"
                                                    : "destructive"
                                        }
                                    >
                                        {invoice.status}
                                    </Badge>
                                </CardHeader>

                                <CardContent className="space-y-2">
                                    <p className="text-sm text-muted-foreground">Partner: {invoice.partner?.name}</p>
                                    <p className="text-sm text-muted-foreground">Date: {formatDateToYMD(invoice?.updatedAt)}</p>
                                </CardContent>

                                <CardFooter>
                                    <Button asChild className="w-full">
                                        <Link href={`/invoices/${invoice._id}`}>View Details</Link>
                                    </Button>
                                </CardFooter>
                            </Card>
                        ))}
                    </div>
                </TabsContent>

                {/* --- Add Invoice Tab --- */}
                <CreateInvoiceForm partners={partners} />

            </Tabs>
        </div>
    )
}

export default InvoicesPage