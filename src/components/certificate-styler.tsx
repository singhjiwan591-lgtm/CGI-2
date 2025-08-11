'use client';

// This component uses styled-jsx, which is a client-only feature.
// It is imported into the server component `certificate/[studentId]/page.tsx`
// to handle client-side styling without making the whole page a client component.

export function CertificateStyler() {
  return (
    <style jsx global>{`
      @media print {
          body {
              -webkit-print-color-adjust: exact;
              print-color-adjust: exact;
          }
          .print-no-bg {
              background-color: transparent !important;
          }
      }
    `}</style>
  );
}
