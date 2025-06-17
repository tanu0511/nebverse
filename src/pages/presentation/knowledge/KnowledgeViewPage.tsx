import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Button from '../../../components/bootstrap/Button';
import Page from '../../../layout/Page/Page';
import PageWrapper from '../../../layout/PageWrapper/PageWrapper';
import useDarkMode from '../../../hooks/useDarkMode';
import useTourStep from '../../../hooks/useTourStep';
import Nav from '../../../components/bootstrap/Nav';
import Icon from '../../../components/icon/Icon';

const TABS = ['Zoom Settings', 'Slack', 'Email Settings'];

const KnowledgeViewPage = () => {
    useTourStep(16);
    const { darkModeStatus } = useDarkMode();
    const { id } = useParams();
    const navigate = useNavigate();

    const [activeTab, setActiveTab] = useState('Email Settings');
    const [checked, setChecked] = useState(false);
    const [show, setShow] = useState({
        accountId: false,
        clientId: false,
        clientSecret: false,
        meetingClientId: false,
        meetingClientSecret: false,
        secretToken: false,
    });

    const toggleShow = (field: keyof typeof show) => {
        setShow(prev => ({ ...prev, [field]: !prev[field] }));
    };

    return (
        <PageWrapper title="Settings">
            <Page>
                <div className="card">
                    <div className="card-body">
                        {/* Tabs using Nav */}
                        <Nav design="tabs">
                            {TABS.map(tab => (
                                <div
                                    key={tab}
                                    className={`nav-item${activeTab === tab ? ' active' : ''}`}
                                    style={{
                                        display: 'inline-block',
                                    }}
                                >
                                    <a
                                        href="#"
                                        className={`nav-link${activeTab === tab ? ' active' : ''}`}
                                        style={{
                                            cursor: 'pointer',
                                            fontWeight: activeTab === tab ? 500 : 400,
                                        }}
                                        onClick={e => {
                                            e.preventDefault();
                                            setActiveTab(tab);
                                        }}
                                    >
                                        {tab}
                                    </a>
                                </div>
                            ))}
                        </Nav>

                        {/* Tab Content */}
                        {activeTab === 'Email Settings' && (
                            <div>
                                <h5 className="mb-3 mt-4">Email Notification Settings</h5>
                                <div className="mb-4 d-flex align-items-center">
                                    <input
                                        type="checkbox"
                                        id="zoom-created"
                                        checked={checked}
                                        onChange={e => setChecked(e.target.checked)}
                                        style={{ width: 20, height: 20, marginRight: 10 }}
                                    />
                                    <label htmlFor="zoom-created" style={{ marginBottom: 0 }}>
                                        Zoom Meeting created
                                    </label>
                                </div>
                                <Button color="primary" icon='check'>
                                    Save
                                </Button>
                            </div>
                        )}

						{activeTab==='Slack' && (
							<div>
								<h5 className="mb-3 mt-4">Slack Notification Settings</h5>
								<div className="mb-4 d-flex align-items-center">
									<input
										type="checkbox"
										id="slack-created"
										checked={checked}
										onChange={e => setChecked(e.target.checked)}
										style={{ width: 20, height: 20, marginRight: 10 }}
									/>
									<label htmlFor="slack-created" style={{ marginBottom: 0 }}>
										Slack Channel created
									</label>
								</div>
								<Button color="primary" icon='check'>
									Save
								</Button>
							</div>
						)}
                        {activeTab === 'Zoom Settings' && (
                            <form className="mt-4">
                                <div className="row mb-3">
                                    <div className="col-md-4 mb-3">
                                        <label className="form-label">Account Id <span className="text-danger">*</span></label>
                                        <div className="input-group">
                                            <input
                                                type={show.accountId ? 'text' : 'password'}
                                                className="form-control"
                                            />
                                            <span className="input-group-text" style={{ cursor: 'pointer' }} onClick={() => toggleShow('accountId')}>
                                                <i className={`bi ${show.accountId ? 'bi-eye-slash' : 'bi-eye'}`}></i>
                                            </span>
                                        </div>
                                    </div>
                                    <div className="col-md-4 mb-3">
                                        <label className="form-label">Client Id <span className="text-danger">*</span></label>
                                        <div className="input-group">
                                            <input
                                                type={show.clientId ? 'text' : 'password'}
                                                className="form-control"
                                            />
                                            <span className="input-group-text" style={{ cursor: 'pointer' }} onClick={() => toggleShow('clientId')}>
                                                <i className={`bi ${show.clientId ? 'bi-eye-slash' : 'bi-eye'}`}></i>
                                            </span>
                                        </div>
                                    </div>
                                    <div className="col-md-4 mb-3">
                                        <label className="form-label">Client Secret <span className="text-danger">*</span></label>
                                        <div className="input-group">
                                            <input
                                                type={show.clientSecret ? 'text' : 'password'}
                                                className="form-control"
                                            />
                                            <span className="input-group-text" style={{ cursor: 'pointer' }} onClick={() => toggleShow('clientSecret')}>
                                                <i className={`bi ${show.clientSecret ? 'bi-eye-slash' : 'bi-eye'}`}></i>
                                            </span>
                                        </div>
                                    </div>
                                    <div className="col-md-4 mb-3">
                                        <label className="form-label">Meeting Client Id <span className="text-danger">*</span></label>
                                        <div className="input-group">
                                            <input
                                                type={show.meetingClientId ? 'text' : 'password'}
                                                className="form-control"
                                            />
                                            <span className="input-group-text" style={{ cursor: 'pointer' }} onClick={() => toggleShow('meetingClientId')}>
                                                <i className={`bi ${show.meetingClientId ? 'bi-eye-slash' : 'bi-eye'}`}></i>
                                            </span>
                                        </div>
                                    </div>
                                    <div className="col-md-4 mb-3">
                                        <label className="form-label">Meeting Client Secret <span className="text-danger">*</span></label>
                                        <div className="input-group">
                                            <input
                                                type={show.meetingClientSecret ? 'text' : 'password'}
                                                className="form-control"
                                            />
                                            <span className="input-group-text" style={{ cursor: 'pointer' }} onClick={() => toggleShow('meetingClientSecret')}>
                                                <i className={`bi ${show.meetingClientSecret ? 'bi-eye-slash' : 'bi-eye'}`}></i>
                                            </span>
                                        </div>
                                    </div>
                                    <div className="col-md-4 mb-3">
                                        <label className="form-label">Secret Token <span className="text-danger">*</span></label>
                                        <div className="input-group">
                                            <input
                                                type={show.secretToken ? 'text' : 'password'}
                                                className="form-control"
                                            />
                                            <span className="input-group-text" style={{ cursor: 'pointer' }} onClick={() => toggleShow('secretToken')}>
                                                <i className={`bi ${show.secretToken ? 'bi-eye-slash' : 'bi-eye'}`}></i>
                                            </span>
                                        </div>
                                    </div>
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">Open in Zoom Client App?</label>
                                    <div>
                                        <div className="form-check form-check-inline">
                                            <input className="form-check-input" type="radio" name="zoomClientApp" id="zoomYes" value="yes" />
                                            <label className="form-check-label" htmlFor="zoomYes">Yes</label>
                                        </div>
                                        <div className="form-check form-check-inline">
                                            <input className="form-check-input" type="radio" name="zoomClientApp" id="zoomNo" value="no" defaultChecked />
                                            <label className="form-check-label" htmlFor="zoomNo">No</label>
                                        </div>
                                    </div>
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">Webhook URL</label>
                                    <div className="input-group">
                                        <input
                                            type="text"
                                            className="form-control"
                                            value="https://nebverse.com/public/zoom-webhook/40e0f6ff11e87832a089641b4ba953f2"
                                            readOnly
                                        />
                                        <button
                                            type="button"
                                            className="btn btn-outline-secondary"
                                            onClick={() => navigator.clipboard.writeText('https://nebverse.com/public/zoom-webhook/40e0f6ff11e87832a089641b4ba953f2')}
                                        >
                                            <i className="bi bi-clipboard"></i> Copy
                                        </button>
                                    </div>
                                    <div>
                                        <a href="#" className="small text-primary">(Add this as your webhook URL in Zoom App)</a>
                                    </div>
                                </div>
                                <Button color="primary" className="mt-3" icon='check'>
                                  Save
                                </Button>
                            </form>
                        )}
                        {/* {activeTab !== 'Email Settings' && activeTab !== 'Zoom Settings' && (
                            <div className="text-center text-muted py-5">
                                {activeTab}
                            </div> */}
                        {/* )} */}
                    </div>
                </div>
            </Page>
        </PageWrapper>
    );
};

export default KnowledgeViewPage;
