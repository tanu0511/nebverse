import React, { useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

interface Comment {
  id: number;
  author: string;
  content: string;
  createdAt: Date;
}

const Discussion: React.FC = () => {
  const [showEditor, setShowEditor] = useState(false);
  const [comment, setComment] = useState('');
  const [comments, setComments] = useState<Comment[]>([]);
  const [error, setError] = useState('');
  const [menuOpenId, setMenuOpenId] = useState<number | null>(null);

  // Dummy user for demo
  const currentUser = {
    name: 'atharvraj singh rana',
    avatar: '', // You can use a default avatar image here
  };

  const handleSubmit = () => {
    if (!comment || comment.replace(/<(.|\n)*?>/g, '').trim() === '') {
      setError('The comment field is required.');
      return;
    }
    setComments([
      {
        id: Date.now(),
        author: currentUser.name,
        content: comment,
        createdAt: new Date(),
      },
      ...comments,
    ]);
    setComment('');
    setShowEditor(false);
    setError('');
  };

  function timeAgo(date: Date) {
    const now = new Date();
    const diff = Math.floor((now.getTime() - date.getTime()) / 60000); // minutes
    if (diff < 1) return 'just now';
    if (diff === 1) return '1 minute ago';
    if (diff < 60) return `${diff} minutes ago`;
    const hours = Math.floor(diff / 60);
    if (hours === 1) return '1 hour ago';
    if (hours < 24) return `${hours} hours ago`;
    const days = Math.floor(hours / 24);
    if (days === 1) return '1 day ago';
    return `${days} days ago`;
  }

  const handleEdit = (id: number) => {
    const toEdit = comments.find(c => c.id === id);
    if (toEdit) {
      setComment(toEdit.content);
      setShowEditor(true);
      setComments(comments.filter(c => c.id !== id));
      setMenuOpenId(null);
    }
  };

  const handleDelete = (id: number) => {
    setComments(comments.filter(c => c.id !== id));
    setMenuOpenId(null);
  };

  return (
    <div className="card">
      <div className="card-header fw-bold" style={{ fontSize: '1.25rem' }}>
        Discussion
      </div>
      <div className="card-body">
        {!showEditor && (
          <a
            href="#"
            className="text-primary d-inline-flex align-items-center mb-4"
            style={{ fontSize: '1.1rem', textDecoration: 'none' }}
            onClick={e => {
              e.preventDefault();
              setShowEditor(true);
              setError('');
            }}
          >
            <span style={{ fontSize: 20, marginRight: 6 }}>➕</span>
            Add Comment
          </a>
        )}

        {showEditor && (
          <div>
            <div className="mb-3">
              <ReactQuill
                theme="snow"
                value={comment}
                onChange={setComment}
                placeholder="Write a comment..."
                style={{ minHeight: 120, background: '#fff' }}
              />
            </div>
            {error && (
              <div style={{ color: 'red', marginTop: -12, marginBottom: 12, fontSize: 15 }}>
                {error}
              </div>
            )}
            <div className="d-flex justify-content-end align-items-center gap-3">
              <button
                className="btn btn-link text-muted"
                onClick={() => {
                  setShowEditor(false);
                  setError('');
                  setComment('');
                }}
                type="button"
              >
                Cancel
              </button>
              <button className="btn btn-primary" type="button" onClick={handleSubmit}>
                Submit
              </button>
            </div>
          </div>
        )}

        {/* Comments List */}
        <div className="mt-4">
          {comments.length === 0 && !showEditor && (
            <div className="d-flex flex-column align-items-center justify-content-center" style={{ minHeight: 150 }}>
              <span style={{ fontSize: 36, color: '#a0aec0' }}>
                <i className="bi bi-chat-left-text" />
              </span>
              <div className="text-muted mt-2" style={{ fontSize: '1.1rem' }}>
                - No comment found. -
              </div>
            </div>
          )}
          {comments.map((c) => (
            <div key={c.id} className="d-flex mb-4 align-items-start position-relative">
              <div>
                <div
                  style={{
                    width: 30,
                    height: 30,
                    borderRadius: 8,
                    background: '#f3f4f6',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginRight: 16,
                  }}
                >
                  <img
                    src={currentUser.avatar || 'https://cdn-icons-png.flaticon.com/512/149/149071.png'}
                    alt="avatar"
                    style={{ width: 24, height: 24, borderRadius: '50%' }}
                  />
                </div>
              </div>
              <div style={{ flex: 1 }}>
                <div>
                  <span className="fw-bold" style={{ fontSize: 13 }}>{c.author}</span>
                  <span className="text-muted ms-2" style={{ fontSize: 11 }}>{timeAgo(c.createdAt)}</span>
                  <span
                    style={{
                      float: 'right',
                      cursor: 'pointer',
                      fontSize: 18,
                      color: '#444',
                      marginRight: 10,
                    }}
                    onClick={() => setMenuOpenId(menuOpenId === c.id ? null : c.id)}
                  >
                    <b>⋯</b>
                  </span>
                </div>
                <div className="mt-1" style={{ fontSize: 13 }}>
                  <span dangerouslySetInnerHTML={{ __html: c.content }} />
                </div>
                {/* Dropdown menu */}
                {menuOpenId === c.id && (
                  <div
                    style={{
                      position: 'absolute',
                      top: 25,
                      right: 0,
                      background: '#fff',
                      border: '1px solid #e5e7eb',
                      borderRadius: 8,
                      boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
                      zIndex: 10,
                      minWidth: 120,
                    }}
                  >
                    <div
                      className="px-3 py-2"
                      style={{ cursor: 'pointer', fontSize: 15 }}
                      onClick={() => handleEdit(c.id)}
                    >
                      Edit
                    </div>
                    <div
                      className="px-3 py-2"
                      style={{ cursor: 'pointer', fontSize: 15 }}
                      onClick={() => handleDelete(c.id)}
                    >
                      Delete
                    </div>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Discussion;