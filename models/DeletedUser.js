import { Schema, model, models } from "mongoose";

const deletedUserSchema = new Schema({
    email: {
        type: String,
        required: true,
        trim: true,
        lowercase: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
    },
    name: {
        type: String,
        required: true,
        trim: true,
    },
    position: {
        type: String,
        trim: true,
    },
    phoneNum: {
        type: String,
        trim: true,
    },
    contactEmail: {
        type: String,
        trim: true,
        lowercase: true,
    },
    companyName: {
        type: String,
        trim: true,
    },
    abn: {
        type: String,
        trim: true,
    },
    companyWebsite: {
        type: String,
        trim: true,
    },
    businessAddress: {
        type: String,
        trim: true,
    },
    yearsInBiz: {
        type: Number,
        default: 0,
    },
    numOfActiveClients: {
        type: Number,
        default: 0,
    },
    socialMediaLinks: {
        type: [String],
        trim: true,
    },
    companyStructure: {
        type: String,
        enum: ["sole-trader", "partner-ship", "pty-ltd", "other"],
    },

    primaryServices: {
        type: String,
        trim: true,
    },
    industriesWorkWith: {
        type: String,
        trim: true,
    },
    regionsServe: {
        type: String,
        trim: true,
    },
    serviceModel: {
        type: String,
        enum: ["retainer-based", "project-based", "both"],
    },
    monthlyProjectVolume: {
        type: String,
        trim: true,
    },
    isUsingWhiteLabelProvider: {
        type: String,
        enum: ["yes", "no"],
    },
    challengeDetail: {
        type: String,
        trim: true,
    },
    role: {
        type: String,
        enum: ["user", "admin", "superadmin"]
    },
    profilePictureUrl: {
        type: String,
        default: "/placeholder-avatar.svg",
    },
    firstLogIn: {
        type: Boolean,
        default: false
    },
    useTwoFactor: {
        type: Boolean,
        default: false
    }
}, { timestamps: true })

const DeletedUser = models.DeletedUser || model("DeletedUser", deletedUserSchema);
export default DeletedUser;