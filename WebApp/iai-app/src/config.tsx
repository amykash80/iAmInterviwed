const AppConfig = {
    apiBaseUrl: "https://coreapi.iaminterviewed.com/api",
    //apiBaseUrl: "https://localhost:7254/api",
    appBaseUrl: "https://coreapi.iaminterviewed.com/",
    //environment: "Dev",
    environment: "Prod",
    account: {
        userTokenHeader: "x-auth-token",
        apiTokenHeader: "Authorization",
        authenticationUrl: "/Account/token",
        logOutUrl: "/Account/Logout",
        register: "/Account/Register",
        registerCompany: "/Account/RegisterCompany",
        userDetails: "/Account/UserDetails",
        verifyuser: "/Account/VerifyUser",

        changePassword: "/Account/ChangePassword"
    },
    layout: {
        getRoutes: "/RoleMapping/GetRoutes"
    },
    masterDataLoad: {
        getPrimarySkills: "MasterData/GetPrimarySkills",
        getSecondarySkills: "MasterData/GetSecondarySkills",
        getSoftSkills: "MasterData/GetSoftSkills",
        getRoles: "MasterData/GetRoles",
        getCountries: "MasterData/GetCountries",
        getCities: "MasterData/GetCities",
        getDesignation: "MasterData/GetDesignation",
        getDomains: "MasterData/GetDomains",
        getExperiences: "MasterData/GetExperiences",
        getInterviewTypes: "MasterData/GetInterviewTypes",
        getJobTypes: "MasterData/GetJobTypes",
        getNoticePeriod: "MasterData/GetNoticePeriod",
        getScreens: "MasterData/GetScreens",
        getStatus: "MasterData/GetStatus",
        getTimeSlots: "MasterData/GetTimeSlots",
        getZoomAccounts: "MasterData/GetZoomAccounts",
        getInterviewRounds: "MasterData/GetInterviewRounds"
    },
    envVariables: {
        //recapchaSiteKey: "6LdPCRElAAAAAIwzBtw1wdlnyMTeo9kznlOxsnaN",
        //recapchaSecretKey: ""
        //Server Keys for prod build
        recapchaSiteKey: "6LfZfRYlAAAAAL79aHhemQ1IvuxDsJ5U-4OIElpO",
        recapchaSecretKey: "6LfZfRYlAAAAAGREUoJICnB5M20hBZ-cjP4OgJ-A"
    },
    candidate: {
        getCandidateDesignations: "Candidate/CandidateDesignation",
        getCandidateProfile: "Candidate/CandidateProfile",
        saveCandidateProfile: "Candidate/SaveCandidateProfile",
        candidateScheduleInterview: "Candidate/ScheduleInterview",
        getCandidateDashboardDetails: "Candidate/CandidateDashboardDetails",
        getInterviewRatingDetails: "Candidate/InterviewRatingDetails",
    },
    interviewer: {
        getInterviewerPersonalInfo: "Interviewer/InterviewerPersonalInfo",
        saveInterviewerPersonalInfo: "Interviewer/SaveInterviewerPersonalInfo",
        getInterviewerProfile: "Interviewer/InterviewerProfile",
        saveInterviewerProfile: "Interviewer/SaveInterviewerProfile",
        getInterviewerSchedules: "Interviewer/InterviewerSchedules",
        saveInterviewerSchedule: "Interviewer/SaveInterviewerSchedule",
        getInterviewDetails: "Interviewer/InterviewDetails",
        confirmInterview: "Interviewer/ConfirmInterview",
        pickUpSchedules: "Interviewer/PickUpSchedules",
        updateInterviewerForSchedule: "Interviewer/UpdateInterviewerForSchedule",
        getInterviewRatingDetails: "Interviewer/InterviewRatingDetails",
        updateInterviewRating: "Interviewer/UpdateInterviewRating",
        loadInterviewerDashboard: "Interviewer/InterviewerDashboard"
    },
    company: {
        dashboard: {

        },
        department: {
            fillDepartments: "Department/fillDepartments",
            getDepartments: "Department/getDepartments",
            getDepartmentById: "Department/getDepartmentById",
            saveDepartment: "Department/saveDepartment"
        },
        designation: {
            fillDesignations: "Designation/fillDesignations",
            getDesignations: "Designation/getDesignations",
            getDesignationById: "Designation/getDesignationById",
            saveDesignation: "Designation/saveDesignation"
        },
        subUser: {
            fillSubUsers: "SubUser/fillSubUsers",
            getSubUsers: "SubUser/getSubUsers",
            getSubUserById: "SubUser/getSubUserById",
            saveSubUser: "SubUser/saveSubUser"
        },
        vendor: {
            fillVendors: "Vendor/fillVendors",
            getVendors: "Vendor/getVendors",
            getVendorById: "Vendor/getVendorById",
            saveVendor: "Vendor/saveVendor"
        },
        vendorSubUser: {
            fillVendorSubUsers: "VendorSubUser/fillVendorSubUsers",
            getVendorSubUsers: "VendorSubUser/getVendorSubUsers",
            getVendorSubUserById: "VendorSubUser/getVendorSubUserById",
            saveVendorSubUser: "VendorSubUser/saveVendorSubUser"
        },
        jobPosting: {
            fillJobCodes: "JobPosting/fillJobCodes",
            getAllJobPostings: "JobPosting/getAllJobPostings",
            getJobPostings: "JobPosting/getJobPostings",
            getJobPostingById: "JobPosting/getJobPostingById",
            saveJobPosting: "JobPosting/saveJobPosting",
            getInterviewProcesses: "JobPosting/getInterviewProcesses",
            getInterviewProcessSkills: "JobPosting/getInterviewProcessSkills",
            saveInterviewProcess: "JobPosting/saveInterviewProcess",
            getCompanyConfiguration: "JobPosting/getCompanyConfiguration"
        }
    },
    fileUpload: {
        uploadFile: "FileUpload/UploadFile",
        downloadFile: "FileUpload/DownloadFile"
    }
};
export default AppConfig;