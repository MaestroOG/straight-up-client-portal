export const formConfig = {
    localSeo: [
        { label: "Business Name", name: "businessName", type: "text", required: true },
        { label: "Website URL (Add https:// in front of the URL)", name: "websiteUrl", type: "url", required: true },
        { label: "Target Keywords", name: "targetKeywords", type: "textarea", required: true },
        { label: "Target Locations (Cities/States)", name: "targetLocations", type: "textarea" },
        { label: "Competitor Websites", name: "competitorWebsites", type: "textarea" },
        { label: "Google Business Profile Link (Add https:// in front of the URL)", name: "googleBusinessProfile", type: "url" },
    ],

    nationalSeo: [
        { label: "Business Name", name: "businessName", type: "text", required: true },
        { label: "Website URL (Add https:// in front of the URL)", name: "websiteUrl", type: "url", required: true },
        { label: "Target Keywords", name: "targetKeywords", type: "textarea", required: true },
        { label: "Target Locations (Cities/States)", name: "targetLocations", type: "textarea" },
        { label: "Competitor Websites", name: "competitorWebsites", type: "textarea" },
        { label: "Google Business Profile Link (Add https:// in front of the URL)", name: "googleBusinessProfile", type: "url" },
    ],

    linkBuilding: [
        { label: "Website URL (Add https:// in front of the URL)", name: "websiteUrl", type: "url", required: true },
        { label: "Target Pages", name: "targetPages", type: "textarea" },
        { label: "Preferred Industries for Backlinks", name: "preferredIndustries", type: "text" }
    ],

    googleAdvertising: [
        { label: "Business Name", name: "businessName", type: "text", required: true },
        { label: "Website URL (Add https:// in front of the URL)", name: "websiteUrl", type: "url", required: true },
        { label: "Advertising Budget (Monthly)", name: "adBudget", type: "number", required: true },
        { label: "Target Audience (Demographics/Interests)", name: "targetAudience", type: "textarea", required: true },
        { label: "Campaign Goals (Leads, Sales, Traffic, etc.)", name: "campaignGoals", type: "textarea", required: true },
        { label: "Campaign Type", name: "campaignType", type: "text", required: true },
        { label: "Competitor Ads or References", name: "competitorAds", type: "textarea" }
    ],

    socialMediaAdvertising: [
        { label: "Business Name", name: "businessName", type: "text", required: true },
        { label: "Website URL (Add https:// in front of the URL)", name: "websiteUrl", type: "url", required: true },
        { label: "Preferred Platforms (Facebook, Instagram, LinkedIn, etc.)", name: "preferredPlatforms", type: "text", required: true },
        { label: "Advertising Budget (Monthly)", name: "adBudget", type: "number", required: true },
        { label: "Target Audience (Demographics/Interests)", name: "targetAudience", type: "textarea", required: true },
        { label: "Campaign Objectives (Awareness, Engagement, Conversions, etc.)", name: "campaignObjectives", type: "textarea", required: true },
        { label: "Existing Social Media Handles", name: "socialMediaHandles", type: "text" }
    ],

    socialMediaManagement: [
        { label: "Business Name", name: "businessName", type: "text", required: true },
        { label: "Existing Social Media Handles", name: "currentSocialLinks", type: "textarea", required: true },
        { label: "Target Audience", name: "targetAudience", type: "textarea", required: true },
        { label: "Posting Frequency", name: "postingFrequency", type: "text" }
    ],

    leadGeneration: [
        { label: "Business Name", name: "businessName", type: "text", required: true },
        { label: "Lead Criteria", name: "leadCriteria", type: "textarea", required: true },
        { label: "Target Audience", name: "targetAudience", type: "textarea", required: true }
    ],

    'webDesignAndDevelopment': [
        { label: "Business Name", name: "businessName", type: "text", required: true },
        { label: "Current Website URL (if any) (Add https:// in front of the URL)", name: "currentWebsite", type: "url" },
        { label: "Type of Website (Business, E-commerce, Portfolio, etc.)", name: "websiteType", type: "text", required: true },
        { label: "Number of Pages (Approximate)", name: "numberOfPages", type: "number" },
        { label: "Design Preferences (Colors, Style, Inspirations)", name: "designPreferences", type: "textarea" },
        { label: "Core Features Needed (e.g., Contact Form, Blog, Payment Gateway)", name: "coreFeatures", type: "textarea", required: true },
        { label: "Budget Range", name: "budgetRange", type: "text", required: true },
        { label: "Deadline / Timeframe", name: "deadline", type: "text" },
        { label: "Competitor Websites", name: "competitorWebsites", type: "textarea" },
    ],

    emailMarketing: [
        { label: "Business Name", name: "businessName", type: "text", required: true },
        { label: "Business Website URL (Add https:// in front of the URL)", name: "websiteUrl", type: "url" },
        { label: "Email Marketing Goal (e.g., Lead Nurturing, Promotions, Newsletters)", name: "marketingGoal", type: "text", required: true },
        { label: "Email List Size (Approximate)", name: "emailListSize", type: "number" },
        { label: "Preferred Email Platform (e.g., Mailchimp, Klaviyo, HubSpot)", name: "emailPlatform", type: "text" },
        { label: "Frequency of Campaigns (e.g., Weekly, Monthly, On-Demand)", name: "campaignFrequency", type: "text" },
        { label: "Special Offers / Promotions to Highlight", name: "specialOffers", type: "textarea" },
        { label: "Design & Branding Preferences", name: "designPreferences", type: "textarea" }
    ],

    virtualAssistanceResources: [
        { label: "Business Name", name: "businessName", type: "text", required: true },
        { label: "Business Website URL (Add https:// in front of the URL)", name: "websiteUrl", type: "url" },
        { label: "Type of Assistance Needed (Admin, Digital Marketing, Back-End, Other)", name: "assistanceType", type: "text", required: true },
        { label: "Specific Tasks You Want Help With", name: "taskDetails", type: "textarea", required: true },
        { label: "Preferred Working Hours (Your Timezone)", name: "workingHours", type: "text" },
        { label: "Expected Duration (e.g., Ongoing, 3 months, 6 months)", name: "duration", type: "text" },
        { label: "Level of Expertise Required (Beginner, Intermediate, Expert)", name: "expertiseLevel", type: "text" },
        { label: "Communication Tools (e.g., Slack, Email, WhatsApp)", name: "communicationTools", type: "text" }
    ],

    // 'leadGeneration-ColdCalling': [
    //     { label: "Business Name", name: "businessName", type: "text", required: true },
    //     { label: "Business Website URL (Add https:// in front of the URL)", name: "websiteUrl", type: "url" },
    //     { label: "Target Industry / Market", name: "targetIndustry", type: "text", required: true },
    //     { label: "Target Audience (e.g., CEOs, Marketing Managers, Small Businesses)", name: "targetAudience", type: "text", required: true },
    //     { label: "Geographic Location for Calls", name: "targetLocation", type: "text" },
    //     { label: "Call Script (Provide if available)", name: "callScript", type: "textarea" },
    //     { label: "Goal of Calls (e.g., Appointments, Sales, Market Research)", name: "callGoal", type: "text", required: true },
    //     { label: "CRM or Tools Used (if any)", name: "crmTools", type: "text" }
    // ],
    managedWebSupport: [
        { label: "Website Name or URL (Add https:// in front of the URL)", name: "websiteUrl", type: "url", required: true },
        { label: "Current Hosting Provider (e.g., Hostinger, GoDaddy, AWS)", name: "hostingProvider", type: "text" },
        { label: "Type of Website (e.g., Portfolio, E-commerce, Corporate)", name: "websiteType", type: "text", required: true },
        { label: "Areas of Support Needed (e.g., Updates, Security, Performance, Backup)", name: "supportAreas", type: "textarea", required: true },
        { label: "Frequency of Maintenance (e.g., Weekly, Monthly, Quarterly)", name: "maintenanceFrequency", type: "text" },
        { label: "Access Details (if applicable)", name: "accessDetails", type: "textarea" },
        { label: "Preferred Communication Channel (e.g., Email, Slack, WhatsApp)", name: "communicationChannel", type: "text" },
        { label: "Additional Notes or Requirements", name: "additionalNotes", type: "textarea" }
    ],
    adhocSupport: [
        { label: "Website Name or URL (Add https:// in front of the URL)", name: "websiteUrl", type: "url", required: true },
        { label: "Type of Issue or Task (e.g., Bug Fix, Content Update, Plugin Installation)", name: "issueType", type: "text", required: true },
        { label: "Detailed Description of the Problem or Task", name: "taskDetails", type: "textarea", required: true },
        { label: "Priority Level (Low, Medium, High, Urgent)", name: "priorityLevel", type: "text" },
        { label: "Expected Deadline or Completion Date", name: "deadline", type: "text" },
        { label: "Access Details (if applicable)", name: "accessDetails", type: "textarea" },
        { label: "Preferred Communication Channel (e.g., Email, WhatsApp, Slack)", name: "communicationChannel", type: "text" },
        { label: "Additional Notes", name: "additionalNotes", type: "textarea" }
    ],

}

