import React from 'react';

const CartoonByeLoader = () => {
  return (
    <div style={styles.container}>
      <div style={styles.loaderWrapper}>
        {/* Cartoon Character */}
        <div style={styles.character}>
          {/* Head */}
          <div style={styles.head}>
            {/* Eyes */}
            <div style={styles.eyes}>
              <div style={styles.eye}>
                <div style={styles.pupil}></div>
              </div>
              <div style={styles.eye}>
                <div style={styles.pupil}></div>
              </div>
            </div>
            
            {/* Smile */}
            <div style={styles.smile}></div>
          </div>

          {/* Body */}
          <div style={styles.body}></div>

          {/* Waving Hand */}
          <div style={styles.hand}>
            <div style={styles.fingers}>
              <div style={styles.finger}></div>
              <div style={styles.finger}></div>
              <div style={styles.finger}></div>
            </div>
          </div>

          {/* Legs */}
          <div style={styles.legs}>
            <div style={styles.leg}></div>
            <div style={styles.leg}></div>
          </div>
        </div>

        {/* Speech Bubble */}
        <div style={styles.speechBubble}>
          <span style={styles.byeText}>Bye!</span>
          <div style={styles.bubbleTail}></div>
        </div>

        {/* Loading Text */}
        <div style={styles.loadingText}>
          <span style={styles.dot}>.</span>
          <span style={styles.dot}>.</span>
          <span style={styles.dot}>.</span>
        </div>
      </div>

      <style>{`
        @keyframes bounce {
          0%, 100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-20px);
          }
        }

        @keyframes wave {
          0%, 100% {
            transform: rotate(0deg);
          }
          25% {
            transform: rotate(-30deg);
          }
          75% {
            transform: rotate(30deg);
          }
        }

        @keyframes blink {
          0%, 90%, 100% {
            height: 20px;
          }
          95% {
            height: 2px;
          }
        }

        @keyframes float {
          0%, 100% {
            transform: translateY(0) scale(1);
          }
          50% {
            transform: translateY(-10px) scale(1.05);
          }
        }

        @keyframes dotPulse {
          0%, 80%, 100% {
            opacity: 0.3;
            transform: scale(1);
          }
          40% {
            opacity: 1;
            transform: scale(1.3);
          }
        }

        @keyframes wiggle {
          0%, 100% {
            transform: rotate(-5deg);
          }
          50% {
            transform: rotate(5deg);
          }
        }
      `}</style>
    </div>
  );
};

const styles = {
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '100vh',
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    fontFamily: "'Comic Sans MS', cursive, sans-serif",
    overflow: 'hidden',
  },
  
  loaderWrapper: {
    textAlign: 'center',
    position: 'relative',
  },

  character: {
    width: '200px',
    height: '200px',
    position: 'relative',
    animation: 'bounce 1.5s ease-in-out infinite',
    margin: '0 auto',
  },

  head: {
    width: '80px',
    height: '80px',
    background: '#FFD93D',
    borderRadius: '50%',
    position: 'absolute',
    top: '20px',
    left: '60px',
    boxShadow: '0 5px 20px rgba(0,0,0,0.15)',
  },

  eyes: {
    display: 'flex',
    gap: '20px',
    position: 'absolute',
    top: '25px',
    left: '15px',
  },

  eye: {
    width: '15px',
    height: '20px',
    background: 'white',
    borderRadius: '50%',
    position: 'relative',
    overflow: 'hidden',
    animation: 'blink 3s ease-in-out infinite',
  },

  pupil: {
    width: '8px',
    height: '8px',
    background: '#333',
    borderRadius: '50%',
    position: 'absolute',
    top: '8px',
    left: '4px',
  },

  smile: {
    width: '40px',
    height: '20px',
    border: '3px solid #333',
    borderTop: 'none',
    borderRadius: '0 0 40px 40px',
    position: 'absolute',
    top: '50px',
    left: '20px',
  },

  body: {
    width: '100px',
    height: '120px',
    background: '#FFD93D',
    borderRadius: '50% 50% 40% 40%',
    position: 'absolute',
    bottom: '20px',
    left: '50px',
    boxShadow: '0 10px 30px rgba(0,0,0,0.2)',
  },

  hand: {
    width: '40px',
    height: '40px',
    background: '#FFD93D',
    borderRadius: '50%',
    position: 'absolute',
    top: '80px',
    right: '20px',
    transformOrigin: 'bottom left',
    animation: 'wave 0.8s ease-in-out infinite',
    boxShadow: '0 3px 10px rgba(0,0,0,0.1)',
  },

  fingers: {
    display: 'flex',
    gap: '2px',
    position: 'absolute',
    top: '-10px',
    left: '10px',
  },

  finger: {
    width: '6px',
    height: '15px',
    background: '#FFD93D',
    borderRadius: '3px',
  },

  legs: {
    position: 'absolute',
    bottom: '0',
    left: '65px',
    display: 'flex',
    gap: '10px',
  },

  leg: {
    width: '15px',
    height: '30px',
    background: '#FFD93D',
    borderRadius: '0 0 10px 10px',
  },

  speechBubble: {
    background: 'white',
    borderRadius: '20px',
    padding: '15px 25px',
    position: 'relative',
    marginTop: '30px',
    display: 'inline-block',
    boxShadow: '0 5px 20px rgba(0,0,0,0.2)',
    animation: 'float 2s ease-in-out infinite',
  },

  bubbleTail: {
    width: '0',
    height: '0',
    borderLeft: '15px solid transparent',
    borderRight: '15px solid transparent',
    borderTop: '15px solid white',
    position: 'absolute',
    bottom: '-10px',
    left: '50%',
    transform: 'translateX(-50%)',
  },

  byeText: {
    fontSize: '32px',
    fontWeight: 'bold',
    color: '#764ba2',
    animation: 'wiggle 0.5s ease-in-out infinite',
    display: 'inline-block',
  },

  loadingText: {
    marginTop: '20px',
    fontSize: '40px',
    color: 'white',
    fontWeight: 'bold',
    letterSpacing: '5px',
  },

  dot: {
    display: 'inline-block',
    animation: 'dotPulse 1.4s infinite ease-in-out',
    marginRight: '5px',
  },
};

// Add different delays for dots
const dotStyle1 = { animationDelay: '0s' };
const dotStyle2 = { animationDelay: '0.2s' };
const dotStyle3 = { animationDelay: '0.4s' };

export default CartoonByeLoader;