import CharityImg from "../../images/category-charity.png";
import ClothImg from "../../images/category-cloth.png";
import FamilyImg from "../../images/category-family.png";
import FoodImg from "../../images/category-food.png";
import GadgetsImg from "../../images/category-gadgets.png";
import HomeImg from "../../images/category-home.png";
import LearningImg from "../../images/category-learning.png";
import TravelImg from "../../images/category-travel.png";
import OtherImg from "../../images/category-other.png";

export const logoutHandler = (callback = () => {}) => {
  localStorage.setItem("selectedTab", "5");
  localStorage.setItem("user", null);
  if (callback) {
    callback();
  }
};

export const getCategoryIcon = (category = "Other") => {
  console.log(category, "category");
  switch (category) {
    case "Charity":
      return CharityImg;
      break;
    case "Cloth":
      return ClothImg;
      break;
    case "Family":
      return FamilyImg;
      break;
    case "Food":
      return FoodImg;
      break;
    case "Gadgets":
      return GadgetsImg;
      break;
    case "Home":
      return HomeImg;
      break;
    case "Learning":
      return LearningImg;
      break;
    case "Travel":
      return TravelImg;
      break;
    default:
      return OtherImg;
      break;
  }
};
