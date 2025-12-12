'use client';

// Simple wrapper to mark this section as client-side rendered
// The InteractiveCheckbox components handle their own state
export default function ChecklistWrapper({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
