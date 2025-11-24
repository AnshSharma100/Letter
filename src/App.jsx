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
  `Hello Twin
I LOVE YOUUUU
Being with you has been the greatest thing that has ever happened to me.`,

  `It's been like a journey of a lifetime, with you I have seen so much I have learned so much, I had so many experiences that I couldn't even imagine before.`,
  
  `I love YOU not just because you're the prettiest girl in the world, or because you're a smarty smart pant, but because of the way you care for me in a way no one ever has.
I love the way you smile at me, the way you're a cute nerdy weeb (even if the Genshin part is questionable, but hey, at least you commit to being a nerd properly.)`,

  `You're the whole package for me.
Pretty, smart, autistic, occasionally funny, W ass cook, a ridiculously hard worker, an absolute unit of a Valorant player, surprisingly good at rivels, and my partner in crime.`,

  `Memories with you have been like a fever dream from a year ago that is coming true, going to eat sushi at a place with a rotating belt (Typa shi I saw in sinchan). The crunchy rolls were lwk pretty good now that I am thinking about it sitting here at 2 am. But still the one place I will mention a little later is better Teehee.`,

  `Going a whole 7 hours away for a hackathon, and with your fucking parents driving us like hellooo???? 😭 but that hackathon was lwk chopped asf cause, we should have absolutely cooked a 36 hour hackathon. But ay next time we get to go to a 36 hour one we are gonna cook up. Trust.`,

  `Going on our little drives skipping classes, stressing over Autowisp and CAVS, eating so much food, our pizza and Dubai chocolate runs that we have went on lately, and of course the Sals runs while sitting next to you eating the loaded fries, I love every moment and I cant wait to go on many many more.`,

  `Being with you I feels so complete like if I had a pet snail, I'd name it lightning, or if we went to vegas instead of going out to party we would sit in an Airbnb just looking at each other and doing stuff and having a blast-idek what I am saying anymore but you get the point.`,

  `You make me complete like the sals chicken elevates the fires, like an Odin while I play valorant, like that one shaded room with a fan running in the summer, like a good sandwich while sitting and enjoying a view, you are the better part of me and with out you I would be so sad so yea :).`,

  `Anyways I hope you liked this teehee.
I suck at writing letters and stuff so whoopsies but it kinda cool I was cooking with the idea TEEHEE.`,

  '❤️',
  
  `I slipped it in BTW TEEHEEE`,
  
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
