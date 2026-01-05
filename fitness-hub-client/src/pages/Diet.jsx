// Diet page - Calories calculator and diet plans
import { useState } from 'react';
import { FaCalculator, FaChartPie, FaFire, FaDrumstickBite, FaBreadSlice, FaOilCan, FaArrowUp, FaArrowDown, FaCheckCircle } from 'react-icons/fa';

const Diet = () => {
  const [formData, setFormData] = useState({
    sex: 'male',
    age: 25,
    height: 170,
    weight: 70,
    activity: '1.55',
    goal: 'maintain',
    proteinPerKg: 1.8
  });

  const [results, setResults] = useState(null);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const calculate = () => {
    const { sex, age, height, weight, activity, goal, proteinPerKg } = formData;
    const A = parseFloat(age) || 25;
    const H = parseFloat(height) || 170;
    const W = parseFloat(weight) || 70;
    const mult = parseFloat(activity) || 1.55;
    const ppk = parseFloat(proteinPerKg) || 1.8;

    // Mifflin-St Jeor
    const BMR = sex === 'male' 
      ? (10 * W + 6.25 * H - 5 * A + 5)
      : (10 * W + 6.25 * H - 5 * A - 161);
    const TDEE = BMR * mult;

    let target = TDEE;
    let label = 'Maintenance';
    if (goal === 'loss') { target = TDEE - 500; label = 'Weight Loss (≈ -500 kcal/day)'; }
    if (goal === 'gain') { target = TDEE + 300; label = 'Weight Gain (≈ +300 kcal/day)'; }
    target = Math.max(1200, target);

    const protein_g = Math.round(ppk * W);
    const protein_kcal = protein_g * 4;
    const fat_kcal = Math.round(target * 0.25);
    const fat_g = Math.round(fat_kcal / 9);
    const carbs_kcal = Math.max(0, Math.round(target - protein_kcal - fat_kcal));
    const carbs_g = Math.round(carbs_kcal / 4);

    setResults({
      bmr: Math.round(BMR),
      tdee: Math.round(TDEE),
      target: Math.round(target),
      label,
      protein: protein_g,
      fat: fat_g,
      carbs: carbs_g
    });
  };

  const reset = () => {
    setFormData({
      sex: 'male',
      age: 25,
      height: 170,
      weight: 70,
      activity: '1.55',
      goal: 'maintain',
      proteinPerKg: 1.8
    });
    setResults(null);
  };

  return (
    <section className="py-12 bg-gray-50">
      <div className="px-[100px]">
        {/* Hero */}
        <div className="rounded-3xl overflow-hidden p-8 md:p-12 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 mb-8 relative">
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0icmdiYSgyNTUsMjU1LDI1NSwwLjAzKSIgc3Ryb2tlLXdpZHRoPSIxIi8+PC9wYXR0ZXJuPjwvZGVmcz48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJ1cmwoI2dyaWQpIi8+PC9zdmc+')] opacity-20"></div>
          <div className="relative z-10">
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full mb-6 border border-white/20">
              <FaCalculator className="text-white text-sm" />
              <span className="text-white text-sm font-medium">Diet Planning</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-black text-white mb-4 leading-tight">Diet Plans</h1>
            <p className="text-xl text-gray-300 max-w-3xl mb-6 leading-relaxed">
              Use the calculator to get your daily calories and macros. Then choose a Weight Loss or Weight Gain plan with sample days and practical food swaps.
            </p>
            <div className="flex gap-3 flex-wrap">
              <span className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-white/10 backdrop-blur-sm text-white border border-white/20 font-bold text-sm">
                <FaCheckCircle />
                Mifflin–St Jeor
              </span>
              <span className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-white/10 backdrop-blur-sm text-white border border-white/20 font-bold text-sm">
                <FaCheckCircle />
                Evidence-based protein
              </span>
            </div>
          </div>
        </div>

        {/* Calculator */}
        <div className="bg-white border border-gray-200 rounded-3xl p-8 shadow-xl mb-12">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 bg-gray-900 rounded-xl flex items-center justify-center">
              <FaCalculator className="text-white text-xl" />
            </div>
            <div>
              <h2 className="text-3xl font-black text-gray-900">Calories & Macros Calculator</h2>
              <p className="text-sm text-gray-600">Fill your details → Calculate. Choose a goal to see targets.</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-6">
            <label className="block">
              <span className="block text-sm font-bold mb-2 text-gray-900">Sex</span>
              <select name="sex" value={formData.sex} onChange={handleChange} className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-gray-900 transition-all">
                <option value="male">Male</option>
                <option value="female">Female</option>
              </select>
            </label>
            <label className="block">
              <span className="block text-sm font-bold mb-2 text-gray-900">Age (years)</span>
              <input type="number" name="age" value={formData.age} onChange={handleChange} className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-gray-900 transition-all" />
            </label>
            <label className="block">
              <span className="block text-sm font-bold mb-2 text-gray-900">Height (cm)</span>
              <input type="number" name="height" value={formData.height} onChange={handleChange} className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-gray-900 transition-all" />
            </label>
            <label className="block">
              <span className="block text-sm font-bold mb-2 text-gray-900">Weight (kg)</span>
              <input type="number" name="weight" value={formData.weight} onChange={handleChange} className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-gray-900 transition-all" />
            </label>
            <label className="block md:col-span-2">
              <span className="block text-sm font-bold mb-2 text-gray-900">Activity Level</span>
              <select name="activity" value={formData.activity} onChange={handleChange} className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-gray-900 transition-all">
                <option value="1.2">Sedentary (office, little exercise)</option>
                <option value="1.375">Light (1–3 days/week)</option>
                <option value="1.55">Moderate (3–5 days/week)</option>
                <option value="1.725">Active (6–7 days/week)</option>
                <option value="1.9">Very Active (physical job + training)</option>
              </select>
            </label>
            <label className="block">
              <span className="block text-sm font-bold mb-2 text-gray-900">Goal</span>
              <select name="goal" value={formData.goal} onChange={handleChange} className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-gray-900 transition-all">
                <option value="maintain">Maintain Weight</option>
                <option value="loss">Weight Loss</option>
                <option value="gain">Weight Gain</option>
              </select>
            </label>
            <label className="block">
              <span className="block text-sm font-bold mb-2 text-gray-900">Protein (g/kg)</span>
              <input type="number" step="0.1" name="proteinPerKg" value={formData.proteinPerKg} onChange={handleChange} className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-gray-900 transition-all" />
            </label>
          </div>

          <div className="flex gap-3 mb-6">
            <button onClick={calculate} className="flex items-center gap-2 px-6 py-3 rounded-xl bg-gray-900 text-white font-bold hover:bg-gray-800 transition-all shadow-lg">
              <FaChartPie />
              Calculate
            </button>
            <button onClick={reset} className="flex items-center gap-2 px-6 py-3 rounded-xl border-2 border-gray-300 bg-white text-gray-900 font-bold hover:bg-gray-50 transition-all">
              Reset
            </button>
          </div>

          {results && (
            <div className="border-t-2 border-gray-200 pt-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <div className="bg-gray-50 border border-gray-200 rounded-2xl p-5">
                  <div className="flex items-center gap-2 text-gray-600 mb-2">
                    <FaFire className="text-gray-900" />
                    <span className="text-sm font-bold">BMR</span>
                  </div>
                  <h4 className="text-3xl font-black text-gray-900">{results.bmr}</h4>
                  <div className="text-sm text-gray-600 mt-1">kcal • Basal Metabolic Rate</div>
                </div>
                <div className="bg-gray-50 border border-gray-200 rounded-2xl p-5">
                  <div className="flex items-center gap-2 text-gray-600 mb-2">
                    <FaFire className="text-gray-900" />
                    <span className="text-sm font-bold">TDEE</span>
                  </div>
                  <h4 className="text-3xl font-black text-gray-900">{results.tdee}</h4>
                  <div className="text-sm text-gray-600 mt-1">kcal • Daily energy with activity</div>
                </div>
                <div className="bg-gray-900 border border-gray-800 rounded-2xl p-5">
                  <div className="flex items-center gap-2 text-gray-400 mb-2">
                    <FaFire className="text-white" />
                    <span className="text-sm font-bold text-white">Target Calories</span>
                  </div>
                  <h4 className="text-3xl font-black text-white">{results.target}</h4>
                  <div className="text-sm text-gray-300 mt-1">{results.label}</div>
                </div>
              </div>

              <div className="bg-gradient-to-r from-gray-50 to-gray-100 border border-gray-200 rounded-2xl p-5">
                <h3 className="font-bold text-gray-900 mb-3 flex items-center gap-2">
                  <FaChartPie />
                  Daily Macros Breakdown
                </h3>
                <div className="grid grid-cols-3 gap-4">
                  <div className="text-center">
                    <FaDrumstickBite className="text-2xl text-gray-900 mx-auto mb-2" />
                    <p className="text-2xl font-black text-gray-900">{results.protein}g</p>
                    <p className="text-xs text-gray-600 font-medium">Protein</p>
                  </div>
                  <div className="text-center">
                    <FaOilCan className="text-2xl text-gray-900 mx-auto mb-2" />
                    <p className="text-2xl font-black text-gray-900">{results.fat}g</p>
                    <p className="text-xs text-gray-600 font-medium">Fat</p>
                  </div>
                  <div className="text-center">
                    <FaBreadSlice className="text-2xl text-gray-900 mx-auto mb-2" />
                    <p className="text-2xl font-black text-gray-900">{results.carbs}g</p>
                    <p className="text-xs text-gray-600 font-medium">Carbs</p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Plans */}
        <h2 className="text-3xl font-black text-gray-900 mb-6">Choose Your Plan</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-gradient-to-br from-green-50 to-green-100 border-2 border-green-200 rounded-3xl p-8 shadow-lg hover:shadow-xl transition-shadow">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 bg-green-600 rounded-xl flex items-center justify-center">
                <FaArrowUp className="text-white text-xl" />
              </div>
              <h3 className="text-2xl font-black text-gray-900">Weight Gain (Clean Bulk)</h3>
            </div>
            <ul className="ml-6 list-disc text-sm space-y-2 text-gray-800">
              <li className="leading-relaxed">Target: +250 to +350 kcal/day above TDEE.</li>
              <li className="leading-relaxed">Protein: 1.6–2.2 g/kg; distribute over 3–5 meals.</li>
              <li className="leading-relaxed">Prioritize carb sources around training (rice, potatoes, roti, fruit).</li>
              <li className="leading-relaxed">Healthy fats: nuts, avocado, eggs, fish, olive/mustard oil.</li>
            </ul>
          </div>

          <div className="bg-gradient-to-br from-red-50 to-red-100 border-2 border-red-200 rounded-3xl p-8 shadow-lg hover:shadow-xl transition-shadow">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 bg-red-600 rounded-xl flex items-center justify-center">
                <FaArrowDown className="text-white text-xl" />
              </div>
              <h3 className="text-2xl font-black text-gray-900">Weight Loss (Cut)</h3>
            </div>
            <ul className="ml-6 list-disc text-sm space-y-2 text-gray-800">
              <li className="leading-relaxed">Target: -400 to -600 kcal/day below TDEE.</li>
              <li className="leading-relaxed">Protein: 1.6–2.2 g/kg to keep muscle.</li>
              <li className="leading-relaxed">High-volume foods: lentils, veggies, yogurt, lean meats, fruit.</li>
              <li className="leading-relaxed">Plan snacks: fruit, boiled eggs, chana, air-popped popcorn.</li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Diet;
