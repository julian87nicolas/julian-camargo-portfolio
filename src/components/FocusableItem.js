import { memo, useCallback, useEffect, useRef } from 'react';
import { useNavigation } from './NavigationContext';

function FocusableItem({ index, onSelect, children, className = '', as: Tag = 'div', ...rest }) {
  const { focusIndex, setFocus } = useNavigation();
  const isFocused = focusIndex === index;
  const ref = useRef(null);

  useEffect(() => {
    if (isFocused && ref.current) {
      ref.current.focus({ preventScroll: true });
    }
  }, [isFocused]);

  const handleKeyDown = useCallback(
    (e) => {
      if (e.key === 'Enter' && onSelect) {
        e.preventDefault();
        onSelect();
      }
    },
    [onSelect]
  );

  return (
    <Tag
      ref={ref}
      className={`focus-item${isFocused ? ' is-focused' : ''} ${className}`.trim()}
      tabIndex={isFocused ? 0 : -1}
      onMouseEnter={() => setFocus(index)}
      onClick={onSelect}
      onKeyDown={handleKeyDown}
      role="menuitem"
      {...rest}
    >
      <span className="focus-indicator" aria-hidden="true" />
      {children}
    </Tag>
  );
}

export default memo(FocusableItem);
