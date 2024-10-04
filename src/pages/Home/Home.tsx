import { FC } from "react";

import coffeeBag from "./../../assets/img/coffee_bag.png";
import coffeeBeans from "./../../assets/img/coffee_beans.png";
import coffeeBean from "./../../assets/img/coffee_bean.png";

import styles from "./Home.module.scss";

const Home: FC = () => {
  return (
    <div className={styles.home}>
      <div className={styles.container}>
        <section className={styles.section_coffee}>
          <div>
            <img
              className={styles.coffee_bean}
              src={coffeeBean}
              alt=""
            />
          </div>
          <div className={styles.text}>
            <h5>Small bean, big impact</h5>
            <p>
              Here's to the farmers, roasters and baristas who work relentlessly to craft the
              perfect cup.
            </p>
          </div>
        </section>
        <section className={styles.section_coffee_bag}>
          <div className={styles.coffee}>
            <div className={styles.beans_card}>
              <img
                className={styles.coffee_beans}
                src={coffeeBeans}
                alt=""
              />
              <div className={styles.coffee_card}>expresso milk</div>
            </div>
            <img
              className={styles.coffee_bag}
              src={coffeeBag}
              alt=""
            />
          </div>
          <div className={styles.container_title}>
            <p className={styles.title}>delicious coffee to go</p>
            <div className={styles.coffee_list}>
              <span className={styles.coffee_item}>Cold coffee</span>
              <span className={styles.coffee_item}>Craft drink</span>
              <span className={styles.coffee_item}>With coconut milk</span>
              <span className={styles.coffee_item}>Expresso based</span>
              <span className={styles.coffee_item}>Cappuccino/latte</span>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Home;
