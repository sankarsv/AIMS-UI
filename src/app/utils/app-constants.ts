export const APP_CONSTANTS = {
    URL: {
        LOCAL: {
            LOGIN: "assets/mock/aims/login.json",
            REGISTER: "assets/mock/aims/register.json",
            UPLOAD: "assets/mock/aims/upload.json",
            BillingUpload: "assets/mock/aims/uploadBilling.json",
            SEARCH: "assets/mock/aims/getEmployeeDetails.json",
            VERSION: "assets/mock/aims/getVersionNo.json",
            Download: "assets/mock/aims/download.json",
            Dashboard: "assets/mock/aims/getAssociatesDetails.json",
            BillingManagment:"assets/mock/aims/getBillingDetails.json",
            DownloadBillingFile:"assets/mock/aims/downloadBilling.json",
            YearValues:"assets/mock/aims/YearsList.json",
            BRMDetailsList:"assets/mock/aims/getBRMDetails.json"
        },
        PROD: {
            LOGIN: "aims/login",
            REGISTER: "aims/register",
            UPLOAD: "aims/user/upload",
            BillingUpload: "assets/mock/aims/uploadBilling.json",
            SEARCH: "aims/user/getEmployeeDetails",
            VERSION: "aims/user/versioninfo",
            Download: "download",
            Dashboard: "assets/mock/aims/getAssociatesDetails.json",
            BillingManagment:"/aims/user/getBillingDetails",
            DownloadBillingFile:"/aims/user/downloadBilling",
            YearValues:"assets/mock/aims/YearsList.json",
            BRMDetailsList:"/aims/user/getBRMDetails"
        }
    }
}