export const auditFormConfig = {
    localSeoAudit: [
        { label: "Business Name", name: "businessName", type: "text", required: true },
        { label: "Website URL (Add https:// in front of the url)", name: "websiteUrl", type: "url", required: true },
        { label: "Current Local Rankings Keywords", name: "currentKeywords", type: "textarea" },
        { label: "Target Locations (Cities/States)", name: "targetLocations", type: "textarea" },
        { label: "Google Business Profile Link (Add https:// in front of the url)", name: "googleBusinessProfile", type: "url" },
        { label: "Competitor Websites", name: "competitorWebsites", type: "textarea" },
        { label: "NAP Consistency Issues Noted", name: "napIssues", type: "textarea" },
        { label: "Local Citations Audit Needed?", name: "citationsAudit", type: "checkbox" }
    ],

    nationalSeoAudit: [
        { label: "Business Name", name: "businessName", type: "text", required: true },
        { label: "Website URL (Add https:// in front of the url)", name: "websiteUrl", type: "url", required: true },
        { label: "Current Top Performing Keywords", name: "topKeywords", type: "textarea" },
        { label: "Target Geographic Areas", name: "targetRegions", type: "textarea" },
        { label: "Competitor Domains", name: "competitorDomains", type: "textarea" },
        { label: "Backlink Profile Check Needed?", name: "backlinkAudit", type: "checkbox" },
        { label: "Content Audit Needed?", name: "contentAudit", type: "checkbox" }
    ],

    linkBuildingAudit: [
        { label: "Website URL (Add https:// in front of the url)", name: "websiteUrl", type: "url", required: true },
        { label: "Current Backlinks (if any)", name: "currentBacklinks", type: "textarea" },
        { label: "Target Pages for Link Building", name: "targetPages", type: "textarea" },
        { label: "Preferred Link Sources / Niches", name: "preferredSources", type: "textarea" },
        { label: "Toxic Link Review Needed?", name: "toxicLinkCheck", type: "checkbox" }
    ],

    googleAdvertisingAudit: [
        { label: "Business Name", name: "businessName", type: "text", required: true },
        { label: "Website URL (Add https:// in front of the url)", name: "websiteUrl", type: "url", required: true },
        { label: "Google Ads Account ID", name: "accountId", type: "text" },
        { label: "Target Audience / Demographics", name: "targetAudience", type: "textarea" },
        { label: "Ad Budget (monthly)", name: "adBudget", type: "number" },
        { label: "Conversion Tracking Set Up?", name: "conversionTracking", type: "checkbox" },
        { label: "Landing Page Review Needed?", name: "landingPageAudit", type: "checkbox" }
    ],

    socialMediaManagementAudit: [
        { label: "Business Name", name: "businessName", type: "text", required: true },
        { label: "Social Handles / Pages", name: "socialHandles", type: "textarea", required: true },
        { label: "Current Posting Frequency", name: "postingFrequency", type: "text" },
        { label: "Content Quality Audit Needed?", name: "contentAudit", type: "checkbox" },
        { label: "Follower Demographics Review Needed?", name: "demographicsAudit", type: "checkbox" }
    ],

    socialMediaAdvertisingAudit: [
        { label: "Business Name", name: "businessName", type: "text", required: true },
        { label: "Website URL (Add https:// in front of the url)", name: "websiteUrl", type: "url" },
        { label: "Current Ad Accounts / Campaigns", name: "adAccounts", type: "textarea" },
        { label: "Target Platforms", name: "platforms", type: "text" },
        { label: "Monthly Ad Spend", name: "adBudget", type: "number" },
        { label: "Conversion Pixel Installed?", name: "pixelInstalled", type: "checkbox" },
        { label: "Creative & Copy Performance Review?", name: "creativeReview", type: "checkbox" }
    ],

    webDesignAndDevelopmentAudit: [
        { label: "Business Name", name: "businessName", type: "text", required: true },
        { label: "Current Website URL (Add https:// in front of the url)", name: "currentWebsite", type: "url" },
        { label: "Website Type (E-commerce, Portfolio, Blog, etc.)", name: "websiteType", type: "text" },
        { label: "Number of Pages", name: "numberOfPages", type: "number" },
        { label: "Core Issues Noted (optional)", name: "currentIssues", type: "textarea" },
        { label: "Performance Audit Needed?", name: "performanceAudit", type: "checkbox" },
        { label: "Mobile Responsiveness Check?", name: "mobileAudit", type: "checkbox" },
        { label: "SEO Technical Audit Needed?", name: "seoAudit", type: "checkbox" }
    ],

    emailMarketingAudit: [
        { label: "Business Name", name: "businessName", type: "text", required: true },
        { label: "Email Platform Used", name: "emailPlatform", type: "text" },
        { label: "Current Email List Size", name: "listSize", type: "number" },
        { label: "Campaign Type (Newsletter, Promotions, etc.)", name: "campaignType", type: "text" },
        { label: "Deliverability Issues Noted?", name: "deliverabilityAudit", type: "checkbox" },
        { label: "Template & Design Audit Needed?", name: "designAudit", type: "checkbox" }
    ],

    virtualAssistanceResourcesAudit: [
        { label: "Business Name", name: "businessName", type: "text", required: true },
        { label: "Current VA Tasks / Workflow", name: "currentTasks", type: "textarea" },
        { label: "Tools Used (e.g., Slack, Trello, Asana)", name: "toolsUsed", type: "text" },
        { label: "Process Efficiency Audit Needed?", name: "processAudit", type: "checkbox" },
        { label: "Training / Skills Assessment Needed?", name: "trainingAudit", type: "checkbox" }
    ],

    // 'leadGeneration-ColdCallingAudit': [
    //     { label: "Business Name", name: "businessName", type: "text", required: true },
    //     { label: "Target Market / Industry", name: "targetIndustry", type: "text", required: true },
    //     { label: "Current Call Scripts", name: "callScripts", type: "textarea" },
    //     { label: "Process Efficiency Review Needed?", name: "processAudit", type: "checkbox" }
    // ],

    managedWebSupportAudit: [
        { label: "Website URL (Add https:// in front of the url)", name: "websiteUrl", type: "url", required: true },
        { label: "Hosting Provider", name: "hostingProvider", type: "text" },
        { label: "Areas of Concern (Performance, Security, Backups, etc.)", name: "concerns", type: "textarea" },
        { label: "Update & Maintenance History", name: "maintenanceHistory", type: "textarea" },
        { label: "Security Audit Needed?", name: "securityAudit", type: "checkbox" },
        { label: "Performance & Speed Audit Needed?", name: "performanceAudit", type: "checkbox" }
    ],

    adhocSupportAudit: [
        { label: "Website URL (Add https:// in front of the url)", name: "websiteUrl", type: "url", required: true },
        { label: "Type of Issue / Task", name: "issueType", type: "text", required: true },
        { label: "Detailed Description", name: "details", type: "textarea", required: true },
        { label: "Priority Level (Low, Medium, High, Urgent)", name: "priorityLevel", type: "select", options: ["Low", "Medium", "High", "Urgent"] },
        { label: "Access Details (if applicable)", name: "accessDetails", type: "textarea" },
        { label: "Additional Notes", name: "additionalNotes", type: "textarea" }
    ]
};



