import { Button, Col, Form, Row } from "react-bootstrap";
import { Controller, FormProvider, useForm } from "react-hook-form";
import { CONSTANTS } from "../common/constants/constants";
import { useLogin } from "../common/services/useAuth";
import { useEffect } from "react";
import Loader from "../components/common/Loader";
import { URLS } from "../common/constants/urls";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../provider/authProvider";

const Login = () => {
  const authCtx = useAuth();
  const navigate = useNavigate();

  const { mutate, data, isPending } = useLogin(URLS.LOGIN);
  const methods = useForm({
    mode: "onBlur",
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const {
    formState: { errors, dirtyFields },
    handleSubmit,
    trigger,
    control,
  } = methods;

  const onSubmit = (data: any) => {
    mutate(data);
  };

  useEffect(() => {
    if (data?.token) {
      authCtx.login(data.token);
      // navigate("/task");
    }
  }, [data, navigate, authCtx, isPending]);

  useEffect(() => {
    if (authCtx.isLoggedIn) navigate("/task");
  }, [authCtx.isLoggedIn, navigate]);

  return (
    <>
      {isPending && <Loader />}
      <div className="container">
        <div
          className="row justify-content-center align-items-center"
          style={{ minHeight: "85vh" }}
        >
          <div className="col-md-12 ">
            <h1 className="text-center mb-5">
              <span>Log in to your</span> ToDo account.
            </h1>
            <FormProvider {...methods}>
              <form onSubmit={handleSubmit(onSubmit)}>
                <Row className="justify-content-md-center">
                  <Col lg="6">
                    <Form.Group className="form-group my-20">
                      <Form.Label htmlFor="cidn">Email Address</Form.Label>
                      <Controller
                        name="email"
                        defaultValue=""
                        control={control}
                        rules={{
                          required: {
                            value: true,
                            message: "This field is required",
                          },
                          pattern: {
                            value: CONSTANTS.EMAIL_REGEX,
                            message: "Invalid email format",
                          },
                        }}
                        render={({ field: { value, onChange, onBlur } }) => (
                          <Form.Control
                            onChange={(e: any) => {
                              onChange(e.target.value);
                              trigger("email");
                            }}
                            onBlur={() => onBlur()}
                            type="text"
                            placeholder=""
                            id="cidn"
                            isValid={!errors.email && dirtyFields.email}
                            isInvalid={!!errors.email}
                            value={value}
                          />
                        )}
                      />
                      {errors?.email?.message && (
                        <Form.Control.Feedback type="invalid">
                          {errors?.email?.message}
                        </Form.Control.Feedback>
                      )}
                    </Form.Group>
                    <Form.Group className="form-group my-20">
                      <Form.Label htmlFor="password">Password</Form.Label>
                      <Controller
                        name="password"
                        control={control}
                        rules={{
                          required: {
                            value: true,
                            message: "This field is required",
                          },
                        }}
                        render={({ field: { value, onChange, onBlur } }) => (
                          <Form.Control
                            onChange={(e: any) => {
                              onChange(e.target.value);
                              trigger("password");
                            }}
                            onBlur={() => onBlur()}
                            value={value}
                            type="password"
                            placeholder=""
                            id="password"
                            isValid={!errors.password && dirtyFields.password}
                            isInvalid={!!errors.password}
                          />
                        )}
                      />
                      {errors?.password?.message && (
                        <Form.Control.Feedback type="invalid">
                          {errors?.password?.message}
                        </Form.Control.Feedback>
                      )}
                    </Form.Group>
                  </Col>
                </Row>
                <Row className="justify-content-md-center my-4">
                  <Col lg="6">
                    <div className="d-flex align-items-center justify-content-center gap-12 mb-30">
                      <Button variant="primary" type="submit">
                        Login
                      </Button>
                    </div>
                  </Col>
                </Row>
              </form>
            </FormProvider>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
