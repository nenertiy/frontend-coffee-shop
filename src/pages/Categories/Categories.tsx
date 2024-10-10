import { FC, useState } from "react";
import styles from "./Categories.module.scss";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { deleteCategory, fetchCategories, fetchSubcategories } from "../../utils/api";
import CategoryCard from "../../components/CategoryCard/CategoryCard";
import Modal from "../../components/Modal/Modal";
import FormEditCategory from "../../components/FormCategory/FormEditCategory";

const Categories: FC = () => {
  const { data: categoriesData } = useQuery({
    queryKey: ["categories"],
    queryFn: fetchCategories,
  });

  const { data: subcategoriesData } = useQuery({
    queryKey: ["subcategories"],
    queryFn: fetchSubcategories,
  });

  const queryClient = useQueryClient();

  const [isEditModalOpen, setEditModalOpen] = useState(false);
  const [selectedCategoryId, setSelectedCategoryId] = useState<number | null>(null);
  const [currentCategoryName, setCurrentCategoryName] = useState("");
  const [currentSubcategories, setCurrentSubcategories] = useState<{ id: number; name: string }[]>(
    []
  );

  const handleEdit = (
    categoryId: number,
    categoryName: string,
    subcategories: { id: number; name: string }[]
  ) => {
    setSelectedCategoryId(categoryId);
    setCurrentCategoryName(categoryName);
    setCurrentSubcategories(subcategories);
    setEditModalOpen(true);
  };

  const handleDelete = (categoryId: number) => {
    deleteCategory(categoryId);
    queryClient.invalidateQueries({
      queryKey: ["categories", categoryId],
    });
  };

  return (
    <div className={styles.Category}>
      <div className={styles.container}>
        <div className={styles.categories}>
          {categoriesData?.map(
            (category: {
              id: number;
              name: string;
              subCategory: { id: number; img: string; name: string }[];
            }) => (
              <div key={category.id}>
                <div className={styles.bar}>
                  <div className={styles.title}>{category.name}</div>
                  <div className={styles.bar_container}>
                    <button
                      className={styles.delete}
                      onClick={() => handleDelete(category.id)}>
                      Delete
                    </button>
                    <button
                      className={styles.edit}
                      onClick={() => handleEdit(category.id, category.name, category.subCategory)}>
                      Edit
                    </button>
                  </div>
                </div>
                <div className={styles.line}></div>
                <div className={styles.list}>
                  {category?.subCategory?.map((subcategory) => (
                    <CategoryCard
                      key={subcategory.id}
                      id={subcategory.id}
                      img={subcategory.img}
                      name={subcategory.name}
                    />
                  ))}
                </div>
              </div>
            )
          )}
        </div>
      </div>

      {isEditModalOpen && (
        <Modal
          onClose={() => setEditModalOpen(false)}
          isOpen={isEditModalOpen}>
          <FormEditCategory
            categoryId={selectedCategoryId!}
            currentName={currentCategoryName}
            subcategories={currentSubcategories}
            allSubcategories={subcategoriesData || []}
            onClose={() => setEditModalOpen(false)}
            onSuccess={() => {
              setEditModalOpen(false);
            }}
          />
        </Modal>
      )}
    </div>
  );
};

export default Categories;
