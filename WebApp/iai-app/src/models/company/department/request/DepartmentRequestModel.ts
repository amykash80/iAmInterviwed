interface DepartmentRequestModel {
    departmentId: string | null;
    departmentName: string;
    description: string | null;
    companyId: string;
    userId: string;
}
export default DepartmentRequestModel;