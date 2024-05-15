import DefaultLayout from "@/layouts/default";
import { Button, Card, CardBody, Image, Input, Textarea } from "@nextui-org/react";
import { useFormik } from "formik";
import { useRouter } from "next/router";
import * as Yup from 'yup';

type FormData = {
  email: string;
  password: string;
};

const formInitialData: FormData ={
	email: '',
	password: ''
}
const Login = () => {
	const navigation =  useRouter();
//   const user = JSON.parse(String(localStorage.getItem("user")));
  const loginFormik = useFormik({
    initialValues: formInitialData,
    validationSchema: Yup.object().shape({
      email: Yup.string()
        .email("Formato de email inválido")
        .required("E-mail é um campo obrigatório"),
      password: Yup.string()
        .min(6, "A senha deve ter no minimo 6 caracteres")
        .required("Senha é um campo obrigatório"),
    }),
    onSubmit: (values) => handleSubmit(values),
  });

  const handleSubmit = (values: any) => {
	navigation.push("home")
  };

  return (
    <DefaultLayout>
      <section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10 w-full">
        <Card className="w-1/2">
          <CardBody className="flex flex-col gap-10 w-full justify-center items-center p-10">
            <Image width={250} alt="Gestão estoque logo" src="/img/logo.png" />
            <form
              onSubmit={loginFormik.handleSubmit}
              className="flex flex-col gap-10 w-full justify-center items-center p-10"
            >
              <Input
                name="email"
                label="E-mail"
                type="email"
                className="w-3/4"
                value={loginFormik.values.email}
                onChange={loginFormik.handleChange}
                isRequired={true}
                isInvalid={
                  loginFormik.touched.email && Boolean(loginFormik.errors.email)
                }
                errorMessage={loginFormik.errors.email}
                onBlur={loginFormik.handleBlur}
              />
              <Input
                name="password"
                label="Senha"
                type="password"
                className="w-3/4"
                value={loginFormik.values.password}
                onChange={loginFormik.handleChange}
                isRequired={true}
                isInvalid={
                  loginFormik.touched.password &&
                  Boolean(loginFormik.errors.password)
                }
                errorMessage={loginFormik.errors.password}
                onBlur={loginFormik.handleBlur}
              />
              <Button color="primary" className="w-3/4" type="submit">
                Login
              </Button>
            </form>
          </CardBody>
        </Card>
      </section>
    </DefaultLayout>
  );
};

export default Login;
