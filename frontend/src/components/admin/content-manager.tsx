import { useState } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Skeleton } from "@/components/ui/skeleton";
import { useToast } from "@/hooks/use-toast";
import { apiRequest, queryClient } from "@/lib/queryClient";
import { Save } from "lucide-react";
import type { Content } from "@shared/schema";

export default function ContentManager() {
  const { toast } = useToast();
  const [editingContent, setEditingContent] = useState<Record<string, string>>({});

  const { data: content, isLoading } = useQuery<Content[]>({
    queryKey: ["/api/content"]
  });

  const updateContent = useMutation({
    mutationFn: async ({ key, value }: { key: string; value: string }) => {
      return await apiRequest("PUT", `/api/content/${key}`, { value });
    },
    onSuccess: () => {
      toast({
        title: "Content updated successfully!",
      });
      queryClient.invalidateQueries({ queryKey: ["/api/content"] });
      setEditingContent({});
    },
    onError: () => {
      toast({
        title: "Error updating content",
        variant: "destructive"
      });
    }
  });

  const handleContentChange = (key: string, value: string) => {
    setEditingContent(prev => ({ ...prev, [key]: value }));
  };

  const handleSave = (key: string) => {
    const value = editingContent[key];
    if (value !== undefined) {
      updateContent.mutate({ key, value });
    }
  };

  const getFieldLabel = (key: string) => {
    const labels: Record<string, string> = {
      company_description: "Company Description",
      hero_title: "Hero Title",
      hero_subtitle: "Hero Subtitle",
      contact_phone1: "Primary Phone",
      contact_phone2: "Secondary Phone",
      contact_email: "Email Address",
      contact_address: "Office Address"
    };
    return labels[key] || key.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
  };

  const getFieldType = (key: string) => {
    if (key.includes('description') || key.includes('subtitle')) return 'textarea';
    if (key.includes('email')) return 'email';
    if (key.includes('phone')) return 'tel';
    return 'text';
  };

  if (isLoading) {
    return (
      <div className="space-y-6">
        {Array.from({ length: 7 }).map((_, index) => (
          <Card key={index}>
            <CardHeader>
              <Skeleton className="h-6 w-48" />
            </CardHeader>
            <CardContent>
              <Skeleton className="h-10 w-full mb-4" />
              <Skeleton className="h-10 w-24" />
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-secondary mb-2">Content Management</h2>
        <p className="text-text-gray">Update website content and contact information.</p>
      </div>

      {content?.map((item) => {
        const fieldType = getFieldType(item.key);
        const isEditing = editingContent.hasOwnProperty(item.key);
        const currentValue = isEditing ? editingContent[item.key] : item.value;

        return (
          <Card key={item.id}>
            <CardHeader>
              <CardTitle className="text-lg">{getFieldLabel(item.key)}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor={item.key}>{getFieldLabel(item.key)}</Label>
                {fieldType === 'textarea' ? (
                  <Textarea
                    id={item.key}
                    value={currentValue}
                    onChange={(e) => handleContentChange(item.key, e.target.value)}
                    rows={4}
                    className="mt-1"
                  />
                ) : (
                  <Input
                    id={item.key}
                    type={fieldType}
                    value={currentValue}
                    onChange={(e) => handleContentChange(item.key, e.target.value)}
                    className="mt-1"
                  />
                )}
              </div>
              
              <div className="flex items-center space-x-2">
                <Button
                  onClick={() => handleSave(item.key)}
                  disabled={!isEditing || updateContent.isPending}
                  size="sm"
                >
                  <Save className="w-4 h-4 mr-2" />
                  {updateContent.isPending ? "Saving..." : "Save"}
                </Button>
                
                {isEditing && (
                  <Button
                    variant="outline"
                    onClick={() => setEditingContent(prev => {
                      const newState = { ...prev };
                      delete newState[item.key];
                      return newState;
                    })}
                    size="sm"
                  >
                    Cancel
                  </Button>
                )}
              </div>

              {item.updatedAt && (
                <p className="text-sm text-muted-foreground">
                  Last updated: {new Date(item.updatedAt).toLocaleString()}
                </p>
              )}
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}
