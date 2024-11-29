import { useState } from "react";
import { Filter, Mail, Plus, ArrowDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";

const Index = () => {
  const [categories, setCategories] = useState([
    "Business",
    "Fashion",
    "Promotions",
    "Newsletters",
    "Social Media",
  ]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [newCategory, setNewCategory] = useState("");

  const handleCategoryClick = (category: string) => {
    setSelectedCategories((prev) =>
      prev.includes(category)
        ? prev.filter((c) => c !== category)
        : [...prev, category]
    );
  };

  const handleAddCategory = () => {
    if (!newCategory.trim()) {
      toast.error("Please enter a category name");
      return;
    }
    if (categories.includes(newCategory)) {
      toast.error("Category already exists");
      return;
    }
    setCategories([...categories, newCategory]);
    setNewCategory("");
    toast.success("Category added successfully");
  };

  const handleApplyFilters = () => {
    toast.success("Filters applied successfully");
  };

  const handleReset = () => {
    setSelectedCategories([]);
    toast.success("Filters reset successfully");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 p-6 font-sans">
      <div className="mx-auto max-w-2xl rounded-xl bg-gray-800/50 p-8 shadow-xl backdrop-blur-sm border border-gray-700">
        <div className="mb-8 flex items-center gap-3">
          <Filter className="h-6 w-6 text-blue-400" />
          <h1 className="text-2xl font-bold text-white">
            Gmail Subscription Filter
          </h1>
        </div>

        <div className="mb-6 rounded-lg bg-gray-900/50 p-4 backdrop-blur-sm border border-gray-700">
          <div className="mb-4 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Mail className="h-5 w-5 text-blue-400" />
              <h2 className="text-lg font-semibold text-white">Categories</h2>
            </div>
            <ArrowDown className="h-5 w-5 text-gray-400" />
          </div>

          <div className="mb-4 grid grid-cols-2 gap-3">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => handleCategoryClick(category)}
                className={`rounded-lg p-3 text-center transition-all ${
                  selectedCategories.includes(category)
                    ? "bg-blue-500 text-white"
                    : "bg-gray-700 text-gray-300 hover:bg-gray-600"
                }`}
              >
                {category}
              </button>
            ))}
          </div>

          <div className="flex gap-2">
            <Input
              value={newCategory}
              onChange={(e) => setNewCategory(e.target.value)}
              placeholder="Add custom category"
              className="bg-gray-700 text-white border-gray-600 placeholder:text-gray-400"
            />
            <Button
              onClick={handleAddCategory}
              className="bg-blue-500 hover:bg-blue-600"
            >
              <Plus className="h-5 w-5" />
            </Button>
          </div>
        </div>

        <div className="mb-6 space-y-4">
          <div className="rounded-lg bg-gray-900/50 p-4 backdrop-blur-sm border border-gray-700">
            <label className="mb-2 block text-gray-300">Sender</label>
            <Input
              placeholder="Enter sender email"
              className="bg-gray-700 text-white border-gray-600 placeholder:text-gray-400"
            />
          </div>

          <div className="rounded-lg bg-gray-900/50 p-4 backdrop-blur-sm border border-gray-700">
            <label className="mb-2 block text-gray-300">Contains</label>
            <Input
              placeholder="Enter keywords"
              className="bg-gray-700 text-white border-gray-600 placeholder:text-gray-400"
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <Button
            onClick={handleApplyFilters}
            className="w-full bg-blue-500 text-lg font-medium hover:bg-blue-600"
          >
            Apply Filters
          </Button>
          <Button
            onClick={handleReset}
            variant="outline"
            className="w-full text-lg font-medium border-gray-600 text-gray-300 hover:bg-gray-700"
          >
            Reset
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Index;