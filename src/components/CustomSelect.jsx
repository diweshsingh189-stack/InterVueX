import React, { useState, useRef, useEffect } from 'react';
import { ChevronDown, Check, Search } from 'lucide-react';

export default function CustomSelect({
  value,
  onChange,
  options = [],
  placeholder = 'Select option',
  searchable = false,
  className = '',
  style = {}
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [internalSearch, setInternalSearch] = useState('');
  const containerRef = useRef(null);
  const searchInputRef = useRef(null);

  // Normalize options: each item can be an object { id, name, icon } or string
  const normalizedOptions = options.map(opt => {
    if (typeof opt === 'object' && opt !== null) {
      return {
        id: opt.id !== undefined ? opt.id : opt.value,
        name: opt.name || opt.label || String(opt.id),
        icon: opt.icon
      };
    }
    return { id: opt, name: String(opt) };
  });

  const selectedItem = normalizedOptions.find(opt => String(opt.id) === String(value));

  // Close on outside click or Escape key
  useEffect(() => {
    function handleClickOutside(e) {
      if (containerRef.current && !containerRef.current.contains(e.target)) {
        setIsOpen(false);
        setInternalSearch('');
      }
    }
    function handleKeyDown(e) {
      if (e.key === 'Escape') {
        setIsOpen(false);
        setInternalSearch('');
      }
    }
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      document.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen]);

  // Focus search input on open
  useEffect(() => {
    if (isOpen && searchable && searchInputRef.current) {
      const timer = setTimeout(() => {
        searchInputRef.current?.focus();
      }, 50);
      return () => clearTimeout(timer);
    }
  }, [isOpen, searchable]);

  const filteredOptions = internalSearch.trim()
    ? normalizedOptions.filter(opt =>
        opt.name.toLowerCase().includes(internalSearch.toLowerCase())
      )
    : normalizedOptions;

  return (
    <div
      ref={containerRef}
      style={{
        position: 'relative',
        userSelect: 'none',
        ...style
      }}
      className={className}
    >
      <button
        type="button"
        onClick={() => {
          setIsOpen(prev => !prev);
          setInternalSearch('');
        }}
        className="form-input"
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          width: '100%',
          minHeight: '42px',
          cursor: 'pointer',
          textAlign: 'left',
          borderColor: isOpen ? 'var(--accent-cyan)' : 'var(--border-subtle)',
          boxShadow: isOpen ? '0 0 0 2px var(--accent-cyan-glow)' : 'none',
          gap: '0.5rem',
          padding: '0.6rem 0.85rem',
          backgroundColor: 'var(--surface-card)',
          color: selectedItem ? 'var(--text-primary)' : 'var(--text-muted)'
        }}
      >
        <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', minWidth: 0, flex: 1, overflow: 'hidden' }}>
          {selectedItem?.icon && <span style={{ fontSize: '1rem', flexShrink: 0, lineHeight: 1 }}>{selectedItem.icon}</span>}
          <span style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', fontSize: '0.875rem' }}>
            {selectedItem ? selectedItem.name : placeholder}
          </span>
        </span>
        <ChevronDown
          size={16}
          style={{
            flexShrink: 0,
            color: 'var(--text-muted)',
            transition: 'transform 0.2s ease',
            transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)'
          }}
        />
      </button>

      {isOpen && (
        <div
          style={{
            position: 'absolute',
            top: 'calc(100% + 4px)',
            left: 0,
            right: 0,
            minWidth: '100%',
            backgroundColor: 'var(--surface-card)',
            border: '1px solid var(--border-subtle)',
            borderRadius: 'var(--radius-md)',
            boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.5), 0 8px 10px -6px rgba(0, 0, 0, 0.4)',
            zIndex: 9999,
            overflow: 'hidden',
            animation: 'dropdownFadeIn 0.15s ease-out'
          }}
        >
          {searchable && (
            <div style={{ padding: '0.5rem', borderBottom: '1px solid var(--border-subtle)', position: 'relative' }}>
              <Search size={14} style={{ position: 'absolute', left: '0.85rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
              <input
                ref={searchInputRef}
                type="text"
                value={internalSearch}
                onChange={(e) => setInternalSearch(e.target.value)}
                placeholder="Search..."
                style={{
                  width: '100%',
                  padding: '0.35rem 0.5rem 0.35rem 1.8rem',
                  fontSize: '0.8rem',
                  backgroundColor: 'var(--bg-secondary)',
                  border: '1px solid var(--border-subtle)',
                  borderRadius: 'var(--radius-sm)',
                  color: 'var(--text-primary)',
                  outline: 'none'
                }}
                onClick={(e) => e.stopPropagation()}
              />
            </div>
          )}

          <div
            style={{
              maxHeight: '230px',
              overflowY: 'auto',
              padding: '0.25rem 0'
            }}
          >
            {filteredOptions.length === 0 ? (
              <div style={{ padding: '0.75rem', fontSize: '0.85rem', color: 'var(--text-muted)', textAlign: 'center' }}>
                No options found
              </div>
            ) : (
              filteredOptions.map((opt) => {
                const isSelected = String(opt.id) === String(value);
                return (
                  <div
                    key={String(opt.id)}
                    onClick={() => {
                      onChange(opt.id);
                      setIsOpen(false);
                      setInternalSearch('');
                    }}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      padding: '0.5rem 0.85rem',
                      fontSize: '0.85rem',
                      cursor: 'pointer',
                      color: isSelected ? 'var(--accent-cyan)' : 'var(--text-primary)',
                      backgroundColor: isSelected ? 'var(--accent-cyan-light)' : 'transparent',
                      transition: 'background-color 0.15s ease'
                    }}
                    onMouseEnter={(e) => {
                      if (!isSelected) e.currentTarget.style.backgroundColor = 'var(--surface-card-hover)';
                    }}
                    onMouseLeave={(e) => {
                      if (!isSelected) e.currentTarget.style.backgroundColor = 'transparent';
                    }}
                  >
                    <span style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      {opt.icon && <span>{opt.icon}</span>}
                      <span>{opt.name}</span>
                    </span>
                    {isSelected && <Check size={14} style={{ color: 'var(--accent-cyan)', flexShrink: 0 }} />}
                  </div>
                );
              })
            )}
          </div>
        </div>
      )}
    </div>
  );
}
