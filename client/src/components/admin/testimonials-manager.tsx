import { useState } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { useToast } from "@/hooks/use-toast";
import { apiRequest, queryClient } from "@/lib/queryClient";
import { Plus, Edit, Trash2, Save, X, Star } from "lucide-react";
import type { Testimonial, InsertTestimonial } from "@shared/schema";

export default function TestimonialsManager() {
  const { toast } = useToast();
  const [isAdding, setIsAdding] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState<Partial<InsertTestimonial>>({
    rating: 5
  });

  const { data: testimonials, isLoading } = useQuery<Testimonial[]>({
    queryKey: ["/api/admin/testimonials"]
  });

  const createTestimonial = useMutation({
    mutationFn: async (data: InsertTestimonial) => {
      return await apiRequest("POST", "/api/admin/testimonials", data);
    },
    onSuccess: () => {
      toast({ title: "Testimonial created successfully!" });
      queryClient.invalidateQueries({ queryKey: ["/api/admin/testimonials"] });
      queryClient.invalidateQueries({ queryKey: ["/api/testimonials"] });
      setIsAdding(false);
      setFormData({ rating: 5 });
    },
    onError: () => {
      toast({ title: "Error creating testimonial", variant: "destructive" });
    }
  });

  const updateTestimonial = useMutation({
    mutationFn: async ({ id, data }: { id: string; data: Partial<InsertTestimonial> }) => {
      return await apiRequest("PUT", `/api/admin/testimonials/${id}`, data);
    },
    onSuccess: () => {
      toast({ title: "Testimonial updated successfully!" });
      queryClient.invalidateQueries({ queryKey: ["/api/admin/testimonials"] });
      queryClient.invalidateQueries({ queryKey: ["/api/testimonials"] });
      setEditingId(null);
      setFormData({ rating: 5 });
    },
    onError: () => {
      toast({ title: "Error updating testimonial", variant: "destructive" });
    }
  });

  const deleteTestimonial = useMutation({
    mutationFn: async (id: string) => {
      return await apiRequest("DELETE", `/api/admin/testimonials/${id}`);
    },
    onSuccess: () => {
      toast({ title: "Testimonial deleted successfully!" });
      queryClient.invalidateQueries({ queryKey: ["/api/admin/testimonials"] });
      queryClient.invalidateQueries({ queryKey: ["/api/testimonials"] });
    },
    onError: () => {
      toast({ title: "Error deleting testimonial", variant: "destructive" });
    }
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.location || !formData.content || !formData.rating) {
      toast({ title: "Please fill in all required fields", variant: "destructive" });
      return;
    }

    const data = {
      ...formData,
      active: formData.active !== false
    } as InsertTestimonial;

    if (editingId) {
      updateTestimonial.mutate({ id: editingId, data });
    } else {
      createTestimonial.mutate(data);
    }
  };

  const startEditing = (testimonial: Testimonial) => {
    setEditingId(testimonial.id);
    setFormData({
      name: testimonial.name,
      location: testimonial.location,
      content: testimonial.content,
      rating: testimonial.rating,
      active: testimonial.active
    });
  };

  const cancelEditing = () => {
    setEditingId(null);
    setIsAdding(false);
    setFormData({ rating: 5 });
  };

  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase();
  };

  const renderStars = (rating: number, interactive = false, onRatingChange?: (rating: number) => void) => {
    return (
      <div className="flex items-center space-x-1">
        {Array.from({ length: 5 }).map((_, index) => {
          const filled = index < rating;
          return (
            <Star
              key={index}
              className={`w-5 h-5 ${
                filled ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'
              } ${interactive ? 'cursor-pointer hover:text-yellow-400' : ''}`}
              onClick={interactive && onRatingChange ? () => onRatingChange(index + 1) : undefined}
            />
          );
        })}
      </div>
    );
  };

  if (isLoading) {
    return (
      <div className="space-y-6">
        <Skeleton className="h-8 w-48" />
        {Array.from({ length: 3 }).map((_, index) => (
          <Card key={index}>
            <CardHeader>
              <Skeleton className="h-6 w-32" />
            </CardHeader>
            <CardContent>
              <Skeleton className="h-20 w-full" />
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-secondary mb-2">Testimonials Management</h2>
          <p className="text-text-gray">Manage customer testimonials and reviews.</p>
        </div>
        <Button onClick={() => setIsAdding(true)} disabled={isAdding || !!editingId}>
          <Plus className="w-4 h-4 mr-2" />
          Add Testimonial
        </Button>
      </div>

      {(isAdding || editingId) && (
        <Card>
          <CardHeader>
            <CardTitle>{editingId ? "Edit Testimonial" : "Add New Testimonial"}</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="name">Customer Name *</Label>
                  <Input
                    id="name"
                    value={formData.name || ""}
                    onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                    placeholder="e.g., Thabo Mogale"
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="location">Location *</Label>
                  <Input
                    id="location"
                    value={formData.location || ""}
                    onChange={(e) => setFormData(prev => ({ ...prev, location: e.target.value }))}
                    placeholder="e.g., Gaborone, Botswana"
                    required
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="content">Testimonial Content *</Label>
                <Textarea
                  id="content"
                  value={formData.content || ""}
                  onChange={(e) => setFormData(prev => ({ ...prev, content: e.target.value }))}
                  placeholder="Customer's review and feedback..."
                  rows={4}
                  required
                />
              </div>

              <div>
                <Label htmlFor="rating">Rating *</Label>
                <div className="mt-2">
                  {renderStars(formData.rating || 5, true, (rating) => 
                    setFormData(prev => ({ ...prev, rating }))
                  )}
                  <p className="text-sm text-muted-foreground mt-1">
                    Click on stars to set rating (currently {formData.rating || 5}/5)
                  </p>
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="active"
                  checked={formData.active !== false}
                  onChange={(e) => setFormData(prev => ({ ...prev, active: e.target.checked }))}
                  className="w-4 h-4"
                />
                <Label htmlFor="active">Active (visible on website)</Label>
              </div>

              <div className="flex items-center space-x-2">
                <Button type="submit" disabled={createTestimonial.isPending || updateTestimonial.isPending}>
                  <Save className="w-4 h-4 mr-2" />
                  {editingId ? "Update" : "Create"}
                </Button>
                <Button type="button" variant="outline" onClick={cancelEditing}>
                  <X className="w-4 h-4 mr-2" />
                  Cancel
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      )}

      <div className="grid gap-6">
        {testimonials?.length === 0 ? (
          <Card>
            <CardContent className="py-8 text-center">
              <p className="text-text-gray">No testimonials yet. Add your first customer testimonial to build trust and credibility.</p>
            </CardContent>
          </Card>
        ) : (
          testimonials?.map((testimonial) => (
            <Card key={testimonial.id}>
              <CardHeader className="flex flex-row items-start justify-between space-y-0">
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center text-white font-semibold">
                    {getInitials(testimonial.name)}
                  </div>
                  <div>
                    <CardTitle className="flex items-center space-x-2">
                      <span>{testimonial.name}</span>
                      {!testimonial.active && <Badge variant="secondary">Inactive</Badge>}
                    </CardTitle>
                    <p className="text-sm text-muted-foreground">{testimonial.location}</p>
                    <div className="flex items-center mt-2">
                      {renderStars(testimonial.rating)}
                      <span className="ml-2 text-sm text-muted-foreground">
                        {testimonial.rating}/5
                      </span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => startEditing(testimonial)}
                    disabled={editingId === testimonial.id || isAdding}
                  >
                    <Edit className="w-4 h-4" />
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => deleteTestimonial.mutate(testimonial.id)}
                    disabled={deleteTestimonial.isPending}
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <blockquote className="text-text-gray italic border-l-4 border-primary pl-4">
                  "{testimonial.content}"
                </blockquote>
                {testimonial.createdAt && (
                  <p className="text-xs text-muted-foreground mt-4">
                    Added: {new Date(testimonial.createdAt).toLocaleDateString()}
                  </p>
                )}
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  );
}
