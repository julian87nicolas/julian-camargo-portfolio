import { createContext, useCallback, useContext, useEffect, useMemo, useReducer } from 'react';

const NavigationContext = createContext(null);

const initialState = {
  /** Index of the currently visible panel (0-based) */
  activePanelIndex: 0,
  /** Index of the focused item within the active panel */
  focusIndex: 0,
  /** Direction of the last transition: 'left' | 'right' | null */
  direction: null,
  /** Stack for back navigation — stores previous panel indices */
  history: [],
  /** Whether a transition is currently animating */
  isAnimating: false,
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
        direction: next > state.activePanelIndex ? 'right' : 'left',
        history: [...state.history, state.activePanelIndex],
        isAnimating: true,
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
        direction: 'left',
        history: state.history.slice(0, -1),
        isAnimating: true,
      };
    }
    case 'FOCUS_NEXT':
      return { ...state, focusIndex: state.focusIndex + 1 };
    case 'FOCUS_PREV':
      return { ...state, focusIndex: Math.max(0, state.focusIndex - 1) };
    case 'SET_FOCUS':
      return { ...state, focusIndex: action.index };
    case 'ANIMATION_DONE':
      return { ...state, isAnimating: false };
    default:
      return state;
  }
}

export function NavigationProvider({ panels, children }) {
  const [state, dispatch] = useReducer(navReducer, initialState);

  const panelCount = panels.length;

  const goToPanel = useCallback(
    (index) => {
      if (index >= 0 && index < panelCount) {
        dispatch({ type: 'GO_TO_PANEL', index });
      }
    },
    [panelCount]
  );

  const goBack = useCallback(() => dispatch({ type: 'GO_BACK' }), []);
  const focusNext = useCallback(() => dispatch({ type: 'FOCUS_NEXT' }), []);
  const focusPrev = useCallback(() => dispatch({ type: 'FOCUS_PREV' }), []);
  const setFocus = useCallback((i) => dispatch({ type: 'SET_FOCUS', index: i }), []);
  const onAnimationDone = useCallback(() => dispatch({ type: 'ANIMATION_DONE' }), []);

  // Keyboard handler
  useEffect(() => {
    function handleKey(e) {
      switch (e.key) {
        case 'ArrowRight':
          e.preventDefault();
          if (state.activePanelIndex < panelCount - 1) {
            goToPanel(state.activePanelIndex + 1);
          }
          break;
        case 'ArrowLeft':
          e.preventDefault();
          goBack();
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
          goBack();
          break;
        default:
          break;
      }
    }
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [state.activePanelIndex, panelCount, goToPanel, goBack, focusNext, focusPrev]);

  const value = useMemo(
    () => ({
      ...state,
      panels,
      panelCount,
      goToPanel,
      goBack,
      focusNext,
      focusPrev,
      setFocus,
      onAnimationDone,
    }),
    [state, panels, panelCount, goToPanel, goBack, focusNext, focusPrev, setFocus, onAnimationDone]
  );

  return <NavigationContext.Provider value={value}>{children}</NavigationContext.Provider>;
}

export function useNavigation() {
  const ctx = useContext(NavigationContext);
  if (!ctx) throw new Error('useNavigation must be inside NavigationProvider');
  return ctx;
}
