/* eslint-disable react/self-closing-comp */
import React from 'react';

const SettingsAside = ({
  menu,
  active,
  onSelect,
  search,
  setSearch,
}: {
  menu: string[];
  active: string;
  onSelect: (item: string) => void;
  search: string;
  setSearch: (val: string) => void;
}) => (
  <aside
    style={{
      width: 260,
      height: '100vh',
      background: '#f3f4f6', // changed from #111215 to a light gray
      borderRadius: 20,
      display: 'flex',
      flexDirection: 'column',
      color: '#22223b', // darker text for light bg
      padding: '24px 0 0 0',
      position: 'relative',
    }}
  >
    {/* Search replaces NEBVerse logo */}
    <div className="px-4 mb-4">
      <input
        className="form-control border-0"
        style={{ borderRadius: 8, background: '#e5e7eb', color: '#22223b' }}
        placeholder="Search"
        value={search}
        onChange={e => setSearch(e.target.value)}
      />
    </div>
    {/* Menu */}
    <div
      className="flex-grow-1 px-2 sidebar-scroll"
      style={{
        overflowY: 'auto',
      }}
    >
      {menu
        .filter(item => item.toLowerCase().includes(search.toLowerCase()))
        .map((item) => (
          <div
            key={item}
            className={`d-flex align-items-center mb-2 px-3 py-2 rounded-3 sidebar-menu-item${active === item ? ' active' : ''}`}
            style={{
              cursor: 'pointer',
              background: active === item ? '#7c3aed' : 'transparent',
              color: active === item ? '#fff' : '#22223b',
              fontWeight: active === item ? 600 : 400,
              transition: 'background 0.2s, color 0.2s',
            }}
            onClick={() => onSelect(item)}
          >
            <span>{item}</span>
          </div>
        ))}
    </div>
    {/* User profile at bottom */}
    {/* ...existing code... */}
    <style>{`
      .sidebar-menu-item:hover {
        background: #ede9fe !important;
        color: #7c3aed !important;
      }
      .sidebar-menu-item.active {
        background: #7c3aed !important;
        color: #fff !important;
      }
      .sidebar-scroll::-webkit-scrollbar {
        display: none;
      }
      .sidebar-scroll {
        -ms-overflow-style: none;  /* IE and Edge */
        scrollbar-width: none;     /* Firefox */
      }
    `}</style>
  </aside>
);

export default SettingsAside;