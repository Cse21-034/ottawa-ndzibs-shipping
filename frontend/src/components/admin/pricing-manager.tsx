import { useState } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { useToast } from "@/hooks/use-toast";
import { apiRequest, queryClient } from "@/lib/queryClient";
import { Plus, Edit, Trash2, Save, X } from "lucide-react";
import type { Pricing, InsertPricing } from "@shared/schema";

export default function PricingManager() {
  const { toast } = useToast();
  const [isAdding, setIsAdding] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState<Partial<InsertPricing>>({});

  const { data: pricing, isLoading } = useQuery<Pricing[]>({
    queryKey: ["/api/admin/pricing"]
  });

  const createPricing = useMutation({
    mutationFn: async (data: InsertPricing) => {
      return await apiRequest("POST", "/api/admin/pricing", data);
    },
    onSuccess: () => {
      toast({ title: "Pricing created successfully!" });
      queryClient.invalidateQueries({ queryKey: ["/api/admin/pricing"] });
      queryClient.invalidateQueries({ queryKey: ["/api/pricing"] });
      setIsAdding(false);
      setFormData({});
    },
    onError: () => {
      toast({ title: "Error creating pricing", variant: "destructive" });
    }
  });

  const updatePricing = useMutation({
    mutationFn: async ({ id, data }: { id: string; data: Partial<InsertPricing> }) => {
      return await apiRequest("PUT", `/api/admin/pricing/${id}`, data);
    },
    onSuccess: () => {
      toast({ title: "Pricing updated successfully!" });
      queryClient.invalidateQueries({ queryKey: ["/api/admin/pricing"] });
      queryClient.invalidateQueries({ queryKey: ["/api/pricing"] });
      setEditingId(null);
      setFormData({});
    },
    onError: () => {
      toast({ title: "Error updating pricing", variant: "destructive" });
    }
  });

  const deletePricing = useMutation({
    mutationFn: async (id: string) => {
      return await apiRequest("DELETE", `/api/admin/pricing/${id}`);
    },
    onSuccess: () => {
      toast({ title: "Pricing deleted successfully!" });
      queryClient.invalidateQueries({ queryKey: ["/api/admin/pricing"] });
      queryClient.invalidateQueries({ queryKey: ["/api/pricing"] });
    },
    onError: () => {
      toast({ title: "Error deleting pricing", variant: "destructive" });
    }
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.category || !formData.description || !formData.rate || !formData.unit) {
      toast({ title: "Please fill in all required fields", variant: "destructive" });
      return;
    }

    const data = {
      ...formData,
      features: formData.features || [],
      active: formData.active !== false
    } as InsertPricing;

    if (editingId) {
      updatePricing.mutate({ id: editingId, data });
    } else {
      createPricing.mutate(data);
    }
  };

  const startEditing = (pricing: Pricing) => {
    setEditingId(pricing.id);
    setFormData(pricing);
  };

  const cancelEditing = () => {
    setEditingId(null);
    setIsAdding(false);
    setFormData({});
  };

  const handleFeatureChange = (features: string) => {
    setFormData(prev => ({
      ...prev,
      features: features.split('\n').filter(f => f.trim())
    }));
  };

  const colors = [
    { value: "blue", label: "Blue" },
    { value: "pink", label: "Pink" },
    { value: "purple", label: "Purple" },
    { value: "green", label: "Green" },
    { value: "orange", label: "Orange" }
  ];

  const icons = [
    { value: "fas fa-couch", label: "Furniture" },
    { value: "fas fa-cut", label: "Beauty" },
    { value: "fas fa-laptop", label: "Electronics" },
    { value: "fas fa-tshirt", label: "Textiles" },
    { value: "fas fa-box", label: "Packages" }
  ];

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
          <h2 className="text-2xl font-bold text-secondary mb-2">Pricing Management</h2>
          <p className="text-text-gray">Manage pricing categories and rates.</p>
        </div>
        <Button onClick={() => setIsAdding(true)} disabled={isAdding || !!editingId}>
          <Plus className="w-4 h-4 mr-2" />
          Add Pricing
        </Button>
      </div>

      {(isAdding || editingId) && (
        <Card>
          <CardHeader>
            <CardTitle>{editingId ? "Edit Pricing" : "Add New Pricing"}</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="category">Category *</Label>
                  <Input
                    id="category"
                    value={formData.category || ""}
                    onChange={(e) => setFormData(prev => ({ ...prev, category: e.target.value }))}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="rate">Rate (P) *</Label>
                  <Input
                    id="rate"
                    type="number"
                    value={formData.rate || ""}
                    onChange={(e) => setFormData(prev => ({ ...prev, rate: parseInt(e.target.value) }))}
                    required
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="description">Description *</Label>
                <Input
                  id="description"
                  value={formData.description || ""}
                  onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                  required
                />
              </div>

              <div className="grid md:grid-cols-3 gap-4">
                <div>
                  <Label htmlFor="unit">Unit *</Label>
                  <Input
                    id="unit"
                    value={formData.unit || ""}
                    onChange={(e) => setFormData(prev => ({ ...prev, unit: e.target.value }))}
                    placeholder="e.g., per CBM"
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="color">Color *</Label>
                  <Select value={formData.color || ""} onValueChange={(value) => setFormData(prev => ({ ...prev, color: value }))}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select color" />
                    </SelectTrigger>
                    <SelectContent>
                      {colors.map(color => (
                        <SelectItem key={color.value} value={color.value}>
                          {color.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="icon">Icon *</Label>
                  <Select value={formData.icon || ""} onValueChange={(value) => setFormData(prev => ({ ...prev, icon: value }))}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select icon" />
                    </SelectTrigger>
                    <SelectContent>
                      {icons.map(icon => (
                        <SelectItem key={icon.value} value={icon.value}>
                          {icon.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div>
                <Label htmlFor="features">Features (one per line)</Label>
                <Textarea
                  id="features"
                  value={formData.features?.join('\n') || ""}
                  onChange={(e) => handleFeatureChange(e.target.value)}
                  placeholder="Feature 1&#10;Feature 2&#10;Feature 3"
                  rows={4}
                />
              </div>

              <div className="flex items-center space-x-2">
                <Button type="submit" disabled={createPricing.isPending || updatePricing.isPending}>
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
        {pricing?.map((item) => (
          <Card key={item.id}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0">
              <div>
                <CardTitle className="flex items-center space-x-2">
                  <i className={item.icon}></i>
                  <span>{item.category}</span>
                  {!item.active && <Badge variant="secondary">Inactive</Badge>}
                </CardTitle>
                <p className="text-sm text-muted-foreground mt-1">{item.description}</p>
              </div>
              <div className="flex items-center space-x-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => startEditing(item)}
                  disabled={editingId === item.id || isAdding}
                >
                  <Edit className="w-4 h-4" />
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => deletePricing.mutate(item.id)}
                  disabled={deletePricing.isPending}
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <p className="text-2xl font-bold text-primary">P{item.rate.toLocaleString()}</p>
                  <p className="text-sm text-muted-foreground">{item.unit}</p>
                </div>
                <div>
                  {item.features && item.features.length > 0 && (
                    <div>
                      <p className="font-medium mb-2">Features:</p>
                      <ul className="text-sm text-muted-foreground space-y-1">
                        {item.features.map((feature, index) => (
                          <li key={index} className="flex items-center">
                            <span className="w-2 h-2 bg-accent rounded-full mr-2"></span>
                            {feature}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
