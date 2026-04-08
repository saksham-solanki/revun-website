'use client'

interface ScoreRingProps {
  value: number
  size?: number
  strokeWidth?: number
  color?: string
  trackColor?: string
  className?: string
}

export function ScoreRing({
  value,
  size = 64,
  strokeWidth = 4,
  color = '#176FEB',
  trackColor = '#E5E7EB',
  className,
}: ScoreRingProps) {
  const r = (size - strokeWidth) / 2
  const circ = 2 * Math.PI * r
  const offset = circ - (value / 100) * circ

  return (
    <div className={`relative ${className ?? ''}`} style={{ width: size, height: size }}>
      <svg
        viewBox={`0 0 ${size} ${size}`}
        className="-rotate-90"
        width={size}
        height={size}
      >
        <circle
          cx={size / 2}
          cy={size / 2}
          r={r}
          fill="none"
          stroke={trackColor}
          strokeWidth={strokeWidth}
        />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={r}
          fill="none"
          stroke={color}
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeDasharray={circ}
          strokeDashoffset={offset}
          style={{ transition: 'stroke-dashoffset 1s ease-out' }}
        />
      </svg>
      <div
        className="absolute inset-0 flex items-center justify-center text-sm font-semibold"
        style={{ color }}
      >
        {value}%
      </div>
    </div>
  )
}
