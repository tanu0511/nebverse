/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState, useEffect } from 'react';
import { Modal } from 'react-bootstrap';
import Button from '../../../components/bootstrap/Button';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import Icon from '../../../components/icon/Icon';

const ManageGroupsModal = ({ show, onHide, groups, setGroups }: {
  show: boolean;
  onHide: () => void;
  groups: { id: number; name: string }[];
  setGroups: React.Dispatch<React.SetStateAction<{ id: number; name: string }[]>>;
}) => {
  const [groupName, setGroupName] = useState('');

  const handleSave = () => {
    if (groupName.trim() === '') return;
    setGroups(prev => [
      ...prev,
      { id: Date.now(), name: groupName }
    ]);
    setGroupName('');
  };

  const handleDelete = (id: number) => {
    setGroups(prev => prev.filter(g => g.id !== id));
  };

  return (
    <Modal show={show} onHide={onHide} size="lg" centered isStaticBackdrop={true}>
      <Modal.Header closeButton>
        <Modal.Title>Manage Groups</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <table className="table">
          <thead>
            <tr>
              <th style={{ width: 40 }}>#</th>
              <th>Group</th>
              <th style={{ width: 100 }}>Action</th>
            </tr>
          </thead>
          <tbody>
            {groups.length === 0 ? (
              <tr>
                <td colSpan={3}>No group added.</td>
              </tr>
            ) : (
              groups.map((g, idx) => (
                <tr key={g.id}>
                  <td>{idx + 1}</td>
                  <td>{g.name}</td>
                  <td>
                    <Button
                      color="danger"
                      size="sm"
                      onClick={() => handleDelete(g.id)}
                    >
                      <i className="bi bi-trash" /> Delete
                    </Button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
        <div className="mb-3 mt-4">
          <label className="form-label">
            Group Name <span className="text-danger">*</span>
          </label>
          <input
            className="form-control"
            placeholder="e.g. Sales, Support, etc."
            value={groupName}
            onChange={e => setGroupName(e.target.value)}
          />
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button color="secondary" onClick={onHide}>
          Cancel
        </Button>
        <Button color="primary" onClick={handleSave}>
          <i className="bi bi-check-lg me-2" /> Save
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

const AddAgentModal = ({
  show,
  onHide,
  groups,
  setAgents,
  setSelectedAgent,
  selectedAgentGroup,
  setSelectedAgentGroup,
}: {
  show: boolean;
  onHide: () => void;
  groups: { id: number; name: string }[];
  agents: { id: number; name: string }[];
  setAgents: React.Dispatch<React.SetStateAction<{ id: number; name: string }[]>>;
  selectedAgent: string;
  setSelectedAgent: (a: string) => void;
  selectedAgentGroup: string;
  setSelectedAgentGroup: (g: string) => void;
}) => {
  const [agentName, setAgentName] = useState('');

  const handleSave = () => {
    if (agentName.trim() === '') return;
    const newAgent = { id: Date.now(), name: agentName.trim() };
    setAgents(prev => [...prev, newAgent]);
    setSelectedAgent(newAgent.name); // Set as selected
    setAgentName('');
    onHide();
    // Scroll to bottom after a short delay
    setTimeout(() => {
      const select = document.getElementById('agent-select');
      if (select) select.scrollTop = select.scrollHeight;
    }, 100);
  };

  return (
    <Modal show={show} onHide={onHide} size="lg" centered>
      <Modal.Header closeButton>
        <Modal.Title>Add New Ticket Agent</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <form>
          <div className="row mb-4">
            <div className="col-md-6">
              <label className="form-label">Agent Name <span className="text-danger">*</span></label>
              <input
                className="form-control"
                value={agentName}
                onChange={e => setAgentName(e.target.value)}
                placeholder="Enter agent name"
              />
            </div>
            <div className="col-md-6">
              <label className="form-label">Assign Group <span className="text-danger">*</span></label>
              <select
                className="form-select"
                value={selectedAgentGroup}
                onChange={e => setSelectedAgentGroup(e.target.value)}
              >
                <option value="">Nothing selected</option>
                {groups.map(g => (
                  <option key={g.id} value={g.name}>{g.name}</option>
                ))}
              </select>
            </div>
          </div>
        </form>
      </Modal.Body>
      <Modal.Footer>
        <Button color="secondary" onClick={onHide}>
          Cancel
        </Button>
        <Button color="primary" onClick={handleSave}>
          <i className="bi bi-check-lg me-2" /> Save
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

const AddTypeModal = ({
  show,
  onHide,
  setTypes,
}: {
  show: boolean;
  onHide: () => void;
  types: { id: number; name: string }[];
  setTypes: React.Dispatch<React.SetStateAction<{ id: number; name: string }[]>>;
}) => {
  const [typeName, setTypeName] = useState('');

  const handleSave = () => {
    if (typeName.trim() === '') return;
    setTypes(prev => [
      ...prev,
      { id: Date.now(), name: typeName.trim() }
    ]);
    setTypeName('');
    onHide();
  };

  return (
    <Modal show={show} onHide={onHide} size="lg" centered>
      <Modal.Header closeButton>
        <Modal.Title>Add New Type</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <label className="form-label">Type Name <span className="text-danger">*</span></label>
        <input
          className="form-control"
          value={typeName}
          onChange={e => setTypeName(e.target.value)}
          placeholder="Enter type name"
        />
      </Modal.Body>
      <Modal.Footer>
        <Button color="secondary" onClick={onHide}>
          Cancel
        </Button>
        <Button color="primary" onClick={handleSave}>
          <i className="bi bi-check-lg me-2" /> Save
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

const AddChannelModal = ({
  show,
  onHide,
  setChannels,
}: {
  show: boolean;
  onHide: () => void;
  channels: { id: number; name: string }[];
  setChannels: React.Dispatch<React.SetStateAction<{ id: number; name: string }[]>>;
}) => {
  const [channelName, setChannelName] = useState('');

  const handleSave = () => {
    if (channelName.trim() === '') return;
    setChannels(prev => [
      ...prev,
      { id: Date.now(), name: channelName.trim() }
    ]);
    setChannelName('');
    onHide();
  };

  return (
    <Modal show={show} onHide={onHide} size="lg" centered>
      <Modal.Header closeButton>
        <Modal.Title>Add Channel</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <label className="form-label">Channel Name <span className="text-danger">*</span></label>
        <input
          className="form-control"
          value={channelName}
          onChange={e => setChannelName(e.target.value)}
          placeholder="Enter channel name"
        />
      </Modal.Body>
      <Modal.Footer>
        <Button color="secondary" onClick={onHide}>
          Cancel
        </Button>
        <Button color="primary" onClick={handleSave}>
          <i className="bi bi-check-lg me-2" /> Save
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

type Ticket = {
  Requester: string;
  id: number;
  requester: string;
  subject: string;
  requestedOn: string;
  agent: string;
  priority: string;
  status: string;
  // Add other fields as needed
};

type CreateTicketModalProps = {
  show: boolean;
  onHide: () => void;
  onSave: (data: Ticket) => void;
  agents: { id: number; name: string }[];
  setAgents: React.Dispatch<React.SetStateAction<{ id: number; name: string }[]>>;
  groups: { id: number; name: string }[];
  setGroups: React.Dispatch<React.SetStateAction<{ id: number; name: string }[]>>;
  types: { id: number; name: string }[];
  setTypes: React.Dispatch<React.SetStateAction<{ id: number; name: string }[]>>;
  channels: { id: number; name: string }[];
  setChannels: React.Dispatch<React.SetStateAction<{ id: number; name: string }[]>>;
  selectedAgentGroup: string;
  setSelectedAgentGroup: (g: string) => void;
};

const CreateTicketModal = ({
  show,
  onHide,
  onSave,
  agents,
  setAgents,
  groups,
  setGroups,
  types,
  setTypes,
  channels,
  setChannels,
}: CreateTicketModalProps) => {
  const [requesterType, setRequesterType] = useState('Client');
  const [requesterName, setRequesterName] = useState('');
  const [selectedType, setSelectedType] = useState('');
  const [subject, setSubject] = useState('');
  const [description, setDescription] = useState('');
  const [selectedAgent, setSelectedAgent] = useState('');
  const [selectedGroup, setSelectedGroup] = useState('');
  const [selectedAgentGroup, setSelectedAgentGroup] = useState('');
  const [priority, setPriority] = useState('Low');
  const [selectedChannel, setSelectedChannel] = useState('');
  const [tags, setTags] = useState('');
  const [otherDetailsOpen, setOtherDetailsOpen] = useState(true);
  const [showFileBox, setShowFileBox] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [showGroupsModal, setShowGroupsModal] = useState(false);
  const [showAgentModal, setShowAgentModal] = useState(false);
  const [showTypeModal, setShowTypeModal] = useState(false);
  const [showChannelModal, setShowChannelModal] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0]);
      setShowFileBox(true);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({
      Requester: requesterName, // or set appropriately
      id: Date.now(), // or use a better unique id generator if needed
      requester: requesterName,
      subject,
      requestedOn: new Date().toISOString(),
      agent: selectedAgent,
      priority,
      status: 'Open',
      // ...other fields
    });
  };

  // Reset form when modal opens
  useEffect(() => {
    if (show) {
      setRequesterType('Client');
      setRequesterName('');
      setSelectedType('');
      setSubject('');
      setDescription('');
      setSelectedAgent('');
      setSelectedGroup('');
      setPriority('Low');
      setSelectedChannel('');
      setTags('');
      // reset other states as needed
    }
  }, [show]);

  return (
    <Modal show={show} onHide={onHide} size="lg" centered isstaticBackdrop={true}>
      <Modal.Header closeButton>
        <Modal.Title>Ticket Details</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <form onSubmit={handleSubmit}>
          <div className="row mb-3">
            <div className="col-md-4">
              <label className="form-label">Requester</label>
              <div>
                <input
                  type="radio"
                  id="client"
                  name="requester"
                  checked={requesterType === 'Client'}
                  onChange={() => setRequesterType('Client')}
                />{' '}
                <label htmlFor="client">Client</label>
                <input
                  type="radio"
                  id="employee"
                  name="requester"
                  className="ms-3"
                  checked={requesterType === 'Employee'}
                  onChange={() => setRequesterType('Employee')}
                />{' '}
                <label htmlFor="employee">Employee</label>
              </div>
            </div>
            <div className="col-md-4">
              <label className="form-label">Requester Name <span className="text-danger">*</span></label>
              <input
                className="form-control"
                value={requesterName}
                onChange={e => setRequesterName(e.target.value)}
                placeholder="Enter requester name"
                required
              />
            </div>
            <div className="col-md-4">
              <label className="form-label">Assign Group <span className="text-danger">*</span></label>
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
                <Button color="light" type="button" onClick={() => setShowGroupsModal(true)}>
                  Add
                </Button>
              </div>
            </div>
          </div>
          <div className="row mb-3">
            <div className="col-md-4">
              <label className="form-label">Agent</label>
              <div className="input-group">
                <select
                  id="agent-select"
                  className="form-select"
                  value={selectedAgent}
                  onChange={e => setSelectedAgent(e.target.value)}
                >
                  <option value="">Choose Agent</option>
                  {agents.map(agent => (
                    <option key={agent.id} value={agent.name}>{agent.name}</option>
                  ))}
                </select>
                <Button color="light" type="button" onClick={() => setShowAgentModal(true)}>
                  Add
                </Button>
              </div>
            </div>
            <div className="col-md-4">
              <label className="form-label">Project</label>
              <select className="form-select">
                <option>--</option>
              </select>
            </div>
            <div className="col-md-4">
              <label className="form-label">Type</label>
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
                <Button color="light" type="button" onClick={() => setShowTypeModal(true)}>
                  Add
                </Button>
              </div>
            </div>
          </div>
          <div className="mb-3">
            <label className="form-label">Ticket Subject <span className="text-danger">*</span></label>
            <input
              type="text"
              className="form-control"
              value={subject}
              onChange={e => setSubject(e.target.value)}
              required
            />
          </div>
          <div className="mb-5">
            <label className="form-label">Description <span className="text-danger">*</span></label>
            <ReactQuill
              theme="snow"
              value={description}
              onChange={setDescription}
              style={{ height: 150, marginBottom: 40 }}
              className='mb'
            />
            {/* Upload File Link */}
            <div className="mt-5">
              <a
                href="#"
                style={{ color: "#007bff", textDecoration: "none" }}
                onClick={e => {
                  e.preventDefault();
                  setShowFileBox(true);
                }}
              >
                <Icon icon='CameraAlt' /> Upload File
              </a>
              {/* Hidden file input */}
              <input
                type="file"
                id="fileInput"
                style={{ display: 'none' }}
                onChange={handleFileChange}
              />
            </div>

            {/* File Box Modal/Area */}
            {showFileBox && (
              <div className="mb-4 mt-3">
                <label className="form-label" style={{ color: "#007bff" }}>Add File</label>
                <div
                  style={{
                    border: "1px solid #ddd",
                    borderRadius: 6,
                    minHeight: 120,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    background: "#fff",
                    cursor: "pointer"
                  }}
                  onClick={() => document.getElementById('fileInput')?.click()}
                >
                  {selectedFile ? (
                    <span>{selectedFile.name}</span>
                  ) : (
                    <span style={{ color: "#888" }}>Choose a file</span>
                  )}
                </div>
                <Button
                  color="secondary"
                  size="sm"
                  className="mt-2"
                  onClick={() => {
                    setShowFileBox(false);
                    setSelectedFile(null);
                  }}
                >
                  Cancel
                </Button>
              </div>
            )}
          </div>
          <div className="mt-4">
            <div
              style={{ cursor: 'pointer', display: 'flex', alignItems: 'center', fontWeight: 600, fontSize: 18 }}
              onClick={() => setOtherDetailsOpen(open => !open)}
            >
              <span style={{ fontSize: 22, marginRight: 8 }}>
                {otherDetailsOpen ? <>&#9660;</> : <>&#9654;</>}
              </span>
              Other Details
            </div>
            {otherDetailsOpen && (
              <div className="mt-3">
                <div className="row mb-3">
                  <div className="col-md-6">
                    <label className="form-label">Priority</label>
                    <select
                      className="form-select mx-2"
                      value={priority}
                      onChange={e => setPriority(e.target.value)}
                    >
                      <option value="Low">🟢 Low</option>
                      <option value="Medium">🟡 Medium</option>
                      <option value="High">🔴 High</option>
                    </select>
                  </div>
                  <div className="col-md-6">
                    <label className="form-label">Channel Name</label>
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
                      <Button color="light" type="button" onClick={() => setShowChannelModal(true)}>
                        Add
                      </Button>
                    </div>
                  </div>
                </div>
                <div className="mb-3">
                  <label className="form-label">Tags</label>
                  <input
                    className="form-control"
                    value={tags}
                    onChange={e => setTags(e.target.value)}
                    placeholder="Enter tags"
                  />
                </div>
              </div>
            )}
          </div>
          {/* <Button color="primary" type="submit">
            Submit
          </Button> */}
        </form>
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
          selectedAgentGroup={selectedAgentGroup}
          setSelectedAgentGroup={setSelectedAgentGroup}
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
      </Modal.Body>
      <Modal.Footer>
        <Button color="secondary" onClick={onHide}>
          Cancel
        </Button>
        <Button color="primary" onClick={handleSubmit}>
          Submit
        </Button>
      </Modal.Footer>
    </Modal>
  );
};


export { ManageGroupsModal, AddAgentModal, AddTypeModal, AddChannelModal };

export default CreateTicketModal;