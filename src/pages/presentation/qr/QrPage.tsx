import React, { useMemo, useState, useEffect } from "react";
import PageWrapper from "../../../layout/PageWrapper/PageWrapper";
import SubHeader, { SubHeaderLeft, SubHeaderRight } from "../../../layout/SubHeader/SubHeader";
import Page from "../../../layout/Page/Page";
import Card, { CardBody } from "../../../components/bootstrap/Card";
import Input from "../../../components/bootstrap/forms/Input";
import PaginationButtons, { PER_COUNT } from "../../../components/PaginationButtons";
import Button from "../../../components/bootstrap/Button";
import Icon from "../../../components/icon/Icon";
import { qrTypes } from "./AddQr"; // adjust path as needed
import { FormControl } from "react-bootstrap";

type QRCodeData = {
  id: string;
  code: string;
  title: string;
  type: string;
  created: string;
  isSelected?: boolean;
};

const initialData: QRCodeData[] = []; // Replace with your data source

const QrPage: React.FC = () => {
  const [data, setData] = useState<QRCodeData[]>(initialData);
  const [search, setSearch] = useState("");
  const [type, setType] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);
  const [perPage, setPerPage] = useState(PER_COUNT["10"]);
  const [showModal, setShowModal] = useState(false);
  const [selectAll, setSelectAll] = useState(false);

  // Filter and paginate data
  const filteredData = useMemo(() => {
    let filtered = data;
    if (type !== "All") filtered = filtered.filter((row) => row.type === type);
    if (search) filtered = filtered.filter((row) =>
      row.title.toLowerCase().includes(search.toLowerCase())
    );
    return filtered;
  }, [data, type, search]);

  const paginatedData = useMemo(() => {
    const start = (currentPage - 1) * perPage;
    return filteredData.slice(start, start + perPage);
  }, [filteredData, currentPage, perPage]);

  useEffect(() => {
    const saved = localStorage.getItem("qrData");
    if (saved) setData(JSON.parse(saved));
  }, []);

  useEffect(() => {
    localStorage.setItem("qrData", JSON.stringify(data));
  }, [data]);

  // Select all logic
  const handleSelectAll = (checked: boolean) => {
    setSelectAll(checked);
    setData((prev) =>
      prev.map((row) => ({
        ...row,
        isSelected: checked,
      }))
    );
  };

  const handleRowSelect = (id: string, checked: boolean) => {
    setData((prev) =>
      prev.map((row) =>
        row.id === id ? { ...row, isSelected: checked } : row
      )
    );
    // Update selectAll checkbox state
    const allSelected = paginatedData.every((row) =>
      row.id === id ? checked : row.isSelected
    );
    setSelectAll(allSelected);
  };

  return (
    <PageWrapper title="QR Codes">
      <SubHeader>
        <SubHeaderLeft>
          <FormControl size="sm" style={{ minWidth: 120, marginRight: 12 }}>
            <select
              className="form-select"
              value={type}
              onChange={(e) => setType(e.target.value)}
            >
              <option value="All">All</option>
              {qrTypes
                .filter((t): t is string => typeof t === "string")
                .map((t) => (
                  <option key={t} value={t}>{t}</option>
                ))}
            </select>
          </FormControl>
          <label className="border-0 bg-transparent cursor-pointer me-0" htmlFor="searchInput">
            <Icon icon="Search" size="2x" color="primary" />
          </label>
          <Input
            id="searchInput"
            type="search"
            className="border-0 shadow-none bg-transparent"
            placeholder="Search QR code..."
            value={search}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearch(e.target.value)}
          />
        </SubHeaderLeft>
        <SubHeaderRight>
          <Button
            color="primary"
            icon="Add"
            isLight
            onClick={() => setShowModal(true)}
          >
            Create QR Code
          </Button>
          <Button
            color="info"
            icon="CloudDownload"
            isLight
            tag="a"
            to="/qr-export.txt"
            target="_blank"
            download
          >
            Export
          </Button>
        </SubHeaderRight>
      </SubHeader>

      <Page>
        <div className="row h-100">
          <div className="col-12">
            <Card stretch>
              <CardBody isScrollable className="table-responsive">
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
                      <th>QR Code</th>
                      <th>QR Title</th>
                      <th>Type</th>
                      <th>Created</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {paginatedData.length === 0 ? (
                      <tr>
                        <td colSpan={6} className="text-center text-muted">
                          No data available in table
                        </td>
                      </tr>
                    ) : (
                      paginatedData.map((row) => (
                        <tr key={row.id}>
                          <td>
                            <input
                              type="checkbox"
                              checked={row.isSelected || false}
                              onChange={(e) => handleRowSelect(row.id, e.target.checked)}
                            />
                          </td>
                          <td>{row.code}</td>
                          <td>{row.title}</td>
                          <td>{row.type}</td>
                          <td>{row.created}</td>
                          <td>
                            {/* Add action buttons here */}
                            <Button color="link" size="sm" isLight>
                              <Icon icon="RemoveRedEye" className="me-2" /> View
                            </Button>
                            <Button color="link" size="sm" isLight>
                              <Icon icon="Edit" className="me-2" /> Edit
                            </Button>
                            <Button color="link" size="sm" isLight className="text-danger">
                              <Icon icon="Delete" className="me-2" /> Delete
                            </Button>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </CardBody>
              <PaginationButtons
                data={filteredData}
                label="QR Codes"
                setCurrentPage={setCurrentPage}
                currentPage={currentPage}
                perPage={perPage}
                setPerPage={setPerPage}
              />
            </Card>
          </div>
        </div>
      </Page>

      {/* Modal */}
      <div
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100vw",
          height: "100vh",
          background: "rgba(0,0,0,0.3)",
          zIndex: 9999,
          display: showModal ? "flex" : "none",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {/* Your modal content here */}
      </div>
    </PageWrapper>
  );
};

export default QrPage;