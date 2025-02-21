'use client';

import { useSearchParams } from "next/navigation";
import { Tabs } from "@/components/ui/tabs";

export default function SettingsTabs({ children }) {
  const searchParams = useSearchParams();
  const activeTab = searchParams.get('tab') || 'profile';

  return (
    <Tabs defaultValue={activeTab} orientation="vertical" className="sm:flex sm:space-x-12">
      {children}
    </Tabs>
  );
}