import { memo } from 'react';
import { useNavigation } from './NavigationContext';
import './styles/Panel.css';

function KeyboardHints({ labels }) {
  const { activePanelIndex } = useNavigation();

  const isHome = activePanelIndex === 0;

  return (
    <div className="keyboard-hints">
      {isHome ? (
        <>
          <span className="key-badge">←→</span> {labels.navigate}
          <span className="key-badge">Enter</span> {labels.select}
        </>
      ) : (
        <>
          <span className="key-badge">↑↓</span> {labels.navigate}
          <span className="key-badge">Enter</span> {labels.open}
          <span className="key-badge">Esc</span> {labels.back}
        </>
      )}
    </div>
  );
}

export default memo(KeyboardHints);
