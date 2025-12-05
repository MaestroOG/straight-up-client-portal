'use server'

import { addExpenditure } from "@/lib/admin";
import { uploadFilesToCloudinary } from "@/lib/cloudinary";
import { connectDB } from "@/lib/mongodb";
import { getUser } from "@/lib/user";
import Category from "@/models/Category";
import HowToVideo from "@/models/HowToVideo";
import Project from "@/models/Project";
import Resource from "@/models/Resource";
import User from "@/models/User";
import { getYouTubeEmbedUrl } from "@/utils/formUtils";
import { revalidatePath } from "next/cache";

export async function createManager(prevState, formData) {
    const userId = formData.get('userId');
    const service = formData.get('service');

    try {
        await connectDB();
        const user = await User.findByIdAndUpdate(
            userId,
            {
                $set: { role: "manager" },
                $addToSet: { serviceManager: service },
            },
            { new: true }
        );

        return {
            success: true,
            message: "Role Assigned Successfully"
        }
    } catch (error) {
        return {
            success: false,
            message: error.message
        }
    }
}


export async function updateUserDetails(formValues, prevState, formData) {
    const userId = formData.get("userId")

    await connectDB();

    try {
        const updatedUser = await User.findByIdAndUpdate(userId, { $set: formValues })

        if (!updatedUser) {
            throw new Error("User not found");
        }

        return {
            success: true,
            message: "User updated successfully"
        }
    } catch (error) {
        console.error(error)
        return {
            success: false,
            message: "Something went wrong. Please try again.",
        };
    }
}

export async function addResource(prevState, formData) {
    const title = formData.get('title');
    const file = formData.get('file');
    const resourceLink = formData.get('resourceLink');
    const category = formData.get('category');


    if ((!file || file.size === 0) && !resourceLink) {
        return {
            success: false,
            message: "Please upload a valid file or provide a resource link.",
        };
    }

    let fileUrl;

    try {

        if (file && file.size > 0) {
            fileUrl = await uploadFilesToCloudinary(file);
        }

        else if (resourceLink && (!file || file.size === 0)) {
            fileUrl = resourceLink;
        }
    } catch (error) {
        if (error?.response?.status === 413) {
            return {
                success: false,
                message: "File is too large. Please upload a smaller file.",
            };
        }

        return {
            success: false,
            message: "Something went wrong during upload.",
        };
    }


    try {
        await connectDB();

        const resource = await Resource.create({
            title,
            fileUrl,
            category: category || null
        })

        if (!resource) {
            return {
                success: false,
                message: "Failed to add resource. Please try again."
            }
        }
    } catch (error) {
        return {
            success: false,
            message: "Something went wrong. Please try again."
        }
    }

    revalidatePath('/', 'layout')

    return {
        success: true,
        message: "Resource added successfully"
    }
}

export async function addHowToVideo(prevState, formData) {
    const title = formData.get('title')?.trim();
    const link = formData.get('videoLink')?.trim();

    try {

        const videoLink = getYouTubeEmbedUrl(link);

        await connectDB();

        await HowToVideo.create({
            title,
            videoLink
        })

        revalidatePath('/', 'layout');

        return {
            success: true,
            message: "Video added Successfully"
        }

    } catch (error) {
        return {
            success: false,
            message: "Something went wrong."
        }
    }
}

export async function deleteHowToVideo(prevState, formData) {
    const videoId = formData.get('videoId');

    if (!videoId) {
        return {
            success: false,
            message: 'No valid id received'
        }
    }

    try {
        await connectDB();

        const deletedVideo = await HowToVideo.findByIdAndDelete(videoId);
        if (deletedVideo) {
            revalidatePath('/how-to', 'page');
            return {
                success: true,
                message: 'Video deleted successfully'
            }
        }

        return {
            success: false,
            message: 'Something went wrong'
        }
    } catch (error) {
        return {
            success: false,
            message: 'Something went wrong'
        }
    }
}

