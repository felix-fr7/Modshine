import React from 'react';

/** Renders plain text where **double-asterisk** segments become emphasised. */
export default function RichText({ text, strongClassName = 'font-semibold text-ink-charcoal' }) {
  const parts = String(text ?? '').split(/(\*\*[^*]+\*\*)/g);
  return (
    <>
      {parts.map((part, i) =>
        part.startsWith('**') && part.endsWith('**') ? (
          <span key={i} className={strongClassName}>{part.slice(2, -2)}</span>
        ) : (
          <React.Fragment key={i}>{part}</React.Fragment>
        )
      )}
    </>
  );
}
