interface VendorRequestModel {
    vendorId: string;
    userId: string;
    companyId: string;
    vendorName: string;
    vendorEmailId: string;
    vendorUserName: string;
    vendorPhoneNumber: number | null;
    startDate: Date | null;
    endDate: Date | null;
}
export default VendorRequestModel;