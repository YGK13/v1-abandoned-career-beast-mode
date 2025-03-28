
import React from "react";
import { TipCategory as TipCategoryType, NotificationType } from "./types";
import TipCategory from "./TipCategory";

interface CategoryListProps {
  categories: TipCategoryType[];
  onToggle: (id: NotificationType) => void;
}

const CategoryList: React.FC<CategoryListProps> = ({ categories, onToggle }) => {
  return (
    <div className="space-y-4">
      {categories.map(category => (
        <TipCategory 
          key={category.id}
          category={category}
          onToggle={() => onToggle(category.id)}
        />
      ))}
    </div>
  );
};

export default CategoryList;
