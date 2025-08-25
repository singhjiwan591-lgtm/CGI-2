
'use client';

// This component uses styled-jsx, which is a client-only feature.
// It is imported into the server component `certificate/[studentId]/page.tsx`
// to handle client-side styling without making the whole page a client component.

export function CertificateStyler() {
  return (
    <style jsx global>{`
      @media print {
          body, html {
            -webkit-print-color-adjust: exact;
            print-color-adjust: exact;
          }
          #certificate {
            visibility: visible;
            width: 100%;
            position: absolute;
            left: 0;
            top: 0;
            margin: 0;
            padding: 0;
          }
          .print-no-bg {
            background-color: transparent !important;
          }
      }
      body > *:not(#certificate) {
        @media print {
            visibility: hidden;
        }
      }
    `}</style>
  );
}
