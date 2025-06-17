import React from 'react';

const client = {
  fullName: 'hhhhhh',
  email: 'rttgtyh@gmail.com',
  companyName: '--',
  companyLogo: '--',
  mobile: '--',
  gender: 'Male',
  officePhone: '--',
  website: '--',
  gst: '--',
  address: '--',
  state: '--',
  city: '--',
  postalCode: '--',
  lastLogin: '--',
};

const ClientView: React.FC = () => {
  return (
    <div className="container-fluid p-4">
      <div className="mb-3">
        <span className="fw-bold fs-4">hhhhhh</span>
        <span className="ms-2 text-muted">Home • Clients • hhhhhh</span>
      </div>
      <div className="mb-4">
        <ul className="nav nav-tabs">
          <li className="nav-item"><a className="nav-link active" href="#">Profile</a></li>
          <li className="nav-item"><a className="nav-link" href="#">Projects</a></li>
          <li className="nav-item"><a className="nav-link" href="#">Invoices</a></li>
          <li className="nav-item"><a className="nav-link" href="#">Estimates</a></li>
          <li className="nav-item"><a className="nav-link" href="#">Credit Note</a></li>
          <li className="nav-item"><a className="nav-link" href="#">Payments</a></li>
          <li className="nav-item"><a className="nav-link" href="#">Contacts</a></li>
          <li className="nav-item"><a className="nav-link" href="#">Documents</a></li>
          <li className="nav-item"><a className="nav-link" href="#">Notes</a></li>
          <li className="nav-item"><a className="nav-link" href="#">Tickets</a></li>
          <li className="nav-item"><a className="nav-link" href="#">Orders</a></li>
        </ul>
      </div>
      <div className="row g-3 mb-4">
        <div className="col-md-3">
          <div className="card">
            <div className="card-body d-flex align-items-center">
              <img src="https://via.placeholder.com/64" alt="avatar" className="rounded-circle me-3" width={64} height={64} />
              <div>
                <div className="fw-bold">{client.fullName}</div>
                <div className="text-muted small">Last login at {client.lastLogin}</div>
              </div>
              <div className="ms-auto">
                <button className="btn btn-light btn-sm">...</button>
              </div>
            </div>
          </div>
        </div>
        <div className="col-md-3">
          <div className="card text-center">
            <div className="card-body">
              <div className="text-muted">Total Projects</div>
              <div className="fw-bold fs-4">0</div>
            </div>
          </div>
        </div>
        <div className="col-md-3">
          <div className="card text-center">
            <div className="card-body">
              <div className="text-muted">Total Earnings</div>
              <div className="fw-bold fs-4">0</div>
            </div>
          </div>
        </div>
        <div className="col-md-3">
          <div className="card text-center">
            <div className="card-body">
              <div className="text-muted">Due Invoices</div>
              <div className="fw-bold fs-4">0</div>
            </div>
          </div>
        </div>
      </div>
      <div className="row g-3">
        <div className="col-md-6">
          <div className="card">
            <div className="card-header fw-bold">Profile Info</div>
            <div className="card-body">
              <div className="row mb-2">
                <div className="col-5 text-muted">Full Name</div>
                <div className="col-7">{client.fullName}</div>
              </div>
              <div className="row mb-2">
                <div className="col-5 text-muted">Email</div>
                <div className="col-7">{client.email}</div>
              </div>
              <div className="row mb-2">
                <div className="col-5 text-muted">Company Name</div>
                <div className="col-7">{client.companyName}</div>
              </div>
              <div className="row mb-2">
                <div className="col-5 text-muted">Company Logo</div>
                <div className="col-7">{client.companyLogo}</div>
              </div>
              <div className="row mb-2">
                <div className="col-5 text-muted">Mobile</div>
                <div className="col-7">{client.mobile}</div>
              </div>
              <div className="row mb-2">
                <div className="col-5 text-muted">Gender</div>
                <div className="col-7">♂ {client.gender}</div>
              </div>
              <div className="row mb-2">
                <div className="col-5 text-muted">Office Phone Number</div>
                <div className="col-7">{client.officePhone}</div>
              </div>
              <div className="row mb-2">
                <div className="col-5 text-muted">Official Website</div>
                <div className="col-7">{client.website}</div>
              </div>
              <div className="row mb-2">
                <div className="col-5 text-muted">GST/VAT Number</div>
                <div className="col-7">{client.gst}</div>
              </div>
              <div className="row mb-2">
                <div className="col-5 text-muted">Address</div>
                <div className="col-7">{client.address}</div>
              </div>
              <div className="row mb-2">
                <div className="col-5 text-muted">State</div>
                <div className="col-7">{client.state}</div>
              </div>
              <div className="row mb-2">
                <div className="col-5 text-muted">City</div>
                <div className="col-7">{client.city}</div>
              </div>
              <div className="row mb-2">
                <div className="col-5 text-muted">Postal code</div>
                <div className="col-7">{client.postalCode}</div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-md-6">
          <div className="row g-3">
            <div className="col-12">
              <div className="card">
                <div className="card-header fw-bold">Projects</div>
                <div className="card-body text-center text-muted">
                  <div style={{ fontSize: '2rem' }}>⏸</div>
                  - Not enough data -
                </div>
              </div>
            </div>
            <div className="col-12">
              <div className="card">
                <div className="card-header fw-bold">Invoices</div>
                <div className="card-body text-center text-muted">
                  <div style={{ fontSize: '2rem' }}>⏸</div>
                  - Not enough data -
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClientView;