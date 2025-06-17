import React, { useState } from 'react';
import Modal from '../../../components/bootstrap/Modal';
import Button from '../../../components/bootstrap/Button';
import classNames from 'classnames';
import Chart from 'react-apexcharts';
import {
  ManageGroupsModal,
  AddAgentModal,
  AddTypeModal,
  AddChannelModal,
} from './CreateTicketModal';
import Icon from '../../../components/icon/Icon';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

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
  group?: string;
  type?: string;
  channelName?: string;
  tags?: string[];
  contact?: {
    avatarUrl?: string;
    name?: string;
    email?: string;
    phone?: string;
  };
  activity?: Array<{
    author: string;
    date: string;
    message: string;
    file?: {
      name: string;
      url: string;
      type: string;
    } | null;
    to?: string;
  }>;
};

const statusOptions = [
  { label: 'Open', color: 'red' },
  { label: 'Pending', color: 'orange' },
  { label: 'Resolved', color: 'green' },
  { label: 'Closed', color: 'blue' },
];

interface TicketViewModalProps {
  show: boolean;
  onHide: () => void;
  ticket: Ticket | null;
  agents: { id: number; name: string }[];
  setAgents: React.Dispatch<React.SetStateAction<{ id: number; name: string }[]>>;
  groups: { id: number; name: string }[];
  setGroups: React.Dispatch<React.SetStateAction<{ id: number; name: string }[]>>;
  types: { id: number; name: string }[];
  setTypes: React.Dispatch<React.SetStateAction<{ id: number; name: string }[]>>;
  channels: { id: number; name: string }[];
  setChannels: React.Dispatch<React.SetStateAction<{ id: number; name: string }[]>>;
  onUpdate: (ticket: Ticket) => void;
}

