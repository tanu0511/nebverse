/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { useState } from 'react';
import { useParams } from 'react-router-dom';
import PageWrapper from '../../../layout/PageWrapper/PageWrapper';
import SubHeader, {
	SubHeaderLeft,
	SubHeaderRight,
} from '../../../layout/SubHeader/SubHeader';
import Page from '../../../layout/Page/Page';
import { demoPagesMenu } from '../../../menu';
import data from '../../../common/data/dummyCustomerData';
import Button from '../../../components/bootstrap/Button';
import Card, {
	CardBody,	
} from '../../../components/bootstrap/Card';
import Icon from '../../../components/icon/Icon';
import PaginationButtons, {
	PER_COUNT,
} from '../../../components/PaginationButtons';
import CustomerEditModal from './CustomerEditModal';
import useDarkMode from '../../../hooks/useDarkMode';
import CreateTicketModal from './CreateTicketModal';
import classNames from 'classnames';
import Dropdown, { DropdownMenu, DropdownToggle } from '../../../components/bootstrap/Dropdown';
import TicketViewModal from './TicketViewModal';
import TicketFormModal from './TicketFormModal';
import Input from '../../../components/bootstrap/forms/Input'; 




const statusOptions = [
  { label: 'Open', color: 'red' },
  { label: 'Pending', color: 'orange' },
  { label: 'Resolved', color: 'green' },
  { label: 'Closed', color: 'blue' },
];

export type Ticket = {
	id: string | number;
	ticket: string;
	requester: string;
	subject: string;
	requestedOn: string;
	others: string;
	deliveryStatus: string;
	deliveryStatusColor: string;
	agent: string;
	priority: string;
	status: string;
};

