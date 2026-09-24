import React, { useState, useEffect, useCallback, useRef } from 'react';
import { 
  ChevronLeft, 
  ChevronRight, 
  Volume2, 
  VolumeX, 
  BookOpen,
  Sparkles,
  Hand
} from 'lucide-react';
import { playPaperPageFlipSound } from '../utils/soundEffects';

export const HERO_3D_SLIDES = [
  {
    id: 1,
    title: 'AI Interview Studio',
    subtitle: 'Interactive 3D Practice Environment',
    image: '/interview-slide-1.jpg',
    tag: 'Studio Sim',
    pageNumber: 'Page 01',
    description: 'Realistic mock interview sessions with real-time AI adaptive questions and contextual feedback.'
  },
  {
    id: 2,
    title: 'Live Voice & Speech Evaluation',
    subtitle: 'Real-Time Audio Waveforms & Feedback',
    image: '/interview-slide-2.jpg',
    tag: 'Voice AI',
    pageNumber: 'Page 02',
    description: 'Real-time pitch, pace, volume and clarity speech analysis with speech-to-text recognition.'
  },
  {
    id: 3,
    title: 'Rubric Radar & Score Analytics',
    subtitle: '5-Dimension Metric Benchmarking',
    image: '/interview-slide-3.jpg',
    tag: 'Scoring Radar',
    pageNumber: 'Page 03',
    description: 'Granular assessment covering Technical Depth, Problem Solving, Communication, and STAR structure.'
  },
  {
    id: 4,
    title: 'Coding & Algorithm Arena',
    subtitle: 'Live Code Execution & Complexity Analysis',
    image: '/interview-slide-4.jpg',
    tag: 'Tech Arena',
    pageNumber: 'Page 04',
    description: 'In-browser interactive IDE supporting JS, Python, Java, and C++ with automated test cases.'
  },
  {
    id: 5,
    title: 'Smart Resume & Role Alignment',
    subtitle: 'Custom Tailored Question Generation',
    image: '/interview-slide-5.jpg',
    tag: 'Resume Matcher',
    pageNumber: 'Page 05',
    description: 'Instant PDF parsing and tailored interview generation matched to your specific career experience.'
  }
];

