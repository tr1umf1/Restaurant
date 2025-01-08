import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { MenuCard } from '@/components/menu/MenuCard';
import { menuItems as initialMenuItems } from '@/data/menuItems';

export default function Menu() {
  const [activeTab, setActiveTab] = useState('starters');
  const [newMeal, setNewMeal] = useState({
    name: '',
    price: '',
    description: '',
    image: '', // Add image field
  });
  const [menuItems, setMenuItems] = useState(() => {
    const storedMenuItems = localStorage.getItem('menuItems');
    return storedMenuItems ? JSON.parse(storedMenuItems) : initialMenuItems;
  });
  const [isFormVisible, setIsFormVisible] = useState(false);

  useEffect(() => {
    localStorage.setItem('menuItems', JSON.stringify(menuItems));
  }, [menuItems]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewMeal((prevMeal) => ({
      ...prevMeal,
      [name]: value,
    }));
  };

  const handleAddMeal = async () => {
    const response = await fetch('http://localhost:5000/api/meals/add', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newMeal),
    });

    if (response.ok) {
      alert('Meal added successfully');
      const addedMeal = {
        ...newMeal,
        id: Date.now(),
      };

      setMenuItems((prevMenu) => ({
        ...prevMenu,
        starters: [...prevMenu.starters, addedMeal], // Adjust tab if necessary
      }));

      setNewMeal({ name: '', price: '', description: '', image: '' });
      setIsFormVisible(false);
    } else {
      alert('Failed to add meal');
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <Card>
        <CardHeader>
          <h1 className="text-3xl font-bold text-center">Our Menu</h1>
          <button
            className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
            onClick={() => setIsFormVisible(!isFormVisible)}
          >
            {isFormVisible ? 'Cancel' : 'Add New Meal'}
          </button>
        </CardHeader>
        <CardContent>
          {isFormVisible && (
            <div className="border p-6 rounded-lg shadow-lg mb-8 max-w-md mx-auto bg-gray-100">
              <h2 className="text-xl font-semibold mb-4 text-center">
                Add New Meal
              </h2>
              <input
                type="text"
                name="name"
                placeholder="Meal Name"
                value={newMeal.name}
                onChange={handleChange}
                className="border p-3 mb-4 w-full rounded focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
              />
              <input
                type="number"
                name="price"
                placeholder="Meal Price"
                value={newMeal.price}
                onChange={handleChange}
                className="border p-3 mb-4 w-full rounded focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
              />
              <textarea
                name="description"
                placeholder="Meal Description"
                value={newMeal.description}
                onChange={handleChange}
                className="border p-3 mb-4 w-full rounded focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
              />
              <input
                type="text"
                name="image"
                placeholder="Image URL"
                value={newMeal.image}
                onChange={handleChange}
                className="border p-3 mb-4 w-full rounded focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
              />
              <button
                className="bg-green-500 text-white px-4 py-2 rounded w-full hover:bg-green-600 transition"
                onClick={handleAddMeal}
              >
                Add Meal
              </button>
            </div>
          )}

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