export async function editHowToVideo(prevState, formData) {
    const videoId = formData.get('videoId');
    const title = formData.get('title');
    const videoLink = formData.get('videoLink');

    if (!title || !videoLink) {
        return {
            success: false,
            message: 'You cannot leave the fields empty'
        }
    }

    if (!videoId) {
        return {
            success: false,
            message: 'No valid id received'
        }
    }

    try {
        await connectDB();

        const updates = {};

        if (title) {
            updates.title = title;
        }

        if (videoLink) {
            const embedUrl = getYouTubeEmbedUrl(videoLink);
            if (!embedUrl) {
                return {
                    success: false,
                    message: 'Please provide a valid YouTube link'
                }
            }
            updates.videoLink = embedUrl;
        }

        const editedVideo = await HowToVideo.findByIdAndUpdate(videoId, { $set: updates });

        if (editedVideo) {
            revalidatePath('/how-to', 'page');
            return {
                success: true,
                message: 'Video edited successfully'
            }
        }

        return {
            success: false,
            message: 'Something went wrong'
        }
    } catch (error) {
        return {
            success: false,
            message: 'Something went wrong'
        }
    }
}

export async function deleteResource(prevState, formData) {
    const resourceId = formData.get('resourceId');

    try {
        await connectDB();
        await Resource.findByIdAndDelete(resourceId);


        revalidatePath('/resources', "page");
        return {
            success: true,
            message: 'Resource deleted successfully.'
        }
    } catch (error) {
        return {
            success: false,
            message: 'Something went wrong.'
        }
    }
}

export async function editResource(prevState, formData) {
    const title = formData.get('title')?.trim();
    const file = formData.get('file');
    const resourceId = formData.get('resourceId');
    const resourceLink = formData.get('resourceLink')?.trim();
    const category = formData.get('category');

    const updateData = {};
    if (title) updateData.title = title;

    if (category) updateData.category = category;

    let fileUrl;

    if (file && file.size > 0) {
        try {
            updateData.fileUrl = await uploadFilesToCloudinary(file);
        } catch (err) {
            console.error(err);
            if (err?.response?.status === 413) {
                return {
                    success: false,
                    message: "File is too large. Please upload a smaller file.",
                };
            }
            return {
                success: false,
                message: 'Failed to upload file. Please try again.'
            };
        }
    } else if (resourceLink && !file || file.size === 0) {
        fileUrl = resourceLink;
    }

    updateData.fileUrl = fileUrl;


    try {
        await connectDB();

        const updatedResource = await Resource.findByIdAndUpdate(resourceId, { $set: updateData })

        if (!updatedResource) {
            return {
                success: false,
                message: "Resource not found",
            };
        }
    } catch (error) {
        console.error(error);
        return {
            success: false,
            message: "Something went wrong. Please try again.",
        };
    }

    revalidatePath('/', 'layout');

    return {
        success: true,
        message: "Resource updated successfully"
    }

}

export async function deleteProject(prevState, formData) {
    const projectId = formData.get('projectId');

    if (!projectId) {
        return {
            success: false,
            message: 'No valid id received'
        }
    }

    const user = await getUser();

    if (user?.role !== 'superadmin') {
        return {
            success: false,
            message: 'You do not have permission to perform this action'
        }
    }

    try {
        await connectDB();
    } catch (err) {
        return {
            success: false,
            message: 'Something went wrong'
        }
    }

    try {
        const deletedProject = await Project.findByIdAndDelete(projectId);
        if (deletedProject) {
            revalidatePath('/', 'layout');
            return {
                success: true,
                message: 'Project deleted successfully'
            }
        }

        return {
            success: false,
            message: 'Something went wrong'
        }
    } catch (error) {
        return {
            success: false,
            message: 'Something went wrong'
        }
    }
}

export async function createSuperAdmin(prevState, formData) {
    const userId = formData.get('user');

    if (!userId) {
        return {
            success: false,
            message: 'No valid id received'
        }
    }

    const currentUser = await getUser();

    if (currentUser?.role !== 'superadmin') {
        return {
            success: false,
            message: 'You do not have permission to perform this action'
        }
    }

    try {
        await connectDB();

        const user = await User.findByIdAndUpdate(
            userId,
            { $set: { role: "superadmin" } },
            { new: true }
        );

        if (!user) {
            return {
                success: false,
                message: 'User not found'
            }
        }

        revalidatePath('/', 'layout');

        return {
            success: true,
            message: 'Role Assigned Successfully'
        }
    } catch (error) {
        console.error(error);
        return {
            success: false,
            message: 'Something went wrong'
        }
    }
}

