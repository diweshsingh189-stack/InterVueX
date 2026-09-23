import React, { useState, useEffect } from 'react';
import { 
  X, 
  Star, 
  MessageSquare, 
  Trash2, 
  Download, 
  Search, 
  Filter, 
  User, 
  Mail, 
  Phone, 
  MapPin, 
  Calendar, 
  ShieldCheck, 
  RefreshCw,
  Sparkles,
  TrendingUp,
  Award
} from 'lucide-react';
import { storageService } from '../services/storageService';

export default function FeedbackAdminModal({ isOpen, onClose }) {
  const [feedbacks, setFeedbacks] = useState([]);
  const [filterRating, setFilterRating] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [deleteConfirmId, setDeleteConfirmId] = useState(null);

  // Load feedbacks whenever modal opens
  useEffect(() => {
    if (isOpen) {
      loadFeedbacks();
    }
  }, [isOpen]);

  // Handle Escape key
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  const loadFeedbacks = () => {
    const list = storageService.getFeedbacks();
    setFeedbacks(list);
  };

  const handleDelete = (id) => {
    const updated = storageService.deleteFeedback(id);
    setFeedbacks(updated);
    setDeleteConfirmId(null);
  };

  const handleClearAll = () => {
    if (window.confirm('Are you sure you want to permanently clear all feedback responses?')) {
      const updated = storageService.clearFeedbacks();
      setFeedbacks(updated);
    }
  };

  const handleExportJson = () => {
    const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(feedbacks, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute('href', dataStr);
    downloadAnchor.setAttribute('download', `intervuex_feedbacks_${new Date().toISOString().slice(0, 10)}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  if (!isOpen) return null;

  // Stats calculation
  const totalCount = feedbacks.length;
  const avgRating = totalCount > 0
    ? (feedbacks.reduce((sum, f) => sum + (Number(f.rating) || 5), 0) / totalCount).toFixed(1)
    : '5.0';
  const fiveStarCount = feedbacks.filter(f => Number(f.rating) === 5).length;
  const fiveStarPercent = totalCount > 0 ? Math.round((fiveStarCount / totalCount) * 100) : 100;

  // Filtering
  const filteredFeedbacks = feedbacks.filter(item => {
    const matchesRating = filterRating === 'all' || Number(item.rating) === Number(filterRating);
    const query = searchQuery.toLowerCase().trim();
    const matchesQuery = !query || 
      (item.name && item.name.toLowerCase().includes(query)) ||
      (item.email && item.email.toLowerCase().includes(query)) ||
      (item.address && item.address.toLowerCase().includes(query)) ||
      (item.message && item.message.toLowerCase().includes(query));
    return matchesRating && matchesQuery;
  });

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      zIndex: 100000,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '1rem',
      backgroundColor: 'rgba(15, 23, 42, 0.75)',
      backdropFilter: 'blur(8px)',
      animation: 'fadeIn 0.2s ease-out'
    }}>
      {/* Modal Container */}
      <div 
        className="card"
        style={{
          width: '100%',
          maxWidth: '900px',
          maxHeight: '90vh',
          display: 'flex',
          flexDirection: 'column',
          backgroundColor: 'var(--bg-primary)',
          border: '1px solid var(--border-subtle)',
          borderRadius: 'var(--radius-lg)',
          boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.7), 0 0 30px rgba(6, 182, 212, 0.15)',
          padding: 0,
          overflow: 'hidden'
        }}
      >
        {/* Header */}
        <div style={{
          padding: '1.25rem 1.5rem',
          borderBottom: '1px solid var(--border-subtle)',
          backgroundColor: 'var(--surface-card)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '1rem'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <div style={{
              width: '38px',
              height: '38px',
              borderRadius: 'var(--radius-md)',
              backgroundColor: 'var(--accent-cyan-light)',
              border: '1px solid var(--accent-cyan)',
              color: 'var(--accent-cyan)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <MessageSquare size={20} />
            </div>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <h3 style={{ fontSize: '1.2rem', color: 'var(--text-primary)', margin: 0 }}>
                  Candidate Feedback & Reviews Admin
                </h3>
                <span className="badge badge-cyan" style={{ fontSize: '0.7rem' }}>
                  {totalCount} Total
                </span>
              </div>
              <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', margin: 0 }}>
                Real-time review submissions and candidate telemetry from InterVueX
              </p>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <button
              onClick={handleExportJson}
              className="btn btn-sm btn-secondary"
              title="Export all reviews as JSON file"
              style={{ fontSize: '0.78rem', display: 'flex', alignItems: 'center', gap: '0.35rem' }}
            >
              <Download size={14} /> Export JSON
            </button>
            <button
              onClick={onClose}
              className="btn btn-sm btn-ghost"
              aria-label="Close modal"
              style={{ width: '32px', height: '32px', padding: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: '50%' }}
            >
              <X size={18} />
            </button>
          </div>
        </div>

        {/* Stats Strip */}
        <div style={{
          padding: '0.85rem 1.5rem',
          backgroundColor: 'var(--bg-secondary)',
          borderBottom: '1px solid var(--border-subtle)',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))',
          gap: '1rem'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
            <div style={{ color: '#F59E0B' }}>
              <Star size={24} fill="#F59E0B" />
            </div>
            <div>
              <div style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--text-primary)', lineHeight: 1 }}>
                {avgRating} <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>/ 5.0</span>
              </div>
              <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>Average Rating</div>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
            <div style={{ color: 'var(--accent-cyan)' }}>
              <Award size={24} />
            </div>
            <div>
              <div style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--accent-cyan)', lineHeight: 1 }}>
                {fiveStarPercent}%
              </div>
              <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>5-Star Satisfaction</div>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
            <div style={{ color: 'var(--text-secondary)' }}>
              <TrendingUp size={24} />
            </div>
            <div>
              <div style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--text-primary)', lineHeight: 1 }}>
                {totalCount}
              </div>
              <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>Total Submissions</div>
            </div>
          </div>
        </div>

        {/* Filter and Search Toolbar */}
        <div style={{
          padding: '0.85rem 1.5rem',
          borderBottom: '1px solid var(--border-subtle)',
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '0.75rem',
          backgroundColor: 'var(--surface-card)'
        }}>
          {/* Star Filter Buttons */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', flexWrap: 'wrap' }}>
            <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginRight: '0.25rem', fontWeight: 600 }}>
              Rating:
            </span>
            {['all', '5', '4', '3', '2', '1'].map((starKey) => {
              const isSelected = filterRating === starKey;
              return (
                <button
                  key={starKey}
                  type="button"
                  onClick={() => setFilterRating(starKey)}
                  style={{
                    backgroundColor: isSelected ? 'var(--accent-cyan)' : 'var(--bg-secondary)',
                    color: isSelected ? '#0F172A' : 'var(--text-secondary)',
                    border: isSelected ? '1px solid var(--accent-cyan)' : '1px solid var(--border-subtle)',
                    padding: '0.25rem 0.6rem',
                    borderRadius: 'var(--radius-full)',
                    fontSize: '0.75rem',
                    fontWeight: 600,
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.25rem',
                    transition: 'all 0.15s ease'
                  }}
                >
                  {starKey === 'all' ? 'All' : `${starKey} ★`}
                </button>
              );
            })}
          </div>

          {/* Search Box */}
          <div style={{ position: 'relative', minWidth: '220px', flex: '1 1 auto', maxWidth: '320px' }}>
            <Search size={14} style={{ position: 'absolute', left: '0.65rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search candidate, email, message..."
              className="form-input"
              style={{
                paddingLeft: '1.85rem',
                paddingTop: '0.35rem',
                paddingBottom: '0.35rem',
                fontSize: '0.8rem',
                width: '100%'
              }}
            />
          </div>
        </div>

        {/* Feedback List Body (Scrollable) */}
        <div style={{
          padding: '1.25rem 1.5rem',
          overflowY: 'auto',
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          gap: '0.85rem',
          backgroundColor: 'var(--bg-primary)'
        }}>
          {filteredFeedbacks.length === 0 ? (
            <div style={{
              textAlign: 'center',
              padding: '3rem 1rem',
              color: 'var(--text-muted)',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '0.75rem'
            }}>
              <MessageSquare size={36} style={{ color: 'var(--text-dim)', opacity: 0.5 }} />
              <div style={{ fontSize: '1rem', fontWeight: 600, color: 'var(--text-primary)' }}>
                No feedback records match your filter
              </div>
              <p style={{ fontSize: '0.825rem', maxWidth: '360px', margin: 0 }}>
                {searchQuery || filterRating !== 'all'
                  ? 'Try clearing your search query or selecting "All" ratings.'
                  : 'New candidate feedback submitted from the drawer will automatically appear here.'}
              </p>
              {(searchQuery || filterRating !== 'all') && (
                <button
                  onClick={() => { setSearchQuery(''); setFilterRating('all'); }}
                  className="btn btn-sm btn-secondary"
                  style={{ fontSize: '0.75rem' }}
                >
                  Clear Filters
                </button>
              )}
            </div>
          ) : (
            filteredFeedbacks.map((item) => {
              const itemDate = new Date(item.date || item.id);
              const formattedDate = !isNaN(itemDate.getTime()) 
                ? itemDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric', hour: '2-digit', minute: '2-digit' })
                : 'Recent';

              return (
                <div
                  key={item.id}
                  style={{
                    backgroundColor: 'var(--surface-card)',
                    border: '1px solid var(--border-subtle)',
                    borderRadius: 'var(--radius-md)',
                    padding: '1rem 1.15rem',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '0.65rem',
                    transition: 'border-color 0.2s ease, box-shadow 0.2s ease',
                    position: 'relative'
                  }}
                >
                  {/* Top Bar: Candidate details, rating stars, date & delete */}
                  <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '0.75rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
                      <div style={{
                        width: '36px',
                        height: '36px',
                        borderRadius: '50%',
                        backgroundColor: 'var(--accent-cyan-light)',
                        border: '1.5px solid var(--accent-cyan)',
                        color: 'var(--accent-cyan)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontWeight: 700,
                        fontSize: '0.9rem',
                        flexShrink: 0
                      }}>
                        {item.name ? item.name.charAt(0).toUpperCase() : 'U'}
                      </div>
                      <div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flexWrap: 'wrap' }}>
                          <strong style={{ fontSize: '0.95rem', color: 'var(--text-primary)' }}>
                            {item.name || 'Anonymous Candidate'}
                          </strong>
                          {/* Rating Stars */}
                          <div style={{ display: 'flex', alignItems: 'center', gap: '2px' }}>
                            {[1, 2, 3, 4, 5].map((star) => (
                              <Star
                                key={star}
                                size={13}
                                fill={star <= Number(item.rating) ? '#F59E0B' : 'transparent'}
                                color={star <= Number(item.rating) ? '#F59E0B' : 'var(--border-subtle)'}
                              />
                            ))}
                            <span style={{ fontSize: '0.75rem', fontWeight: 700, color: '#F59E0B', marginLeft: '3px' }}>
                              {item.rating}.0
                            </span>
                          </div>
                        </div>

                        {/* Date badge */}
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', fontSize: '0.72rem', color: 'var(--text-muted)', marginTop: '2px' }}>
                          <Calendar size={11} />
                          <span>{formattedDate}</span>
                        </div>
                      </div>
                    </div>

                    {/* Delete Action Button */}
                    <div>
                      {deleteConfirmId === item.id ? (
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                          <span style={{ fontSize: '0.72rem', color: '#EF4444', fontWeight: 600 }}>Delete?</span>
                          <button
                            onClick={() => handleDelete(item.id)}
                            className="btn btn-sm btn-primary"
                            style={{ padding: '0.15rem 0.45rem', fontSize: '0.7rem', backgroundColor: '#EF4444', borderColor: '#EF4444' }}
                          >
                            Yes
                          </button>
                          <button
                            onClick={() => setDeleteConfirmId(null)}
                            className="btn btn-sm btn-secondary"
                            style={{ padding: '0.15rem 0.45rem', fontSize: '0.7rem' }}
                          >
                            No
                          </button>
                        </div>
                      ) : (
                        <button
                          onClick={() => setDeleteConfirmId(item.id)}
                          className="btn btn-sm btn-ghost"
                          title="Delete this feedback"
                          style={{
                            padding: '0.3rem',
                            color: 'var(--text-muted)',
                            borderRadius: 'var(--radius-sm)'
                          }}
                        >
                          <Trash2 size={15} />
                        </button>
                      )}
                    </div>
                  </div>

                  {/* Contact Badges: Address, Email, Phone */}
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem', fontSize: '0.75rem' }}>
                    {item.email && (
                      <span style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '0.3rem',
                        backgroundColor: 'var(--bg-secondary)',
                        padding: '0.2rem 0.5rem',
                        borderRadius: 'var(--radius-sm)',
                        color: 'var(--text-secondary)',
                        border: '1px solid var(--border-subtle)'
                      }}>
                        <Mail size={11} style={{ color: 'var(--accent-cyan)' }} />
                        {item.email}
                      </span>
                    )}
                    {item.phone && (
                      <span style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '0.3rem',
                        backgroundColor: 'var(--bg-secondary)',
                        padding: '0.2rem 0.5rem',
                        borderRadius: 'var(--radius-sm)',
                        color: 'var(--text-secondary)',
                        border: '1px solid var(--border-subtle)'
                      }}>
                        <Phone size={11} style={{ color: 'var(--accent-cyan)' }} />
                        {item.phone}
                      </span>
                    )}
                    {item.address && (
                      <span style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '0.3rem',
                        backgroundColor: 'var(--bg-secondary)',
                        padding: '0.2rem 0.5rem',
                        borderRadius: 'var(--radius-sm)',
                        color: 'var(--text-secondary)',
                        border: '1px solid var(--border-subtle)'
                      }}>
                        <MapPin size={11} style={{ color: 'var(--accent-cyan)' }} />
                        {item.address}
                      </span>
                    )}
                  </div>

                  {/* Message Content */}
                  {item.message ? (
                    <div style={{
                      backgroundColor: 'var(--bg-secondary)',
                      padding: '0.75rem 0.9rem',
                      borderRadius: 'var(--radius-sm)',
                      borderLeft: '3px solid var(--accent-cyan)',
                      fontSize: '0.825rem',
                      color: 'var(--text-primary)',
                      lineHeight: '1.5',
                      whiteSpace: 'pre-wrap'
                    }}>
                      "{item.message}"
                    </div>
                  ) : (
                    <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontStyle: 'italic' }}>
                      (No written suggestions submitted)
                    </div>
                  )}
                </div>
              );
            })
          )}
        </div>

        {/* Modal Footer */}
        <div style={{
          padding: '0.85rem 1.5rem',
          borderTop: '1px solid var(--border-subtle)',
          backgroundColor: 'var(--surface-card)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '1rem',
          fontSize: '0.8rem',
          color: 'var(--text-muted)'
        }}>
          <div>
            Showing <strong style={{ color: 'var(--text-primary)' }}>{filteredFeedbacks.length}</strong> of {totalCount} reviews
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
            {totalCount > 0 && (
              <button
                type="button"
                onClick={handleClearAll}
                className="btn btn-sm btn-ghost"
                style={{ fontSize: '0.75rem', color: '#EF4444' }}
              >
                Clear All
              </button>
            )}
            <button
              type="button"
              onClick={onClose}
              className="btn btn-sm btn-secondary"
              style={{ fontSize: '0.8rem', padding: '0.4rem 1rem' }}
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
