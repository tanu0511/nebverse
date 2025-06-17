// import React, { FC, useState, useEffect } from 'react';
// import Card, {
//     CardActions,
//     CardBody,
//     CardHeader,
//     CardTitle,
// } from '../../../components/bootstrap/Card';
// import Button from '../../../components/bootstrap/Button';
// import PaginationButtons, { dataPagination, PER_COUNT } from '../../../components/PaginationButtons';
// import useDarkMode from '../../../hooks/useDarkMode';
// import AddSalaryModal from '../../presentation/payroll/AddSalaryModal';
// import IncrementSalaryModal from './IncrementSalaryModal';
// import Input from '../../../components/bootstrap/forms/Input';
// import Icon from '../../../components/icon/Icon';
// import PageWrapper from '../../../layout/PageWrapper/PageWrapper';
// import Page from '../../../layout/Page/Page';
// import SubHeader, { SubHeaderLeft, SubHeaderRight } from '../../../layout/SubHeader/SubHeader';
// import './AddSalaryModal'
// import Dropdown, { DropdownToggle, DropdownMenu } from '../../../components/bootstrap/Dropdown';
// import SalaryHistoryModal from './SalaryHistoryModal';

// interface ICommonUpcomingEventsProps {
//     isFluid?: boolean;
// }

// interface SalaryHistoryEntry {
//     date: string;
//     type: 'Increment' | 'Decrement' | 'initial';
//     amount: number;
//     annualCTC: number;
// }

// interface EmployeeData {
//     id: number;
//     name: string;
//     salaryCycle: string;
//     salaryGroup: string;
//     allowPayroll: string;
//     netSalary: string;
//     annualCTC: string;
//     salaryHistory?: SalaryHistoryEntry[]; // Add this
// }

// const salaryCycleOptions = ['Monthly', 'Weekly', 'Bi-Weekly', 'Semi-Monthly'];
// const payrollOptions = ['Yes', 'No'];

// const EmployeeSalary: FC<ICommonUpcomingEventsProps> = ({ isFluid }) => {
//     useDarkMode();

//     const [employeeSalaryData, setEmployeeSalaryData] = useState<EmployeeData[]>([]);
//     const [loading, setLoading] = useState(true);
//     const [searchTerm, setSearchTerm] = useState('');
//     const [currentPage, setCurrentPage] = useState(1);
//     const [perPage, setPerPage] = useState(PER_COUNT['5']);
//     const [showModal, setShowModal] = useState(false);
//     const [showIncrement, setShowIncrement] = useState(false);
//     const [showHistory, setShowHistory] = useState(false);
//     const [selectedEmployee, setSelectedEmployee] = useState<EmployeeData | null>(null);
//     const [incrementEmployee, setIncrementEmployee] = useState<EmployeeData | null>(null);
//     const [historyEmployee, setHistoryEmployee] = useState<EmployeeData | null>(null);
//     const [salaryInitialValues, setSalaryInitialValues] = useState<any>(null);
//     const [employee, setEmployee] = useState<EmployeeData>();

//     // Simulate fetching data from backend
//     useEffect(() => {
//         setLoading(true);
//         setTimeout(() => {
//             setEmployeeSalaryData([
//                 {
//                     id: 1,
//                     name: 'TANUSHREE WAGHMARE',
//                     salaryCycle: 'Monthly',
//                     salaryGroup: '--',
//                     allowPayroll: 'No',
//                     netSalary: '--',
//                     annualCTC: '', // Added
//                 },
//                 {
//                     id: 2,
//                     name: 'john',
//                     salaryCycle: 'Monthly',
//                     salaryGroup: '--',
//                     allowPayroll: 'No',
//                     netSalary: '--',
//                     annualCTC: '', // Added
//                 },
//                 {
//                     id: 3,
//                     name: 'Rashmi',
//                     salaryCycle: 'Semi-Monthly',
//                     salaryGroup: '--',
//                     allowPayroll: 'No',
//                     netSalary: '--',
//                     annualCTC: '', // Added
//                 },
//                 {
//                     id: 4,
//                     name: 'ayushi',
//                     salaryCycle: 'Monthly',
//                     salaryGroup: '--',
//                     allowPayroll: 'No',
//                     netSalary: '--',
//                     annualCTC: '', // Added
//                 },
//             ]);
//             setLoading(false);
//         }, 1000); // Simulate network delay
//     }, []);

//     const handleChange = (id: number, field: keyof EmployeeData, value: string) => {
//         const updated = employeeSalaryData.map((item) =>
//             item.id === id ? { ...item, [field]: value } : item
//         );
//         setEmployeeSalaryData(updated);
//     };

