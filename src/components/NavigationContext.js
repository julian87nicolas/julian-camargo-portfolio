import { createContext, useCallback, useContext, useEffect, useMemo, useReducer, useRef } from 'react';
import { playNavigateSound, playFocusSound, playSelectSound, playBackSound } from './SoundEffects';

const NavigationContext = createContext(null);

const initialState = {
  activePanelIndex: 0,
  focusIndex: 0,
  focusCount: 0,
  direction: null,
  history: [],
  isAnimating: false,
  contentOpen: false,
  detailName: null,
};

function navReducer(state, action) {
  switch (action.type) {
    case 'GO_TO_PANEL': {
      if (state.isAnimating) return state;
      const next = action.index;
      if (next === state.activePanelIndex) return state;
      return {
        ...state,
        activePanelIndex: next,
        focusIndex: 0,
        focusCount: 0,
        direction: next > state.activePanelIndex ? 'right' : 'left',
        history: [...state.history, state.activePanelIndex],
        isAnimating: true,
        contentOpen: false,
        detailName: null,
      };
    }
    case 'GO_BACK': {
      if (state.isAnimating) return state;
      if (state.history.length === 0) return state;
      const prev = state.history[state.history.length - 1];
      return {
        ...state,
        activePanelIndex: prev,
        focusIndex: 0,
        focusCount: 0,
        direction: 'left',
        history: state.history.slice(0, -1),
        isAnimating: true,
      };
    }
    case 'FOCUS_NEXT': {
      const max = state.focusCount > 0 ? state.focusCount - 1 : 0;
      return { ...state, focusIndex: Math.min(state.focusIndex + 1, max) };
    }
    case 'FOCUS_PREV':
      return { ...state, focusIndex: Math.max(0, state.focusIndex - 1) };
    case 'SET_FOCUS':
      return { ...state, focusIndex: action.index };
    case 'SET_FOCUS_COUNT':
      return { ...state, focusCount: action.count, focusIndex: Math.min(state.focusIndex, Math.max(0, action.count - 1)) };
    case 'OPEN_CONTENT':
      return { ...state, contentOpen: true };
    case 'CLOSE_CONTENT':
      return { ...state, contentOpen: false, detailName: null, isAnimating: false };
    case 'SET_DETAIL_NAME':
      return { ...state, detailName: action.name };
    case 'ANIMATION_DONE':
      return { ...state, isAnimating: false };
    default:
      return state;
  }
}

export function NavigationProvider({ panels, children }) {
  const [state, dispatch] = useReducer(navReducer, initialState);
  const focusRef = useRef(0);

  const panelCount = panels.length;

  const goToPanel = useCallback(
    (index) => {
      if (index >= 0 && index < panelCount) {
        playNavigateSound();
        dispatch({ type: 'GO_TO_PANEL', index });
      }
    },
    [panelCount]
  );

  const goBack = useCallback(() => { playBackSound(); dispatch({ type: 'GO_BACK' }); }, []);
  const openContent = useCallback(() => { playSelectSound(); dispatch({ type: 'OPEN_CONTENT' }); }, []);
  const closeContent = useCallback(() => { playBackSound(); dispatch({ type: 'CLOSE_CONTENT' }); }, []);
  const focusNext = useCallback(() => { playFocusSound(); dispatch({ type: 'FOCUS_NEXT' }); }, []);
  const focusPrev = useCallback(() => { playFocusSound(); dispatch({ type: 'FOCUS_PREV' }); }, []);
  const setFocus = useCallback((i) => {
    if (i !== focusRef.current) { playFocusSound(); }
    focusRef.current = i;
    dispatch({ type: 'SET_FOCUS', index: i });
  }, []);
  const setFocusCount = useCallback((c) => dispatch({ type: 'SET_FOCUS_COUNT', count: c }), []);
  const setDetailName = useCallback((name) => dispatch({ type: 'SET_DETAIL_NAME', name }), []);
  const onAnimationDone = useCallback(() => dispatch({ type: 'ANIMATION_DONE' }), []);

  /* Keep focusRef in sync with state so setFocus guard works after focusNext/focusPrev */
  useEffect(() => { focusRef.current = state.focusIndex; }, [state.focusIndex]);

  useEffect(() => {
    function handleKey(e) {
      if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return;
      switch (e.key) {
        case 'ArrowRight':
          e.preventDefault();
          goToPanel((state.activePanelIndex + 1) % panelCount);
          break;
        case 'ArrowLeft':
          e.preventDefault();
          goToPanel((state.activePanelIndex - 1 + panelCount) % panelCount);
          break;
        case 'ArrowDown':
          e.preventDefault();
          focusNext();
          break;
        case 'ArrowUp':
          e.preventDefault();
          focusPrev();
          break;
        case 'Escape':
          e.preventDefault();
          if (state.contentOpen) {
            closeContent();
          } else {
            goBack();
          }
          break;
        case 'Enter':
          if (!state.contentOpen && !state.isAnimating) {
            e.preventDefault();
            openContent();
          }
          break;
        default:
          break;
      }
    }
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [state.activePanelIndex, state.contentOpen, panelCount, goToPanel, goBack, openContent, closeContent, focusNext, focusPrev]);

  const value = useMemo(
    () => ({
      ...state,
      panels,
      panelCount,
      goToPanel,
      goBack,
      openContent,
      closeContent,
      focusNext,
      focusPrev,
      setFocus,
      setFocusCount,
      setDetailName,
      onAnimationDone,
    }),
    [state, panels, panelCount, goToPanel, goBack, openContent, closeContent, focusNext, focusPrev, setFocus, setFocusCount, setDetailName, onAnimationDone]
  );

  return <NavigationContext.Provider value={value}>{children}</NavigationContext.Provider>;
}

export function useNavigation() {
  const ctx = useContext(NavigationContext);
  if (!ctx) throw new Error('useNavigation must be inside NavigationProvider');
  return ctx;
}
