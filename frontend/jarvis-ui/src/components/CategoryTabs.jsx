import React from "react";
import { CATEGORIES } from "../constants/categoriesData";

export default function CategoryTabs({ activeCategory, onSelectCategory }) {
  return (
    <div className="category-tabs-container">
      {CATEGORIES.map((cat) => {
        const Icon = cat.icon;
        const isActive = activeCategory === cat.id;

        return (
          <div
            key={cat.id}
            className={`category-tab-card ${isActive ? "active" : ""}`}
            onClick={() => onSelectCategory(cat.id)}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                onSelectCategory(cat.id);
              }
            }}
          >
            <div className="category-icon-wrapper">
              <Icon
                size={20}
                color={isActive ? "#ffffff" : cat.iconColor}
              />
            </div>
            <span className="category-label">{cat.label}</span>
          </div>
        );
      })}
    </div>
  );
}

