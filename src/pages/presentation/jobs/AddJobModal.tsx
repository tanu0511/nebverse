/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react';
import Modal, {
  ModalBody,
  ModalFooter,
  ModalHeader,
  ModalTitle,
} from '../../../components/bootstrap/Modal';
import Button from '../../../components/bootstrap/Button';
import FormGroup from '../../../components/bootstrap/forms/FormGroup';
import Input from '../../../components/bootstrap/forms/Input';
import Select from '../../../components/bootstrap/forms/Select';
import SkillsModal from './SkillsModal';
import AddJobCategoryModal from './AddJobCategoryModal'; 
import AddJobSubCategoryModal from './AddJobSubCategoryModal'; 
import InterviewRoundsModal from './InterviewRoundsModal'; 
import AddRecruiterModal from './AddRecruiterModal';
import JobTypeModal from './JobTypeModal';
import WorkExperienceModal from './WorkExperienceModal';

interface AddJobModalProps {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  onAddJob: (job: any) => void;
  job?: any;
  isDuplicate?: boolean; // <-- add this
}

const jobCategories = ['--', 'IT', 'Finance', 'HR'];
const jobSubCategories = ['--', 'Frontend', 'Backend'];
const departments = [
  '--',
  'HR',
  'ADMIN',
  'FRONTEND DEVELOPER',
  'BACKEND DEVELOPER',
  'FULL STACK DEVELOPER',
];
const workExperiencesDefault = [
  '--',
  'Fresher',
  '0-1 years',
  '1-3 years',
  '3-5 years',
  '5+ years'
];
const currencies = ['INR (₹)', 'USD ($)'];
const statusOptions = [
  { value: 'Open', label: 'Open', color: '#00e676' },
  { value: 'Closed', label: 'Closed', color: '#f44336' },
];