export default function ThreeDCarousel({ 
  currentSlide: controlledSlide, 
  onSlideChange,
  compact = false,
  autoPlayInterval = 5000 
}) {
  const [internalPage, setInternalPage] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [isSoundOn, setIsSoundOn] = useState(true);
  const [hasInteracted, setHasInteracted] = useState(false);

  // Drag & Page Flip Physics State
  const [isDragging, setIsDragging] = useState(false);
  const [dragProgress, setDragProgress] = useState(0); // -1 (turning prev) to +1 (turning next)
  const [dragDirection, setDragDirection] = useState(null); // 'next' | 'prev' | null
  const [isAnimatingFlip, setIsAnimatingFlip] = useState(false);
  const [animatingDirection, setAnimatingDirection] = useState(null);
  const [animatingProgress, setAnimatingProgress] = useState(0);

  const bookContainerRef = useRef(null);
  const dragStartXRef = useRef(0);
  const dragStartTimeRef = useRef(0);
  const currentDragProgressRef = useRef(0);

  const totalPages = HERO_3D_SLIDES.length;
  const activePage = controlledSlide !== undefined ? controlledSlide : internalPage;

  // Next & Previous Page Indices
  const nextPageIdx = (activePage + 1) % totalPages;
  const prevPageIdx = (activePage - 1 + totalPages) % totalPages;

  // Safe setter for page transitions
  const triggerPageChange = useCallback((newIndex) => {
    const safeIndex = (newIndex + totalPages) % totalPages;
    if (onSlideChange) {
      onSlideChange(safeIndex);
    }
    setInternalPage(safeIndex);
    if (isSoundOn) {
      playPaperPageFlipSound(1.1);
    }
  }, [totalPages, onSlideChange, isSoundOn]);

  // Programmatic Animated Page Turn (Smooth Physics Animation)
  const flipToNext = useCallback(() => {
    if (isAnimatingFlip || isDragging) return;
    setHasInteracted(true);
    setIsAnimatingFlip(true);
    setAnimatingDirection('next');
    
    if (isSoundOn) {
      playPaperPageFlipSound(1.0);
    }

    const startTime = performance.now();
    const duration = 650; // 650ms realistic paper turn physics

    const animate = (now) => {
      const elapsed = now - startTime;
      const t = Math.min(1, elapsed / duration);
      // Realistic smooth quintic paper flip easing
      const eased = t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
      setAnimatingProgress(eased);

      if (t < 1) {
        requestAnimationFrame(animate);
      } else {
        setIsAnimatingFlip(false);
        setAnimatingProgress(0);
        setAnimatingDirection(null);
        triggerPageChange(activePage + 1);
      }
    };
    requestAnimationFrame(animate);
  }, [activePage, isAnimatingFlip, isDragging, isSoundOn, triggerPageChange]);

  const flipToPrev = useCallback(() => {
    if (isAnimatingFlip || isDragging) return;
    setHasInteracted(true);
    setIsAnimatingFlip(true);
    setAnimatingDirection('prev');

    if (isSoundOn) {
      playPaperPageFlipSound(1.0);
    }

    const startTime = performance.now();
    const duration = 650;

    const animate = (now) => {
      const elapsed = now - startTime;
      const t = Math.min(1, elapsed / duration);
      const eased = t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
      setAnimatingProgress(eased);

      if (t < 1) {
        requestAnimationFrame(animate);
      } else {
        setIsAnimatingFlip(false);
        setAnimatingProgress(0);
        setAnimatingDirection(null);
        triggerPageChange(activePage - 1);
      }
    };
    requestAnimationFrame(animate);
  }, [activePage, isAnimatingFlip, isDragging, isSoundOn, triggerPageChange]);

  // Handle direct dot click
  const goToPage = useCallback((targetIdx) => {
    if (targetIdx === activePage || isAnimatingFlip || isDragging) return;
    if (targetIdx > activePage) {
      flipToNext();
    } else {
      flipToPrev();
    }
  }, [activePage, isAnimatingFlip, isDragging, flipToNext, flipToPrev]);

  // Auto-play timer: Automatically turns to next page every 5 seconds
  useEffect(() => {
    if (isHovered || isDragging || isAnimatingFlip) return;
    const timer = setInterval(() => {
      flipToNext();
    }, autoPlayInterval);
    return () => clearInterval(timer);
  }, [activePage, isHovered, isDragging, isAnimatingFlip, autoPlayInterval, flipToNext]);

  // ==========================================
  // Mouse & Touch Dragging Handlers
  // ==========================================
  const handleDragStart = (clientX) => {
    if (isAnimatingFlip) return;
    setIsDragging(true);
    setHasInteracted(true);
    dragStartXRef.current = clientX;
    dragStartTimeRef.current = performance.now();
    currentDragProgressRef.current = 0;
    setDragProgress(0);
    setDragDirection(null);
  };

  const handleDragMove = (clientX) => {
    if (!isDragging || !bookContainerRef.current) return;
    const rect = bookContainerRef.current.getBoundingClientRect();
    const deltaX = dragStartXRef.current - clientX;
    const width = rect.width || 600;
    
    // Normalizing drag ratio: Dragging Left = Next Page, Dragging Right = Prev Page
    const rawProgress = deltaX / (width * 0.7);
    const clampedProgress = Math.max(-1, Math.min(1, rawProgress));
    
    currentDragProgressRef.current = clampedProgress;
    setDragProgress(clampedProgress);

    if (clampedProgress > 0.05) {
      setDragDirection('next');
    } else if (clampedProgress < -0.05) {
      setDragDirection('prev');
    } else {
      setDragDirection(null);
    }
  };

  const handleDragEnd = () => {
    if (!isDragging) return;
    setIsDragging(false);

    const progress = currentDragProgressRef.current;
    const elapsed = performance.now() - dragStartTimeRef.current;
    const velocity = Math.abs(progress) / (elapsed / 1000); // pixels per sec ratio

    // Threshold criteria: moved > 25% or quick flick velocity > 1.2
    const shouldCompleteFlip = Math.abs(progress) > 0.22 || velocity > 1.1;

    if (shouldCompleteFlip && progress > 0.08) {
      // Complete Next Flip
      setIsAnimatingFlip(true);
      setAnimatingDirection('next');
      const startProg = progress;
      const startTime = performance.now();
      const dur = Math.max(200, (1 - startProg) * 450);

      const anim = (now) => {
        const t = Math.min(1, (now - startTime) / dur);
        const cur = startProg + (1 - startProg) * (t * (2 - t));
        setAnimatingProgress(cur);
        if (t < 1) {
          requestAnimationFrame(anim);
        } else {
          setIsAnimatingFlip(false);
          setAnimatingProgress(0);
          setAnimatingDirection(null);
          setDragProgress(0);
          setDragDirection(null);
          triggerPageChange(activePage + 1);
        }
      };
      requestAnimationFrame(anim);

    } else if (shouldCompleteFlip && progress < -0.08) {
      // Complete Prev Flip
      setIsAnimatingFlip(true);
      setAnimatingDirection('prev');
      const startProg = Math.abs(progress);
      const startTime = performance.now();
      const dur = Math.max(200, (1 - startProg) * 450);

      const anim = (now) => {
        const t = Math.min(1, (now - startTime) / dur);
        const cur = startProg + (1 - startProg) * (t * (2 - t));
        setAnimatingProgress(cur);
        if (t < 1) {
          requestAnimationFrame(anim);
        } else {
          setIsAnimatingFlip(false);
          setAnimatingProgress(0);
          setAnimatingDirection(null);
          setDragProgress(0);
          setDragDirection(null);
          triggerPageChange(activePage - 1);
        }
      };
      requestAnimationFrame(anim);

    } else {
      // Spring back to 0 without flipping
      setIsAnimatingFlip(true);
      const startProg = progress;
      const startTime = performance.now();
      const dur = 280;

      const anim = (now) => {
        const t = Math.min(1, (now - startTime) / dur);
        const cur = startProg * (1 - (t * (2 - t)));
        setDragProgress(cur);
        if (t < 1) {
          requestAnimationFrame(anim);
        } else {
          setIsAnimatingFlip(false);
          setDragProgress(0);
          setDragDirection(null);
          setAnimatingDirection(null);
        }
      };
      requestAnimationFrame(anim);
    }
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!isHovered) return;
      if (e.key === 'ArrowRight' || e.key === ' ') {
        e.preventDefault();
        flipToNext();
      } else if (e.key === 'ArrowLeft') {
        e.preventDefault();
        flipToPrev();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isHovered, flipToNext, flipToPrev]);

  // Current active calculated rotation & curl values
  const activeFlipDirection = isDragging ? dragDirection : animatingDirection;
  const activeFlipProgress = isDragging ? Math.abs(dragProgress) : animatingProgress;

  // Rotation angles for turning next (0deg -> -180deg) and turning prev (-180deg -> 0deg)
  let turningPageAngle = 0;
  if (activeFlipDirection === 'next') {
    turningPageAngle = -activeFlipProgress * 180;
  } else if (activeFlipDirection === 'prev') {
    turningPageAngle = -180 + (activeFlipProgress * 180);
  }

  const currentSlide = HERO_3D_SLIDES[activePage] || HERO_3D_SLIDES[0];

  return (
    <div 
      style={{
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        userSelect: 'none',
        WebkitUserSelect: 'none'
      }}
    >
      {/* 3D Realistic Photo-Book Stage Container */}
      <div
        ref={bookContainerRef}
        className="photo-book-wrapper"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => {
          setIsHovered(false);
          if (isDragging) handleDragEnd();
        }}
        onMouseDown={(e) => handleDragStart(e.clientX)}
        onMouseMove={(e) => handleDragMove(e.clientX)}
        onMouseUp={handleDragEnd}
        onTouchStart={(e) => {
          if (e.touches.length === 1) {
            handleDragStart(e.touches[0].clientX);
          }
        }}
        onTouchMove={(e) => {
          if (e.touches.length === 1) {
            handleDragMove(e.touches[0].clientX);
          }
        }}
        onTouchEnd={handleDragEnd}
        style={{
          position: 'relative',
          width: '100%',
          aspectRatio: compact ? '16 / 9' : '16 / 10',
          perspective: '2200px',
          perspectiveOrigin: '50% 50%',
          borderRadius: compact ? 'var(--radius-md)' : 'var(--radius-lg)',
          cursor: isDragging ? 'grabbing' : 'grab',
          touchAction: 'pan-y',
          boxSizing: 'border-box'
        }}
      >
        {/* PHYSICAL BOOK OUTER CASING & REALISTIC LEATHER / ACRYLIC BINDING */}
        <div 
          style={{
            position: 'absolute',
            inset: 0,
            borderRadius: compact ? 'var(--radius-md)' : 'var(--radius-lg)',
            background: 'linear-gradient(135deg, #0b1329 0%, #070c18 50%, #0f1c3f 100%)',
            border: '1px solid rgba(6, 182, 212, 0.45)',
            boxShadow: compact
              ? '0 12px 35px rgba(0, 0, 0, 0.7), 0 0 25px rgba(6, 182, 212, 0.2)'
              : '0 25px 60px rgba(0, 0, 0, 0.9), 0 0 35px rgba(6, 182, 212, 0.25), inset 0 0 20px rgba(6, 182, 212, 0.08)',
            overflow: 'hidden',
            display: 'flex',
            boxSizing: 'border-box'
          }}
        >
          {/* Stacked Paper Sheets Illusion on Right & Bottom Edges */}
          <div style={{
            position: 'absolute',
            top: 2,
            right: 0,
            bottom: 2,
            width: '6px',
            background: 'repeating-linear-gradient(to right, #1e293b, #1e293b 1px, #0f172a 1px, #0f172a 2px)',
            opacity: 0.85,
            zIndex: 2,
            pointerEvents: 'none'
          }} />
          <div style={{
            position: 'absolute',
            left: 2,
            right: 2,
            bottom: 0,
            height: '4px',
            background: 'repeating-linear-gradient(to bottom, #1e293b, #1e293b 1px, #0f172a 1px, #0f172a 2px)',
            opacity: 0.85,
            zIndex: 2,
            pointerEvents: 'none'
          }} />

          {/* Left Spine Binding with Metallic Stitching */}
          <div style={{
            position: 'absolute',
            top: 0,
            left: 0,
            bottom: 0,
            width: compact ? '16px' : '22px',
            background: 'linear-gradient(to right, rgba(2, 6, 23, 0.98) 0%, rgba(15, 23, 42, 0.95) 60%, rgba(6, 182, 212, 0.3) 90%, rgba(0, 0, 0, 0.6) 100%)',
            borderRight: '1px solid rgba(6, 182, 212, 0.3)',
            zIndex: 25,
            boxShadow: '2px 0 8px rgba(0,0,0,0.6)',
            pointerEvents: 'none',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-around',
            alignItems: 'center',
            padding: '12px 0'
          }}>
            {/* Book Spine Rivets / Stitching Accent */}
            {[1, 2, 3, 4].map(i => (
              <div 
                key={i} 
                style={{
                  width: '4px',
                  height: '4px',
                  borderRadius: '50%',
                  backgroundColor: 'var(--accent-cyan)',
                  boxShadow: '0 0 6px var(--accent-cyan)'
                }} 
              />
            ))}
          </div>

          {/* ========================================================= */}
          {/* UNDERLYING REVEALED PAGE (The Page visible behind during turn) */}
          {/* ========================================================= */}
          {activeFlipDirection && (
            <div
              style={{
                position: 'absolute',
                top: 0,
                left: compact ? '16px' : '22px',
                right: 0,
                bottom: 0,
                zIndex: 4,
                overflow: 'hidden',
                backgroundColor: '#070c18'
              }}
            >
              <img
                src={activeFlipDirection === 'next' ? HERO_3D_SLIDES[nextPageIdx].image : HERO_3D_SLIDES[prevPageIdx].image}
                alt={activeFlipDirection === 'next' ? HERO_3D_SLIDES[nextPageIdx].title : HERO_3D_SLIDES[prevPageIdx].title}
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  display: 'block'
                }}
              />
              {/* Dynamic Cast Shadow from the turning page onto this background page */}
              <div 
                style={{
                  position: 'absolute',
                  inset: 0,
                  background: activeFlipDirection === 'next'
                    ? `linear-gradient(to right, rgba(0,0,0,${Math.min(0.75, (1 - activeFlipProgress) * 0.95)}) 0%, rgba(0,0,0,${Math.min(0.4, (1 - activeFlipProgress) * 0.5)}) 40%, transparent 80%)`
                    : `linear-gradient(to left, rgba(0,0,0,${Math.min(0.75, (1 - activeFlipProgress) * 0.95)}) 0%, rgba(0,0,0,${Math.min(0.4, (1 - activeFlipProgress) * 0.5)}) 40%, transparent 80%)`,
                  pointerEvents: 'none',
                  transition: isDragging ? 'none' : 'opacity 0.2s ease'
                }}
              />
            </div>
          )}

          {/* ========================================================= */}
          {/* MAIN STATIC / RESTING BASE PAGE (Current Active Photo) */}
          {/* ========================================================= */}
          <div
            style={{
              position: 'absolute',
              top: 0,
              left: compact ? '16px' : '22px',
              right: 0,
              bottom: 0,
              zIndex: activeFlipDirection ? 3 : 5,
              overflow: 'hidden',
              backgroundColor: '#070c18'
            }}
          >
            <img
              src={currentSlide.image}
              alt={currentSlide.title}
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                display: 'block'
              }}
            />

            {/* Natural Photographic Paper Texture & Inner Spine Shadow */}
            <div style={{
              position: 'absolute',
              inset: 0,
              background: 'linear-gradient(to right, rgba(0,0,0,0.55) 0%, rgba(0,0,0,0.12) 4%, transparent 12%, transparent 92%, rgba(0,0,0,0.18) 98%, rgba(0,0,0,0.35) 100%)',
              pointerEvents: 'none'
            }} />
          </div>

          {/* ========================================================= */}
          {/* 3D TURNING PHYSICAL SHEET (With True Dual-Sided Page Mesh) */}
          {/* ========================================================= */}
          {activeFlipDirection && (
            <div
              style={{
                position: 'absolute',
                top: 0,
                left: compact ? '16px' : '22px',
                right: 0,
                bottom: 0,
                zIndex: 10,
                transformOrigin: 'left center',
                transformStyle: 'preserve-3d',
                transform: `rotateY(${turningPageAngle}deg)`,
                transition: isDragging ? 'none' : 'transform 0.1s linear',
                pointerEvents: 'none'
              }}
            >
              {/* FRONT FACE OF TURNING PAGE (Visible from 0 to -90 degrees) */}
              <div
                style={{
                  position: 'absolute',
                  inset: 0,
                  backfaceVisibility: 'hidden',
                  WebkitBackfaceVisibility: 'hidden',
                  overflow: 'hidden',
                  backgroundColor: '#070c18',
                  boxShadow: turningPageAngle < -15
                    ? `${-15 * Math.sin(activeFlipProgress * Math.PI)}px 10px 30px rgba(0,0,0,0.85)`
                    : 'none'
                }}
              >
                <img
                  src={activeFlipDirection === 'next' ? currentSlide.image : HERO_3D_SLIDES[prevPageIdx].image}
                  alt={currentSlide.title}
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    display: 'block'
                  }}
                />

                {/* Dynamic 3D Page Curl Gradient Highlight & Crease Shadow */}
                <div 
                  style={{
                    position: 'absolute',
                    inset: 0,
                    background: `linear-gradient(to right, rgba(0,0,0,0.6) 0%, transparent 15%, rgba(255,255,255,${0.35 * Math.sin(activeFlipProgress * Math.PI)}) ${Math.max(10, activeFlipProgress * 80)}%, rgba(0,0,0,${0.65 * Math.sin(activeFlipProgress * Math.PI)}) ${Math.min(95, activeFlipProgress * 85 + 10)}%, rgba(0,0,0,0.3) 100%)`,
                    pointerEvents: 'none'
                  }}
                />
              </div>

              {/* BACK FACE OF TURNING PAGE (Visible from -90 to -180 degrees) */}
              <div
                style={{
                  position: 'absolute',
                  inset: 0,
                  backfaceVisibility: 'hidden',
                  WebkitBackfaceVisibility: 'hidden',
                  transform: 'rotateY(180deg)',
                  overflow: 'hidden',
                  background: 'linear-gradient(135deg, #131d36 0%, #0d1527 50%, #1a2749 100%)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  boxShadow: '10px 10px 35px rgba(0,0,0,0.8)'
                }}
              >
                {/* Paper Fiber Texture & Reverse Watermark */}
                <div style={{
                  position: 'absolute',
                  inset: 0,
                  opacity: 0.22,
                  backgroundImage: 'radial-gradient(rgba(6,182,212,0.4) 1px, transparent 1px)',
                  backgroundSize: '16px 16px'
                }} />
                
                {/* Translucent mirrored preview on the backside of photo paper */}
                <img
                  src={activeFlipDirection === 'next' ? currentSlide.image : HERO_3D_SLIDES[prevPageIdx].image}
                  alt=""
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    transform: 'scaleX(-1)',
                    opacity: 0.18,
                    filter: 'blur(3px) grayscale(50%)',
                    display: 'block'
                  }}
                />

                {/* Back of Paper Branding Stamp */}
                <div style={{
                  position: 'relative',
                  zIndex: 2,
                  textAlign: 'center',
                  padding: '1rem',
                  border: '1px solid rgba(6, 182, 212, 0.25)',
                  borderRadius: '10px',
                  backgroundColor: 'rgba(7, 12, 24, 0.8)',
                  backdropFilter: 'blur(6px)'
                }}>
                  <div style={{ fontSize: '0.7rem', fontWeight: 800, color: 'var(--accent-cyan)', letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: '0.2rem' }}>
                    InterVueX Photobook
                  </div>
                  <div style={{ fontSize: '0.62rem', color: 'rgba(255,255,255,0.5)' }}>
                    Physical Page Turn Edition
                  </div>
                </div>

                {/* Dynamic Lighting for Back Face */}
                <div 
                  style={{
                    position: 'absolute',
                    inset: 0,
                    background: `linear-gradient(to left, rgba(0,0,0,0.7) 0%, rgba(255,255,255,${0.2 * Math.sin(activeFlipProgress * Math.PI)}) 50%, rgba(0,0,0,0.4) 100%)`,
                    pointerEvents: 'none'
                  }}
                />
              </div>
            </div>
          )}

          {/* ========================================================= */}
          {/* STATIC HOVER CORNER-CURL HINT (Inviting physical page turn) */}
          {/* ========================================================= */}
          {!isDragging && !isAnimatingFlip && (
            <div 
              style={{
                position: 'absolute',
                bottom: 0,
                right: 0,
                width: compact ? '45px' : '65px',
                height: compact ? '45px' : '65px',
                zIndex: 8,
                pointerEvents: 'none',
                background: 'linear-gradient(135deg, transparent 50%, rgba(6, 182, 212, 0.18) 75%, rgba(6, 182, 212, 0.45) 100%)',
                borderBottomRightRadius: compact ? 'var(--radius-md)' : 'var(--radius-lg)',
                boxShadow: isHovered ? '-4px -4px 12px rgba(6, 182, 212, 0.35)' : 'none',
                transition: 'all 0.3s cubic-bezier(0.2, 0.8, 0.2, 1)',
                clipPath: 'polygon(100% 0, 0 100%, 100% 100%)',
                opacity: isHovered ? 0.9 : 0.4
              }}
            />
          )}

          {/* ========================================================= */}
          {/* BOTTOM OVERLAYS: BADGE, CONTROLS, SOUND & PAGINATION */}
          {/* ========================================================= */}
          {/* Ultra-Subtle Bottom Vignette Gradient */}
          <div style={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            height: '26%',
            background: 'linear-gradient(to top, rgba(7, 12, 24, 0.85) 0%, transparent 100%)',
            pointerEvents: 'none',
            zIndex: 12
          }} />

          {/* Bottom Left: Title & Page Badge */}
          <div style={{
            position: 'absolute',
            bottom: compact ? '0.5rem' : '0.75rem',
            left: compact ? '1.5rem' : '2.15rem',
            maxWidth: 'max-content',
            pointerEvents: 'none',
            textAlign: 'left',
            backgroundColor: 'rgba(7, 12, 24, 0.88)',
            border: '1px solid rgba(6, 182, 212, 0.4)',
            borderRadius: '8px',
            padding: '0.25rem 0.65rem',
            backdropFilter: 'blur(10px)',
            boxShadow: '0 4px 16px rgba(0,0,0,0.7)',
            zIndex: 15
          }}>
            <div style={{ 
              display: 'flex', 
              alignItems: 'center', 
              gap: '0.4rem'
            }}>
              <span style={{
                fontSize: '0.64rem',
                fontWeight: 800,
                color: 'var(--accent-cyan)',
                textTransform: 'uppercase',
                letterSpacing: '0.08em'
              }}>
                {currentSlide.pageNumber}
              </span>
              <span style={{ color: 'rgba(255,255,255,0.35)', fontSize: '0.55rem' }}>•</span>
              <span style={{ 
                fontSize: '0.78rem', 
                fontWeight: 700, 
                color: '#ffffff',
                letterSpacing: '-0.01em'
              }}>
                {currentSlide.title}
              </span>
            </div>
          </div>

          {/* Initial Drag/Swipe Tooltip (Fades out once user interacts) */}
          {!hasInteracted && (
            <div style={{
              position: 'absolute',
              top: '1rem',
              right: '1rem',
              zIndex: 16,
              display: 'flex',
              alignItems: 'center',
              gap: '0.35rem',
              backgroundColor: 'rgba(7, 12, 24, 0.85)',
              border: '1px solid rgba(6, 182, 212, 0.5)',
              padding: '0.25rem 0.6rem',
              borderRadius: 'var(--radius-full)',
              color: 'var(--accent-cyan)',
              fontSize: '0.7rem',
              fontWeight: 600,
              boxShadow: '0 0 14px rgba(6, 182, 212, 0.3)',
              animation: 'pulse 2s infinite ease-in-out',
              pointerEvents: 'none'
            }}>
              <Hand size={12} /> Drag or swipe page to flip
            </div>
          )}

          {/* ========================================================= */}
          {/* NAVIGATION ARROWS */}
          {/* ========================================================= */}
          {/* PREVIOUS BUTTON */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              flipToPrev();
            }}
            type="button"
            aria-label="Previous Page"
            title="Turn to Previous Page (Left Arrow)"
            style={{
              position: 'absolute',
              top: '50%',
              left: compact ? '1.5rem' : '2.1rem',
              transform: 'translateY(-50%)',
              zIndex: 20,
              backgroundColor: 'rgba(10, 15, 29, 0.85)',
              border: '1px solid rgba(255,255,255,0.22)',
              color: '#ffffff',
              borderRadius: '50%',
              width: compact ? '28px' : '36px',
              height: compact ? '28px' : '36px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              backdropFilter: 'blur(8px)',
              transition: 'all 0.2s cubic-bezier(0.2, 0.8, 0.2, 1)',
              padding: 0,
              boxShadow: '0 4px 14px rgba(0,0,0,0.6)'
            }}
            onMouseEnter={(e) => { 
              e.currentTarget.style.backgroundColor = 'var(--accent-cyan)'; 
              e.currentTarget.style.color = '#000';
              e.currentTarget.style.transform = 'translateY(-50%) scale(1.1)';
              e.currentTarget.style.boxShadow = '0 0 16px var(--accent-cyan)';
            }}
            onMouseLeave={(e) => { 
              e.currentTarget.style.backgroundColor = 'rgba(10, 15, 29, 0.85)'; 
              e.currentTarget.style.color = '#fff';
              e.currentTarget.style.transform = 'translateY(-50%) scale(1)';
              e.currentTarget.style.boxShadow = '0 4px 14px rgba(0,0,0,0.6)';
            }}
          >
            <ChevronLeft size={compact ? 15 : 19} />
          </button>

          {/* NEXT BUTTON */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              flipToNext();
            }}
            type="button"
            aria-label="Next Page"
            title="Turn to Next Page (Right Arrow)"
            style={{
              position: 'absolute',
              top: '50%',
              right: compact ? '0.5rem' : '0.85rem',
              transform: 'translateY(-50%)',
              zIndex: 20,
              backgroundColor: 'rgba(10, 15, 29, 0.85)',
              border: '1px solid rgba(255,255,255,0.22)',
              color: '#ffffff',
              borderRadius: '50%',
              width: compact ? '28px' : '36px',
              height: compact ? '28px' : '36px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              backdropFilter: 'blur(8px)',
              transition: 'all 0.2s cubic-bezier(0.2, 0.8, 0.2, 1)',
              padding: 0,
              boxShadow: '0 4px 14px rgba(0,0,0,0.6)'
            }}
            onMouseEnter={(e) => { 
              e.currentTarget.style.backgroundColor = 'var(--accent-cyan)'; 
              e.currentTarget.style.color = '#000';
              e.currentTarget.style.transform = 'translateY(-50%) scale(1.1)';
              e.currentTarget.style.boxShadow = '0 0 16px var(--accent-cyan)';
            }}
            onMouseLeave={(e) => { 
              e.currentTarget.style.backgroundColor = 'rgba(10, 15, 29, 0.85)'; 
              e.currentTarget.style.color = '#fff';
              e.currentTarget.style.transform = 'translateY(-50%) scale(1)';
              e.currentTarget.style.boxShadow = '0 4px 14px rgba(0,0,0,0.6)';
            }}
          >
            <ChevronRight size={compact ? 15 : 19} />
          </button>

          {/* ========================================================= */}
          {/* BOTTOM RIGHT: SOUND TOGGLE & INTERACTIVE PAGE PILLS */}
          {/* ========================================================= */}
          <div style={{
            position: 'absolute',
            bottom: compact ? '0.5rem' : '0.75rem',
            right: compact ? '0.55rem' : '0.85rem',
            zIndex: 20,
            display: 'flex',
            alignItems: 'center',
            gap: '0.45rem',
            backgroundColor: 'rgba(10, 15, 29, 0.88)',
            padding: '0.3rem 0.6rem',
            borderRadius: 'var(--radius-full)',
            backdropFilter: 'blur(10px)',
            border: '1px solid rgba(255,255,255,0.14)',
            boxShadow: '0 4px 16px rgba(0,0,0,0.6)'
          }}>
            {/* Soft Paper Turn Audio Toggle */}
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                setIsSoundOn(prev => !prev);
              }}
              title={isSoundOn ? 'Mute Realistic Page Flip Audio' : 'Unmute Realistic Page Flip Audio'}
              aria-label="Toggle page turn audio"
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
                marginRight: '0.25rem'
              }}
            >
              {isSoundOn ? <Volume2 size={14} /> : <VolumeX size={14} />}
            </button>

            {/* Interactive Page Dots */}
            {HERO_3D_SLIDES.map((slide, idx) => (
              <button
                key={slide.id}
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  goToPage(idx);
                }}
                aria-label={`Flip to Page ${idx + 1}: ${slide.title}`}
                title={`Page ${idx + 1}: ${slide.title}`}
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
      </div>
    </div>
  );
}