export const pricingConfig = {
    localSeo: {
        pricing: [
            {
                id: "local-seo-single",
                label: "Local SEO - Single Service",
                price: "$450",
                period: "/month",
                description: "Standard local SEO optimization"
            },
            {
                id: "custom-bundle",
                label: "Custom Quote",
                price: "custom",
                period: "",
                description: ""
            },
        ]
    },

    managedWebSupport: {
        pricing: [
            {
                id: "managed-web-support-standard",
                label: "Managed Web Support",
                price: "$99",
                period: "/month",
                description: "Ongoing website maintenance, security monitoring, and performance optimization."
            },
            {
                id: "custom-bundle",
                label: "Custom Quote",
                price: "custom",
                period: "",
                description: ""
            },
        ]
    },

    adhocSupport: {
        pricing: [
            {
                id: "adhoc-support-advanced",
                label: "Adhoc Support",
                price: "$50",
                period: "/hour",
                description: "Complex troubleshooting, backend adjustments, or multiple-page edits."
            },
            {
                id: "custom-bundle",
                label: "Custom Quote",
                price: "custom",
                period: "",
                description: ""
            },
        ]
    },

    nationalSeo: {
        pricing: [
            {
                id: "national-seo-single",
                label: "National SEO - Single Service",
                price: "$550",
                period: "/month",
                description: "Nationwide SEO optimization"
            },
            {
                id: "custom-bundle",
                label: "Custom Quote",
                price: "custom",
                period: "",
                description: ""
            },
        ]
    },

    linkBuilding: {
        pricing: [
            {
                id: "link-building-single",
                label: "Link Building - Single Service",
                price: "$200",
                period: "/month",
                description: "High-quality backlink acquisition"
            },
            {
                id: "custom-bundle",
                label: "Custom Quote",
                price: "custom",
                period: "",
                description: ""
            },
        ]
    },

    googleAdvertising: {
        pricing: [
            {
                id: "google-ads-single",
                label: "Google Advertising - Single Service",
                price: "$450",
                period: "/month",
                description: "Complete Google Ads management"
            },
            {
                id: "custom-bundle",
                label: "Custom Quote",
                price: "custom",
                period: "",
                description: ""
            },
        ]
    },

    socialMediaAdvertising: {
        pricing: [
            {
                id: "social-ads-single",
                label: "Social Media Advertising - Single Service",
                price: "$450",
                period: "/month",
                description: "Targeted social media campaigns"
            },
            {
                id: "custom-bundle",
                label: "Custom Quote",
                price: "custom",
                period: "",
                description: ""
            },
        ]
    },

    socialMediaManagement: {
        pricing: [
            {
                id: "social-mgmt-single",
                label: "Social Media Management - Single Service",
                price: "$450",
                period: "/month",
                description: "Complete social media management"
            },
            {
                id: "custom-bundle",
                label: "Custom Quote",
                price: "custom",
                period: "",
                description: ""
            },
        ]
    },

    // leadGeneration: {
    //     pricing: [
    //         {
    //             id: "lead-gen-single",
    //             label: "Lead Generation - Single Service",
    //             price: "$1500",
    //             period: "/month",
    //             description: "Comprehensive lead generation"
    //         },
    //         {
    //             id: "custom-bundle",
    //             label: "Custom Quote",
    //             price: "custom",
    //             period: "",
    //             description: ""
    //         },
    //     ]
    // },

    webDesignAndDevelopment: {
        pricing: [
            {
                id: "web-dev-small",
                label: "Up to 5 Pages - Single Service",
                price: "$1000",
                period: "one-time",
                description: "Small website development"
            },
            {
                id: "web-dev-medium",
                label: "6-10 Pages - Single Service",
                price: "$1200",
                period: "one-time",
                description: "Medium website development"
            },
            {
                id: "web-dev-large",
                label: "11-15 Pages - Single Service",
                price: "$1500",
                period: "one-time",
                description: "Large website development"
            },
            {
                id: "custom-bundle",
                label: "Custom Quote",
                price: "custom",
                period: "",
                description: ""
            },
        ]
    },

    emailMarketing: {
        pricing: [
            {
                id: "email-single",
                label: "Email Marketing - Single Service",
                price: "$450",
                period: "/month",
                description: "Complete email marketing campaigns"
            },
            {
                id: "custom-bundle",
                label: "Custom Quote",
                price: "custom",
                period: "",
                description: ""
            },
        ]
    },

    virtualAssistanceResources: {
        pricing: [
            {
                id: "va-20h-single",
                label: "20 Hours/Month - Single Resource",
                price: "$500",
                period: "/month",
                description: "Part-time virtual assistance"
            },
            {
                id: "va-40h-single",
                label: "40 Hours/Month - Single Resource",
                price: "$900",
                period: "/month",
                description: "Full-time virtual assistance"
            },
            {
                id: "va-80h-single",
                label: "80 Hours/Month - Single Resource",
                price: "$1600",
                period: "/month",
                description: "Extended virtual assistance"
            },
            {
                id: "custom-bundle",
                label: "Custom Quote",
                price: "custom",
                period: "",
                description: ""
            },
        ]
    },

    // 'leadGeneration-ColdCalling': {
    //     pricing: [
    //         {
    //             id: "cold-call-20h-single",
    //             label: "Single Resource",
    //             price: "$1500",
    //             period: "/month",
    //             description: "Part-time cold calling service"
    //         },
    //         {
    //             id: "custom-bundle",
    //             label: "Custom Quote",
    //             price: "custom",
    //             period: "",
    //             description: ""
    //         },
    //     ]
    // }
}


