// Nutrition page - simplified version showing food cards with search
import { useState } from 'react';
import { FaAppleAlt, FaSearch, FaFire, FaDrumstickBite, FaBreadSlice, FaOilCan, FaLeaf, FaCheckCircle } from 'react-icons/fa';

const Nutrition = () => {
  const [searchQuery, setSearchQuery] = useState('');

  const foods = [
    { name: 'Chicken Breast (roasted)', kcal: 165, protein: 31, carbs: 0, fat: 3.6, quantity: 35, image: 'https://www.allrecipes.com/thmb/PClqnsQ-doMAZo8jLXMXRzpuCkA=/750x0/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/16160-juicy-grilled-chicken-breasts-ddmfs-5594-hero-3x4-902673c819994c0191442304b40104af.jpg' },
    { name: 'Salmon (Atlantic)', kcal: 208, protein: 20, carbs: 0, fat: 13, quantity: 33, image: 'https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?w=800&h=600&fit=crop' },
    { name: 'Eggs (hard-boiled)', kcal: 155, protein: 13, carbs: 1.1, fat: 11, quantity: 25, image: 'https://www.foodtasticmom.com/wp-content/uploads/2016/10/easyeggs-feature.jpg' },
    { name: 'Greek Yogurt (non-fat)', kcal: 59, protein: 10, carbs: 3.6, fat: 0.4, quantity: 14, image: 'https://cdn.smithbrothersfarms.com/media/0010970_chobani-nonfat-plain-greek-yogurt-32-oz.jpeg' },
    { name: 'Lentils (cooked)', kcal: 116, protein: 9.0, carbs: 20.1, fat: 0.4, quantity: 30, image: 'https://www.cathysglutenfree.com/wp-content/uploads/2022/05/red-lentils-f.jpg' },
    { name: 'Chickpeas (cooked)', kcal: 164, protein: 8.9, carbs: 27.4, fat: 2.6, quantity: 39, image: 'https://thishealthykitchen.com/wp-content/uploads/2021/09/Instant-Pot-Chickpeas-No-Soak-Feat-Image-Square.jpg' },
    { name: 'Quinoa (cooked)', kcal: 120, protein: 4.4, carbs: 21.3, fat: 1.9, quantity: 28, image: 'https://cdn11.bigcommerce.com/s-dis4vxtxtc/images/stencil/original/products/3305/3109/how-to-cook-quinoa.sq_2__40395.1679026738.jpg?c=2' },
    { name: 'Brown Rice (cooked)', kcal: 111, protein: 2.6, carbs: 23.0, fat: 0.9, quantity: 27, image: 'https://images.unsplash.com/photo-1586201375761-83865001e31c?w=800&h=600&fit=crop' },
    { name: 'Oats (dry)', kcal: 389, protein: 16.9, carbs: 66.3, fat: 6.9, quantity: 90, image: 'https://dmpnews.org/wp-content/uploads/2021/01/6-8.jpg' },
    { name: 'Spinach (raw)', kcal: 23, protein: 2.9, carbs: 3.6, fat: 0.4, quantity: 7, image: 'https://images.unsplash.com/photo-1576045057995-568f588f82fb?w=800&h=600&fit=crop' },
    { name: 'Broccoli (raw)', kcal: 34, protein: 2.8, carbs: 6.6, fat: 0.4, quantity: 10, image: 'https://images.weserv.nl/?url=commons.wikimedia.org/wiki/Special:FilePath/Broccoli_and_cross_section_edit.jpg&w=1200&h=800&fit=cover&output=jpg' },
    { name: 'Almonds', kcal: 579, protein: 21.2, carbs: 21.7, fat: 49.9, quantity: 93, image: 'https://www.marthastewart.com/thmb/yHrnw79R2c2v_wYMfmZON3UgQrg=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/ms-almonds-in-bowl-getty-dbf3bf1a968b405d9d45de9d4b910709.jpg' }
  ];

  const filteredFoods = foods.filter(food => {
    if (!searchQuery) return true;
    const query = searchQuery.toLowerCase();
    return food.name.toLowerCase().includes(query) || 
           String(food.protein).includes(query) ||
           String(food.quantity).includes(query);
  });

  return (
    <section className="py-12 bg-gray-50">
      <div className="px-[100px]">
        <div className="mb-8">
          <div className="inline-flex items-center gap-2 bg-gray-900 text-white px-4 py-2 rounded-full mb-4">
            <FaAppleAlt />
            <span className="font-bold text-sm">Nutrition Guide</span>
          </div>
          <h1 className="text-4xl font-black text-gray-900 mb-3">Healthy Foods & Per-100 g Nutrition</h1>
          <p className="text-gray-600">Quick macro snapshot for nutritious foods. Values are approximate (USDA-style averages).</p>
        </div>

        {/* Search Box */}
        <div className="bg-white border border-gray-200 rounded-3xl overflow-hidden shadow-lg mb-8">
          <div className="p-6">
            <label htmlFor="foodSearch" className="block text-sm font-bold mb-3 text-gray-900 flex items-center gap-2">
              <FaSearch />
              Search Foods
            </label>
            <div className="relative">
              <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
                <FaAppleAlt />
              </div>
              <input
                id="foodSearch"
                type="search"
                placeholder="Type a food or nutrient (e.g., 'Salmon', 'Protein')"
                autoComplete="off"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent transition-all"
              />
            </div>
            <div className="text-sm mt-3 text-gray-600 flex items-center gap-2">
              <FaCheckCircle className="text-green-600" />
              {searchQuery ? `Showing ${filteredFoods.length} of ${foods.length} for "${searchQuery}".` : `Showing all ${foods.length} foods.`}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {filteredFoods.map((food, index) => (
            <div key={index} className="bg-white border border-gray-200 rounded-3xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow">
              <img
                src={food.image}
                alt={food.name}
                className="w-full h-[200px] object-cover bg-gray-100"
              />
              <div className="p-6">
                <h3 className="text-xl font-black text-gray-900 mb-4">{food.name}</h3>
                <div className="grid grid-cols-2 gap-3">
                  <div className="bg-gray-50 rounded-xl p-3 border border-gray-200">
                    <div className="flex items-center gap-2 text-gray-900 mb-1">
                      <FaFire className="text-sm" />
                      <span className="text-xs font-bold">Calories</span>
                    </div>
                    <p className="text-lg font-black text-gray-900">{food.kcal}</p>
                  </div>
                  <div className="bg-gray-50 rounded-xl p-3 border border-gray-200">
                    <div className="flex items-center gap-2 text-gray-900 mb-1">
                      <FaDrumstickBite className="text-sm" />
                      <span className="text-xs font-bold">Protein</span>
                    </div>
                    <p className="text-lg font-black text-gray-900">{food.protein}g</p>
                  </div>
                  <div className="bg-gray-50 rounded-xl p-3 border border-gray-200">
                    <div className="flex items-center gap-2 text-gray-900 mb-1">
                      <FaBreadSlice className="text-sm" />
                      <span className="text-xs font-bold">Carbs</span>
                    </div>
                    <p className="text-lg font-black text-gray-900">{food.carbs}g</p>
                  </div>
                  <div className="bg-gray-50 rounded-xl p-3 border border-gray-200">
                    <div className="flex items-center gap-2 text-gray-900 mb-1">
                      <FaOilCan className="text-sm" />
                      <span className="text-xs font-bold">Fat</span>
                    </div>
                    <p className="text-lg font-black text-gray-900">{food.fat}g</p>
                  </div>
                </div>
                <div className="mt-3 bg-green-50 border border-green-200 rounded-xl p-3">
                  <div className="flex items-center gap-2 text-green-800">
                    <FaLeaf className="text-sm" />
                    <span className="text-xs font-bold">Quantity</span>
                    <span className="text-lg font-black ml-auto">{food.quantity}g</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="bg-gray-900 border border-gray-800 rounded-3xl p-6">
          <p className="text-sm text-gray-300">
            <span className="font-bold text-white">Note:</span> Values are per 100 g and vary by variety, brand, cooking method, and water content.
          </p>
        </div>
      </div>
    </section>
  );
};

export default Nutrition;
