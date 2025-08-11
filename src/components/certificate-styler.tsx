
'use client';

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
