import { useCallback, useEffect, useRef } from 'react';
import { useNavigation } from './NavigationContext';

/**
 * FocusableItem — a menu item that participates in the focus system.
 *
 * Props:
 *  - index (number): position in the panel's focus list
 *  - onSelect (() => void): called on Enter key or click
 *  - children: content to render
 *  - className (string): extra class names
 *  - as (string): element tag, default 'div'
 */
function FocusableItem({ index, onSelect, children, className = '', as: Tag = 'div', ...rest }) {
  const { focusIndex, setFocus } = useNavigation();
  const isFocused = focusIndex === index;
  const ref = useRef(null);

  // Scroll into view when focused
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
      className={`focusable-item${isFocused ? ' is-focused' : ''} ${className}`.trim()}
      tabIndex={isFocused ? 0 : -1}
      onMouseEnter={() => setFocus(index)}
      onClick={onSelect}
      onKeyDown={handleKeyDown}
      role="menuitem"
      {...rest}
    >
      {children}
    </Tag>
  );
}

export default FocusableItem;
