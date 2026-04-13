import { useRef, useState, useEffect, memo } from 'react';
import './styles/BackgroundMusic.css';

const MUSIC_URL = 'https://drive.google.com/uc?export=download&id=11ciyiTnA7c6BhdrbAKnAvdiReYAD9IYQ';

function BackgroundMusic() {
  const audioRef = useRef(null);
  const [playing, setPlaying] = useState(false);
  const [started, setStarted] = useState(false);

  /* Start playback on first user interaction anywhere on the page */
  useEffect(() => {
    if (started) return;
    function handleInteraction() {
      const audio = audioRef.current;
      if (!audio) return;
      audio.volume = 0.35;
      audio.play().then(() => {
        setPlaying(true);
        setStarted(true);
      }).catch(() => { /* browser blocked — user can click the button */ });
      document.removeEventListener('click', handleInteraction);
      document.removeEventListener('keydown', handleInteraction);
    }
    document.addEventListener('click', handleInteraction, { once: true });
    document.addEventListener('keydown', handleInteraction, { once: true });
    return () => {
      document.removeEventListener('click', handleInteraction);
      document.removeEventListener('keydown', handleInteraction);
    };
  }, [started]);

  const toggle = () => {
    const audio = audioRef.current;
    if (!audio) return;
    if (playing) {
      audio.pause();
      setPlaying(false);
    } else {
      audio.volume = 0.35;
      audio.play().then(() => {
        setPlaying(true);
        setStarted(true);
      }).catch(() => {});
    }
  };

  return (
    <>
      <audio ref={audioRef} src={MUSIC_URL} loop preload="none" />
      <button
        className="music-toggle"
        onClick={toggle}
        aria-label={playing ? 'Mute music' : 'Play music'}
        title={playing ? 'Mute music' : 'Play music'}
      >
        {playing ? '♫' : '♪'}
      </button>
    </>
  );
}

export default memo(BackgroundMusic);