const TicketViewModal: React.FC<TicketViewModalProps> = ({
  show,
  onHide,
  ticket,
  agents,
  setAgents,
  groups,
  setGroups,
  types,
  setTypes,
  channels,
  setChannels,
  onUpdate,
}) => {
  const [tab, setTab] = useState<'Details' | 'Contact' | 'Other' | 'Activity'>('Details');
  const [status, setStatus] = useState(ticket?.status || 'Open');
  const [showChannelModal, setShowChannelModal] = useState(false);
  const [selectedGroup, setSelectedGroup] = useState(ticket?.group || '');
  const [selectedAgent, setSelectedAgent] = useState(ticket?.agent || '');
  const [selectedType, setSelectedType] = useState(ticket?.type || '');
  const [selectedChannel, setSelectedChannel] = useState(ticket?.channelName || '');
  const [tags, setTags] = useState<string[]>(ticket?.tags || []);
  const [newTag, setNewTag] = useState('');

  const [showTypeModal, setShowTypeModal] = useState(false);
  const [showAgentModal, setShowAgentModal] = useState(false);
  const [showGroupsModal, setShowGroupsModal] = useState(false);
  const [subject, setSubject] = useState(ticket?.subject || '');
  const [requester] = useState(ticket?.requester || ''); // static
  const [others, setOthers] = useState(ticket?.others || '');
  const [showNoteEditor, setShowNoteEditor] = useState(false);
  const [noteText, setNoteText] = useState('');
  const [noteFile, setNoteFile] = useState<File | null>(null);
  const [activity, setActivity] = useState(ticket?.activity || []);
  const [openMenuIndex, setOpenMenuIndex] = useState<number | null>(null);
  const [noteTo, setNoteTo] = useState('');
  const [showReplyEditor, setShowReplyEditor] = useState(false);
  const [replyTo, setReplyTo] = useState('');
  const [replyText, setReplyText] = useState('');
  const [replyFile, setReplyFile] = useState<File | null>(null);

  React.useEffect(() => {
    setActivity(ticket?.activity || []);
  }, [ticket]);

  React.useEffect(() => {
    return () => {
      activity.forEach(a => {
        if (a.file && a.file.url) URL.revokeObjectURL(a.file.url);
      });
    };
  }, [activity]);

  React.useEffect(() => {
    const handleClick = () => setOpenMenuIndex(null);
    if (openMenuIndex !== null) {
      window.addEventListener("click", handleClick);
      return () => window.removeEventListener("click", handleClick);
    }
  }, [openMenuIndex]);

  if (!ticket) return null;

  const handleStatusChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setStatus(e.target.value);
  };

  const handleAddTag = () => {
    if (newTag && !tags.includes(newTag)) {
      setTags([...tags, newTag]);
      setNewTag('');
    }
  };

  const handleNoteFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setNoteFile(e.target.files[0]);
    }
  };

  return (
    <Modal
      isOpen={show}
      setIsOpen={onHide}
      size="xl"
      title={null}
      isStaticBackdrop={true}
    >
      <div className="container-fluid py-3">
        <div className="row">
          {/* Main (left) column */}
          <div className="col-md-8" style={{ paddingRight: 32 }}>
            {/* Ticket summary */}
            <div className="mb-3 d-flex align-items-end justify-content-end gap-2">
              <span className="badge bg-primary" style={{ fontSize: 13, padding: "6px 14px" }}>New</span>
              <span className="badge bg-danger" style={{ fontSize: 13, padding: "6px 14px" }}>{ticket.status}</span>
            </div>
            <div className="mb-2">
              <strong style={{ fontSize: 20 }}>{ticket.subject}</strong>
            </div>
            <div className="mb-2 text-muted" style={{ fontSize: 14 }}>
              Registered Name: <span className="text-dark">{ticket.requester}</span>
            </div>
            <div className="mb-3 text-muted" style={{ fontSize: 14 }}>
              Requestor: <span className="text-dark">{ticket.requester}</span>
            </div>

            {/* Action Buttons */}
            <div className="d-flex gap-2 mb-4">
              <Button color="primary" isOutline style={{ minWidth: 100 }} onClick={() => setShowReplyEditor(true)}>
                <Icon icon='Replay' /> Replay
              </Button>
              <Button color="secondary" isOutline style={{ minWidth: 110 }} onClick={() => setShowNoteEditor(true)}>
                <Icon icon='Notes' /> Add Note
              </Button>
              <Button color="danger" isOutline style={{ minWidth: 90 }} onClick={() => {
                setShowReplyEditor(false);
                setShowNoteEditor(false);
              }}>
                <Icon icon='Close' /> Close
              </Button>
              <Button color="danger" isOutline style={{ minWidth: 90 }} onClick={() => {
                setSubject('');
                setSelectedGroup('');
                setSelectedAgent('');
                setSelectedType('');
                setSelectedChannel('');
                setTags([]);
                setNewTag('');
                setOthers('');
                setShowNoteEditor(false);
                setNoteText('');
                setNoteFile(null);
                setNoteTo('');
                setShowReplyEditor(false);
                setReplyText('');
                setReplyFile(null);
                setReplyTo('');
                setActivity([]);
                setStatus('');
              }}>
                <Icon icon='Delete' /> Delete
              </Button>
            </div>

            {/* Reply Editor */}
            {showReplyEditor && (
              <div className="mb-4" style={{ background: "#f8f9fa", borderRadius: 8, padding: 16 }}>
                <div className="mb-2">
                  <span style={{ fontWeight: 600, fontSize: 15 }}>To: </span>
                  <span>{ticket.requester}</span>
                </div>
                <ReactQuill
                  theme="snow"
                  value={replyText}
                  onChange={setReplyText}
                  style={{ height: 120, marginBottom: 16 }}
                />
                <div className="mb-3">
                  <label className="form-label d-block" style={{ fontWeight: 500 }}>
                    <i className="fa fa-paperclip me-2" />
                    <span style={{ color: "#007bff", cursor: "pointer", textDecoration: "underline" }}>
                      Upload File
                    </span>
                  </label>
                  <input
                    id="reply-file-upload"
                    type="file"
                    style={{ display: "none" }}
                    onChange={e => {
                      if (e.target.files && e.target.files[0]) setReplyFile(e.target.files[0]);
                    }}
                  />
                  {replyFile && (
                    <span className="ms-2 text-muted" style={{ fontSize: 13 }}>
                      <i className="fa fa-check-circle text-success me-1" />
                      {replyFile.name}
                    </span>
                  )}
                </div>
                <div className="d-flex gap-2 mt-2">
                  <Button
                    color="primary"
                    onClick={() => {
                      if (replyText.trim() || replyFile) {
                        const newActivity = {
                          author: "You",
                          date: new Date().toLocaleString(),
                          message: replyText,
                          file: replyFile
                            ? {
                                name: replyFile.name,
                                url: URL.createObjectURL(replyFile),
                                type: replyFile.type,
                              }
                            : null,
                          to: ticket.requester,
                        };
                        setActivity([newActivity, ...activity]);
                        setReplyText('');
                        setReplyFile(null);
                        setShowReplyEditor(false);
                      }
                    }}
                  >
                    Submit
                  </Button>
                  <Button color="secondary" onClick={() => setShowReplyEditor(false)}>
                    Cancel
                  </Button>
                </div>
              </div>
            )}

            {/* Add Note Editor */}
            {showNoteEditor && (
              <div className="mb-4" style={{ background: "#f8f9fa", borderRadius: 8, padding: 16 }}>
                <div className="mb-3">
                  <label className="form-label" htmlFor="note-to"><strong>To:</strong></label>
                  <select
                    id="note-to"
                    className="form-select"
                    value={noteTo}
                    onChange={e => setNoteTo(e.target.value)}
                  >
                    <option value="">Nothing selected</option>
                    {agents.map(agent => (
                      <option key={agent.id} value={agent.name}>{agent.name}</option>
                    ))}
                  </select>
                </div>
                <label className="form-label"><strong>Add Note</strong></label>
                <ReactQuill
                  theme="snow"
                  value={noteText}
                  onChange={setNoteText}
                  style={{ height: 120, marginBottom: 16 }}
                />
                <div className="mb-3">
                  <label className="form-label d-block"><strong>Upload File</strong></label>
                  <label
                    htmlFor="note-file-upload"
                    className="btn btn-link p-0"
                    style={{ color: "#007bff", textDecoration: "underline", cursor: "pointer" }}
                  >
                    <i className="fa fa-paperclip me-2" />
                    {noteFile ? noteFile.name : "Choose File"}
                    <input
                      id="note-file-upload"
                      type="file"
                      style={{ display: "none" }}
                      onChange={handleNoteFileChange}
                    />
                  </label>
                  {noteFile && (
                    <span className="ms-2 text-muted" style={{ fontSize: 13 }}>
                      <i className="fa fa-check-circle text-success me-1" />
                      {noteFile.name}
                    </span>
                  )}
                </div>
                <div className="d-flex gap-2 mt-2">
                  <Button
                    color="primary"
                    onClick={() => {
                      if (noteText.trim() || noteFile) {
                        const newActivity = {
                          author: "You",
                          date: new Date().toLocaleString(),
                          message: noteText,
                          file: noteFile
                            ? {
                              name: noteFile.name,
                              url: URL.createObjectURL(noteFile),
                              type: noteFile.type,
                            }
                            : null,
                          to: noteTo,
                        };
                        setActivity([newActivity, ...activity]);
                        setNoteText('');
                        setNoteFile(null);
                        setNoteTo('');
                        setShowNoteEditor(false);
                      }
                    }}
                  >
                    Save Note
                  </Button>
                  <Button color="secondary" onClick={() => setShowNoteEditor(false)}>
                    Cancel
                  </Button>
                </div>
              </div>
            )}

            {/* Activity Feed */}
            <div>
              {activity.length > 0 ? (
                activity.map((a, i) => (
                  <div key={i} className="mb-3 p-3 position-relative" style={{ background: "#f8d7da", borderRadius: 8 }}>
                    <span
                      style={{
                        position: "absolute",
                        top: 10,
                        right: 10,
                        cursor: "pointer",
                        color: "#d9534f",
                        zIndex: 30,
                        fontSize: 18,
                      }}
                      title="Delete Note"
                      onClick={() => {
                        const updated = [...activity];
                        updated.splice(i, 1);
                        setActivity(updated);
                      }}
                    >
                      <Icon icon='delete' />
                    </span>
                    <div className="d-flex align-items-center mb-2">
                      <img
                        src={ticket.contact?.avatarUrl || 'https://via.placeholder.com/40'}
                        alt="avatar"
                        className="rounded-circle me-2"
                        width={40}
                        height={40}
                        style={{ objectFit: "cover" }}
                      />
                      <div>
                        <div className="fw-bold">{a.author}</div>
                        <div className="text-muted" style={{ fontSize: 12 }}>{a.date}</div>
                      </div>
                    </div>
                    <div className="mb-2">{a.message}</div>
                    {a.file && (
                      <div style={{
                        position: "relative",
                        display: "inline-block",
                        minWidth: 160,
                        background: "#fff",
                        borderRadius: 8,
                        boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
                        marginBottom: 8,
                        marginTop: 8,
                        padding: 8,
                        verticalAlign: "top"
                      }}>
                        <div style={{ display: "flex", alignItems: "center" }}>
                          {a.file.type.startsWith('image/') ? (
                            <img
                              src={a.file.url}
                              alt={a.file.name}
                              style={{ maxWidth: 60, maxHeight: 60, borderRadius: 4, marginRight: 8 }}
                            />
                          ) : (
                            <i className="fa fa-file" style={{ fontSize: 32, marginRight: 8 }} />
                          )}
                          <span style={{ fontWeight: 500, fontSize: 14, maxWidth: 80, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                            {a.file.name}
                          </span>
                          <span
                            style={{
                              marginLeft: "auto",
                              cursor: "pointer",
                              fontWeight: "bold",
                              fontSize: 20,
                              color: "#888",
                              zIndex: 20,
                              padding: "0 8px"
                            }}
                            onClick={e => {
                              e.stopPropagation();
                              setOpenMenuIndex(openMenuIndex === i ? null : i);
                            }}
                          >
                            &#8230;
                          </span>
                        </div>
                        {openMenuIndex === i && (
                          <div
                            style={{
                              position: "absolute",
                              top: 38,
                              right: 8,
                              background: "#fff",
                              border: "1px solid #ddd",
                              borderRadius: 6,
                              boxShadow: "0 2px 8px rgba(0,0,0,0.12)",
                              zIndex: 100,
                              minWidth: 120
                            }}
                            onClick={e => e.stopPropagation()}
                          >
                            <div
                              style={{ padding: "8px 16px", cursor: "pointer" }}
                              onClick={() => {
                                window.open(a.file!.url, "_blank");
                                setOpenMenuIndex(null);
                              }}
                            >
                              View
                            </div>
                            <div
                              style={{ padding: "8px 16px", cursor: "pointer" }}
                              onClick={() => {
                                const link = document.createElement("a");
                                link.href = a.file!.url;
                                link.download = a.file!.name;
                                link.click();
                                setOpenMenuIndex(null);
                              }}
                            >
                              Download
                            </div>
                            <div
                              style={{ padding: "8px 16px", cursor: "pointer", color: "red" }}
                              onClick={() => {
                                const updated = [...activity];
                                updated[i] = { ...updated[i], file: null };
                                setActivity(updated);
                                setOpenMenuIndex(null);
                              }}
                            >
                              Delete
                            </div>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                ))
              ) : (
                <div>No activity yet.</div>
              )}
            </div>
          </div>

          {/* Details (right) column */}
          <div className="col-md-4 border-start" style={{ background: "#fafbfc", minHeight: 400, padding: "0 24px" }}>
            {/* Tabs */}
            <div className="d-flex border-bottom mb-3" style={{ gap: 0 }}>
              {['Details', 'Contact', 'Other', 'Activity'].map((t) => (
                <button
                  key={t}
                  className={classNames('btn btn-link flex-fill', {
                    'border-bottom border-primary text-primary fw-bold': tab === t,
                    'text-dark': tab !== t,
                  })}
                  style={{
                    borderRadius: 0,
                    fontSize: 15,
                    padding: "8px 0",
                    marginBottom: -1,
                    borderBottomWidth: tab === t ? 3 : 1,
                  }}
                  onClick={() => setTab(t as any)}
                >
                  {t}
                </button>
              ))}
            </div>
            {/* Tab Content */}
            <div style={{ minHeight: 260 }}>
              {tab === 'Details' && (
                <form>
                  <div className="mb-3">
                    <label className="form-label"><strong>Subject</strong></label>
                    <input
                      type="text"
                      className="form-control"
                      value={subject}
                      onChange={e => setSubject(e.target.value)}
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label"><strong>Requester</strong></label>
                    <input
                      type="text"
                      className="form-control"
                      value={ticket.requester}
                      readOnly
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label"><strong>Assign Group</strong></label>
                    <div className="input-group">
                      <select
                        className="form-select"
                        value={selectedGroup}
                        onChange={e => setSelectedGroup(e.target.value)}
                      >
                        <option value="">--</option>
                        {groups.map(g => (
                          <option key={g.id} value={g.name}>{g.name}</option>
                        ))}
                      </select>
                      <Button color="primary" type="button" onClick={() => setShowGroupsModal(true)}>
                        Add
                      </Button>
                    </div>
                  </div>
                  <div className="mb-3">
                    <label className="form-label"><strong>Agent</strong></label>
                    <div className="input-group">
                      <select
                        className="form-select"
                        value={selectedAgent}
                        onChange={e => setSelectedAgent(e.target.value)}
                      >
                        <option value="">Choose Agent</option>
                        {agents.map(agent => (
                          <option key={agent.id} value={agent.name}>{agent.name}</option>
                        ))}
                      </select>
                      <Button color="primary" type="button" onClick={() => setShowAgentModal(true)}>
                        Add
                      </Button>
                    </div>
                  </div>
                  <div className="mb-3">
                    <label className="form-label"><strong>Type</strong></label>
                    <div className="input-group">
                      <select
                        className="form-select"
                        value={selectedType}
                        onChange={e => setSelectedType(e.target.value)}
                      >
                        <option value="">--</option>
                        {types.map(type => (
                          <option key={type.id} value={type.name}>{type.name}</option>
                        ))}
                      </select>
                      <Button color="primary" type="button" onClick={() => setShowTypeModal(true)}>
                        Add
                      </Button>
                    </div>
                  </div>
                  <div className="mb-3">
                    <label className="form-label"><strong>Channel Name</strong></label>
                    <div className="input-group">
                      <select
                        className="form-select"
                        value={selectedChannel}
                        onChange={e => setSelectedChannel(e.target.value)}
                      >
                        <option value="">--</option>
                        {channels.map(channel => (
                          <option key={channel.id} value={channel.name}>{channel.name}</option>
                        ))}
                      </select>
                      <Button color="primary" type="button" onClick={() => setShowChannelModal(true)}>
                        Add
                      </Button>
                    </div>
                  </div>
                  <div className="mb-3">
                    <label className="form-label"><strong>Status</strong></label>
                    <select
                      className="form-select"
                      value={status}
                      onChange={handleStatusChange}
                    >
                      {statusOptions.map((opt) => (
                        <option key={opt.label} value={opt.label}>
                          {opt.label}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="mb-3">
                    <label className="form-label"><strong>Tags</strong></label>
                    <div className="d-flex flex-wrap gap-1 mb-1">
                      {tags.map((tag, i) => (
                        <span key={i} className="badge bg-secondary">
                          {tag}
                        </span>
                      ))}
                    </div>
                    <div className="input-group">
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Add tag"
                        value={newTag}
                        onChange={e => setNewTag(e.target.value)}
                      />
                      <button className="btn btn-outline-primary" type="button" onClick={handleAddTag}>
                        Add
                      </button>
                    </div>
                  </div>
                  <div className="mb-3">
                    <label className="form-label"><strong>Others</strong></label>
                    <textarea
                      className="form-control"
                      value={others}
                      onChange={e => setOthers(e.target.value)}
                      rows={2}
                    />
                  </div>
                </form>
              )}
              {tab === 'Contact' && (
                <div>
                  {/* Avatar, Name, Email */}
                  <div className="text-center mb-3">
                    <img
                      src={ticket.contact?.avatarUrl || 'https://via.placeholder.com/64'}
                      alt="avatar"
                      className="rounded-circle mb-2"
                      width={64}
                      height={64}
                      style={{ objectFit: "cover" }}
                    />
                    
                    <div className="text-muted mb-2" style={{ fontSize: 14 }}>
                      Requestor: <span className="text-dark">{ticket.requester || '--'}</span>
                    </div>
                  </div>

                  {/* Tickets Chart */}
                  {/** Define chartLabel and chartColor before using them **/}
                  {(() => {
                    const chartLabel = ticket.subject || 'Ticket';
                    const chartColor = '#1976d2';
                    return (
                      <div className="mb-3">
                        <div style={{ width: "100%", maxWidth: 220, margin: "0 auto" }}>
                          <Chart
                            series={[1]}
                            options={{
                              chart: { type: 'pie' },
                              labels: [chartLabel],
                              fill: {
                                type: 'gradient',
                                gradient: {
                                  shade: 'light',
                                  type: 'vertical',
                                  shadeIntensity: 0.5,
                                  gradientToColors: [chartColor],
                                  inverseColors: false,
                                  opacityFrom: 0.9,
                                  opacityTo: 0.7,
                                  stops: [0, 100]
                                }
                              },
                              colors: [chartColor],
                              legend: { show: false }
                            }}
                            type="pie"
                            width={220}
                            height={220}
                            className="mx-auto"
                          />
                        </div>
                      </div>
                    );
                  })()}

                  {/* Recent Tickets */}
                  <div>
                    <div className="fw-bold mb-2">Recent Tickets</div>
                    <div className="d-flex align-items-center mb-2">
                      <Icon icon="Ticket" className="me-2" />
                      <span style={{ fontWeight: 600 }}>{ticket.subject}</span>
                    </div>
                    <div className="d-flex align-items-center mb-1" style={{ fontSize: 14 }}>
                      <span className="me-2">#{ticket.id}</span>
                      <span className="me-2" style={{ color: "#d32f2f" }}>●</span>
                      <span className="me-2">{ticket.status?.toLowerCase()}</span>
                    </div>
                    <div className="text-muted" style={{ fontSize: 13 }}>
                      {ticket.requestedOn}
                    </div>
                  </div>
                </div>
              )}
              {tab === 'Other' && (
                <div>
                  <div className="mb-3">
                    <label className="form-label"><strong>Delivery Status</strong></label>
                    <input
                      type="text"
                      className="form-control"
                      value={ticket.deliveryStatus}
                      readOnly
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label"><strong>Delivery Status Color</strong></label>
                    <input
                      type="text"
                      className="form-control"
                      value={ticket.deliveryStatusColor}
                      readOnly
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label"><strong>Priority</strong></label>
                    <input
                      type="text"
                      className="form-control"
                      value={ticket.priority}
                      readOnly
                    />
                  </div>
                </div>
              )}
              {tab === 'Activity' && (
                <div>
                  {activity.length > 0 ? (
                    activity.map((a, i) => (
                      <div key={i} className="mb-3 p-3 position-relative" style={{ background: "#f8d7da", borderRadius: 8 }}>
                        <span
                          style={{
                            position: "absolute",
                            top: 10,
                            right: 10,
                            cursor: "pointer",
                            color: "#d9534f",
                            zIndex: 30,
                            fontSize: 18,
                          }}
                          title="Delete Note"
                          onClick={() => {
                            const updated = [...activity];
                            updated.splice(i, 1);
                            setActivity(updated);
                          }}
                        >
                          <Icon icon='delete' />
                        </span>
                        <div className="d-flex align-items-center mb-2">
                          <img
                            src={ticket.contact?.avatarUrl || 'https://via.placeholder.com/40'}
                            alt="avatar"
                            className="rounded-circle me-2"
                            width={40}
                            height={40}
                            style={{ objectFit: "cover" }}
                          />
                          <div>
                            <div className="fw-bold">{a.author}</div>
                            <div className="text-muted" style={{ fontSize: 12 }}>{a.date}</div>
                          </div>
                        </div>
                        <div className="mb-2">{a.message}</div>
                        {a.file && (
                          <div style={{
                            position: "relative",
                            display: "inline-block",
                            minWidth: 160,
                            background: "#fff",
                            borderRadius: 8,
                            boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
                            marginBottom: 8,
                            marginTop: 8,
                            padding: 8,
                            verticalAlign: "top"
                          }}>
                            <div style={{ display: "flex", alignItems: "center" }}>
                              {a.file.type.startsWith('image/') ? (
                                <img
                                  src={a.file.url}
                                  alt={a.file.name}
                                  style={{ maxWidth: 60, maxHeight: 60, borderRadius: 4, marginRight: 8 }}
                                />
                              ) : (
                                <i className="fa fa-file" style={{ fontSize: 32, marginRight: 8 }} />
                              )}
                              <span style={{ fontWeight: 500, fontSize: 14, maxWidth: 80, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                                {a.file.name}
                              </span>
                              <span
                                style={{
                                  marginLeft: "auto",
                                  cursor: "pointer",
                                  fontWeight: "bold",
                                  fontSize: 20,
                                  color: "#888",
                                  zIndex: 20,
                                  padding: "0 8px"
                                }}
                                onClick={e => {
                                  e.stopPropagation();
                                  setOpenMenuIndex(openMenuIndex === i ? null : i);
                                }}
                              >
                                &#8230;
                              </span>
                            </div>
                            {openMenuIndex === i && (
                              <div
                                style={{
                                  position: "absolute",
                                  top: 38,
                                  right: 8,
                                  background: "#fff",
                                  border: "1px solid #ddd",
                                  borderRadius: 6,
                                  boxShadow: "0 2px 8px rgba(0,0,0,0.12)",
                                  zIndex: 100,
                                  minWidth: 120
                                }}
                                onClick={e => e.stopPropagation()}
                              >
                                <div
                                  style={{ padding: "8px 16px", cursor: "pointer" }}
                                  onClick={() => {
                                    window.open(a.file!.url, "_blank");
                                    setOpenMenuIndex(null);
                                  }}
                                >
                                  View
                                </div>
                                <div
                                  style={{ padding: "8px 16px", cursor: "pointer" }}
                                  onClick={() => {
                                    const link = document.createElement("a");
                                    link.href = a.file!.url;
                                    link.download = a.file!.name;
                                    link.click();
                                    setOpenMenuIndex(null);
                                  }}
                                >
                                  Download
                                </div>
                                <div
                                  style={{ padding: "8px 16px", cursor: "pointer", color: "red" }}
                                  onClick={() => {
                                    const updated = [...activity];
                                    updated[i] = { ...updated[i], file: null };
                                    setActivity(updated);
                                    setOpenMenuIndex(null);
                                  }}
                                >
                                  Delete
                                </div>
                              </div>
                            )}
                          </div>
                        )}
                      </div>
                    ))
                  ) : (
                    <div>No activity yet.</div>
                  )}
                </div>
              )}
            </div>
            <div className="d-flex gap-2 mt-4">
              <Button
                color="primary"
                isOutline
                style={{ minWidth: 100 }}
                onClick={() => {
                  if (!ticket) return;
                  onUpdate({
                    ...ticket,
                    subject,
                    group: selectedGroup,
                    agent: selectedAgent,
                    type: selectedType,
                    channelName: selectedChannel,
                    status,
                    tags,
                    others,
                  });
                  onHide();
                }}
              >
                Update
              </Button>
              <Button isOutline color="secondary" style={{ minWidth: 90 }} onClick={onHide}>
                Back
              </Button>
            </div>
          </div>
        </div>
      </div>
      {/* Modals for Add/Manage */}
      <ManageGroupsModal
        show={showGroupsModal}
        onHide={() => setShowGroupsModal(false)}
        groups={groups}
        setGroups={setGroups}
      />
      <AddAgentModal
        show={showAgentModal}
        onHide={() => setShowAgentModal(false)}
        groups={groups}
        agents={agents}
        setAgents={setAgents}
        selectedAgent={selectedAgent}
        setSelectedAgent={setSelectedAgent}
        selectedAgentGroup={selectedGroup}
        setSelectedAgentGroup={setSelectedGroup}
      />
      <AddTypeModal
        show={showTypeModal}
        onHide={() => setShowTypeModal(false)}
        types={types}
        setTypes={setTypes}
      />
      <AddChannelModal
        show={showChannelModal}
        onHide={() => setShowChannelModal(false)}
        channels={channels}
        setChannels={setChannels}
      />
    </Modal>
  );
};

export default TicketViewModal;