export const APP_CONSTANTS = {
    URL: {
        LOCAL: {
            LOGIN: "assets/mock/aims/login.json",
            REGISTER: "assets/mock/aims/register.json",
            UPLOAD: "assets/mock/aims/upload.json",
            UPLOADBR: "assets/mock/aims/uploadbr.json",
            BillingUpload: "assets/mock/aims/uploadBilling.json",
            SEARCH: "assets/mock/aims/getEmployeeDetails.json",
            VERSION: "assets/mock/aims/getVersionNo.json",
            Download: "assets/mock/aims/download.json",
            Dashboard: "assets/mock/aims/getAssociatesDetails.json",
            BillingManagment:"assets/mock/aims/getBillingDetails.json",
            DownloadBillingFile:"assets/mock/aims/downloadBilling.json",
            YearValues:"assets/mock/aims/YearsList.json",
            BRMDetailsList:"assets/mock/aims/getBRMDetails.json",
            GetFreeze:"assets/mock/aims/updateFreeze.json",
            UpdateBillingDetails:"assets/mock/aims/updateBillingDetails.json",
            UPLOADREPORTS:"assets/mock/aims/getFileStatus.json"
        },
        PROD: {
            LOGIN: "aims/login",
            REGISTER: "aims/register",
            UPLOAD: "aims/user/upload",
            UPLOADBR : "aims/user/upload/br",
            BillingUpload: "aims/user/upload/br",
            SEARCH: "aims/user/getEmployeeDetails",
            VERSION: "aims/user/versioninfo",
            Download: "download",
            Dashboard: "aims/user/dashboard",
            BillingManagment:"/aims/user/getBillingDetails",
            DownloadBillingFile:"downloadBilling",
            YearValues:"assets/mock/aims/YearsList.json",
            BRMDetailsList:"/aims/user/getBRMDetails",
            GetFreeze:"/aims/user/updateFreeze",
            UpdateBillingDetails:"/aims/user/updateBillingDetails",
            UPLOADREPORTS:"/aims/user/getFileStatus"
            
        }
    }
}