// app/settings/page.tsx
"use client";

import { Layout } from "@/components/layout";

export default function SettingsPage() {
  return (
    <Layout>
      <div className="p-6">
        <h1 className="text-3xl font-bold">Help and Documentation</h1>
        <p className="text-muted-foreground">Guide user use this app here.</p>
      </div>
    </Layout>
  );
}
