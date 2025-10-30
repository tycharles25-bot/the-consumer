import React from 'react';

export default function Card({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ background:'#141414', border:'1px solid #262626', borderRadius:12, padding:16 }}>{children}</div>
  );
}



