import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Camera, CameraOff, Mic, MicOff, Volume2, UserCheck, Bot, RefreshCw, AlertCircle } from 'lucide-react';

export default function WebcamPreview({ isSpeaking = false, isListening = false }) {
  const [cameraActive, setCameraActive] = useState(true);
  const [cameraStatus, setCameraStatus] = useState('initializing'); // 'initializing' | 'active' | 'denied' | 'error' | 'off'
  const [errorMessage, setErrorMessage] = useState('');
  const [micActive, setMicActive] = useState(true);
  const videoRef = useRef(null);
  const streamRef = useRef(null);

  const startCamera = useCallback(async () => {
    setCameraStatus('initializing');
    setErrorMessage('');
    
    try {
      if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
        throw new Error('Camera API not supported in this browser.');
      }

      // Stop any existing tracks before starting a new stream
      if (streamRef.current) {
        streamRef.current.getTracks().forEach(track => track.stop());
        streamRef.current = null;
      }

      const stream = await navigator.mediaDevices.getUserMedia({
        video: {
          width: { ideal: 640 },
          height: { ideal: 480 },
          facingMode: 'user'
        },
        audio: false
      });

      streamRef.current = stream;
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        try {
          await videoRef.current.play();
        } catch (playErr) {
          console.warn('Autoplay prevented or interrupted:', playErr);
        }
      }
      setCameraStatus('active');
    } catch (err) {
      console.warn('Camera access issue:', err);
      if (err.name === 'NotAllowedError' || err.name === 'PermissionDeniedError') {
        setCameraStatus('denied');
        setErrorMessage('Camera access was denied. Please allow camera access in browser permissions.');
      } else if (err.name === 'NotFoundError' || err.name === 'DevicesNotFoundError') {
        setCameraStatus('error');
        setErrorMessage('No camera device detected.');
      } else {
        setCameraStatus('error');
        setErrorMessage(err.message || 'Unable to connect to camera.');
      }
    }
  }, []);

  const stopCamera = useCallback(() => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop());
      streamRef.current = null;
    }
    if (videoRef.current) {
      videoRef.current.srcObject = null;
    }
    setCameraStatus('off');
  }, []);

  useEffect(() => {
    if (cameraActive) {
      startCamera();
    } else {
      stopCamera();
    }

    return () => {
      if (streamRef.current) {
        streamRef.current.getTracks().forEach(track => track.stop());
        streamRef.current = null;
      }
    };
  }, [cameraActive, startCamera, stopCamera]);

  const toggleCamera = () => {
    if (cameraActive && cameraStatus === 'active') {
      setCameraActive(false);
      stopCamera();
    } else {
      setCameraActive(true);
      startCamera();
    }
  };

  const handleVideoRef = (el) => {
    videoRef.current = el;
    if (el && streamRef.current && el.srcObject !== streamRef.current) {
      el.srcObject = streamRef.current;
      el.play().catch(() => {});
    }
  };

  return (
    <div className="webcam-preview-container" style={{
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 160px), 1fr))',
      gap: '0.75rem',
      marginBottom: '1.25rem',
      width: '100%',
      boxSizing: 'border-box'
    }}>
      {/* AI Interviewer Stage */}
      <div style={{
        backgroundColor: 'var(--surface-card)',
        border: isSpeaking ? '1px solid var(--accent-cyan)' : '1px solid var(--border-subtle)',
        borderRadius: 'var(--radius-lg)',
        padding: '1.25rem',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '175px',
        position: 'relative',
        transition: 'all 0.3s ease',
        boxShadow: isSpeaking ? '0 0 15px var(--accent-cyan-glow)' : 'none'
      }}>
        <div style={{
          position: 'absolute',
          top: '0.75rem',
          left: '0.75rem',
          display: 'flex',
          alignItems: 'center',
          gap: '0.4rem',
          fontSize: '0.7rem',
          color: 'var(--text-muted)',
          backgroundColor: 'var(--bg-secondary)',
          padding: '0.2rem 0.5rem',
          borderRadius: 'var(--radius-full)',
          border: '1px solid var(--border-subtle)'
        }}>
          <Bot size={12} style={{ color: 'var(--accent-cyan)' }} />
          <span>InterVueX AI Lead</span>
        </div>

        {/* Pulsing Avatar */}
        <div style={{
          width: '60px',
          height: '60px',
          borderRadius: '50%',
          backgroundColor: 'var(--bg-secondary)',
          border: isSpeaking ? '2px solid var(--accent-cyan)' : '2px solid var(--border-subtle)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'var(--accent-cyan)',
          marginTop: '1rem',
          marginBottom: '0.75rem',
          boxShadow: isSpeaking ? '0 0 12px rgba(6, 182, 212, 0.4)' : 'none',
          transition: 'all 0.3s ease'
        }}>
          <Bot size={30} />
        </div>

        <div style={{
          fontSize: '0.85rem',
          fontWeight: 600,
          color: isSpeaking ? 'var(--accent-cyan)' : 'var(--text-secondary)',
          display: 'flex',
          alignItems: 'center',
          gap: '0.4rem'
        }}>
          {isSpeaking ? (
            <>
              <Volume2 size={16} className="live-dot" />
              <span>Speaking Question...</span>
            </>
          ) : (
            <span>Listening & Evaluating</span>
          )}
        </div>
      </div>

      {/* Candidate Live Box */}
      <div style={{
        backgroundColor: '#090d16',
        border: isListening ? '1px solid var(--accent-cyan)' : '1px solid var(--border-subtle)',
        borderRadius: 'var(--radius-lg)',
        padding: '1.25rem',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '175px',
        position: 'relative',
        overflow: 'hidden'
      }}>
        {/* Top bar with candidate name and camera badge */}
        <div style={{
          position: 'absolute',
          top: '0.75rem',
          left: '0.75rem',
          right: '0.75rem',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          zIndex: 3
        }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.4rem',
            fontSize: '0.7rem',
            color: 'var(--text-muted)',
            backgroundColor: 'rgba(15, 23, 42, 0.85)',
            backdropFilter: 'blur(6px)',
            padding: '0.2rem 0.55rem',
            borderRadius: 'var(--radius-full)',
            border: '1px solid var(--border-subtle)'
          }}>
            <UserCheck size={12} style={{ color: 'var(--accent-cyan)' }} />
            <span>You (Candidate)</span>
          </div>

          {/* Status pill */}
          {cameraStatus === 'active' && (
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.35rem',
              fontSize: '0.68rem',
              color: '#10B981',
              backgroundColor: 'rgba(16, 185, 129, 0.15)',
              border: '1px solid rgba(16, 185, 129, 0.3)',
              padding: '0.15rem 0.5rem',
              borderRadius: 'var(--radius-full)',
              fontWeight: 600
            }}>
              <span style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: '#10B981' }} />
              <span>Live Cam</span>
            </div>
          )}
        </div>

        {/* Video feed element */}
        <video
          ref={handleVideoRef}
          autoPlay
          playsInline
          muted
          style={{
            position: 'absolute',
            inset: 0,
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            transform: 'scaleX(-1)', // Mirror selfie view
            display: cameraStatus === 'active' ? 'block' : 'none',
            zIndex: 1
          }}
        />

        {/* Placeholder / Error / Loading UI */}
        {cameraStatus === 'initializing' && (
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '0.5rem',
            color: 'var(--text-muted)',
            zIndex: 2,
            marginTop: '0.5rem'
          }}>
            <RefreshCw size={24} style={{ animation: 'spin 1.5s linear infinite', color: 'var(--accent-cyan)' }} />
            <span style={{ fontSize: '0.78rem' }}>Initializing camera...</span>
          </div>
        )}

        {(cameraStatus === 'denied' || cameraStatus === 'error') && (
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            textAlign: 'center',
            padding: '1rem',
            zIndex: 2,
            marginTop: '0.5rem'
          }}>
            <AlertCircle size={24} style={{ color: '#EF4444', marginBottom: '0.35rem' }} />
            <span style={{ fontSize: '0.75rem', color: '#FCA5A5', marginBottom: '0.6rem', maxWidth: '200px', lineHeight: 1.3 }}>
              {errorMessage || 'Camera access not available'}
            </span>
            <button
              onClick={() => { setCameraActive(true); startCamera(); }}
              className="btn btn-sm btn-secondary"
              style={{ padding: '0.25rem 0.6rem', fontSize: '0.72rem', display: 'flex', alignItems: 'center', gap: '0.35rem' }}
            >
              <RefreshCw size={12} /> Retry Camera
            </button>
          </div>
        )}

        {cameraStatus === 'off' && (
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            zIndex: 2,
            marginTop: '0.5rem'
          }}>
            <div style={{
              width: '54px',
              height: '54px',
              borderRadius: '50%',
              backgroundColor: 'var(--bg-secondary)',
              border: '1px solid var(--border-subtle)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'var(--text-muted)',
              marginBottom: '0.4rem'
            }}>
              <CameraOff size={22} />
            </div>
            <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Camera Off</span>
          </div>
        )}

        {/* Bottom floating control bar */}
        <div style={{
          position: 'absolute',
          bottom: '0.75rem',
          display: 'flex',
          alignItems: 'center',
          gap: '0.5rem',
          zIndex: 3,
          backgroundColor: 'rgba(15, 23, 42, 0.85)',
          backdropFilter: 'blur(8px)',
          padding: '0.25rem 0.65rem',
          borderRadius: 'var(--radius-full)',
          border: '1px solid var(--border-subtle)'
        }}>
          <button
            onClick={toggleCamera}
            className="btn btn-ghost btn-sm"
            style={{
              padding: '0.25rem',
              color: cameraStatus === 'active' ? 'var(--accent-cyan)' : 'var(--text-dim)',
              display: 'flex',
              alignItems: 'center'
            }}
            title={cameraStatus === 'active' ? 'Turn off camera' : 'Turn on camera'}
          >
            {cameraStatus === 'active' ? <Camera size={15} /> : <CameraOff size={15} />}
          </button>
          <button
            onClick={() => setMicActive(!micActive)}
            className="btn btn-ghost btn-sm"
            style={{
              padding: '0.25rem',
              color: micActive ? 'var(--accent-cyan)' : 'var(--text-dim)',
              display: 'flex',
              alignItems: 'center'
            }}
            title={micActive ? 'Mic Active' : 'Mic Muted'}
          >
            {micActive ? <Mic size={15} /> : <MicOff size={15} />}
          </button>
          {isListening && (
            <span style={{ fontSize: '0.7rem', color: 'var(--accent-cyan)', fontWeight: 600 }}>
              Listening...
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
