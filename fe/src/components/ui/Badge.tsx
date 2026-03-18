import React from 'react';

type BadgeProps = {
  status: string;
};

export default function Badge({ status }: BadgeProps) {
  const upperStatus = status.toUpperCase();
  
  let color = 'var(--text-secondary)';
  if (['OPEN', 'ACTIVE'].includes(upperStatus)) color = 'var(--accent)';
  if (upperStatus === 'CLOSED') color = 'var(--text-secondary)';
  if (upperStatus === 'PAID') color = 'var(--success)';
  if (upperStatus === 'DRAFT') color = 'var(--text-secondary)';
  if (upperStatus === 'PENDING') color = 'var(--danger)'; // No warning color in spec, using danger or secondary

  return (
    <span style={{
      color,
      borderLeft: `2px solid ${color}`,
      paddingLeft: '8px',
      textTransform: 'uppercase',
      fontFamily: 'var(--font-mono)',
      fontSize: '12px',
      fontWeight: 600,
    }}>
      {upperStatus}
    </span>
  );
}
