
export interface Employee {
    employmentType: string;
    businessAddress: string;
    maritalStatus: string;
    hourlyRate: number;
    slackMemberId: string;
    skills: string;
    probationEndDate: string;
    noticePeriodStartDate: string;
    probationPeriod: string;
    noticePeriodEndDate?: string;
    salutation: string;
    dateOfBirth: string;
    designation: string;
    department: string;
    about: string;
    country: string;
    mobile: string;
    gender: string;
    joiningDate: string;
    language: string;
    address: string;
    id: number;
    employeeId: string;
    name: string;
    email: string;
    userRole: string;
    reportingTo: string;
    status: string;
    exitDate?: string;
    profilePicture: string |File| null;
    loginAllowed: boolean;
    emailNotifications: boolean;
    employeeName?: string;
    employeeEmail?: string;
    isSelected?: boolean;
  }