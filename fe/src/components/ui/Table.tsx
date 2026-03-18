import React from 'react';

type Column = {
  key: string;
  label: string;
  render?: (row: any) => React.ReactNode;
};

type TableProps = {
  columns: Column[];
  data: any[];
  onRowClick?: (row: any) => void;
};

export default function Table({ columns, data, onRowClick }: TableProps) {
  if (!data || data.length === 0) {
    return <div style={{ textAlign: 'center', padding: '24px', color: 'var(--text-secondary)' }}>No records found.</div>;
  }

  return (
    <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
      <thead>
        <tr>
          {columns.map((col) => (
            <th key={col.key} style={{
              padding: '12px 16px',
              borderBottom: '1px solid var(--border)',
              color: 'var(--text-secondary)',
              fontWeight: 500,
              fontSize: '12px',
              textTransform: 'uppercase',
            }}>
              {col.label}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.map((row, i) => (
          <tr 
            key={row.id || i}
            onClick={() => onRowClick && onRowClick(row)}
            style={{
              cursor: onRowClick ? 'pointer' : 'default',
              borderBottom: '1px solid var(--border)',
              transition: 'background-color 0.2s',
            }}
            onMouseOver={(e) => {
              if (onRowClick) e.currentTarget.style.backgroundColor = 'var(--bg)';
            }}
            onMouseOut={(e) => {
              if (onRowClick) e.currentTarget.style.backgroundColor = 'transparent';
            }}
          >
            {columns.map((col) => (
              <td key={col.key} style={{ padding: '12px 16px' }}>
                {col.render ? col.render(row) : row[col.key]}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}
