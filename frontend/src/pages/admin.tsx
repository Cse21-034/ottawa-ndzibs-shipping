import { useState } from "react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import AdminLayout from "@/components/admin/admin-layout";
import ContentManager from "@/components/admin/content-manager";
import PricingManager from "@/components/admin/pricing-manager";
import TestimonialsManager from "@/components/admin/testimonials-manager";
import { ArrowLeft, BarChart3, MessageSquare, DollarSign, Mail, Cog } from "lucide-react";

export default function Admin() {
  const [activeTab, setActiveTab] = useState("overview");

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Link href="/">
              <Button variant="outline" size="sm">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Website
              </Button>
            </Link>
            <div>
              <h1 className="text-3xl font-bold text-secondary">Admin Dashboard</h1>
              <p className="text-text-gray">Manage your shipping website content</p>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="overview" className="flex items-center space-x-2">
              <BarChart3 className="w-4 h-4" />
              <span>Overview</span>
            </TabsTrigger>
            <TabsTrigger value="content" className="flex items-center space-x-2">
              <Cog className="w-4 h-4" />
              <span>Content</span>
            </TabsTrigger>
            <TabsTrigger value="pricing" className="flex items-center space-x-2">
              <DollarSign className="w-4 h-4" />
              <span>Pricing</span>
            </TabsTrigger>
            <TabsTrigger value="testimonials" className="flex items-center space-x-2">
              <MessageSquare className="w-4 h-4" />
              <span>Testimonials</span>
            </TabsTrigger>
            <TabsTrigger value="contacts" className="flex items-center space-x-2">
              <Mail className="w-4 h-4" />
              <span>Contacts</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="overview">
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Active Services</CardTitle>
                  <BarChart3 className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">2</div>
                  <p className="text-xs text-muted-foreground">Sea & Air Freight</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Pricing Categories</CardTitle>
                  <DollarSign className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">5</div>
                  <p className="text-xs text-muted-foreground">Different pricing tiers</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Testimonials</CardTitle>
                  <MessageSquare className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">3</div>
                  <p className="text-xs text-muted-foreground">Customer reviews</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Contact Inquiries</CardTitle>
                  <Mail className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">0</div>
                  <p className="text-xs text-muted-foreground">Pending responses</p>
                </CardContent>
              </Card>
            </div>

            <Card className="mt-6">
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
                <Button onClick={() => setActiveTab("content")} variant="outline" className="flex items-center space-x-2">
                  <Cog className="w-4 h-4" />
                  <span>Update Content</span>
                </Button>
                <Button onClick={() => setActiveTab("pricing")} variant="outline" className="flex items-center space-x-2">
                  <DollarSign className="w-4 h-4" />
                  <span>Manage Pricing</span>
                </Button>
                <Button onClick={() => setActiveTab("testimonials")} variant="outline" className="flex items-center space-x-2">
                  <MessageSquare className="w-4 h-4" />
                  <span>Add Testimonial</span>
                </Button>
                <Button onClick={() => setActiveTab("contacts")} variant="outline" className="flex items-center space-x-2">
                  <Mail className="w-4 h-4" />
                  <span>View Contacts</span>
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="content">
            <ContentManager />
          </TabsContent>

          <TabsContent value="pricing">
            <PricingManager />
          </TabsContent>

          <TabsContent value="testimonials">
            <TestimonialsManager />
          </TabsContent>

          <TabsContent value="contacts">
            <Card>
              <CardHeader>
                <CardTitle>Contact Inquiries</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-text-gray">No contact inquiries yet. When customers submit the contact form, they will appear here.</p>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </AdminLayout>
  );
}
