import { ImageResponse } from 'next/og';

export const alt = 'Joseph Gitau — Full-Stack Engineer';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default function OgImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          background: '#10151C',
          color: '#ECE9E1',
          fontFamily: 'system-ui, sans-serif',
        }}
      >
        <div style={{ fontSize: 96, fontWeight: 300, letterSpacing: '-0.04em', marginBottom: 20 }}>
          Joseph <span style={{ color: '#E8A33D', fontWeight: 700 }}>Gitau</span>
        </div>
        <div style={{ fontSize: 28, color: '#9BA3B0', letterSpacing: '0.05em' }}>
          Full-Stack Engineer & Systems Architect
        </div>
        <div style={{ marginTop: 40, display: 'flex', gap: 16, fontSize: 16, color: '#6B7280' }}>
          React · Next.js · Node.js · C# · Docker
        </div>
      </div>
    ),
    { ...size },
  );
}
