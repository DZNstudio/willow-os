'use client';

import { usePathname } from 'next/navigation';
import Sidebar from './Sidebar';
import TopBar from './TopBar';

export default function LayoutShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isStandalone = pathname.startsWith('/coldstar');

  if (isStandalone) {
    return <>{children}</>;
  }

  return (
    <>
      <Sidebar />
      <div className="ml-[260px] min-h-full flex flex-col">
        <TopBar />
        <main className="flex-1 p-8">
          {children}
        </main>
      </div>
    </>
  );
}
