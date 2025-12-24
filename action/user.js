"use server";

import { redirect } from "next/navigation";
import crypto from "crypto";
import { cookies } from "next/headers";
import { comparePassword, hashPassword, isValidEmail, validateABN } from "@/utils/validatorFns";
import PendingUser from "@/models/PendingUser";
import { connectDB } from "@/lib/mongodb";
import nodemailer from "nodemailer";
import { generateAcceptEmailTemplate, generateApplicationReceivedUserEmail, generatePartnershipEmailTemplate } from "@/htmlemailtemplates/emailTemplates";
import User from "@/models/User";
import { createOTP } from "@/utils/formUtils";
import OTP from "@/models/OTP";
import { generateOTPEmail } from "@/htmlemailtemplates/otpEmailTemplate";
import { revalidatePath } from "next/cache";
import { createTransporter } from "@/utils/transporterFns";

export const LoginUser = async (prevState, formData) => {
  const email = formData.get("email").toString().trim();
  const password = formData.get("password").toString().trim();

  if (!email || !email.includes('@') || password.trim().length === 0) {
    return {
      err: "Invalid Credentials"
    }
  }
  await connectDB();

  const user = await User.findOne({ email });

  if (!user) {
    return {
      err: "Username or password incorrect"
    }
  }

  const isPasswordValid = await comparePassword(password, user?.password);

  if (!isPasswordValid) {
    return {
      err: "Invalid Credentials"
    }
  }

  if (user?.useTwoFactor) {

    const otp = createOTP();
    await OTP.create({
      otp,
      for: user?._id
    })

    const html = generateOTPEmail(otp, user?.name);
    let transporter;

    try {
      transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: process.env.SMTP_USER, // e.g. "admin@straightupdigital.com.au"
          pass: process.env.SMTP_PASS, // Gmail app password, not your account password
        },
      });
    } catch (error) {
      return {
        err: "Invalid user"
      }
    }

    await transporter.sendMail({
      from: '"Straight Up Digital" <admin@straightupdigital.com.au>',
      to: user?.email,
      subject: "Verify your OTP",
      html,
    });


    (await cookies()).set('pendingUser', JSON.stringify(user), {
      httpOnly: true,
      secure: true,
      path: '/',
      maxAge: 60 * 60
    })
    redirect('/verify-otp')
  }

  const token = crypto.randomBytes(32).toString("hex");

  (await cookies()).set({
    name: "authToken",
    value: token,
    httpOnly: true,
    path: "/",
    secure: process.env.NODE_ENV || 'production',
    maxAge: 60 * 60 * 24
  });

  (await cookies()).set("user", JSON.stringify(user), {
    httpOnly: false,
    secure: true,
    path: '/',
    maxAge: 60 * 60 * 24
  });

  redirect('/');
}


