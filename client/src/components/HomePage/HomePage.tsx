import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks/hook";
import usePagination from "../../hooks/usePagination";
import {
  getAllProducts,
  getCategoryProducts,
  getProducts,
} from "../../store/products";
import Footer from "../Footer/Footer";
import Header from "../Header/Header";
import Loading from "../Loading/LoadingPage/Loading";
import Products from "../Products/Products";
import style from "./HomePage.module.css";

const HomePage = () => {
  const dispatch = useAppDispatch();
  const { email, fullName } = useAppSelector((state) => state.auth);
  const products = useAppSelector((state) => state.products.products);
  const allProducts = useAppSelector((state) => state.products.allProducts);
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const {
    firstContentIndex,
    lastContentIndex,
    nextPage,
    prevPage,
    page,
    setPage,
    totalPages,
  } = usePagination({
    contentPerPage: 9,
    count: allProducts.length,
  });
  useEffect(() => {
    const data = {
      page: lastContentIndex,
      category: selectedCategory,
    };

    if (selectedCategory === "all") {
      dispatch(getProducts({ page: lastContentIndex }));
      dispatch(getAllProducts());
    } else {
      dispatch(getCategoryProducts(data));
    }
  }, [dispatch, lastContentIndex, selectedCategory]);

  const selectCategory = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setPage(1);
    setSelectedCategory(e.target.value);
    localStorage.setItem("page", (1).toString());
  };
  return (
    <>
      <div className={style.main}>
        <div className={style.main}>
          <Header email={email} />
          {products.length > 0 ? (
            <>
              <h1>Welcome {fullName}</h1>
              <div className={style.main_filter}>
                <h2>Filter</h2>
                <form>
                  <label>
                    <span>Search by name</span>
                    <input
                      name="search"
                      type="search"
                      placeholder="search by title"
                      /* onChange={(event) => setValue(event.target.value)} */
                    />
                  </label>
                  <label>
                    <span>Sort by category</span>
                    <select onChange={(e) => selectCategory(e)}>
                      <option value="all">All</option>
                      {[
                        ...new Set(
                          allProducts.map(
                            (el: { category: string }) => el.category
                          )
                        ),
                      ].map((el) => (
                        <option value={el} key={`option-${el}`}>
                          {el}
                        </option>
                      ))}
                    </select>
                  </label>
                  <label>
                    <span>Sort by price</span>
                    <select>
                      <option value="">All</option>
                      <option value="0_x_500">&lt; 500 $</option>
                      <option value="500_x_1000">500 $ - 1000 $</option>
                      <option value="1000_x_1500">1000 $ - 1500 $</option>
                      <option value="1500_x_more">&lt; 1500 $</option>
                    </select>
                  </label>
                </form>
              </div>
              <Products
                lastContentIndex={lastContentIndex}
                firstContentIndex={firstContentIndex}
              />
              <div className={style.main_pagination}>
                <button
                  onClick={prevPage}
                  className={style.main_pagination_page}
                >
                  &lt;
                </button>
                {/* @ts-ignore */}
                {[...Array(totalPages).keys()].map((el) => (
                  <button
                    onClick={() => setPage(el + 1)}
                    key={el}
                    className={
                      page === el + 1
                        ? style.main_pagination_button_active
                        : style.main_pagination_page
                    }
                  >
                    {page === el + 1 || el === 0 || el === totalPages - 1
                      ? el + 1
                      : "..."}
                  </button>
                ))}
                <button
                  onClick={nextPage}
                  className={style.main_pagination_page}
                >
                  &gt;
                </button>
              </div>
            </>
          ) : (
            <Loading />
          )}
        </div>
        <Footer />
      </div>
    </>
  );
};

export default HomePage;