//     const handleAddSalaryClick = (employee: EmployeeData, isEdit = false) => {
//         setSelectedEmployee(employee);
//         if (isEdit && employee.netSalary !== '--') {
//             // Prefill with existing data, round annualCTC to nearest integer
//             setSalaryInitialValues({
//                 annualCTC: employee.netSalary !== '--'
//                     ? Math.round(parseFloat(employee.netSalary.replace(/[₹,]/g, '')) * 12).toString()
//                     : '',
//                 // Add other fields if you store them
//             });
//         } else {
//             setSalaryInitialValues(null); // Empty for new
//         }
//         setShowModal(true);
//     };

//     const handleIncrementClick = (employee: EmployeeData) => {
//         setIncrementEmployee(employee);
//         setShowIncrement(true);
//     };

//     const handleShowHistory = (employee: EmployeeData) => {
//         setHistoryEmployee(employee);
//         setShowHistory(true);
//     };

//     const handleSalarySubmit = (values: any) => {
//         if (!selectedEmployee) return;
//         const monthlyCTC = values.annualCTC ? (parseFloat(values.annualCTC) / 12) : 0;
//         const formattedMonthlyCTC = monthlyCTC
//             ? `₹${monthlyCTC.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`
//             : '--';
//         const today = new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' });

//         const updated = employeeSalaryData.map((item) => {
//             if (item.id === selectedEmployee.id) {
//                 let salaryHistory = item.salaryHistory || [];
//                 // If no initial, add it; else update it
//                 if (!salaryHistory.find(h => h.type === 'initial')) {
//                     salaryHistory = [
//                         {
//                             type: 'initial',
//                             amount: parseFloat(values.annualCTC),
//                             annualCTC: parseFloat(values.annualCTC),
//                             date: today,
//                         },
//                     ];
//                 } else {
//                     salaryHistory = salaryHistory.map(h =>
//                         h.type === 'initial'
//                             ? { ...h, amount: parseFloat(values.annualCTC), annualCTC: parseFloat(values.annualCTC), date: today }
//                             : h
//                     );
//                 }
//                 return {
//                     ...item,
//                     netSalary: formattedMonthlyCTC,
//                     annualCTC: values.annualCTC,
//                     salaryHistory,
//                 };
//             }
//             return item;
//         });
//         setEmployeeSalaryData(updated);
//         setShowModal(false);
//     };

//     const handleIncrementSave = (employeeId: number, newAnnualCTC: number, type: 'Increment' | 'Decrement', amount: number, date: string) => {
//         const monthlyCTC = newAnnualCTC / 12;
//         const formattedMonthlyCTC = `₹${monthlyCTC.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
//         const updated = employeeSalaryData.map((item) => {
//             if (item.id === employeeId) {
//                 const history = item.salaryHistory || [];
//                 return {
//                     ...item,
//                     annualCTC: newAnnualCTC.toString(),
//                     netSalary: formattedMonthlyCTC,
//                     salaryHistory: [
//                         ...history,
//                         {
//                             date,
//                             type,
//                             amount,
//                             annualCTC: newAnnualCTC,
//                         },
//                     ],
//                 };
//             }
//             return item;
//         });
//         setEmployeeSalaryData(updated);
//         setShowIncrement(false);
//     };

//     // Filter employees by search term
//     const filteredData = employeeSalaryData.filter((emp) =>
//         emp.name.toLowerCase().includes(searchTerm.toLowerCase())
//     );

//     const handleEditHistory = (entry: SalaryHistoryEntry, idx: number) => {
//         if (!employee) return;
//         const updatedHistory = [...(employee.salaryHistory || [])];
//         updatedHistory[idx] = entry;
//         setEmployee({ ...employee, salaryHistory: updatedHistory });
//     };

