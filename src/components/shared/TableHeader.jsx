import React from 'react'
import { colors } from '@/styles/theme'

/**
 * TableHeader — renders column header row for a data table.
 * @param {{ columns: string[], gridTemplate: string }} props
 */
export default function TableHeader({ columns, gridTemplate }) {
  return (
    <div
      style={{
        display:             'grid',
        gridTemplateColumns: gridTemplate,
        gap:                 12,
        padding:             '7px 20px',
        borderBottom:        `1px solid ${colors.border}`,
        background:          colors.bg2,
      }}
    >
      {columns.map((col, i) => (
        <div
          key={i}
          style={{
            fontSize:      10,
            color:         colors.textDim,
            textTransform: 'uppercase',
            letterSpacing: '0.06em',
            textAlign:     i === columns.length - 1 ? 'right' : 'left',
          }}
        >
          {col}
        </div>
      ))}
    </div>
  )
}
