import React, { useState, useEffect, useCallback, useRef } from 'react';
import { ChevronLeft, ChevronRight, Volume2, VolumeX } from 'lucide-react';

export const HERO_3D_SLIDES = [
  {
    id: 1,
    title: 'AI Interview Studio',
    subtitle: 'Interactive 3D Practice Environment',
    image: '/interview-slide-1.jpg',
    tag: 'Studio Sim',
    pageNumber: 'Page 01'
  },
  {
    id: 2,
    title: 'Live Voice & Speech Evaluation',
    subtitle: 'Real-Time Audio Waveforms & Feedback',
    image: '/interview-slide-2.jpg',
    tag: 'Voice AI',
    pageNumber: 'Page 02'
  },
  {
    id: 3,
    title: 'Rubric Radar & Score Analytics',
    subtitle: '5-Dimension Metric Benchmarking',
    image: '/interview-slide-3.jpg',
    tag: 'Scoring Radar',
    pageNumber: 'Page 03'
  },
  {
    id: 4,
    title: 'Coding & Algorithm Arena',
    subtitle: 'Live Code Execution & Complexity Analysis',
    image: '/interview-slide-4.jpg',
    tag: 'Tech Arena',
    pageNumber: 'Page 04'
  },
  {
    id: 5,
    title: 'Smart Resume & Role Alignment',
    subtitle: 'Custom Tailored Question Generation',
    image: '/interview-slide-5.jpg',
    tag: 'Resume Matcher',
    pageNumber: 'Page 05'
  }
];

import { playPaperPageFlipSound } from '../utils/soundEffects';

