import React, { useState } from 'react';

const ContractRenew: React.FC = () => {
  const [showForm, setShowForm] = useState(false);
  const [renewals, setRenewals] = useState<any[]>([]);
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [contractValue, setContractValue] = useState('');
  const [currency, setCurrency] = useState('INR');
  const [menuOpenId, setMenuOpenId] = useState<number | null>(null);

  // Dummy user for demo
  const currentUser = {
    name: 'atharvraj singh rana',
    avatar: '',
  };

  const handleRenew = () => {
    if (!startDate || !contractValue) return;
    setRenewals([
      {
        id: Date.now(),
        author: currentUser.name,
        avatar: currentUser.avatar,
        renewDate: new Date(),
        startDate,
        endDate,
        contractValue,
        currency,
      },
      ...renewals,
    ]);
    setShowForm(false);
    setStartDate('');
    setEndDate('');
    setContractValue('');
    setCurrency('INR');
  };

  const handleEdit = (id: number) => {
    const toEdit = renewals.find(r => r.id === id);
    if (toEdit) {
      setStartDate(toEdit.startDate);
      setEndDate(toEdit.endDate);
      setContractValue(toEdit.contractValue);
      setCurrency(toEdit.currency);
      setRenewals(renewals.filter(r => r.id !== id));
      setShowForm(true);
      setMenuOpenId(null);
    }
  };

  const handleDelete = (id: number) => {
    setRenewals(renewals.filter(r => r.id !== id));
    setMenuOpenId(null);
  };

  return (
    <div className="card">
      <div className="card-header fw-bold" style={{ fontSize: '1.25rem' }}>
        Contract Renewal History
      </div>
      <div className="card-body">
        {!showForm && (
          <a
            href="#"
            className="text-primary d-inline-flex align-items-center mb-4"
            style={{ fontSize: '1.1rem', textDecoration: 'none' }}
            onClick={e => {
              e.preventDefault();
              setShowForm(true);
            }}
          >
            <span style={{ fontSize: 20, marginRight: 6, display: 'inline-block', transform: 'rotate(-45deg)' }}>↻</span>
            Renew Contract
          </a>
        )}

        {showForm && (
          <div className="mb-4">
            <div className="row mb-3">
              <div className="col-md-4">
                <label className="form-label fw-semibold">
                  Start Date <span className="text-danger">*</span>
                </label>
                <input
                  type="date"
                  className="form-control"
                  value={startDate}
                  onChange={e => setStartDate(e.target.value)}
                />
              </div>
              <div className="col-md-4">
                <label className="form-label fw-semibold">End Date</label>
                <input
                  type="date"
                  className="form-control"
                  value={endDate}
                  onChange={e => setEndDate(e.target.value)}
                />
              </div>
              <div className="col-md-4">
                <label className="form-label fw-semibold">
                  Contract Value <span className="text-danger">*</span>
                  <span title="Contract value after renewal" style={{ marginLeft: 4, cursor: 'pointer', color: '#888' }}>ⓘ</span>
                </label>
                <div className="input-group">
                  <input
                    type="number"
                    className="form-control"
                    value={contractValue}
                    onChange={e => setContractValue(e.target.value)}
                  />
                  <select
                    className="form-select"
                    style={{ maxWidth: 80 }}
                    value={currency}
                    onChange={e => setCurrency(e.target.value)}
                  >
                    <option value="INR">INR</option>
                    <option value="USD">USD</option>
                  </select>
                </div>
              </div>
            </div>
            <div className="d-flex justify-content-end align-items-center gap-3">
              <button
                className="btn btn-link text-muted"
                onClick={() => setShowForm(false)}
                type="button"
              >
                Cancel
              </button>
              <button
                className="btn btn-dark"
                type="button"
                onClick={handleRenew}
                disabled={!startDate || !contractValue}
              >
                ✓ Renew
              </button>
            </div>
          </div>
        )}

        {/* Renewal List */}
        <div className="mt-4">
          {renewals.length === 0 && !showForm && (
            <div className="d-flex flex-column align-items-center justify-content-center" style={{ minHeight: 150 }}>
              <span style={{ fontSize: 36, color: '#a0aec0' }}>↻</span>
              <div className="text-muted mt-2" style={{ fontSize: '1.1rem' }}>
                - No record found. -
              </div>
            </div>
          )}
          {renewals.map(r => (
            <div key={r.id} className="mb-4">
              <div className="d-flex align-items-center mb-2">
                <div
                  style={{
                    width: 32,
                    height: 32,
                    borderRadius: 8,
                    background: '#f3f4f6',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginRight: 16,
                  }}
                >
                  <img
                    src={r.avatar || 'https://cdn-icons-png.flaticon.com/512/149/149071.png'}
                    alt="avatar"
                    style={{ width: 22, height: 22, borderRadius: '50%' }}
                  />
                </div>
                <div>
                  <div className="fw-bold" style={{ fontSize: 13 }}>{r.author}</div>
                  <div className="text-muted" style={{ fontSize: 11 }}>
                    <span>
                      <i className="bi bi-calendar2" /> Renew Date - {r.renewDate.toLocaleDateString(undefined, { weekday: 'short', day: '2-digit', month: 'short', year: 'numeric' })}
                    </span>
                  </div>
                </div>
                <div className="ms-auto" style={{ fontSize: 24, color: '#bdbdbd', cursor: 'pointer' }}>
                  <div
                    onClick={() => setMenuOpenId(menuOpenId === r.id ? null : r.id)}
                    style={{ cursor: 'pointer' }}
                  >
                    ⋯
                  </div>
                  {menuOpenId === r.id && (
                    <div className="dropdown-menu dropdown-menu-end show">
                      <button
                        className="dropdown-item"
                        type="button"
                        onClick={() => handleEdit(r.id)}
                      >
                        <i className="bi bi-pencil me-2" />
                        Edit
                      </button>
                      <button
                        className="dropdown-item text-danger"
                        type="button"
                        onClick={() => handleDelete(r.id)}
                      >
                        <i className="bi bi-trash me-2" />
                        Delete
                      </button>
                    </div>
                  )}
                </div>
              </div>
              <div className="mt-2">
                <table className="table table-bordered mb-0">
                  <thead>
                    <tr>
                      <th style={{ fontWeight: 500, fontSize: 15 }}>Start Date</th>
                      <th style={{ fontWeight: 500, fontSize: 15 }}>End Date</th>
                      <th style={{ fontWeight: 500, fontSize: 15 }}>New Contract Value</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>{r.startDate ? new Date(r.startDate).toLocaleDateString(undefined, { weekday: 'short', day: '2-digit', month: 'short', year: 'numeric' }) : '-'}</td>
                      <td>{r.endDate ? new Date(r.endDate).toLocaleDateString(undefined, { weekday: 'short', day: '2-digit', month: 'short', year: 'numeric' }) : '-'}</td>
                      <td>
                        {r.currency === 'INR' ? '₹' : '$'}
                        {parseFloat(r.contractValue).toLocaleString(undefined, { minimumFractionDigits: 2 })}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ContractRenew;