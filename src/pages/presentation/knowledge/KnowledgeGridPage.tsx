import React, { FC, useCallback, useState } from 'react';
import Page from '../../../layout/Page/Page';
import PageWrapper from '../../../layout/PageWrapper/PageWrapper';
import Input from '../../../components/bootstrap/forms/Input';
import Button from '../../../components/bootstrap/Button';
import Select from '../../../components/bootstrap/forms/Select';
import Card, { CardBody, CardTitle } from '../../../components/bootstrap/Card';
import useDarkMode from '../../../hooks/useDarkMode';
import Icon from '../../../components/icon/Icon';
import PaginationButtons from '../../../components/PaginationButtons';
import SubHeader, { SubHeaderLeft, SubHeaderRight } from '../../../layout/SubHeader/SubHeader';
import MeetingModal2 from './MeetingModal2'




const KnowledgeGridPage = () => {
	const { darkModeStatus } = useDarkMode();

	const [filterableData, setFilterableData] = useState<any[]>([]); // Start with empty array
	const [searchTerm, setSearchTerm] = useState('');
	const [filterModalStatus, setFilterModalStatus] = useState(false);
	// const [meetingModalStatus, setMeetingModalStatus] = useState(false);
	const [selectedMeeting, setSelectedMeeting] = useState<any>(undefined);
	const [viewModalStatus, setViewModalStatus] = useState(false);
	const [selectAll, setSelectAll] = useState(false);
	const [meetings, setMeetings] = useState<any[]>([]); // Your meetings data
	const [filteredMeetings, setFilteredMeetings] = useState<any[]>([]);
	const [currentPage, setCurrentPage] = useState(1);
	const [perPage, setPerPage] = useState(10);
	const [showMeetingModal, setShowMeetingModal] = useState(false);

	// Pagination state
	const itemsPerPage = 10;

	const paginatedData = filterableData.slice(
		(currentPage - 1) * itemsPerPage,
		currentPage * itemsPerPage,
	);

	const totalPages = Math.ceil(filterableData.length / itemsPerPage);

	// Pagination helper
	const dataPagination = (data: any[], page: number, perPage: number) =>
		data.slice((page - 1) * perPage, page * perPage);

	// Filtering logic (simple search)
	React.useEffect(() => {
		let filtered = meetings;
		if (searchTerm) {
			filtered = meetings.filter(
				(m) =>
					m.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
					m.host?.toLowerCase().includes(searchTerm.toLowerCase())
			);
		}
		setFilteredMeetings(filtered);
		setCurrentPage(1);
	}, [searchTerm, meetings]);

	// Select all logic
	const handleSelectAll = (checked: boolean) => {
		setSelectAll(checked);
		setFilteredMeetings((prev) =>
			prev.map((m) => ({ ...m, isSelected: checked }))
		);
	};

	// Row select logic
	const handleRowSelect = (id: any, checked: boolean) => {
		setFilteredMeetings((prev) =>
			prev.map((m) => (m.id === id ? { ...m, isSelected: checked } : m))
		);
	};

	// Dummy handlers for modals/actions
	const handleViewMeeting = (meeting: any) => {
		setSelectedMeeting(meeting);
		setViewModalStatus(true);
	};
	const handleDelete = (id: any) => {
		setMeetings((prev) => prev.filter((m) => m.id !== id));
	};

  return (
    <>
      <PageWrapper title="Meetings List">
        <SubHeader>
          <SubHeaderLeft>
            <label className="border-0 bg-transparent cursor-pointer me-0" htmlFor="searchInput">
              <Icon icon="Search" size="2x" color="primary" />
            </label>
            <Input
              id="searchInput"
              type="search"
              className="border-0 shadow-none bg-transparent"
              placeholder="Search meeting..."
              value={searchTerm}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearchTerm(e.target.value)}
            />
          </SubHeaderLeft>
          <SubHeaderRight>
            <Button
              icon="FilterAlt"
              color="primary"
              isLight
              aria-label="Filter"
              onClick={() => setFilterModalStatus(true)}
            >
              Filter
            </Button>
            <Button
              icon="add"
              color="primary"
              isLight
              onClick={() => {
                setSelectedMeeting(undefined);
                // setMeetingModalStatus(true);
				setShowMeetingModal(true);
              }}
            >
              Add Meeting
            </Button>
            <Button
              color="info"
              icon="CloudDownload"
              isLight
              tag="a"
              to="/meetings-export.csv"
              download
            >
              Export
            </Button>
            <div className="d-inline-flex align-items-center ms-2">
              <Button
                color="primary"
                className="me-1"
                isLight
                // style={{ width: 40, height: 40, padding: 0 }}
              >
                <Icon icon="List" className="fs-5" />
              </Button>
              <Button
                color="primary"
                isLight
              >
                <Icon icon="CalendarToday" className="fs-5" />
              </Button>
            </div>
          </SubHeaderRight>
        </SubHeader>
        <Page>
          <div className="row h-100">
            <div className="col-12">
              <Card stretch>
                <CardBody isScrollable className="table-responsive">
                  <table className="table table-modern table-hover mb-0">
                    <thead>
                      <tr>
                        <th>
                          <input
                            type="checkbox"
                            checked={selectAll}
                            onChange={(e) => handleSelectAll(e.target.checked)}
                          />
                        </th>
                        <th>Meeting Id</th>
                        <th>Meeting Title</th>
                        <th>Meeting Host</th>
                        <th>Start On</th>
                        <th>End On</th>
                        <th>Status</th>
                        <th>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {paginatedData.length === 0 ? (
                        <tr>
                          <td colSpan={8} className="text-center">
                            No data available in table
                          </td>
                        </tr>
                      ) : (
                        paginatedData.map((item) => (
                          <tr key={item.id}>
                            <td>
                              <input
                                type="checkbox"
                                checked={item.isSelected || false}
                                onChange={(e) => handleRowSelect(item.id, e.target.checked)}
                              />
                            </td>
                            <td>{item.id}</td>
                            <td>{item.title}</td>
                            <td>{item.host || '-'}</td>
                            <td>{item.startOn || '-'}</td>
                            <td>{item.endOn || '-'}</td>
                            <td>{item.status || '-'}</td>
                            <td>
                              <Button size="sm" color="primary">View</Button>
                            </td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </table>
                </CardBody>
                <PaginationButtons
                  data={meetings}
                  label="Meetings"
                  setCurrentPage={setCurrentPage}
                  currentPage={currentPage}
                  perPage={perPage}
                  setPerPage={setPerPage}
                />
              </Card>
            </div>
          </div>
        </Page>
      </PageWrapper>

      {/* <MeetingModal
        show={meetingModalStatus}
        onClose={() => setMeetingModalStatus(false)} /> */}

		<MeetingModal2
		show={showMeetingModal}
		onClose={() => setShowMeetingModal(false)}
		/>
		</>
	);

};

export default KnowledgeGridPage;