//     return (
//         <PageWrapper title="Employee Salary">
//             <SubHeader>
//                 <SubHeaderLeft>
//                     <label className="border-0 bg-transparent cursor-pointer me-0" htmlFor="searchInput">
//                         <Icon icon="Search" size="2x" color="primary" />
//                     </label>
//                     <Input
//                         id="searchInput"
//                         type="search"
//                         className="border-0 shadow-none bg-transparent"
//                         placeholder="Search employee..."
//                         value={searchTerm}
//                         onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearchTerm(e.target.value)}
//                     />
//                 </SubHeaderLeft>
//                 <SubHeaderRight>
//                     <Button
//                         color="info"
//                         icon="CloudDownload"
//                         isLight
//                         tag="a"
//                         to="/somefile.txt"
//                         target="_blank"
//                         download
//                     >
//                         Export
//                     </Button>
//                 </SubHeaderRight>
//             </SubHeader>
//             <Page>
//                 <div className="row h-100">
//                     <div className="col-12">
//                         <Card stretch>
//                             <CardBody isScrollable={isFluid} className="table-responsive">
//                                 {loading ? (
//                                     <div>Loading...</div>
//                                 ) : (
//                                     <table className="table table-modern table-hover">
//                                         <thead>
//                                             <tr>
//                                                 <th>Name</th>
//                                                 <th>Employee Salary Cycle</th>
//                                                 <th>Salary Group</th>
//                                                 <th>Allow Payroll Generate</th>
//                                                 <th>Net Salary (Monthly)</th>
//                                                 <th>Action</th>
//                                             </tr>
//                                         </thead>
//                                         <tbody>
//                                             {dataPagination(filteredData, currentPage, perPage).map((item) => (
//                                                 <tr key={item.id}>
//                                                     <td>{item.name}</td>
//                                                     <td>
//                                                         <select
//                                                             className="form-select"
//                                                             value={item.salaryCycle}
//                                                             onChange={(e) =>
//                                                                 handleChange(item.id, 'salaryCycle', e.target.value)
//                                                             }
//                                                         >
//                                                             {salaryCycleOptions.map((option) => (
//                                                                 <option key={option} value={option}>
//                                                                     {option}
//                                                                 </option>
//                                                             ))}
//                                                         </select>
//                                                     </td>
//                                                     <td>{item.salaryGroup}</td>
//                                                     <td>
//                                                         <select
//                                                             className="form-select"
//                                                             value={item.allowPayroll}
//                                                             onChange={(e) =>
//                                                                 handleChange(item.id, 'allowPayroll', e.target.value)
//                                                             }
//                                                         >
//                                                             {payrollOptions.map((option) => (
//                                                                 <option key={option} value={option}>
//                                                                     {option}
//                                                                 </option>
//                                                             ))}
//                                                         </select>
//                                                     </td>
//                                                     <td>{item.netSalary}</td>
//                                                     <td>
//                                                         {item.netSalary === '--' ? (
//                                                             <Button
//                                                                 color="primary"
//                                                                 size="sm"
//                                                                 icon="add"
//                                                                 onClick={() => handleAddSalaryClick(item)}
//                                                                 isLight
//                                                             >
//                                                                 Add Salary
//                                                             </Button>
//                                                         ) : (
//                                                             <Dropdown>
//                                                                 <DropdownToggle hasIcon={false} key="toggle">
//                                                                     <Button icon="MoreVert" color="primary" isLight className="btn-icon" />
//                                                                 </DropdownToggle>
//                                                                 <DropdownMenu key="menu">
//                                                                     <Button
//                                                                         color="link"
//                                                                         className="dropdown-item"
//                                                                         onClick={() => handleAddSalaryClick(item, true)}
//                                                                     >
//                                                                         <Icon icon="Edit" className="me-2" /> Edit
//                                                                     </Button>
//                                                                     <Button
//                                                                         color="link"
//                                                                         className="dropdown-item"
//                                                                         onClick={() => handleIncrementClick(item)}
//                                                                     >
//                                                                         <Icon icon="Add" className="me-2" /> Increment
//                                                                     </Button>
//                                                                     <Button
//                                                                         color="link"
//                                                                         className="dropdown-item"
//                                                                         onClick={() => handleShowHistory(item)}
//                                                                     >
//                                                                         <Icon icon="RemoveRedEye" className="me-2" /> Salary History
//                                                                     </Button>
//                                                                 </DropdownMenu>
//                                                             </Dropdown>
//                                                         )}
//                                                     </td>
//                                                 </tr>
//                                             ))}
//                                         </tbody>
//                                     </table>
//                                 )}
//                             </CardBody>
//                             <PaginationButtons
//                                 data={filteredData}
//                                 label="Employees"
//                                 setCurrentPage={setCurrentPage}
//                                 currentPage={currentPage}
//                                 perPage={perPage}
//                                 setPerPage={setPerPage}
//                             />
//                         </Card>
//                     </div>
//                 </div>
//             </Page>
//             <AddSalaryModal
//                 isOpen={showModal}
//                 onClose={() => setShowModal(false)}
//                 onSubmit={handleSalarySubmit}
//                 employeeName={selectedEmployee ? selectedEmployee.name : ''}
//                 initialValues={salaryInitialValues}
//             />
//             <IncrementSalaryModal
//                 isOpen={showIncrement}
//                 onClose={() => setShowIncrement(false)}
//                 employee={incrementEmployee ?? undefined}
//                 onSave={handleIncrementSave}
//             />
//             <SalaryHistoryModal
//                 isOpen={showHistory}
//                 onClose={() => setShowHistory(false)}
//                 employee={historyEmployee ?? undefined}
//                 onEditHistory={handleEditHistory}
//             />
//         </PageWrapper>
//     );
// };

// export default EmployeeSalary;
// export { EmployeeSalary };