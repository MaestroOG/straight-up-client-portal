import { NextResponse } from "next/server";
import { createTransporter } from "@/utils/transporterFns"; // adjust if needed
import { generateAcceptEmailTemplate } from "@/htmlemailtemplates/emailTemplates";

export async function GET() {
    try {

        const transporter = createTransporter();
        const html = generateAcceptEmailTemplate();

        await transporter.sendMail({
            from: '"Straight Up Digital" <admin@straightupdigital.com.au>',
            to: ["info@terramedia.com.au", "adam@mmbroker.com.au",],
            subject: "Partnership Accepted - Straight Up Digital",
            html,
        });

        return NextResponse.json({
            success: true,
            message: "email sent",
        });
    } catch (error) {
        console.error("Email error:", error);

        return NextResponse.json(
            { message: "Failed to send email" },
            { status: 500 }
        );
    }
}
