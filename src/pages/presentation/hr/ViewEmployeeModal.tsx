import React from 'react';
import Modal, { ModalBody, ModalHeader } from '../../../components/bootstrap/Modal';

interface ViewEmployeeModalProps {
    isOpen: boolean;
    setIsOpen: (isOpen: boolean) => void;
    employee?: {
        language: string;
        country: string;
        dateOfBirth: string;
        maritalStatus: string;
        employeeId: string;
        email: string;
        userRole: string;
        status: string;
        reportingTo: string;
        designation: string;
        department: string;
        joiningDate: string;
        mobile: string;
        gender: string;
        address: string;
        about: string;
        noticePeriodStartDate: string;
        exitDate: string;
        slackMemberId: string;
        noticePeriodEndDate: string;
        probationEndDate: string;
        employmentType: string;
        skills: string;
        hourlyRate: string;
        
        profilePicture: string | null;
    } | null;
}

const renderDetail = (label: string, value?: string | null) => (
    <p><strong>{label}:</strong> {value ? value : 'Not Available'}</p>
);

const ViewEmployeeModal: React.FC<ViewEmployeeModalProps> = ({ isOpen, setIsOpen, employee }) => {
    if (!employee) return null;

    console.log('Employee Skills:', employee.skills);

    return (
        <Modal isOpen={isOpen} setIsOpen={setIsOpen} size="lg">
            <ModalHeader setIsOpen={setIsOpen}>
                <h5 className="modal-title">Employee Details</h5>
            </ModalHeader>
            <ModalBody>
              <div className="d-flex">
                {/* Profile Picture Section */}
                <div className="me-4">
                  {employee.profilePicture ? (
                    <img
                      src={employee.profilePicture}
                      alt="Profile"
                      className="img-fluid rounded-circle shadow"
                      style={{
                        width: '150px',
                        height: '150px',
                        objectFit: 'cover',
                        border: '3px solid #dee2e6',
                      }}
                    />
                  ) : (
                    <div className="text-center">
                      <p>No Profile Picture</p>
                    </div>
                  )}
                </div>

                {/* Employee Details Section */}
                <div className="flex-grow-1">
                  {/* Section 1 */}
                  <div className="row">
                    {/* Left Column */}
                    <div className="col-md-6">
                      {renderDetail("Employee ID", employee.employeeId)}
                      {renderDetail("Email", employee.email)}
                      {renderDetail("User Role", employee.userRole)}
                      {renderDetail("Status", employee.status)}
                      {renderDetail("Reporting To", employee.reportingTo)}
                    </div>

                    {/* Right Column */}
                    <div className="col-md-6">
                      {renderDetail("Designation", employee.designation)}
                      {renderDetail("Department", employee.department)}
                      {renderDetail("Joining Date", employee.joiningDate)}
                      {renderDetail("Mobile", employee.mobile)}
                      {renderDetail("Gender", employee.gender)}
                    </div>
                  </div>

                  <hr /> {/* Separator Line */}

                  {/* Section 2 */}
                  <div className="row">
                    <div className="col-md-6">
                      <p><strong>About:</strong> {employee.about || 'N/A'}</p>
                      <p><strong>Language:</strong> {employee.language || 'N/A'}</p>
                      <p><strong>Country:</strong> {employee.country || 'N/A'}</p>
                      <p><strong>DOB:</strong> {employee.dateOfBirth || 'N/A'}</p>
                      <p><strong>Marital Status:</strong> {employee.maritalStatus || 'N/A'}</p>
                      
                      <p><strong>Employment Type:</strong> {employee.employmentType || 'N/A'}</p>
                      <p><strong>Notice Period Start Date:</strong> {employee.noticePeriodStartDate || 'N/A'}</p>
                    </div>
                    <div className="col-md-6">
                      <p><strong>Notice Period End Date:</strong> {employee.noticePeriodEndDate || 'N/A'}</p>
                      <p><strong>Prohibition End Date:</strong> {employee.probationEndDate || 'N/A'}</p>
                      <p><strong>Slack Member ID:</strong> {employee.slackMemberId || 'N/A'}</p>
                      {/* <p><strong>Skills:</strong> {employee.skills || 'N/A'}</p> */}
                      <p>
    <strong>Skills:</strong>{' '}
    {employee.skills && employee.skills.length > 0
      ? employee.skills
      : 'N/A'}
  </p>
                      <p><strong>Hourly Rate:</strong> {employee.hourlyRate || 'N/A'}</p>
                   
                      <p><strong>Exit Date:</strong> {employee.exitDate || 'N/A'}</p>
                    </div>
                  </div>
                </div>
              </div>
            </ModalBody>
        </Modal>
    );
};

export default ViewEmployeeModal;
