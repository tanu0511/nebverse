import React, { useState, useEffect } from "react";
import PageWrapper from "../../../layout/PageWrapper/PageWrapper";
import SubHeader, {
  SubHeaderLeft,
  SubHeaderRight,
} from "../../../layout/SubHeader/SubHeader";
import Page from "../../../layout/Page/Page";
import { demoPagesMenu } from "../../../menu";
import Card, { CardBody } from "../../../components/bootstrap/Card";
import Button from "../../../components/bootstrap/Button";
import Icon from "../../../components/icon/Icon";
import Input from "../../../components/bootstrap/forms/Input";
import Dropdown, {
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from "../../../components/bootstrap/Dropdown";
import PaginationButtons, {
  dataPagination,
} from "../../../components/PaginationButtons";
import AddLeaveModal from "./AddLeaveModal";
import ViewLeaveModal from "./ViewLeaveModal";
import FilterModal from "./FilterModal";
import ApproveModal from "./ApproveModal"; 
import RejectModal from "./RejectModal";  

const employees = [
  "John Doe",
  "Jane Smith",
  "Alice Johnson",
  // Add more as needed
];

const statuses = [
  "Pending",
  "Approved",
  "Rejected",
  // Add more as needed
];

const leaveTypes = [
  "Sick Leave",
  "Casual Leave",
  "Annual Leave",
  // Add more as needed
];

const Leaves = () => {
  const [leaveData, setLeaveData] = useState<any[]>(() => {
    const savedData = localStorage.getItem("leaveData");
    return savedData ? JSON.parse(savedData) : [];
  });
  const [perPage, setPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [editModalStatus, setEditModalStatus] = useState<boolean>(false);
  const [viewModalStatus, setViewModalStatus] = useState<boolean>(false);
  const [selectedLeave, setSelectedLeave] = useState<any | null>(null);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [selectAll, setSelectAll] = useState<boolean>(false);
  const [isFilterModalOpen, setIsFilterModalOpen] = React.useState(false);
  const [filters] = React.useState({
    employee: "All",
    leaveType: "All",
    status: "All",
  });
  const [appliedFilters, setAppliedFilters] = React.useState(filters);

  // ApproveModal state
  const [isApproveModalOpen, setIsApproveModalOpen] = useState(false);
  const [leaveToApprove, setLeaveToApprove] = useState<any | null>(null);

  // RejectModal state
  const [isRejectModalOpen, setIsRejectModalOpen] = useState(false);
  const [leaveToReject, setLeaveToReject] = useState<any | null>(null);

  const [leaveTypesList] = useState<any[]>(() => {
    const saved = localStorage.getItem("leaveTypesList");
    return saved ? JSON.parse(saved) : [];
  });


  useEffect(() => {
    localStorage.setItem("leaveData", JSON.stringify(leaveData));
  }, [leaveData]);

  // Filter leaveData dynamically based on searchTerm and appliedFilters
  const filteredLeaveData = leaveData.filter((leave) => {
    // Search filter
    const matchesSearch =
      searchTerm.trim() === "" ||
      leave.member?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      leave.leaveType?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      leave.status?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      leave.date?.toLowerCase().includes(searchTerm.toLowerCase());

    // Applied filters
    const matchesEmployee =
      appliedFilters.employee === "All" ||
      leave.member === appliedFilters.employee;
    const matchesLeaveType =
      appliedFilters.leaveType === "All" ||
      leave.leaveType === appliedFilters.leaveType;
    const matchesStatus =
      appliedFilters.status === "All" ||
      leave.status === appliedFilters.status;

    return matchesSearch && matchesEmployee && matchesLeaveType && matchesStatus;
  });

  const handleLeaveSubmit = (formValues: any) => {
    if (!selectedLeave) {
      // Add new leave
      setLeaveData((prev) => [
        ...prev,
        {
          id: Date.now().toString(),
          ...formValues,
        },
      ]);
    } else {
      // Edit existing leave
      setLeaveData((prev) =>
        prev.map((leave) =>
          leave.id === selectedLeave.id ? { ...leave, ...formValues } : leave
        )
      );
    }
    setEditModalStatus(false);
    setSelectedLeave(null);
  };

  const handleEdit = (leave: any) => {
    setSelectedLeave(leave);
    setEditModalStatus(true);
  };

  const handleView = (leave: any) => {
    setSelectedLeave(leave);
    setViewModalStatus(true);
  };

  const handleDelete = (leaveId: string) => {
    setLeaveData((prev) => prev.filter((leave) => leave.id !== leaveId));
  };

  const handleApplyFilters = (newFilters: typeof filters) => {
    setAppliedFilters(newFilters);
    setIsFilterModalOpen(false);
  };

  const handleSelectAll = (isChecked: boolean) => {
    setSelectAll(isChecked);
    const updatedLeaves = leaveData.map((leave) => ({
      ...leave,
      isSelected: isChecked,
    }));
    setLeaveData(updatedLeaves);
  };

  const handleRowSelect = (id: number, isChecked: boolean) => {
    const updatedLeaves = leaveData.map((leave) =>
      leave.id === id ? { ...leave, isSelected: isChecked } : leave
    );
    setLeaveData(updatedLeaves);
    const allSelected =
      updatedLeaves.length > 0 &&
      updatedLeaves.every((leave) => leave.isSelected);
    setSelectAll(allSelected);
  };

  // Approve button handler: open modal
  const handleApproveClick = (leave: any) => {
    setLeaveToApprove(leave);
    setIsApproveModalOpen(true);
  };

  // ApproveModal submit handler
  const handleApproveSubmit = (formValues: any) => {
    if (leaveToApprove) {
      setLeaveData((prev) =>
        prev.map((leave) =>
          leave.id === leaveToApprove.id
            ? { ...leave, ...formValues, status: "Approved" }
            : leave
        )
      );
    }
    setIsApproveModalOpen(false);
    setLeaveToApprove(null);
  };

  // Reject button handler: open modal
  const handleRejectClick = (leave: any) => {
    setLeaveToReject(leave);
    setIsRejectModalOpen(true);
  };

  // RejectModal submit handler
  const handleRejectSubmit = (formValues: any) => {
    if (leaveToReject) {
      setLeaveData((prev) =>
        prev.map((leave) =>
          leave.id === leaveToReject.id
            ? { ...leave, ...formValues, status: "Rejected" }
            : leave
        )
      );
    }
    setIsRejectModalOpen(false);
    setLeaveToReject(null);
  };

  return (
    <PageWrapper title={demoPagesMenu.crm.subMenu.customersList.text}>
      <SubHeader>
        <SubHeaderLeft>
          <label
            className="border-0 bg-transparent cursor-pointer me-0"
            htmlFor="searchInput"
          >
            <Icon icon="Search" size="2x" color="primary" />
          </label>
          <Input
            id="searchInput"
            type="search"
            className="border-0 shadow-none bg-transparent"
            placeholder="Search leave..."
            value={searchTerm}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setSearchTerm(e.target.value)
            }
          />
        </SubHeaderLeft>
        <SubHeaderRight>
          <Button
            icon="FilterAlt"
            color="primary"
            isLight
            onClick={() => setIsFilterModalOpen(true)}
          >
            Filter
          </Button>
          <Button
            icon="UserPlus"
            color="primary"
            isLight
            onClick={() => {
              setSelectedLeave(null);
              setEditModalStatus(true);
            }}
          >
            Add Leave
          </Button>
        </SubHeaderRight>
      </SubHeader>
      <Page>
        <div className="row h-100">
          <div className="col-12">
            <Card stretch>
              <CardBody
                className="table-responsive"
                style={{ overflow: "visible" }}
              >
                <table className="table table-modern table-hover">
                  <thead>
                    <tr>
                      <th>
                        <input
                          type="checkbox"
                          checked={selectAll}
                          onChange={(e) => handleSelectAll(e.target.checked)}
                        />
                      </th>
                      <th>Employee</th>
                      <th>Leave Date</th>
                      <th>Duration</th>
                      <th>Leave Status</th>
                      <th>Leave Type</th>
                      <th>Paid</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {dataPagination(filteredLeaveData, currentPage, perPage)
                      .length === 0 ? (
                      <tr>
                        <td colSpan={9} className="text-center text-muted py-5">
                          <div className="mt-2">No records found.</div>
                        </td>
                      </tr>
                    ) : (
                      dataPagination(
                        filteredLeaveData,
                        currentPage,
                        perPage
                      ).map((leave) => (
                        <tr key={leave.id}>
                          <td>
                            <input
                              type="checkbox"
                              checked={leave.isSelected || false}
                              onChange={(e) =>
                                handleRowSelect(leave.id, e.target.checked)
                              }
                            />
                          </td>
                          <td>{leave.member}</td>
                          <td>{leave.date}</td>
                          <td>{leave.duration}</td>
                          <td>{leave.status}</td>
                          <td>{leave.leaveType}</td>
                          <td>
                            {(() => {
                              // leaveTypesList se leaveType ka paidStatus nikaalo (case-insensitive match)
                              const type = leaveTypesList.find(
                                (t) =>
                                  (t.leaveType || "").trim().toLowerCase() ===
                                  (leave.leaveType || "").trim().toLowerCase()
                              );
                              console.log("leaveType:", leave.leaveType, "matchedType:", type);
                              const paidStatus = (type?.paidStatus || "").trim().toLowerCase();
                              return paidStatus === "paid" ? (
                                <span
                                  style={{
                                    background: "#22c55e",
                                    color: "#fff",
                                    padding: "2px 12px",
                                    borderRadius: "6px",
                                    fontWeight: 600,
                                    fontSize: "14px",
                                    display: "inline-block",
                                  }}
                                >
                                  Paid
                                </span>
                              ) : (
                                <span
                                  style={{
                                    background: "#e5e7eb",
                                    color: "#222",
                                    padding: "2px 12px",
                                    borderRadius: "6px",
                                    fontWeight: 600,
                                    fontSize: "14px",
                                    display: "inline-block",
                                  }}
                                >
                                  Unpaid
                                </span>
                              );
                            })()}
                          </td>
                          <td>
                            <Dropdown>
                              <DropdownToggle hasIcon={false}>
                                <Button
                                  icon="MoreVert"
                                  color="primary"
                                  isLight
                                  className="btn-icon"
                                />
                              </DropdownToggle>
                              <DropdownMenu isAlignmentEnd>
                                <DropdownItem>
                                  <Button
                                    color="link"
                                    className="w-full text-left"
                                    onClick={() => handleView(leave)} 
                                  >
                                    <Icon icon="Visibility" />
                                    View
                                  </Button>
                                </DropdownItem>
                                <DropdownItem>
                                  <Button
                                    color="link"
                                    className="w-full text-left"
                                    onClick={() => handleApproveClick(leave)}
                                  >
                                    <Icon icon="Check" />
                                    Approve
                                  </Button>
                                </DropdownItem>
                                <DropdownItem>
                                  <Button
                                    color="link"
                                    className="w-full text-left"    
                                    onClick={() => handleRejectClick(leave)}
                                  >
                                    <Icon icon="Clear" />
                                    Reject
                                  </Button>
                                </DropdownItem>
                                <DropdownItem>
                                  <Button
                                    color="link"
                                    className="w-full text-left"
                                    onClick={() => handleEdit(leave)}
                                  >
                                    <Icon icon="Edit" />
                                    Edit
                                  </Button>
                                </DropdownItem>
                                <DropdownItem>
                                  <Button
                                    color="link"
                                    className="dropdown-item text-danger"
                                    onClick={() => handleDelete(leave.id)}
                                  >
                                    <Icon icon="Delete" />
                                    Delete
                                  </Button>
                                </DropdownItem>
                              </DropdownMenu>
                            </Dropdown>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </CardBody>
              <PaginationButtons
                data={filteredLeaveData}
                label="Leaves"
                setCurrentPage={setCurrentPage}
                currentPage={currentPage}
                perPage={perPage}
                setPerPage={setPerPage}
              />
            </Card>
          </div>
        </div>
      </Page>
      <AddLeaveModal
        setIsOpen={setEditModalStatus}
        isOpen={editModalStatus}
        onSubmit={handleLeaveSubmit}
        initialData={selectedLeave} // Pass the selected leave data
      />
      <ViewLeaveModal
        isOpen={viewModalStatus}
        setIsOpen={setViewModalStatus}
        leave={selectedLeave} // Pass the selected leave data
      />
      <FilterModal
        isOpen={isFilterModalOpen}
        setIsOpen={setIsFilterModalOpen}
        onApplyFilters={handleApplyFilters}
        employees={employees}
        leaveTypes={leaveTypes}
        statuses={statuses}
      />
      <ApproveModal
        isOpen={isApproveModalOpen}
        setIsOpen={setIsApproveModalOpen}
        onApprove={handleApproveSubmit}
      />
      <RejectModal
        isOpen={isRejectModalOpen}
        setIsOpen={setIsRejectModalOpen}
        onReject={handleRejectSubmit}
      />
    </PageWrapper>
  );
};

export default Leaves;
