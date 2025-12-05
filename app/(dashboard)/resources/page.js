import AddResourceForm from "@/components/add-resource-form";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { getUser } from "@/lib/user"
import { getAllCreatedCategories, getAllResources, getResourceCategories } from "@/lib/admin";
import { formatDateToYMD } from "@/utils/formUtils";
import ResourceDeletionForm from "@/components/resource-deletion-form";
import ResourceEditForm from "@/components/resource-edit-form";
import CreateResourceCategoryForm from "@/components/create-resource-category-form";
import ResourceFilterSelect from "@/components/resource-filter-select";
import Container from "@/components/dashboardComponents/Container";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import DeleteCategoryForm from "@/components/delete-category-form";

const ResourcesPage = async ({ searchParams }) => {
    const user = await getUser();
    let resources = await getAllResources();
    const categories = await getResourceCategories();
    const { filter } = await searchParams;


    if (filter) {
        resources = resources.filter(resource =>
            resource?.category?.name?.includes(filter)
        );
    }

    return (
        <div className='p-1 md:p-4'>
            <h1 className="text-2xl font-bold mb-4">Resources</h1>

            <Tabs defaultValue="all" className="w-full">
                {/* --- Tabs --- */}
                <TabsList className="grid grid-cols-3 gap-2 max-sm:grid-cols-1 w-full max-sm:mb-12">
                    <TabsTrigger
                        value="all"
                        className="data-[state=active]:bg-primary data-[state=active]:text-white"
                    >
                        All Resources
                    </TabsTrigger>
                    {user?.role === 'superadmin' && (
                        <>
                            <TabsTrigger
                                value="add"
                                className="data-[state=active]:bg-primary data-[state=active]:text-white"
                            >
                                Add Resources
                            </TabsTrigger>
                            <TabsTrigger
                                value="category"
                                className="data-[state=active]:bg-primary data-[state=active]:text-white"
                            >
                                Add Category
                            </TabsTrigger>
                        </>
                    )}
                </TabsList>

                <TabsContent value="all" className="mt-4">
                    <div className="flex items-center justify-end max-sm:flex-col max-sm:items-start max-sm:gap-2 max-sm:mb-4">
                        <p className="text-sm text-muted-foreground mr-2">Total Resources: {resources.length}</p>
                        <ResourceFilterSelect categories={categories} />
                    </div>
                    {resources.length === 0 && <p className="p-4 text-center">No Resources.</p>}
                    <div className="grid md:grid-cols-3 gap-4">
                        {resources.length > 0 && resources.map((resource) => (
                            <Card key={resource?._id} className="rounded-2xl shadow-md">
                                <CardHeader className="flex flex-row items-center justify-between">
                                    <CardTitle className="text-lg">{resource?.title ?? ""}</CardTitle>
                                    {user?.role === 'superadmin' && <div className="flex items-center gap-2">
                                        <ResourceDeletionForm resourceId={resource?._id} />
                                        <ResourceEditForm categories={categories} resource={resource} />
                                    </div>
                                    }
                                </CardHeader>

                                <CardContent className="space-y-2">
                                    <p className="text-sm text-muted-foreground">Category: {resource?.category?.name || 'Uncategorized'}</p>
                                    <p className="text-sm text-muted-foreground">Date: {formatDateToYMD(resource?.createdAt)}</p>

                                    <a
                                        href={resource?.fileUrl}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-primary underline text-sm"
                                    >
                                        View / Download
                                    </a>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </TabsContent>

                <TabsContent value="add" className="max-sm:mt-4">
                    <AddResourceForm categories={categories} />
                </TabsContent>

                <TabsContent value="category" className="grid gap-6 max-sm:mt-4">
                    <CreateResourceCategoryForm />
                    <Container className={'bg-white p-2 md:p-4'}>
                        <h1 className="text-xl font-semibold mb-4">Created Categories</h1>
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead className="w-[100px]">Category Name</TableHead>
                                    <TableHead className="text-right">Actions</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {(!categories || categories.length === 0) && (
                                    <TableRow>
                                        <TableCell colSpan={2} className="text-center">
                                            No categories created.
                                        </TableCell>
                                    </TableRow>
                                )}

                                {categories && categories.map((category) => (
                                    <TableRow key={category._id}>
                                        <TableCell>{category.name}</TableCell>
                                        <TableCell className="text-right">
                                            <DeleteCategoryForm categoryId={category?._id} />
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </Container>
                </TabsContent>

            </Tabs>
        </div>
    )
}

export default ResourcesPage