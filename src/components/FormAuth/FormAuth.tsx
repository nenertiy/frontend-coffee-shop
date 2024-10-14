import { FC } from "react";
import { NavLink, useNavigate } from "react-router-dom";

import styles from "./FormAuth.module.scss";
import { SubmitHandler, useForm } from "react-hook-form";
import { auth } from "../../utils/api";
import { useAuthStore } from "../../store/authStore";
import { useQueryClient } from "@tanstack/react-query";

const FormAuth: FC = () => {
  interface AuthFormData {
    email: string;
    password: string;
  }

  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { register, handleSubmit, reset } = useForm<AuthFormData>();
  const login = useAuthStore((state) => state.login);

  const onSubmit: SubmitHandler<AuthFormData> = async (data) => {
    try {
      const response = await auth({
        email: data.email,
        password: data.password,
      });
      login(response.access_token, response.role, response.id);
      queryClient.invalidateQueries({
        queryKey: ["cart"],
      });
      navigate("/menu");
      reset();
    } catch {
      console.error("Failed");
    }
  };

  return (
    <div className={styles.container}>
      <h2>Sign in</h2>
      <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
        <div className={styles.email}>
          <input
            {...register("email", { required: true })}
            type="email"
            placeholder="Email"
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
          <NavLink to="/registration" className={styles.account}>
            Don't have account?
          </NavLink>
        </div>
        <div className={styles.container_button}>
          <button className={styles.button}>Sign in</button>
        </div>
      </form>
    </div>
  );
};

export default FormAuth;
