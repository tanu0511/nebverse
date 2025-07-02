import React, { useRef, useState } from "react";
import Card, { CardBody } from '../../../components/bootstrap/Card';
import Icon from '../../../components/icon/Icon';

const FileUploadSection = () => {
  const [uploadedFiles, setUploadedFiles] = useState<{ file: File; uploadTime: Date }[]>([]);
  const [showUpload, setShowUpload] = useState(false);
  const [menuOpenIdx, setMenuOpenIdx] = useState<number | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Real-time update for "x seconds ago"
  const [, forceUpdate] = useState(0);
  React.useEffect(() => {
    if (uploadedFiles.length === 0) return;
    const interval = setInterval(() => forceUpdate(v => v + 1), 1000);
    return () => clearInterval(interval);
  }, [uploadedFiles.length]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setUploadedFiles(prev => [...prev, { file, uploadTime: new Date() }]);
      setShowUpload(false);
      if (fileInputRef.current) fileInputRef.current.value = "";
    }
  };

  // Helper for "x time ago"
  const getTimeAgo = (date: Date) => {
    const seconds = Math.floor((Date.now() - date.getTime()) / 1000);
    if (seconds < 60) return `${seconds} second${seconds !== 1 ? "s" : ""} ago`;
    const minutes = Math.floor(seconds / 60);
    if (minutes < 60) return `${minutes} minute${minutes !== 1 ? "s" : ""} ago`;
    const hours = Math.floor(minutes / 60);
    return `${hours} hour${hours !== 1 ? "s" : ""} ago`;
  };

  // Dropdown actions
  const handleView = (file: File) => {
    const url = URL.createObjectURL(file);
    window.open(url, "_blank");
    setTimeout(() => URL.revokeObjectURL(url), 1000);
    setMenuOpenIdx(null);
  };

  const handleDownload = (file: File) => {
    const url = URL.createObjectURL(file);
    const a = document.createElement("a");
    a.href = url;
    a.download = file.name;
    a.click();
    setTimeout(() => URL.revokeObjectURL(url), 1000);
    setMenuOpenIdx(null);
  };

  const handleDelete = (idx: number) => {
    setUploadedFiles(prev => prev.filter((_, i) => i !== idx));
    setMenuOpenIdx(null);
  };

  // Close dropdown on outside click
  React.useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (!(e.target as HTMLElement).closest(".file-card-menu")) {
        setMenuOpenIdx(null);
      }
    };
    if (menuOpenIdx !== null) {
      document.addEventListener("mousedown", handleClick);
    }
    return () => document.removeEventListener("mousedown", handleClick);
  }, [menuOpenIdx]);

  return (
    <div>
      <div
        className="border rounded"
        style={{
          minHeight: 220,
          background: '#fff',
          padding: 0,
          border: '1px solid #e5e7eb',
        }}
      >
        <div className="d-flex align-items-center" style={{ padding: '16px 24px', borderBottom: '1px solid #e5e7eb' }}>
          <a
            href="#"
            style={{
              color: '#2563eb',
              fontWeight: 500,
              textDecoration: 'none',
              display: 'flex',
              alignItems: 'center',
              fontSize: 15,
            }}
            onClick={e => {
              e.preventDefault();
              setShowUpload(true);
            }}
          >
            <span style={{ marginRight: 8 }}>
              <Icon icon="AddCircleOutline" style={{ color: '#2563eb' }} />
            </span>
            Upload File
          </a>
        </div>
        {showUpload && (
          <div style={{ padding: 24 }}>
            <div
              className="d-flex flex-column align-items-center justify-content-center"
              style={{
                border: '1px solid #e5e7eb',
                borderRadius: 8,
                minHeight: 180,
                cursor: 'pointer',
                background: '#f8fafc',
                position: 'relative',
              }}
              onClick={() => fileInputRef.current?.click()}
            >
              <input
                ref={fileInputRef}
                type="file"
                style={{
                  position: 'absolute',
                  width: '100%',
                  height: '100%',
                  opacity: 0,
                  cursor: 'pointer',
                }}
                onChange={handleFileChange}
              />
              <span style={{ color: '#222', fontSize: 14 }}>
                Choose a file
              </span>
            </div>
            <div className="d-flex justify-content-end mt-2">
              <a
                href="#"
                style={{
                  color: '#64748b',
                  fontWeight: 500,
                  textDecoration: 'none',
                  fontSize: 15,
                }}
                onClick={e => {
                  e.preventDefault();
                  setShowUpload(false);
                }}
              >
                Cancel
              </a>
            </div>
          </div>
        )}
        {!showUpload && uploadedFiles.length === 0 && (
          <div
            className="d-flex flex-column align-items-center justify-content-center"
            style={{ minHeight: 170 }}
          >
            <span style={{ color: '#94a3b8', fontSize: 35, marginBottom: 8 }}>
              <Icon icon="InsertDriveFile" style={{ fontSize: 35 }} />
            </span>
            <div className="text-muted" style={{ fontSize: 16 }}>
              - No file uploaded. -
            </div>
          </div>
        )}
      </div>
      {/* File cards */}
      <div className="d-flex flex-wrap gap-3 mt-3">
        {uploadedFiles.map((item, idx) => (
          <div
            key={idx}
            className="border rounded"
            style={{
              width: 220,
              background: "#fff",
              padding: 16,
              position: "relative",
              boxShadow: "0 1px 2px rgba(0,0,0,0.03)",
              transition: "box-shadow 0.2s",
            }}
          >
            <div
              style={{
                width: 36,
                height: 36,
                background: "#f3f4f6",
                borderRadius: 4,
                marginBottom: 8,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <div style={{ width: 28, height: 2, background: "#d1d5db", marginBottom: 4 }} />
              <div style={{ width: 28, height: 2, background: "#d1d5db", marginBottom: 4 }} />
              <div style={{ width: 20, height: 2, background: "#d1d5db" }} />
            </div>
            <div style={{ fontSize: 15, color: "#374151", fontWeight: 500, marginBottom: 4, display: "flex", alignItems: "center" }}>
              <span style={{ flex: 1, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                {item.file.name.length > 20
                  ? `${item.file.name.slice(0, 17)}…`
                  : item.file.name}
              </span>
              <span
                className="file-card-menu"
                style={{
                  marginLeft: 8,
                  cursor: "pointer",
                  fontSize: 20,
                  lineHeight: 1,
                  userSelect: "none",
                  padding: 2,
                  borderRadius: 4,
                  position: "relative"
                }}
                onClick={e => {
                  e.stopPropagation();
                  setMenuOpenIdx(idx === menuOpenIdx ? null : idx);
                }}
              >
                &#x22ee;
                {menuOpenIdx === idx && (
                  <div
                    className="file-card-menu"
                    style={{
                      position: "absolute",
                      top: 28,
                      right: 0,
                      zIndex: 10,
                      background: "#fff",
                      border: "1px solid #e5e7eb",
                      borderRadius: 8,
                      boxShadow: "0 4px 16px rgba(0,0,0,0.08)",
                      minWidth: 140,
                      padding: "8px 0"
                    }}
                  >
                    <div
                      style={{
                        padding: "10px 20px",
                        cursor: "pointer",
                        fontSize: 15,
                        color: "#222",
                        whiteSpace: "nowrap"
                      }}
                      onClick={() => handleView(item.file)}
                    >
                      View
                    </div>
                    <div
                      style={{
                        padding: "10px 20px",
                        cursor: "pointer",
                        fontSize: 15,
                        color: "#222",
                        whiteSpace: "nowrap"
                      }}
                      onClick={() => handleDownload(item.file)}
                    >
                      Download
                    </div>
                    <div
                      style={{
                        padding: "10px 20px",
                        cursor: "pointer",
                        fontSize: 15,
                        color: "#ef4444",
                        whiteSpace: "nowrap"
                      }}
                      onClick={() => handleDelete(idx)}
                    >
                      Delete
                    </div>
                  </div>
                )}
              </span>
            </div>
            <div style={{ fontSize: 13, color: "#6b7280" }}>
              {getTimeAgo(item.uploadTime)}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const FilesTab: React.FC = () => (
  <Card stretch>
    <CardBody>
      <div className="fw-bold mb-3" style={{ fontSize: '1.25rem' }}>Files</div>
      <FileUploadSection />
    </CardBody>
  </Card>
);

export default FilesTab;