import React, { useRef, useState, useEffect } from 'react'
import bgMusic from '../Prateek Kuhad - Co2 (Lyrics).mp3'

const hearts = Array.from({ length: 20 })

// Intro flow after "From: Anshing"
const initialLines = [
  'Hey, so like idk how to start this…..',
  'Should I be like non-chalant and romantic or like chalant??',
  'Idk you pick',
]

// Choice previews
const romanticPreview = [
  'When I think of you, everything softens.',
  'You turn ordinary moments into little forevers that I want to live in....'
]
const cutePreview = [
  'Hello Twin',
  'I LOVE YOUUUU',
  'Being with you has been the greatest thing that has ever happened to me....'
]

// Full branches (continue beyond previews)
const romanticLines = [
  `When I think of you, everything softens.
You turn ordinary moments into little forevers I want to live in.
With you, time feels sweet and generous.
With you, my heart finally rests.`,
  
  `From the soft scent of your hair…
From the little sparkle in your eyes that lights up my entire world…
From the giggle you make when you come up with your tiny evil ideas…`,
  
  `To all the calls where we fell asleep together,
To the Minecraft world still waiting for us to return,
To the nights we try to watch a show only for you to fall asleep before the show starts…,
To the moments when I rage-bait you and you try so hard not to hit me,`,
  
  `Even when I fail to understand you,
Even in the tears you shed when you're hurting,
Even in the moments we're apart…`,
  
  `I love the thought of you, the glimpse of you.
I love the wait before I get to see you.
I love the touch of your lips and the warmth of your hug.`,
  
  `I love the care hidden in your anger,
The patience layered in your sorrow,
The giggles wrapped inside your laughter.`,
  
  `You’re my calm, my chaos, my favorite place to be.
I love the way you love me…
Because I love you, and everything that Feels Like you.`,
  
  '❤️',
  'Forever yours,',
  'Anshing'
]
const cuteLines = [
  'Hello Twin',
  'I LOVE YOUUUU',
  'Being with you has been the greatest thing that has ever happened to me.',
  "It's been like a journey of a lifetime. With you, I have seen so much and learned so much. I've had so many experiences that I couldn't even imagine before.",
  "I love YOU—not just because you are the prettiest girl in the world or that you are a smarty smart pants, but more than that, I love you because of the way you care about me like no one ever has. I love the way you smile at me, the way you are a nerdy weeb (though maybe not the Genshin part, but hey, at least you're not half-assing being a nerd).",
  'You are like the whole package. I get pretty, smart, autistic, occasionally funny, delicious cook, hardworker—all in one amazing person.',
  '❤️',
  'Forever yours,',
  'Anshing'
]