export const saPricingConfig = {
    localSeo: {
        pricing: [
            {
                id: "local-seo-single",
                label: "Local SEO - Single Service",
                price: "R5199",
                period: "/month",
                description: "Standard local SEO optimization"
            },
            {
                id: "custom-bundle",
                label: "Custom Quote",
                price: "custom",
                period: "",
                description: ""
            },
        ]
    },

    managedWebSupport: {
        pricing: [
            {
                id: "managed-web-support-standard",
                label: "Managed Web Support",
                price: "R1708",
                period: "/month",
                description: "Ongoing website maintenance, security monitoring, and performance optimization."
            },
            {
                id: "custom-bundle",
                label: "Custom Quote",
                price: "custom",
                period: "",
                description: ""
            },
        ]
    },
    adhocSupport: {
        pricing: [
            {
                id: "adhoc-support-advanced",
                label: "Adhoc Support",
                price: "R862",
                period: "/hour",
                description: "Complex troubleshooting, backend adjustments, or multiple-page edits."
            },
            {
                id: "custom-bundle",
                label: "Custom Quote",
                price: "custom",
                period: "",
                description: ""
            },
        ]
    },

    nationalSeo: {
        pricing: [
            {
                id: "national-seo-single",
                label: "National SEO - Single Service",
                price: "R5199",
                period: "/month",
                description: "Nationwide SEO optimization"
            },
            {
                id: "custom-bundle",
                label: "Custom Quote",
                price: "custom",
                period: "",
                description: ""
            },
        ]
    },

    linkBuilding: {
        pricing: [
            {
                id: "link-building-single",
                label: "Link Building - Single Service",
                price: "R2279",
                period: "/month",
                description: "High-quality backlink acquisition"
            },
            {
                id: "custom-bundle",
                label: "Custom Quote",
                price: "custom",
                period: "",
                description: ""
            },
        ]
    },

    googleAdvertising: {
        pricing: [
            {
                id: "google-ads-single",
                label: "Google Advertising - Single Service",
                price: "R5199",
                period: "/month",
                description: "Complete Google Ads management"
            },
            {
                id: "custom-bundle",
                label: "Custom Quote",
                price: "custom",
                period: "",
                description: ""
            },
        ]
    },

    socialMediaAdvertising: {
        pricing: [
            {
                id: "social-ads-single",
                label: "Social Media Advertising - Single Service",
                price: "R5199",
                period: "/month",
                description: "Targeted social media campaigns"
            },
            {
                id: "custom-bundle",
                label: "Custom Quote",
                price: "custom",
                period: "",
                description: ""
            },
        ]
    },

    socialMediaManagement: {
        pricing: [
            {
                id: "social-mgmt-single",
                label: "Social Media Management - Single Service",
                price: "R5199",
                period: "/month",
                description: "Complete social media management"
            },
            {
                id: "custom-bundle",
                label: "Custom Quote",
                price: "custom",
                period: "",
                description: ""
            },
        ]
    },

    // leadGeneration: {
    //     pricing: [
    //         {
    //             id: "lead-gen-single",
    //             label: "Lead Generation - Single Service",
    //             price: "R1500",
    //             period: "/month",
    //             description: "Comprehensive lead generation"
    //         },
    //         {
    //             id: "custom-bundle",
    //             label: "Custom Quote",
    //             price: "custom",
    //             period: "",
    //             description: ""
    //         },
    //     ]
    // },

    webDesignAndDevelopment: {
        pricing: [
            {
                id: "web-dev-small",
                label: "Up to 5 Pages - Single Service",
                price: "R11359",
                period: "one-time",
                description: "Small website development"
            },
            {
                id: "web-dev-medium",
                label: "6-10 Pages - Single Service",
                price: "R13639",
                period: "one-time",
                description: "Medium website development"
            },
            {
                id: "web-dev-large",
                label: "11-15 Pages - Single Service",
                price: "R17039",
                period: "one-time",
                description: "Large website development"
            },
            {
                id: "custom-bundle",
                label: "Custom Quote",
                price: "custom",
                period: "",
                description: ""
            },
        ]
    },

    emailMarketing: {
        pricing: [
            {
                id: "email-single",
                label: "Email Marketing - Single Service",
                price: "R5199",
                period: "/month",
                description: "Complete email marketing campaigns"
            },
            {
                id: "custom-bundle",
                label: "Custom Quote",
                price: "custom",
                period: "",
                description: ""
            },
        ]
    },

    virtualAssistanceResources: {
        pricing: [
            {
                id: "va-20h-single",
                label: "20 Hours/Month - Single Resource",
                price: "R5679",
                period: "/month",
                description: "Part-time virtual assistance"
            },
            {
                id: "va-40h-single",
                label: "40 Hours/Month - Single Resource",
                price: "R10229",
                period: "/month",
                description: "Full-time virtual assistance"
            },
            {
                id: "va-80h-single",
                label: "80 Hours/Month - Single Resource",
                price: "R18179",
                period: "/month",
                description: "Extended virtual assistance"
            },
            {
                id: "custom-bundle",
                label: "Custom Quote",
                price: "custom",
                period: "",
                description: ""
            },
        ]
    },

    // 'leadGeneration-ColdCalling': {
    //     pricing: [
    //         {
    //             id: "cold-call-20h-single",
    //             label: "Single Resource",
    //             price: "R17039",
    //             period: "/month",
    //             description: "Part-time cold calling service"
    //         },
    //         {
    //             id: "custom-bundle",
    //             label: "Custom Quote",
    //             price: "custom",
    //             period: "",
    //             description: ""
    //         },
    //     ]
    // }
};
