export const APP_CONSTANTS = {
    URL: {
        LOCAL: {
            LOGIN: "assets/mock/aims/login.json",
            REGISTER: "assets/mock/aims/register.json",
            UPLOAD: "assets/mock/aims/upload.json",
            UPLOADBR: "assets/mock/aims/uploadbr.json",
            UPLOADCLARITY: "assets/mock/aims/uploadClarity.json",
            BillingUpload: "assets/mock/aims/uploadBilling.json",
            SEARCH: "assets/mock/aims/getEmployeeDetails.json",
            VERSION: "assets/mock/aims/getVersionNo.json",
            Download: "assets/mock/aims/download.json",
            BillingDetails: "\\assets\\mock\\aims\\dashBoard\\billing.json",
            SRJRRatio:"\\assets\\mock\\aims\\dashBoard\\SeniorJuniorRatio.json",
            HeadCount:"\\assets\\mock\\aims\\dashBoard\\HeadCount.json",
            TraineeCount:"\\assets\\mock\\aims\\dashBoard\\Trainee.json",
            BADetails:"\\assets\\mock\\aims\\dashBoard\\BACount.json",
            BillingManagment:"assets/mock/aims/getBillingDetails.json",
            GetClarityFile :"assets/mock/aims/getClarityDetails.json",
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
            UPLOADCLARITY: "aims/user/upload/cr",
            BillingUpload: "aims/user/upload/br",
            SEARCH: "aims/user/getEmployeeDetails",
            VERSION: "aims/user/versioninfo",
            Download: "download",
            BillingDetails: "aims/user/dashboard",
            SRJRRatio:"aims/user/dashboard",
            HeadCount:"aims/user/dashboard",
            TraineeCount:"aims/user/dashboard",
            BADetails:"aims/user/dashboard",
            BillingManagment:"/aims/user/getBillingDetails",
            GetClarityFile :"assets/mock/aims/getClarityDetails",
            DownloadBillingFile:"downloadBilling",
            YearValues:"assets/mock/aims/YearsList.json",
            BRMDetailsList:"/aims/user/getBRMDetails",
            GetFreeze:"/aims/user/updateFreeze",
            UpdateBillingDetails:"/aims/user/updateBillingDetails",
            UPLOADREPORTS:"/aims/user/getFileStatus"
            
        }
    }
}