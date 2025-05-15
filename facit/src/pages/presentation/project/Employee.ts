/* eslint-disable prettier/prettier */
export interface Employee {
    id: number;
    status: string;
    employeeId: string;
    salutation: string;
    employeeName: string;
    employeeEmail: string;
    profilePicture: File | null;
    dateOfBirth: string;
    designation: string;
    department: string;
    country: string;
    mobile: string;
    gender: string;
    joiningDate: string;
    reportingTo: string;
    language: string;
    userRole: string;
    address: string;
    about: string;
    loginAllowed: string;
    emailNotifications: string;
    hourlyRate: string;
    slackMemberId: string;
    skills: string;
    probationEndDate: string;
    noticePeriodStartDate: string;
    noticePeriodEndDate: string;
    employmentType: string;
    maritalStatus: string;
    businessAddress: string;
    exitDate?: string; // Optional property
    skillSet: string[];
    name: string; // Ensure this is a required string
    role?: string;
    email?: string;
  }