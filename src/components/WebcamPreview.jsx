import React, { useState, useEffect, useRef } from 'react';
import { Camera, CameraOff, Mic, MicOff, Volume2, UserCheck, Bot } from 'lucide-react';

export default function WebcamPreview({ isSpeaking = false, isListening = false }) {
  const [cameraActive, setCameraActive] = useState(false);
  const [micActive, setMicActive] = useState(true);
  const videoRef = useRef(null);
  const streamRef = useRef(null);

  useEffect(() => {
    if (cameraActive) {
      navigator.mediaDevices?.getUserMedia({ video: true, audio: false })
        .then((stream) => {
          streamRef.current = stream;
          if (videoRef.current) {
            videoRef.current.srcObject = stream;
          }
        })
        .catch((err) => {
          console.warn('Camera access denied or unavailable:', err);
          setCameraActive(false);
        });
    } else {
      if (streamRef.current) {
        streamRef.current.getTracks().forEach(track => track.stop());
        streamRef.current = null;
      }
    }

    return () => {
      if (streamRef.current) {
        streamRef.current.getTracks().forEach(track => track.stop());
      }
    };
  }, [cameraActive]);

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
        minHeight: '160px',
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
          marginBottom: '0.75rem'
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
        backgroundColor: 'var(--surface-card)',
        border: isListening ? '1px solid var(--accent-cyan)' : '1px solid var(--border-subtle)',
        borderRadius: 'var(--radius-lg)',
        padding: '1.25rem',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '160px',
        position: 'relative',
        overflow: 'hidden'
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
          border: '1px solid var(--border-subtle)',
          zIndex: 2
        }}>
          <UserCheck size={12} style={{ color: 'var(--accent-cyan)' }} />
          <span>You (Candidate)</span>
        </div>

        {/* Camera stream or Placeholder */}
        {cameraActive ? (
          <video
            ref={videoRef}
            autoPlay
            playsInline
            muted
            style={{
              position: 'absolute',
              inset: 0,
              width: '100%',
              height: '100%',
              objectFit: 'cover'
            }}
          />
        ) : (
          <div style={{
            width: '60px',
            height: '60px',
            borderRadius: '50%',
            backgroundColor: 'var(--bg-secondary)',
            border: '2px solid var(--border-subtle)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'var(--text-muted)',
            marginTop: '1rem',
            marginBottom: '0.75rem'
          }}>
            <UserCheck size={28} />
          </div>
        )}

        <div style={{
          position: 'absolute',
          bottom: '0.75rem',
          display: 'flex',
          alignItems: 'center',
          gap: '0.5rem',
          zIndex: 2,
          backgroundColor: 'rgba(15, 23, 42, 0.85)',
          padding: '0.25rem 0.6rem',
          borderRadius: 'var(--radius-full)',
          border: '1px solid var(--border-subtle)'
        }}>
          <button
            onClick={() => setCameraActive(!cameraActive)}
            className="btn btn-ghost btn-sm"
            style={{ padding: '0.2rem', color: cameraActive ? 'var(--accent-cyan)' : 'var(--text-dim)' }}
            title={cameraActive ? 'Turn off camera' : 'Turn on camera'}
          >
            {cameraActive ? <Camera size={14} /> : <CameraOff size={14} />}
          </button>
          <button
            onClick={() => setMicActive(!micActive)}
            className="btn btn-ghost btn-sm"
            style={{ padding: '0.2rem', color: micActive ? 'var(--accent-cyan)' : 'var(--text-dim)' }}
            title={micActive ? 'Mic Active' : 'Mic Muted'}
          >
            {micActive ? <Mic size={14} /> : <MicOff size={14} />}
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
