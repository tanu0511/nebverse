import React, { useState } from 'react';
import Modal, {
    ModalHeader,
  ModalBody,
  ModalFooter,
  ModalTitle,
} from '../../../components/bootstrap/Modal';

interface ProjecteditModal2Props {
  id: string;
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const ProjecteditModal2: React.FC<ProjecteditModal2Props> = ({ id, isOpen, setIsOpen }) => {
  const [activeTab, setActiveTab] = useState<'email' | 'link'>('email');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [domainOnly, setDomainOnly] = useState(false);
  const [domain, setDomain] = useState('gmail.com');

  const handleEmailSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Sending email invite to:', email, message);
    setIsOpen(false);
  };

  const handleLinkCreate = () => {
    const link = domainOnly
      ? `https://yourapp.com/invite?domain=${domain}`
      : `https://yourapp.com/invite`;
    console.log('Generated Link:', link);
    alert(`Link Created:\n${link}`);
    setIsOpen(false);
  };

  return (
    <Modal isOpen={isOpen} setIsOpen={setIsOpen} centered size="lg">
      <ModalHeader setIsOpen={setIsOpen}>
      <ModalTitle id={`modal-title-${id}`}>
  Invite member to <span className="font-bold">rana</span>
</ModalTitle>

      </ModalHeader>
      <ModalBody>
        {/* Tabs */}
        <div className="flex border-b border-gray-200 mb-4">
          <button
            className={`bg-red px-4 py-2 rounded hover:bg-red-600 ${activeTab === 'email'}`}
            onClick={() => setActiveTab('email')}
          >
            Invite by email
          </button>
          <button
            className={`bg-red px-4 py-2 rounded hover:bg-red-600 ${activeTab === 'link'}`}
            onClick={() => setActiveTab('link')}
          >
            Invite by link
          </button>
        </div>
        {activeTab === 'email' ? (
          <form onSubmit={handleEmailSubmit}>
            <div className="bg-gray-100 text-sm text-gray-700 p-3 rounded mb-5">
              <i className="fas fa-info-circle mr-2" />
              Employees will receive an email to log in and update their profile through the self-service portal.
            </div>

            <div className="mb-4">
              <label htmlFor="email" className="block text-sm font-medium mb-1">
                Email <span className="text-red-500">*</span>
              </label>
              <input
                type="email"
                id="email"
                placeholder="e.g. johndoe@example.com"
                className="w-full border border-gray-300 rounded px-3 py-2"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className="mb-4">
              <label htmlFor="message" className="block text-sm font-medium mb-1">
                Message
              </label>
              <textarea
                id="message"
                placeholder="Add a message (optional)"
                className="w-full border border-gray-300 rounded px-3 py-2 h-24 resize-none"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
              />
            </div>

            <ModalFooter>
              <button
                type="submit"
                className="bg-red px-4 py-2 rounded hover:bg-red-600"
              >
                <i className="fas fa-paper-plane mr-2"/>Send Invite
              </button>
              <button
                type="button"
                className="ml-2 bg-gray-200 px-4 py-2 rounded hover:bg-gray-300"
                onClick={() => setIsOpen(false)}
              >
                Cancel
              </button>
            </ModalFooter>
          </form>
        ) : (
          <div>
            <p className="text-sm text-gray-600 mb-4">
              Create an invite link for members to join.
            </p>

            <div className="mb-4">
              <label className="flex items-center mb-2">
                <input
                  type="radio"
                  name="linkOption"
                  className="mr-2"
                  checked={!domainOnly}
                  onChange={() => setDomainOnly(false)}
                />
                Allow any email address
              </label>

              <label className="flex items-center">
                <input
                  type="radio"
                  name="linkOption"
                  className="mr-2"
                  checked={domainOnly}
                  onChange={() => setDomainOnly(true)}
                />
                Only allow email addresses with domain
              </label>

              {domainOnly && (
                <div className="ml-6 mt-2">
                  <div className="flex items-center">
                    <span className="px-3 py-2 bg-gray-100 border border-gray-300 rounded-l">@</span>
                    <input
                      type="text"
                      value={domain}
                      onChange={(e) => setDomain(e.target.value)}
                      className="w-full border border-gray-300 px-3 py-2 rounded-r"
                    />
                  </div>
                </div>
              )}
            </div>

            <ModalFooter>
              <button
                onClick={handleLinkCreate}
                className="bg-red px-4 py-2 rounded hover:bg-red-600"
              >
                <i className="fas fa-link mr-2"/> Create Link
              </button>
              
            </ModalFooter>
          </div>
        )}
      </ModalBody>
    </Modal>
  );
};

export default ProjecteditModal2;