const AddJobModal: React.FC<AddJobModalProps> = ({
  isOpen,
  setIsOpen,
  onAddJob,
  job, 
  isDuplicate,
}) => {
  const [jobTypes, setJobTypes] = useState([
    'Full time', 'Part time', 'On Contract', 'Internship'
  ]);
  const [workExperiences, setWorkExperiences] = useState(workExperiencesDefault);
  const [jobData, setJobData] = useState({
    jobTitle: '',
    jobCategory: '--',
    jobSubCategory: '--',
    department: '--',
    skills: [] as string[],
    location: '',
    interviewRounds: '',
    startDate: '',
    endDate: '',
    noEndDate: false,
    recruiter: '--',
    jobType: '--',
    showPayBy: '--',
    totalOpenings: '',
    status: 'Open',
    workExperience: '--',
    currency: 'INR (₹)',
    isRemote: false,
    discloseSalary: false,
    jobDescription: '',
    requiredPhoto: false,
    requiredResume: false,
    requiredDOB: false,
    requiredGender: false,
    requiredCurrentCTC: false,
    requiredExpectedCTC: false,
    minSalary: '',
    maxSalary: '',
    rate: '',
    metaTitle: '',
    metaDescription: '',
  });

  const [categoryModalOpen, setCategoryModalOpen] = useState(false);
  const [jobCategoriesState, setJobCategoriesState] = useState(jobCategories);
  const [jobSubCategoriesState, setJobSubCategoriesState] = useState(jobSubCategories);
  const [jobSubCategoryModalOpen, setJobSubCategoryModalOpen] = useState(false);
  const [skillsModalOpen, setSkillsModalOpen] = useState(false);
  const [interviewRoundsModalOpen, setInterviewRoundsModalOpen] = useState(false);
  const [rounds, setRounds] = useState<string[]>([]);
  const [recruiters, setRecruiters] = useState(['--', 'John Doe', 'Jane Smith']);
  const [recruiterModalOpen, setRecruiterModalOpen] = useState(false);
  const [jobTypeModalOpen, setJobTypeModalOpen] = useState(false);
  const [workExperienceModalOpen, setWorkExperienceModalOpen] = useState(false);
  const [skills, setSkills] = useState<string[]>(['JavaScript', 'React', 'Node.js']); // Example default skills

  useEffect(() => {
    if (job) {
      setJobData({ ...jobData, ...job });
    } else {
      setJobData({
        jobTitle: '',
        jobCategory: '--',
        jobSubCategory: '--',
        department: '--',
        skills: [],
        location: '',
        interviewRounds: '',
        startDate: '',
        endDate: '',
        noEndDate: false,
        recruiter: '--',
        jobType: '--',
        showPayBy: '--',
        totalOpenings: '',
        status: 'Open',
        workExperience: '--',
        currency: 'INR (₹)',
        isRemote: false,
        discloseSalary: false,
        jobDescription: '',
        requiredPhoto: false,
        requiredResume: false,
        requiredDOB: false,
        requiredGender: false,
        requiredCurrentCTC: false,
        requiredExpectedCTC: false,
        minSalary: '',
        maxSalary: '',
        rate: '',
        metaTitle: '',
        metaDescription: '',
      });
    }
    
  }, [job, isOpen]);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>,
  ) => {
    const { name, value, type } = e.target;
    setJobData((prev) => ({
      ...prev,
      [name]:
        type === 'checkbox'
          ? (e.target as HTMLInputElement).checked
          : value,
    }));
  };


  const handleSave = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    onAddJob({
      id: job?.id || Date.now(),
      ...jobData,
      description: jobData.jobDescription, 
      skills: jobData.skills.join(', '),
      endDate: jobData.noEndDate ? '' : jobData.endDate,
    });
    setIsOpen(false);
  };

  const handleAddRecruiter = (newRecruiter: string) => {
    setRecruiters(prev => [...prev, newRecruiter]);
    setJobData(prev => ({ ...prev, recruiter: newRecruiter }));
  };

  return (
    <Modal isOpen={isOpen} setIsOpen={setIsOpen} size="xl" isStaticBackdrop>
      <ModalHeader setIsOpen={setIsOpen}>
        <ModalTitle id="add-job-title">{job ? 'Add Job' : 'Add Job'}</ModalTitle>
      </ModalHeader>
      <ModalBody>
        <form onSubmit={handleSave}>
          <div className="row g-3">
            <FormGroup label="Job Title *" className="col-md-3">
              <Input
                name="jobTitle"
                value={jobData.jobTitle}
                onChange={handleInputChange}
                placeholder="Job Title"
                required
              />
            </FormGroup>
            <FormGroup label="Job Category *" className="col-md-3">
              <div className="input-group">
                <Select
                  name="jobCategory"
                  value={jobData.jobCategory}
                  onChange={handleInputChange}
                  ariaLabel="Job Category"
                >
                  {jobCategoriesState.map((opt) => (
                    <option key={opt}>{opt}</option>
                  ))}
                </Select>
                <Button
                  color="light"
                  className="input-group-text"
                  type="button"
                  onClick={() => setCategoryModalOpen(true)} 
                >
                  Add
                </Button>
              </div>
            </FormGroup>
            <FormGroup label="Job Sub Category *" className="col-md-3">
              <div className="input-group">
                <Select
                  name="jobSubCategory"
                  value={jobData.jobSubCategory}
                  onChange={handleInputChange}
                  ariaLabel="Job Sub Category"
                >
                  {jobSubCategoriesState.map((opt) => (
                    <option key={opt}>{opt}</option>
                  ))}
                </Select>
                <Button
                  color="light"
                  className="input-group-text"
                  type="button"
                  onClick={() => setJobSubCategoryModalOpen(true)}
                >
                  Add
                </Button>
              </div>
            </FormGroup>
            <FormGroup label="Department *" className="col-md-3">
              <Select
                name="department"
                value={jobData.department}
                onChange={handleInputChange}
                ariaLabel="Department"
              >
                {departments.map((opt) => (
                  <option key={opt}>{opt}</option>
                ))}
              </Select>
            </FormGroup>
            <FormGroup label="Skills *" className="col-md-3">
              <div className="input-group" style={{ width: '100%' }}>
                <Select
                  name="skills"
                  value={jobData.skills}
                  onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
                    setJobData({
                      ...jobData,
                      skills: [e.target.value], // Store as array for consistency
                    })
                  }
                  ariaLabel="Skills"
                >
                  <option value="">--</option>
                  {skills.map((skill) => (
                    <option key={skill} value={skill}>
                      {skill}
                    </option>
                  ))}
                </Select>
                <Button
                  color="light"
                  className="input-group-text"
                  type="button"
                  onClick={() => setSkillsModalOpen(true)}
                >
                  Add
                </Button>
              </div>
            </FormGroup>
            <FormGroup label="Location *" className="col-md-3">
              <div className="input-group">
                <Select
                  name="location"
                  value={jobData.location}
                  onChange={handleInputChange}
                  ariaLabel="Location"
                >
                  <option value="">--</option>
                  <option value="Delhi">Delhi</option>
                  <option value="Mumbai">Mumbai</option>
                  <option value="Bangalore">Bangalore</option>
                  <option value="Chennai">Chennai</option>
                </Select>
              </div>
            </FormGroup>
            <FormGroup label="Interview Rounds *" className="col-md-3">
              <div className="input-group">
                <Select
                  name="interviewRounds"
                  value={jobData.interviewRounds}
                  onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
                    setJobData({
                      ...jobData,
                      interviewRounds: e.target.value,
                    })
                  }
                  ariaLabel="Interview Rounds"
                >
                  <option value="">--</option>
                  {rounds.map((round) => (
                    <option key={round} value={round}>
                      {round}
                    </option>
                  ))}
                </Select>
                <Button
                  color="light"
                  className="input-group-text"
                  type="button"
                  onClick={() => setInterviewRoundsModalOpen(true)}
                >
                  Add
                </Button>
              </div>
            </FormGroup>
            <FormGroup label="Start Date" className="col-md-3">
              <Input
                type="date"
                name="startDate"
                value={jobData.startDate}
                onChange={handleInputChange}
              />
            </FormGroup>
            <FormGroup label="End Date *" className="col-md-3">
              <Input
                type="date"
                name="endDate"
                value={jobData.endDate}
                onChange={handleInputChange}
                disabled={jobData.noEndDate}
              />
              <div>
                <input
                  type="checkbox"
                  checked={jobData.noEndDate}
                  onChange={(e) =>
                    setJobData((prev) => ({
                      ...prev,
                      noEndDate: e.target.checked,
                    }))
                  }
                  id="noEndDate"
                />{' '}
                No End Date
              </div>
            </FormGroup>
            <FormGroup label="Recruiter *" className="col-md-3">
              <div className="input-group">
                <Select
                  name="recruiter"
                  value={jobData.recruiter}
                  onChange={handleInputChange}
                  ariaLabel="Recruiter"
                >
                  {recruiters.map((opt) => (
                    <option key={opt}>{opt}</option>
                  ))}
                </Select>
                <Button
                  color="light"
                  className="input-group-text"
                  type="button"
                  onClick={() => setRecruiterModalOpen(true)}
                >
                  Add
                </Button>
              </div>
            </FormGroup>
            <FormGroup label="Job Type *" className="col-md-3">
              <div className="input-group">
                <Select
                  name="jobType"
                  value={jobData.jobType}
                  onChange={handleInputChange}
                  ariaLabel="Job Type"
                >
                  <option value="">--</option>
                  {jobTypes.map((opt) => (
                    <option key={opt}>{opt}</option>
                  ))}
                </Select>
                <Button
                  color="light"
                  className="input-group-text"
                  type="button"
                  onClick={() => setJobTypeModalOpen(true)}
                >
                  Add
                </Button>
              </div>
            </FormGroup>
            <FormGroup label="Work Experience" className="col-md-3">
              <div className="input-group">
                <Select
                  name="workExperience"
                  value={jobData.workExperience}
                  onChange={handleInputChange}
                  ariaLabel="Work Experience"
                >
                  {workExperiences.map((opt) => (
                    <option key={opt}>{opt}</option>
                  ))}
                </Select>
                <Button
                  color="light"
                  className="input-group-text"
                  type="button"
                  onClick={() => setWorkExperienceModalOpen(true)}
                >
                  Add
                </Button>
              </div>
            </FormGroup>
            <FormGroup label="Total Openings *" className="col-md-3">
              <Input
                name="totalOpenings"
                value={jobData.totalOpenings}
                onChange={handleInputChange}
                placeholder="Total Openings"
                required
              />
            </FormGroup>
            <FormGroup label="Status" className="col-md-3">
              <Select
                name="status"
                value={jobData.status}
                onChange={handleInputChange}
                ariaLabel="Status"
              >
                {statusOptions.map((opt) => (
                  <option key={opt.value} value={opt.value}>
                    {/* colored dot */}
                    {opt.label}
                  </option>
                ))}
              </Select>
            </FormGroup>
            <FormGroup label="Currency" className="col-md-3">
              <Select
                name="currency"
                value={jobData.currency}
                onChange={handleInputChange}
                ariaLabel="Currency"
              >
                {currencies.map((opt) => (
                  <option key={opt}>{opt}</option>
                ))}
              </Select>
            </FormGroup>
            <FormGroup label="Show Pay By" className="col-md-3">
              <div className="input-group">
                <Select
                  name="showPayBy"
                  value={jobData.showPayBy}
                  onChange={handleInputChange}
                  ariaLabel="Show Pay By"
                >
                  <option value="">--</option>
                  <option value="Range">Range</option>
                  <option value="Starting Salary Amount">Starting Salary Amount</option>
                  <option value="Maximum Salary Amount">Maximum Salary Amount</option>
                  <option value="Exact Salary Amount">Exact Salary Amount</option>
                </Select>
              </div>
            </FormGroup>
            {jobData.showPayBy === 'Range' && (
              <>
                <FormGroup label="Minimum Salary Amount *" className="col-md-3">
                  <Input
                    name="minSalary"
                    value={jobData.minSalary || ''}
                    onChange={handleInputChange}
                    placeholder="Minimum Salary Amount"
                    required
                  />
                </FormGroup>
                <FormGroup label="Maximum Salary Amount *" className="col-md-3">
                  <Input
                    name="maxSalary"
                    value={jobData.maxSalary || ''}
                    onChange={handleInputChange}
                    placeholder="Maximum Salary Amount"
                    required
                  />
                </FormGroup>
                <FormGroup label="Rate *" className="col-md-3">
                  <Select
                    name="rate"
                    value={jobData.rate || ''}
                    onChange={handleInputChange}
                    ariaLabel="Rate"
                    required
                  >
                    <option value="">--</option>
                    <option value="Per Month">Per Month</option>
                    <option value="Per Year">Per Year</option>
                    <option value="Per Week">Per Week</option>
                    <option value="Per Day">Per Day</option>
                  </Select>
                </FormGroup>
              </>
            )}

            {jobData.showPayBy === 'Starting Salary Amount' && (
              <>
                <FormGroup label="Starting Salary Amount *" className="col-md-6">
                  <Input
                    name="minSalary"
                    value={jobData.minSalary || ''}
                    onChange={handleInputChange}
                    placeholder="Starting Salary Amount"
                    required
                  />
                </FormGroup>
                <FormGroup label="Rate *" className="col-md-3">
                  <Select
                    name="rate"
                    value={jobData.rate || ''}
                    onChange={handleInputChange}
                    ariaLabel="Rate"
                    required
                  >
                    <option value="">--</option>
                    <option value="Per Month">Per Month</option>
                    <option value="Per Year">Per Year</option>
                    <option value="Per Week">Per Week</option>
                    <option value="Per Day">Per Day</option>
                  </Select>
                </FormGroup>
              </>
            )}
            {jobData.showPayBy === 'Maximum Salary Amount' && (
              <>
                <FormGroup label="Maximum Salary Amount *" className="col-md-6">
                  <Input
                    name="maxSalary"
                    value={jobData.maxSalary || ''}
                    onChange={handleInputChange}
                    placeholder="Maximum Salary Amount"
                    required
                  />
                </FormGroup>
                <FormGroup label="Rate *" className="col-md-3">
                  <Select
                    name="rate"
                    value={jobData.rate || ''}
                    onChange={handleInputChange}
                    ariaLabel="Rate"
                    required
                  >
                    <option value="">--</option>
                    <option value="Per Month">Per Month</option>
                    <option value="Per Year">Per Year</option>
                    <option value="Per Week">Per Week</option>
                    <option value="Per Day">Per Day</option>
                  </Select>
                </FormGroup>
              </>
            )}
            {jobData.showPayBy === 'Exact Salary Amount' && (
              <>
                <FormGroup label="Exact Salary Amount *" className="col-md-6">
                  <Input
                    name="minSalary"
                    value={jobData.minSalary || ''}
                    onChange={handleInputChange}
                    placeholder="Exact Salary Amount"
                    required
                  />
                </FormGroup>
                <FormGroup label="Rate *" className="col-md-3">
                  <Select
                    name="rate"
                    value={jobData.rate || ''}
                    onChange={handleInputChange}
                    ariaLabel="Rate"
                    required
                  >
                    <option value="">--</option>
                    <option value="Per Month">Per Month</option>
                    <option value="Per Year">Per Year</option>
                    <option value="Per Week">Per Week</option>
                    <option value="Per Day">Per Day</option>
                  </Select>
                </FormGroup>
              </>
            )}
            <div className="col-md-3">
              <div className="form-check mt-4">
                <input
                  className="form-check-input"
                  type="checkbox"
                  checked={jobData.isRemote}
                  onChange={(e) =>
                    setJobData((prev) => ({
                      ...prev,
                      isRemote: e.target.checked,
                    }))
                  }
                  id="isRemote"
                />
                <label className="form-check-label" htmlFor="isRemote">
                  Is this a remote Job?
                </label>
              </div>
            </div>
            <div className="col-md-3">
              <div className="form-check mt-4">
                <input
                  className="form-check-input"
                  type="checkbox"
                  checked={jobData.discloseSalary}
                  onChange={(e) =>
                    setJobData((prev) => ({
                      ...prev,
                      discloseSalary: e.target.checked,
                    }))
                  }
                  id="discloseSalary"
                />
                <label className="form-check-label" htmlFor="discloseSalary">
                  Disclose salary on career site
                </label>
              </div>
            </div>
          </div>
          <FormGroup label="Job Description" className="mt-4">
            <textarea
              name="jobDescription"
              className="form-control"
              rows={4}
              value={jobData.jobDescription}
              onChange={handleInputChange}
            />
          </FormGroup>

          {isDuplicate && (
            <div className="row">
              <FormGroup label="Meta Title" className="col-md-6">
                <Input
                  name="metaTitle"
                  value={jobData.metaTitle || ''}
                  onChange={handleInputChange}
                  placeholder="Meta Title"
                />
              </FormGroup>
              <FormGroup label="Meta Description" className="col-md-6">
                <textarea
                  name="metaDescription"
                  className="form-control"
                  rows={3}
                  value={jobData.metaDescription || ''}
                  onChange={handleInputChange}
                  placeholder="Meta Description"
                />
              </FormGroup>
            </div>
          )}
          <div className="mt-4">
            <div className="fw-bold">
              Required Fields <i className="bi bi-info-circle" />
            </div>
            <div className="row">
              <div className="col-md-2">
                <input
                  type="checkbox"
                  checked={jobData.requiredPhoto}
                  onChange={(e) =>
                    setJobData((prev) => ({
                      ...prev,
                      requiredPhoto: e.target.checked,
                    }))
                  }
                />{' '}
                Photo
              </div>
              <div className="col-md-2">
                <input
                  type="checkbox"
                  checked={jobData.requiredResume}
                  onChange={(e) =>
                    setJobData((prev) => ({
                      ...prev,
                      requiredResume: e.target.checked,
                    }))
                  }
                />{' '}
                Resume
              </div>
              <div className="col-md-2">
                <input
                  type="checkbox"
                  checked={jobData.requiredDOB}
                  onChange={(e) =>
                    setJobData((prev) => ({
                      ...prev,
                      requiredDOB: e.target.checked,
                    }))
                  }
                />{' '}
                Date Of Birth
              </div>
              <div className="col-md-2">
                <input
                  type="checkbox"
                  checked={jobData.requiredGender}
                  onChange={(e) =>
                    setJobData((prev) => ({
                      ...prev,
                      requiredGender: e.target.checked,
                    }))
                  }
                />{' '}
                Gender
              </div>
              <div className="col-md-2">
                <input
                  type="checkbox"
                  checked={jobData.requiredCurrentCTC}
                  onChange={(e) =>
                    setJobData((prev) => ({
                      ...prev,
                      requiredCurrentCTC: e.target.checked,
                    }))
                  }
                />{' '}
                Current CTC
              </div>
              <div className="col-md-2">
                <input
                  type="checkbox"
                  checked={jobData.requiredExpectedCTC}
                  onChange={(e) =>
                    setJobData((prev) => ({
                      ...prev,
                      requiredExpectedCTC: e.target.checked,
                    }))
                  }
                />{' '}
                Expected CTC
              </div>
            </div>
          </div>
        </form>
      </ModalBody>
      <ModalFooter>
        <Button color="light" onClick={() => setIsOpen(false)}>
          Cancel
        </Button>
        <Button color="primary" onClick={handleSave}>
          Save
        </Button>
      </ModalFooter>
      {/* Skills Modal */}
      <SkillsModal
        isOpen={skillsModalOpen}
        setIsOpen={setSkillsModalOpen}
        skills={skills}
        setSkills={setSkills}
      />
      {/* Interview Rounds Modal */}
      <InterviewRoundsModal
        isOpen={interviewRoundsModalOpen}
        setIsOpen={setInterviewRoundsModalOpen}
        rounds={rounds}
        setRounds={setRounds}
      />
      {/* Add Job Category Modal */}
      <AddJobCategoryModal
        isOpen={categoryModalOpen}
        setIsOpen={setCategoryModalOpen}
        onSave={(newCategory: string) => {
          setJobCategoriesState(prev => [...prev, newCategory]);
          setJobData(prev => ({ ...prev, jobCategory: newCategory }));
          setCategoryModalOpen(false);
        }}
      />
      {/* Add Job Sub Category Modal */}
      <AddJobSubCategoryModal
        isOpen={jobSubCategoryModalOpen}
        setIsOpen={setJobSubCategoryModalOpen}
        categories={jobCategoriesState}
        subCategories={jobSubCategoriesState}
        onSave={(newSubCategory: string) => {
          setJobSubCategoriesState(prev => [...prev, newSubCategory]);
          setJobData(prev => ({ ...prev, jobSubCategory: newSubCategory }));
          setJobSubCategoryModalOpen(false);
        }}
      />
      {/* Add Recruiter Modal */}
      <AddRecruiterModal
        isOpen={recruiterModalOpen}
        setIsOpen={setRecruiterModalOpen}
        onSave={handleAddRecruiter}
      />
      {/* Job Type Modal */}
      <JobTypeModal
        isOpen={jobTypeModalOpen}
        setIsOpen={setJobTypeModalOpen}
        jobTypes={jobTypes}
        setJobTypes={setJobTypes}
      />
      {/* Work Experience Modal */}
      <WorkExperienceModal
        isOpen={workExperienceModalOpen}
        setIsOpen={setWorkExperienceModalOpen}
        workExperiences={workExperiences}
        setWorkExperiences={setWorkExperiences}
      />
    </Modal>
  );
};

export default AddJobModal;