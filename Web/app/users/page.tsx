// app/users/page.tsx
"use client";

import { Layout } from "@/components/layout";

export default function UsersPage() {
  return (
    <Layout>
      <div className="p-6">
        <h1 className="text-3xl font-bold">Users</h1>
        <p className="text-muted-foreground">Manage users in the system.</p>
      </div>
    </Layout>
  );
}
