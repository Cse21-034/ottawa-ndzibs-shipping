import { Card, CardContent } from "@/components/ui/card";

interface AdminLayoutProps {
  children: React.ReactNode;
}

export default function AdminLayout({ children }: AdminLayoutProps) {
  return (
    <div className="min-h-screen bg-light-bg">
      <div className="container mx-auto px-4 py-8">
        <Card>
          <CardContent className="p-8">
            {children}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
