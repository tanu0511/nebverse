/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useRef, useState } from 'react';
import { Dropdown, DropdownToggle, DropdownMenu } from 'react-bootstrap';
import Button from '../../../components/bootstrap/Button';
import Icon from '../../../components/icon/Icon';

const Document: React.FC = () => {
  const [images, setImages] = useState<{ url: string; name: string; date: Date }[]>([]);
  const [openMenuIdx, setOpenMenuIdx] = useState<number | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleAddImage = (file: File | null) => {
    if (file) {
      const url = URL.createObjectURL(file);
      setImages([
        ...images,
        { url, name: file.name, date: new Date() },
      ]);
    }
  };

  const timeAgo = (date: Date) => {
    const now = new Date();
    const seconds = Math.floor((now.getTime() - date.getTime()) / 1000);
    if (seconds < 60) return 'just now';
    const minutes = Math.floor(seconds / 60);
    if (minutes < 60) return `${minutes} min ago`;
    const hours = Math.floor(minutes / 60);
    if (hours < 24) return `${hours} hr ago`;
    const days = Math.floor(hours / 24);
    return `${days} day${days > 1 ? 's' : ''} ago`;
  };

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-3">
        <Button
          icon="Add"
          color="primary"
          isLight
          onClick={() => fileInputRef.current?.click()}
        >
          Add Images
        </Button>
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          style={{ display: 'none' }}
          onChange={e => handleAddImage(e.target.files?.[0] || null)}
        />
      </div>
      <div>
        <table className="table mb-0" style={{ borderRadius: 6 }}>
          <thead>
            <tr>
              <th style={{ width: '60%' }}>File name</th>
              <th style={{ width: '20%' }}>Date</th>
              <th style={{ width: '20%' }}>Action</th>
            </tr>
          </thead>
          <tbody>
            {images.length === 0 ? (
              <tr>
                <td colSpan={3}>
                  <div className="d-flex flex-column align-items-center justify-content-center" style={{ height: 120 }}>
                    <img src="https://cdn-icons-png.flaticon.com/512/1828/1828843.png" alt="No file" style={{ width: 32, opacity: 0.4 }} />
                    <div style={{ color: '#8a94a6', marginTop: 8 }}>- No file uploaded. -</div>
                  </div>
                </td>
              </tr>
            ) : (
              images.map((img, idx) => (
                <tr key={idx}>
                  <td>
                    <img src={img.url} alt={img.name} style={{ width: 70, height: 50, objectFit: 'cover', borderRadius: 4, marginRight: 8, border: '1px solid #eee' }} />
                    <span className="ms-2">{img.name}</span>
                  </td>
                  <td style={{ verticalAlign: 'middle' }}>{timeAgo(img.date)}</td>
                  <td style={{ verticalAlign: 'middle', position: 'relative' }}>
                    <Dropdown
                      show={openMenuIdx === idx}
                      onToggle={isOpen => setOpenMenuIdx(isOpen ? idx : null)}
                    >
                      <DropdownToggle className="p-0 border-0 bg-transparent shadow-none">
                        <Button
                          icon='MoreVert'
                          color='primary'
                          isLight
                          className="btn-icon p-0 border-0 bg-transparent shadow-none"
                          style={{ background: 'none', boxShadow: 'none' }}
                        />
                      </DropdownToggle>
                      <DropdownMenu align="end">
                        <Button
                          color="link"
                          className="dropdown-item"
                          onClick={() => {
                            const link = document.createElement('a');
                            link.href = img.url;
                            link.download = img.name;
                            link.click();
                            setOpenMenuIdx(null);
                          }}
                        >
                          <Icon icon="CloudDownload" className="me-2" /> Download
                        </Button>
                        <Button
                          color="link"
                          className="dropdown-item text-danger"
                          onClick={() => {
                            const newImages = images.filter((_, i) => i !== idx);
                            setImages(newImages);
                            setOpenMenuIdx(null);
                          }}
                        >
                          <Icon icon="Delete" className="me-2" /> Delete
                        </Button>
                      </DropdownMenu>
                    </Dropdown>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Document;