export default function App() {
  const [envelopeOpen, setEnvelopeOpen] = useState(false)
  const [letterVisible, setLetterVisible] = useState(false)
  const [started, setStarted] = useState(false)
  const [index, setIndex] = useState(0)
  const [showChoices, setShowChoices] = useState(false)
  const [branch, setBranch] = useState(null)
  const [branchIndex, setBranchIndex] = useState(0)
  const [muted, setMuted] = useState(false)
  const audioRef = useRef(null)

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.muted = muted
    }
  }, [muted])

  function ensurePlay() {
    const a = audioRef.current
    if (!a) return
    try {
      a.muted = muted
      if (a.paused && !muted) {
        a.volume = 0.6
        a.play().catch(() => {})
      }
    } catch (_) {}
  }

  function handleEnvelopeClick() {
    if (!envelopeOpen) {
      ensurePlay()
      setEnvelopeOpen(true)
      setTimeout(() => setLetterVisible(true), 800)
    }
  }

  function handleLetterClick() {
    if (!letterVisible) return
    ensurePlay()
    
    // Branch reading mode: advance branch lines
    if (branch) {
      const max = branch === 'romantic' ? romanticLines.length : cuteLines.length
      setBranchIndex(i => (i < max ? i + 1 : i))
      return
    }

    // Start flow: show From: Anshing
    if (!started) { setStarted(true); return }

    // Reveal intro lines until choices
    if (!showChoices && index < initialLines.length) {
      setIndex(i => i + 1)
      return
    }

    if (!showChoices && index >= initialLines.length) {
      setShowChoices(true)
      return
    }
  }

  function chooseBranch(type) {
    return (e) => {
      e.stopPropagation()
      setBranch(type)
      setBranchIndex(1) // immediately show first line on enter
    }
  }

  const visibleIntro = started ? initialLines.slice(0, index) : []
  const visibleBranch = branch === 'romantic'
    ? romanticLines.slice(0, branchIndex)
    : branch === 'cute'
    ? cuteLines.slice(0, branchIndex)
    : []

  return (
    <div className="page">
      <audio ref={audioRef} src={bgMusic} loop preload="auto" playsInline />

      <button
        className="audio-toggle"
        onClick={(e) => { e.stopPropagation(); setMuted(m => !m); ensurePlay() }}
        aria-label={muted ? 'Unmute music' : 'Mute music'}
      >
        {muted ? '🔇' : '🔊'}
      </button>

      {hearts.map((_, i) => {
        const left = 5 + Math.random() * 90
        const scale = 0.5 + Math.random() * 0.7
        const dur = 10 + Math.random() * 8
        const delay = -Math.random() * dur
        return (
          <span
            key={i}
            className="heart"
            style={{
              left: `${left}%`,
              bottom: `-8%`,
              animationDelay: `${delay}s`,
              ['--dur']: `${dur}s`,
              transform: `rotate(-45deg) scale(${scale})`
            }}
          />
        )
      })}

      {/* Envelope */}
      {!envelopeOpen && (
        <div className="envelope-container" onClick={handleEnvelopeClick}>
          <div className="envelope">
            <div className="envelope-flap"></div>
            <div className="wax-seal">
              <span className="seal-heart">❤️</span>
            </div>
            <div className="envelope-front">
              <p className="envelope-to">To: My Heart 💕</p>
            </div>
          </div>
          <p className="tap-hint">Click to open</p>
        </div>
      )}

      {/* Letter paper */}
      {envelopeOpen && (
        <div 
          className={`letter-paper ${letterVisible ? 'visible' : ''}`}
          onClick={handleLetterClick}
        >
          <div className="paper-content">
            <div className="letter-header">
              {!started && <h1 className="letter-title fade-in">To: My Heart,</h1>}
              {started && !branch && <h1 className="letter-title fade-in">From: Anshing</h1>}
            </div>

            {!branch && (
              <div className="letter-body">
                {visibleIntro.map((line, i) => (
                  <p key={i} className="letter-line" style={{ animationDelay: `${0.15 * i}s` }}>{line}</p>
                ))}

                {!showChoices && started && index < initialLines.length && (
                  <p className="read-hint">(click to continue)</p>
                )}

                {showChoices && (
                  <div className="choice-section">
                    <h2 className="choice-question">Pick your poison</h2>
                    <div className="choice-buttons">
                      <button className="choice-btn romantic" onClick={chooseBranch('romantic')}>
                        <span className="choice-icon">🌹</span>
                        <div className="choice-preview">
                          {romanticPreview.map((t, i) => (<p key={i}>{t}</p>))}
                        </div>
                      </button>
                      <button className="choice-btn cute" onClick={chooseBranch('cute')}>
                        <span className="choice-icon">✨</span>
                        <div className="choice-preview">
                          {cutePreview.map((t, i) => (<p key={i}>{t}</p>))}
                        </div>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            )}

            {branch && (
              <div className="letter-body">
                {visibleBranch.map((line, i) => {
                  const isSignature = line === 'Forever yours,' || line === 'Anshing'
                  const isHeart = line === '❤️'
                  return (
                    <p 
                      key={i} 
                      className={`letter-line ${isSignature ? 'signature' : ''} ${isHeart ? 'heart-line' : ''}`}
                      style={{ animationDelay: `${0.12 * i}s` }}
                    >
                      {line}
                    </p>
                  )
                })}
                {branch && ((branch === 'romantic' && branchIndex < romanticLines.length) || (branch === 'cute' && branchIndex < cuteLines.length)) && (
                  <p className="read-hint">(click to continue)</p>
                )}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  )
}
