import { useState } from 'react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { MenuCard } from '@/components/menu/MenuCard';
import { menuItems } from '@/data/menuItems';

export default function Menu() {
  const [activeTab, setActiveTab] = useState('starters');

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <Card>
        <CardHeader>
          <h1 className="text-3xl font-bold text-center">Our Menu</h1>
        </CardHeader>
        <CardContent>
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid grid-cols-3 w-full max-w-md mx-auto mb-8">
              <TabsTrigger value="starters">Starters</TabsTrigger>
              <TabsTrigger value="mains">Main Courses</TabsTrigger>
              <TabsTrigger value="desserts">Desserts</TabsTrigger>
            </TabsList>

            <TabsContent value="starters">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {menuItems.starters.map((item) => (
                  <MenuCard key={item.id} item={item} />
                ))}
              </div>
            </TabsContent>

            <TabsContent value="mains">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {menuItems.mains.map((item) => (
                  <MenuCard key={item.id} item={item} />
                ))}
              </div>
            </TabsContent>

            <TabsContent value="desserts">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {menuItems.desserts.map((item) => (
                  <MenuCard key={item.id} item={item} />
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
}