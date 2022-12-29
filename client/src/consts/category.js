// should move out such constants (not depending on any others variables)

import { removeVietnameseTones } from "./convertName";

// Category export to Dashboard
export const CATEGORIES = Object.freeze([
  "Hành Động",
  "Tình Cảm",
  "Hài hước",
  "Cổ Trang",
  "Tâm Lý",
  "Hình Sự",
  "Chiến Tranh",
  "Thể Thao",
  "Võ Thuật",
  "Viên Tưởng",
  "Phiêu Lưu",
  "Tài liệu",
  "Chính Kịch",
  "Thần Thoại",
  "Gia Đình",
  "Học Đường",
  "SALE",
]);
const categories = [
  "Hành Động",
  "Tình Cảm",
  "Hài hước",
  "Cổ Trang",
  "Tâm lí",
  "Bí ẩn",
  "Chiến Tranh",
  "Thể Thao",
  "Võ Thuật",
  "Viên Tưởng",
  "Phiêu Lưu",
  "Tài liệu",
  "Chính Kịch",
  "Thần Thoại",
  "Gia Đình",
  "Học Đường",
  "SALE",
  "All",
];
export const newCategorys = categories.map(e => ({value : removeVietnameseTones(e),label : e}))