import React from 'react';

type Props = React.ButtonHTMLAttributes<HTMLButtonElement> & { variant?: 'primary'|'secondary'|'ghost' };

export default function Button({ variant='primary', children, style, ...rest }: Props) {
  const base: React.CSSProperties = {
    padding: '10px 14px',
    borderRadius: 8,
    fontWeight: 600,
    border: '1px solid transparent',
    cursor: 'pointer',
  };
  const themes: Record<string, React.CSSProperties> = {
    primary: { background: '#ff6a00', color: '#fff' },
    secondary: { background: '#222', color: '#fff', borderColor: '#444' },
    ghost: { background: 'transparent', color: '#ff6a00', borderColor: '#ff6a00' },
  };
  return (
    <button {...rest} style={{ ...base, ...themes[variant], ...style }}>{children}</button>
  );
}