export default function ThreeDCarousel({ 
  currentSlide: controlledSlide, 
  onSlideChange,
  compact = false,
  autoPlayInterval = 3000 
}) {
  const [internalPage, setInternalPage] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [isSoundOn, setIsSoundOn] = useState(true);
  const isInitialMount = useRef(true);

  const totalPages = HERO_3D_SLIDES.length;
  const activePage = controlledSlide !== undefined ? controlledSlide : internalPage;

  const setPageSafe = useCallback((newPage) => {
    const safeIndex = (newPage + totalPages) % totalPages;
    if (onSlideChange) {
      onSlideChange(safeIndex);
    }
    setInternalPage(safeIndex);

    // Play realistic soft paper page flip sound on transition
    if (isSoundOn) {
      playPaperPageFlipSound();
    }
  }, [totalPages, onSlideChange, isSoundOn]);

  const flipNext = useCallback(() => {
    setPageSafe(activePage + 1);
  }, [activePage, setPageSafe]);

  const flipPrev = useCallback(() => {
    setPageSafe(activePage - 1);
  }, [activePage, setPageSafe]);

  // Automatic transition every 3 seconds
  useEffect(() => {
    if (isHovered) return;
    const timer = setInterval(() => {
      flipNext();
    }, autoPlayInterval);
    return () => clearInterval(timer);
  }, [isHovered, autoPlayInterval, flipNext]);

  return (
    <div 
      className="hero-3d-visual-card"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        position: 'relative',
        width: '100%',
        aspectRatio: compact ? '16 / 9' : '16 / 10',
        borderRadius: compact ? 'var(--radius-md)' : 'var(--radius-lg)',
        overflow: 'hidden',
        border: '1px solid rgba(6, 182, 212, 0.45)',
        boxShadow: compact
          ? '0 12px 35px rgba(0, 0, 0, 0.7), 0 0 25px rgba(6, 182, 212, 0.2)'
          : '0 20px 50px rgba(0, 0, 0, 0.85), 0 0 35px rgba(6, 182, 212, 0.25)',
        backgroundColor: '#070b14',
        transition: 'transform 0.3s ease, box-shadow 0.3s ease',
        boxSizing: 'border-box'
      }}
    >
      {/* Render All 5 Slides with smooth cross-fade transition */}
      {HERO_3D_SLIDES.map((slide, idx) => (
        <div
          key={slide.id}
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            opacity: idx === activePage ? 1 : 0,
            transform: idx === activePage ? 'scale(1)' : 'scale(1.03)',
            transition: 'opacity 0.7s cubic-bezier(0.4, 0, 0.2, 1), transform 0.7s cubic-bezier(0.4, 0, 0.2, 1)',
            pointerEvents: idx === activePage ? 'auto' : 'none'
          }}
        >
          <img 
            src={slide.image} 
            alt={slide.title} 
            style={{
              width: '100%',
              height: '100%',
              display: 'block',
              objectFit: 'cover'
            }}
          />

          {/* Ultra-Subtle Bottom Gradient so whole photo stays clearly visible */}
          <div style={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            height: '22%',
            background: 'linear-gradient(to top, rgba(7, 12, 24, 0.75) 0%, transparent 100%)',
            pointerEvents: 'none'
          }} />

          {/* Compact Mini Slide Badge in Bottom Left */}
          <div style={{
            position: 'absolute',
            bottom: compact ? '0.5rem' : '0.65rem',
            left: compact ? '0.55rem' : '0.75rem',
            maxWidth: 'max-content',
            pointerEvents: 'none',
            textAlign: 'left',
            backgroundColor: 'rgba(7, 12, 24, 0.85)',
            border: '1px solid rgba(6, 182, 212, 0.35)',
            borderRadius: '6px',
            padding: '0.2rem 0.55rem',
            backdropFilter: 'blur(8px)',
            boxShadow: '0 4px 14px rgba(0,0,0,0.6)'
          }}>
            <div style={{ 
              display: 'flex', 
              alignItems: 'center', 
              gap: '0.35rem'
            }}>
              <span style={{
                fontSize: '0.6rem',
                fontWeight: 800,
                color: 'var(--accent-cyan)',
                textTransform: 'uppercase',
                letterSpacing: '0.06em'
              }}>
                {slide.pageNumber}
              </span>
              <span style={{ color: 'rgba(255,255,255,0.35)', fontSize: '0.55rem' }}>•</span>
              <span style={{ 
                fontSize: '0.74rem', 
                fontWeight: 700, 
                color: '#ffffff',
                letterSpacing: '-0.01em'
              }}>
                {slide.title}
              </span>
            </div>
          </div>
        </div>
      ))}

      {/* LEFT NAVIGATION ARROW */}
      <button
        onClick={(e) => {
          e.stopPropagation();
          flipPrev();
        }}
        type="button"
        aria-label="Previous Photo"
        style={{
          position: 'absolute',
          top: '50%',
          left: compact ? '0.4rem' : '0.75rem',
          transform: 'translateY(-50%)',
          zIndex: 14,
          backgroundColor: 'rgba(10, 15, 29, 0.8)',
          border: '1px solid rgba(255,255,255,0.18)',
          color: '#ffffff',
          borderRadius: '50%',
          width: compact ? '26px' : '34px',
          height: compact ? '26px' : '34px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          cursor: 'pointer',
          backdropFilter: 'blur(6px)',
          transition: 'all 0.2s ease',
          padding: 0,
          boxShadow: '0 2px 10px rgba(0,0,0,0.5)'
        }}
        onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = 'var(--accent-cyan)'; e.currentTarget.style.color = '#000'; }}
        onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = 'rgba(10, 15, 29, 0.8)'; e.currentTarget.style.color = '#fff'; }}
      >
        <ChevronLeft size={compact ? 14 : 18} />
      </button>

      {/* RIGHT NAVIGATION ARROW */}
      <button
        onClick={(e) => {
          e.stopPropagation();
          flipNext();
        }}
        type="button"
        aria-label="Next Photo"
        style={{
          position: 'absolute',
          top: '50%',
          right: compact ? '0.4rem' : '0.75rem',
          transform: 'translateY(-50%)',
          zIndex: 14,
          backgroundColor: 'rgba(10, 15, 29, 0.8)',
          border: '1px solid rgba(255,255,255,0.18)',
          color: '#ffffff',
          borderRadius: '50%',
          width: compact ? '26px' : '34px',
          height: compact ? '26px' : '34px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          cursor: 'pointer',
          backdropFilter: 'blur(6px)',
          transition: 'all 0.2s ease',
          padding: 0,
          boxShadow: '0 2px 10px rgba(0,0,0,0.5)'
        }}
        onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = 'var(--accent-cyan)'; e.currentTarget.style.color = '#000'; }}
        onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = 'rgba(10, 15, 29, 0.8)'; e.currentTarget.style.color = '#fff'; }}
      >
        <ChevronRight size={compact ? 14 : 18} />
      </button>

      {/* BOTTOM RIGHT: SOUND TOGGLE & PAGINATION DOTS */}
      <div style={{
        position: 'absolute',
        bottom: compact ? '0.65rem' : '1rem',
        right: compact ? '0.65rem' : '1rem',
        zIndex: 14,
        display: 'flex',
        alignItems: 'center',
        gap: '0.45rem',
        backgroundColor: 'rgba(10, 15, 29, 0.85)',
        padding: '0.3rem 0.55rem',
        borderRadius: 'var(--radius-full)',
        backdropFilter: 'blur(8px)',
        border: '1px solid rgba(255,255,255,0.12)'
      }}>
        {/* Ambient Sound Toggle */}
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            setIsSoundOn(prev => !prev);
          }}
          title={isSoundOn ? 'Mute Page Flip Sound' : 'Unmute Page Flip Sound'}
          aria-label="Toggle page flip sound"
          style={{
            background: 'none',
            border: 'none',
            padding: '2px',
            color: isSoundOn ? 'var(--accent-cyan)' : 'rgba(255,255,255,0.4)',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            transition: 'color 0.2s ease',
            marginRight: '0.2rem'
          }}
        >
          {isSoundOn ? <Volume2 size={13} /> : <VolumeX size={13} />}
        </button>

        {/* Pagination Dots */}
        {HERO_3D_SLIDES.map((slide, idx) => (
          <button
            key={slide.id}
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              setPageSafe(idx);
            }}
            aria-label={`Go to photo ${idx + 1}`}
            style={{
              width: idx === activePage ? (compact ? '18px' : '22px') : '7px',
              height: '7px',
              borderRadius: 'var(--radius-full)',
              backgroundColor: idx === activePage ? 'var(--accent-cyan)' : 'rgba(255, 255, 255, 0.35)',
              border: 'none',
              padding: 0,
              cursor: 'pointer',
              boxShadow: idx === activePage ? '0 0 10px var(--accent-cyan)' : 'none',
              transition: 'all 0.3s cubic-bezier(0.25, 1, 0.5, 1)'
            }}
          />
        ))}
      </div>
    </div>
  );
}