export const SignUpUser = async (formValues, prevState, formData) => {
  const { email,
    password,
    name,
    position,
    phoneNum,
    contactEmail,
    companyName,
    abn,
    companyWebsite,
    businessAddress,
    yearsInBiz,
    numOfActiveClients,
    socialMediaLinks,
    companyStructure,
    primaryServices,
    industriesWorkWith,
    regionsServe,
    serviceModel,
    monthlyProjectVolume,
    isUsingWhiteLabelProvider,
    challengeDetail,
    masterServiceAgreement } = formValues;

  // Validations

  if (!isValidEmail(email) || password.length < 6 || !name || !masterServiceAgreement) {
    return {
      err: "Please fill the form correctly."
    }
  }


  // Password Hashing

  const hashedPassword = await hashPassword(password);


  // DB Insertion

  await connectDB();

  await PendingUser.create({
    email,
    password: hashedPassword,
    name,
    position,
    phoneNum,
    contactEmail,
    companyName,
    abn,
    companyWebsite,
    businessAddress,
    yearsInBiz,
    numOfActiveClients,
    socialMediaLinks,
    companyStructure,
    primaryServices,
    industriesWorkWith,
    regionsServe,
    serviceModel,
    monthlyProjectVolume,
    isUsingWhiteLabelProvider,
    challengeDetail,
    role: "user"
  })


  // Email Sending
  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: String(process.env.SMTP_USER),
        pass: String(process.env.SMTP_PASS)
      },
    });

    const html = generatePartnershipEmailTemplate(email, monthlyProjectVolume, name, position, phoneNum, contactEmail, companyName, abn, companyWebsite, businessAddress, yearsInBiz, numOfActiveClients, companyStructure, serviceModel, isUsingWhiteLabelProvider, primaryServices, industriesWorkWith, regionsServe, challengeDetail);
    const userHtml = generateApplicationReceivedUserEmail(name, companyName, email);

    await transporter.sendMail({
      from: '"Straight Up Digital" <admin@straightupdigital.com.au>',
      to: [email, 'admin@straightupdigital.com.au'],
      subject: "Thanks for your interest in partnering with Straight Up Digital",
      html: userHtml,
    })

    await transporter.sendMail({
      from: '"Straight Up Digital" <admin@straightupdigital.com.au>',
      to: 'admin@straightupdigital.com.au',
      subject: "New User Application – Review Required",
      html,
    })

    return {
      success: true
    }

  } catch (error) {
    console.error(error)
    return {
      err: error.message
    }
  }

}

export const signOutUser = async (prevState, formData) => {
  (await cookies()).delete("authToken");
  (await cookies()).delete("user");
  redirect("/login");
}


export const changeFirstLogin = async (userId, prevState, formData) => {
  await connectDB();

  await User.findByIdAndUpdate(userId, { firstLogIn: true });
  revalidatePath('/', 'layout')

  redirect('/how-to')
}

export const verifyOtpAndLogin = async (prevState, formData) => {
  const value = formData.get('otp');
  await connectDB();

  const validOtp = await OTP.findOne({ otp: value });

  if (!validOtp) {
    return {
      success: false,
      message: "Invalid OTP."
    }
  }
  const user = await User.findOne({ _id: validOtp.for });



  const token = crypto.randomBytes(32).toString("hex");

  (await cookies()).set({
    name: "authToken",
    value: token,
    httpOnly: true,
    path: "/",
    secure: process.env.NODE_ENV || 'production',
    maxAge: 60 * 60 * 24 * 7
  });

  (await cookies()).set("user", JSON.stringify(user), {
    httpOnly: false,
    secure: true,
    path: '/',
    maxAge: 60 * 60 * 24 * 7
  });

  await OTP.deleteOne({ otp: value });
  redirect('/');

}

export const createRetailUser = async (prevState, formData) => {
  const email = formData.get("email").toString().trim();
  const password = formData.get("password").toString().trim();
  const name = formData.get("name").toString().trim();
  const phoneNum = formData.get("phoneNum").toString().trim();
  const companyName = formData.get("companyName").toString().trim();

  if (!isValidEmail(email) || password.length < 6 || !name) {
    return {
      success: false,
      err: "Please fill the form correctly."
    }
  }

  try {
    await connectDB();

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return {
        success: false,
        err: "User with this email already exists."
      }
    }

    const hashedPassword = await hashPassword(password);

    const newRetailUser = await User.create({
      email,
      password: hashedPassword,
      name,
      phoneNum,
      companyName,
      isRetail: true,
    })

    if (!newRetailUser) {
      return {
        success: false,
        err: "Error creating retail user. Please try again."
      }
    }

    const transporter = createTransporter();

    const html = generateAcceptEmailTemplate();

    await transporter.sendMail({
      from: '"Straight Up Digital" <admin@straightupdigital.com.au>',
      to: [email, 'admin@straightupdigital.com.au'],
      subject: "Partnership Accepted - Straight Up Digital",
      html,
    })

    revalidatePath('/', 'layout');

    return {
      success: true,
      message: "Retail user created successfully."
    }
  } catch (error) {
    console.error("CreateRetailUser Error:", error);
    return {
      success: false,
      err: "Failed to create retail user."
    }
  }

}