export async function editCredit(prevState, formData) {
    const credit = parseInt(formData.get('credit'));
    const partnerId = formData.get('partnerId');

    try {
        await connectDB();

        const updatedUser = await User.findByIdAndUpdate(partnerId, { $set: { credit } }, { new: true });

        if (!updatedUser) {
            return {
                success: false,
                message: "Something went wrong. Please try again.",
            }
        }

        revalidatePath('/', 'layout');

        return {
            success: true,
            message: "Credit updated successfully"
        }
    } catch (error) {
        return {
            success: false,
            message: "Cannot update credit at the moment. Please try again later."
        }
    }
}

export async function editPackageAmount(prevState, formData) {
    const packageSelected = formData.get('packageSelected');
    const projectId = formData.get('projectId');

    const newPackageAmount = parseInt(packageSelected);

    try {
        await connectDB();

        const project = await Project.findById(projectId);

        const alreadySelectedAmount = Number(project?.packageSelected.replace(/[^0-9.]/g, '').replace(/,/g, ''));

        const updatedProject = await Project.findByIdAndUpdate(projectId, { $set: { packageSelected: `$${packageSelected}` } }, { new: true });
        const creditDifference = alreadySelectedAmount - newPackageAmount;

        if (creditDifference > 0) {
            await User.findByIdAndUpdate(project.createdBy, { $inc: { credit: creditDifference } });
            const expenditureChange = -creditDifference;
            const expenditure = await addExpenditure(project?.createdBy, expenditureChange);
        }

        if (creditDifference < 0) {
            await User.findByIdAndUpdate(project.createdBy, { $inc: { credit: creditDifference } });
            const expenditureChange = -creditDifference;
            const expenditure = await addExpenditure(project?.createdBy, expenditureChange);
        }

        if (!updatedProject) {
            return {
                success: false,
                message: "Something went wrong. Please try again.",
            }
        }

        revalidatePath('/', 'layout');

        return {
            success: true,
            message: "Package amount updated successfully and credit adjusted."
        }
    } catch (error) {
        return {
            success: false,
            message: "Cannot update package amount at the moment. Please try again later."
        }
    }
}

export async function addResourceCategory(prevState, formData) {
    const name = formData.get('name')?.trim();
    const description = formData.get('description')?.trim();

    if (!name || name.length === 0) {
        return {
            success: false,
            message: "Category name cannot be empty."
        }
    }

    try {
        await connectDB();

        const existingCategory = await Category.findOne({ name });
        if (existingCategory) {
            return {
                success: false,
                message: "Category with this name already exists."
            }
        }

        const category = await Category.create({
            name,
            description
        });

        if (!category) {
            return {
                success: false,
                message: "Failed to create category. Please try again."
            }
        }

        return {
            success: true,
            message: "Category created successfully."
        }
    } catch (error) {
        console.error(error);
        return {
            success: false,
            message: "Something went wrong. Please try again."
        }
    }
}

export async function deleteCategory(prevState, formData) {
    const categoryId = formData.get('categoryId');

    if (!categoryId) {
        return {
            success: false,
            message: 'No valid id received'
        }
    }

    try {
        await connectDB();

        const resources = await Resource.find({ category: categoryId });

        if (resources.length > 0) {
            return {
                success: false,
                message: 'Cannot delete category with associated resources. Please reassign or delete those resources first.'
            }
        }

        const category = await Category.findByIdAndDelete(categoryId);

        if (!category) {
            return {
                success: false,
                message: 'Category not found'
            }
        }

        revalidatePath('/', 'layout');

        return {
            success: true,
            message: 'Category deleted successfully'
        }
    } catch (error) {
        console.error(error);
        return {
            success: false,
            message: 'Something went wrong'
        }
    }

}