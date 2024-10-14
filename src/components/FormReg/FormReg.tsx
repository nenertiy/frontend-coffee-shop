import { FC } from "react";
import { NavLink, useNavigate } from "react-router-dom";

import styles from "./FormReg.module.scss";
import { SubmitHandler, useForm } from "react-hook-form";
import { registration } from "../../utils/api";
import { useQueryClient } from "@tanstack/react-query";

const FormReg: FC = () => {
  interface RegFormData {
    email: string;
    name: string;
    password: string;
  }
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { register, handleSubmit, reset } = useForm<RegFormData>();

  const onSubmit: SubmitHandler<RegFormData> = async (data) => {
    try {
      await registration({
        email: data.email,
        name: data.name,
        password: data.password,
      });
      navigate("/login");
      queryClient.invalidateQueries({
        queryKey: ["cart", data.email],
      });
      reset();
    } catch {
      console.error("Failed");
    }
  };

  return (
    <div className={styles.container}>
      <h2>Registration</h2>
      <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
        <div className={styles.email}>
          <input
            {...register("email", { required: true })}
            type="email"
            placeholder="Email"
          />
        </div>
        <div className={styles.name}>
          <input
            {...register("name", { required: true })}
            type="text"
            placeholder="Name"
          />
        </div>
        <div className={styles.password}>
          <input
            {...register("password", { required: true })}
            type="password"
            placeholder="Password"
          />
        </div>
        <div>
          <NavLink to="/login" className={styles.account}>
            Have an account?
          </NavLink>
        </div>
        <div className={styles.container_button}>
          <button className={styles.button}>Registrate</button>
        </div>
      </form>
    </div>
  );
};

export default FormReg;
