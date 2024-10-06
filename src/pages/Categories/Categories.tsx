import { FC } from "react";

import styles from "./Categories.module.scss";
import { useQuery } from "@tanstack/react-query";
import { fetchCategories } from "../../utils/api";
import CategoryCard from "../../components/CategoryCard/CategoryCard";
import { useCreateStore } from "../../store/createStore";

const Categories: FC = () => {
  const subcategoryOpen = useCreateStore((state) => state.subcategoryOpen);
  const categoryOpen = useCreateStore((state) => state.categoryOpen);

  const { data } = useQuery({
    queryKey: ["categories", categoryOpen, subcategoryOpen],
    queryFn: fetchCategories,
  });

  // console.log(data);

  return (
    <div className={styles.Category}>
      <div className={styles.container}>
        <div className={styles.categories}>
          {data?.map((category: { name: string; subCategory: { img: string; name: string }[] }) => (
            <>
              <div className={styles.title}>{category.name}</div>
              <div className={styles.line}></div>
              <div className={styles.list}>
                {category.subCategory?.map((subcategory: { img: string; name: string }) => (
                  <CategoryCard
                    img={subcategory.img}
                    name={subcategory.name}
                  />
                ))}
              </div>
            </>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Categories;