const TicketPage = () => {
	const { darkModeStatus } = useDarkMode();

	const { id } = useParams();
	const itemData = data.filter((item) => item.id.toString() === id?.toString());
	const [showTicketFormModal, setShowTicketFormModal] = useState(false);
	const [currentPage, setCurrentPage] = useState<number>(1);
	const [perPage, setPerPage] = useState<number>(PER_COUNT['3']);
	const [showCreateModal, setShowCreateModal] = useState(false);
	const [viewModalOpen, setViewModalOpen] = useState(false);
	const [selectedTicket, setSelectedTicket] = useState<Ticket | null>(null);

	// Define orders array in component scope so it's accessible throughout the component

	const [editModalStatus, setEditModalStatus] = useState<boolean>(false);

	// Add tickets state to manage the list of tickets
	const [tickets, setTickets] = useState<any[]>([]);
	const [openStatusIdx, setOpenStatusIdx] = useState<number | null>(null);

	// 1. Shared state for agents, groups, types, channels
	const [agents, setAgents] = useState<{ id: number; name: string }[]>([]);
	const [groups, setGroups] = useState<{ id: number; name: string }[]>([]);
	const [types, setTypes] = useState<{ id: number; name: string }[]>([]);
	const [channels, setChannels] = useState<{ id: number; name: string }[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>('');
	// State for selectedAgentGroup
	const [selectedAgentGroup, setSelectedAgentGroup] = useState<number | null>(null);

	// Handler for editing a ticket

	// Handler for updating ticket status from TicketViewModal

	// Handler for deleting a ticket
	const handleDelete = (idx: number) => {
		setTickets(prev => prev.filter((_, i) => i !== idx));
	};

	// Handler for updating a ticket
	const handleUpdateTicket = (updatedTicket: Ticket) => {
		setTickets(prev =>
			prev.map(t => t.id === updatedTicket.id ? { ...t, ...updatedTicket } : t)
		);
	};

	// Handler for adding a ticket
	const handleAddTicket = (ticket: any) => {
		setTickets(prev => [...prev, ticket]);
	};

	const totalTickets = tickets.length;
const closedTickets = tickets.filter(t => t.status === 'Closed').length;
const openTickets = tickets.filter(t => t.status === 'Open').length;
const pendingTickets = tickets.filter(t => t.status === 'Pending').length;
const resolvedTickets = tickets.filter(t => t.status === 'Resolved').length;


	return (
		<PageWrapper title={demoPagesMenu.crm.subMenu.customer.text}>
			<SubHeader>
			 <SubHeaderLeft>
					  <label className="border-0 bg-transparent cursor-pointer me-0" htmlFor="searchInput">
						<Icon icon="Search" size="2x" color="primary" />
					  </label>
					  <Input
						id="searchInput"
						type="search"
						className="border-0 shadow-none bg-transparent"
						placeholder="Search ticket..."
						value={searchTerm}
						onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearchTerm(e.target.value)}
					  />
					</SubHeaderLeft>
				<SubHeaderRight>
					<div className="mb-3 d-flex align-items-center gap-2">
						<Button color="primary" isLight onClick={() => setShowCreateModal(true)}>
							<Icon icon="Add" className="me-2" />
							Create Ticket
						</Button>
						<Button color="primary" isLight onClick={() => setShowTicketFormModal(true)}>
							<Icon icon="Edit" className="me-2" />
							Ticket Form
						</Button>
						<Button
									color="info"
									icon="CloudDownload"
									isLight
									tag="a"
									to="/somefile.txt"
									target="_blank"
									download
								  >
									Export
								  </Button>
					</div>
				</SubHeaderRight>
			</SubHeader>
			<Page>
				<div className="container-fluid mt-4 ">
					{/* Summary Cards */}
					<div className="d-flex justify-content-center gap-4 mb-4">
						{[
							{ label: 'Total Tickets', value: totalTickets },
							{ label: 'Closed Tickets', value: closedTickets },
							{ label: 'Open Tickets', value: openTickets },
							{ label: 'Pending Tickets', value: pendingTickets },
							{ label: 'Resolved Tickets', value: resolvedTickets },
						].map((card, idx) => (
							<div className="col-md-2" key={idx}>
								<div
									className={classNames('transition-base rounded-2 mb-0 text-dark', {
										'bg-l25-primary bg-l10-primary-hover': !darkModeStatus,
										'bg-lo50-primary bg-lo25-primary-hover': darkModeStatus,
									})}
									style={{ minWidth: 150 }}
								>
									<div className="card-body text-center">
										<div style={{ fontSize: 14 }}>{card.label}</div>
										<div style={{ fontSize: 28, fontWeight: 700, color: '#007bff' }}>{card.value}</div>
									</div>
								</div>
							</div>
						))}
					</div>

					{/* New Table */}
					<Card>
						<CardBody className="table-responsive" style={{ overflow: 'visible' }}>
							<table className="table table-modern table-hover">
								<thead className="table-light">
									<tr>
										<th>#Ticket</th>
										<th>Requestor</th>
										<th>Ticket Subject</th>
										<th>Requested On</th>
										<th>Agent</th>
										<th>Priority</th>
										<th>Status</th>
										<th>Action</th>
									</tr>
								</thead>
								<tbody>
									{tickets.map((ticket, idx) => (
										<tr key={ticket.id || idx}>
											<td>{idx + 1}</td>
											<td>{ticket.requester}</td>
											<td>{ticket.subject}</td>
											<td>
												{ticket.requestedOn
													? new Date(ticket.requestedOn).toLocaleDateString('en-US', {
															weekday: 'short',
															year: 'numeric',
															month: 'short',
															day: 'numeric',
													  })
													: ''}
											</td>
											<td>{ticket.agent}</td>
											<td>{ticket.priority}</td>
											<td style={{ position: 'relative' }}>
												<div
													style={{
														borderRadius: 8,
														background: '#e9ecef',
														padding: '4px 12px',
														display: 'flex',
														alignItems: 'center',
														cursor: 'pointer',
														fontWeight: 500,
														minWidth: 140,
													}}
													onClick={() => setOpenStatusIdx(openStatusIdx === idx ? null : idx)}
												>
													<span
														style={{
															color: statusOptions.find(opt => opt.label === ticket.status)?.color || '#888',
															fontSize: 18,
															marginRight: 8,
															display: 'inline-block',
														}}
													>
														●
													</span>
													{ticket.status}
													<span style={{ marginLeft: 'auto', fontSize: 18, color: '#888' }}>▼</span>
												</div>
												{openStatusIdx === idx && (
													<ul
														className="dropdown-menu show"
														style={{
															position: 'absolute',
															zIndex: 1050,
															top: '110%',
															left: 0,
															width: '100%',
															background: '#fff',
															border: '1px solid #e0e0e0',
															borderRadius: 10,
															boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
															padding: 4,
															minWidth: 180,
														}}
													>
														{statusOptions.map(opt => (
															<li key={opt.label}>
																<button
																	className="dropdown-item"
																	type="button"
																	style={{
																		display: 'flex',
																		alignItems: 'center',
																		fontWeight: ticket.status === opt.label ? 700 : 500,
																		background: ticket.status === opt.label ? '#f4f6fa' : 'transparent',
																		color: '#23272b',
																	}}
																	onClick={e => {
																		e.stopPropagation();
																		setTickets(prev =>
																			prev.map((t, i) =>
																				i === idx ? { ...t, status: opt.label } : t
																			)
																		);
																		setOpenStatusIdx(null);
																	}}
																>
																	<span style={{ color: opt.color, fontSize: 18, marginRight: 8 }}>●</span>
																	{opt.label}
																</button>
															</li>
														))}
													</ul>
												)}
											</td>
											<td>
												<Dropdown>
													<DropdownToggle hasIcon={false}>
														<Button icon="MoreVert" color="primary" isLight className="btn-icon" />
													</DropdownToggle>
													<DropdownMenu isAlignmentEnd>
														<Button
															color="link"
															className="dropdown-item"
															onClick={() => {
																setSelectedTicket(ticket);
																setViewModalOpen(true);
															}}
														>
															<Icon icon="RemoveRedEye" className="me-2" /> View
														</Button>
														<Button
															color="link"
															className="dropdown-item text-danger"
															onClick={() => handleDelete(idx)}
														>
															<Icon icon="Delete" className="me-2" /> Delete
														</Button>
													</DropdownMenu>
												</Dropdown>
											</td>
										</tr>
									))}
								</tbody>
							</table>
							<PaginationButtons
								data={tickets}
								label="items"
								setCurrentPage={setCurrentPage}
								currentPage={currentPage}
								perPage={perPage}
								setPerPage={setPerPage}
							/>
						</CardBody>
					</Card>
				</div>
			</Page>
			<CustomerEditModal
				id={id ?? ''}
				isOpen={editModalStatus}
				setIsOpen={setEditModalStatus}
			/>
			<CreateTicketModal
				show={showCreateModal}
				onHide={() => setShowCreateModal(false)}
				onSave={(ticket: Partial<Ticket>) => {
					setTickets(prev => [
						...prev,
						{
							id: ticket.id ?? Date.now(),
							ticket: ticket.ticket ?? '',
							requester: ticket.requester ?? '',
							subject: ticket.subject ?? '',
							requestedOn: ticket.requestedOn ?? '',
							others: ticket.others ?? '',
							deliveryStatus: ticket.deliveryStatus ?? '',
							deliveryStatusColor: ticket.deliveryStatusColor ?? '',
							agent: ticket.agent ?? '',
							priority: ticket.priority ?? '',
							status: ticket.status ?? 'Open',
						},
					]);
					setShowCreateModal(false);
				}}
				agents={agents}
				setAgents={setAgents}
				groups={groups}
				setGroups={setGroups}
				types={types}
				setTypes={setTypes}
				channels={channels}
				setChannels={setChannels}
				selectedAgentGroup={selectedAgentGroup !== null ? String(selectedAgentGroup) : ''}
				setSelectedAgentGroup={(g: string) => setSelectedAgentGroup(g ? Number(g) : null)}
			/>
			<TicketViewModal
				show={viewModalOpen}
				onHide={() => setViewModalOpen(false)}
				ticket={selectedTicket}
				agents={agents}
				setAgents={setAgents}
				groups={groups}
				setGroups={setGroups}
				types={types}
				setTypes={setTypes}
				channels={channels}
				setChannels={setChannels}
				onUpdate={handleUpdateTicket}
			/>
			<TicketFormModal
				show={showTicketFormModal}
				onHide={() => setShowTicketFormModal(false)}
				types={types}
				priorities={['Low', 'Medium', 'High']}
				groups={groups}
				onSave={handleAddTicket} // <-- Use the real function here
			/>
		</PageWrapper>
	);
};

export default TicketPage;