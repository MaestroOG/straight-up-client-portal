'use server';

import { generateAuditEmail } from "@/htmlemailtemplates/partnerEmailTemplates";
import { connectDB } from "@/lib/mongodb";
import { getUser } from "@/lib/user";
import User from "@/models/User";
import { cleanFormEntries, validateEntries } from "@/utils/formUtils";
import { createTransporter } from "@/utils/transporterFns";

export default async function createAudit(prevState, formData) {
    const user = await getUser();
    const service = formData.get("service");
    const auditTitle = formData.get("auditTitle");
    const partnerId = formData.get("partnerId");

    if (!user) {
        return {
            success: false,
            message: "Unauthorized. Please log in."
        };
    }

    // Turn formData into a plain object, excluding service
    const entries = {};
    formData.forEach((value, key) => {
        if (key !== "service") {
            entries[key] = value;
        }
    });

    if (!service || !auditTitle) {
        return {
            success: false,
            message: "Missing required fields: service and auditTitle."
        };
    }
    // Clean and validate entries
    const cleanedEntries = cleanFormEntries(entries);

    if (!cleanedEntries || !validateEntries(cleanedEntries)) {
        return {
            success: false,
            message: "Audit not created. Invalid form data.",
        };
    }

    try {
        const transporter = createTransporter();

        // Prepare email data
        const emailData = {
            companyName: user?.companyName || "N/A",
            auditTitle,
            service,
            fields: cleanedEntries
        };

        if (user?.role === 'user') {
            if (!user.email) {
                return {
                    success: false,
                    message: "User email is missing."
                };
            }
            const html = generateAuditEmail(emailData);

            await transporter.sendMail({
                from: '"Straight Up Digital" <portalstraightup@gmail.com>',
                to: [user?.email, 'portalstraightup@gmail.com'],
                subject: "Audit Request - Straight Up Digital",
                html,
            });
        }

        if (user?.role === 'superadmin') {
            if (!partnerId) {
                return {
                    success: false,
                    message: "partnerId is required for superadmin audit requests."
                };
            }

            await connectDB();
            const auditForUser = await User.findById(partnerId);

            if (!auditForUser || !auditForUser.email) {
                return {
                    success: false,
                    message: "Partner user not found or missing email."
                };
            }

            const html = generateAuditEmail({
                ...emailData,
                companyName: auditForUser?.companyName || "N/A"
            });

            await transporter.sendMail({
                from: '"Straight Up Digital" <portalstraightup@gmail.com',
                to: [auditForUser?.email, 'portalstraightup@gmail.com'],
                subject: "Audit Request - Straight Up Digital",
                html,
            });
        }

        return {
            success: true,
            message: "Audit request successfully sent."
        };
    } catch (error) {
        console.error(error);
        return {
            success: false,
            message: "Something went wrong while sending the audit request."
        };
    }
}
