import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { useSelector, useDispatch } from "react-redux";
import { history } from "_helpers";
import { useLoginMutation } from "_store/auth.api";
import { authActions } from "_store/auth.slice";
import {
  Alert,
  Button,
  Card,
  Col,
  Container,
  Form,
  Row,
} from "react-bootstrap";
import Logo from "_images/PatientAPP logo.png";

export { Login };

function Login() {
  const dispatch = useDispatch();
  const [login, { error: authError }] = useLoginMutation();
  const authUser = useSelector((state) => state.auth.user);

  useEffect(() => {
    // redirect to home if already logged in
    if (authUser) history.navigate("/");

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // form validation rules
  const validationSchema = Yup.object().shape({
    // yup email validation
    email: Yup.string().email("Email is invalid").required("Email is required"),
    password: Yup.string().required("Password is required"),
  });
  const formOptions = { resolver: yupResolver(validationSchema) };

  // get functions to build form with useForm() hook
  const { register, handleSubmit, formState } = useForm(formOptions);
  const { errors } = formState;

  const onSubmit = async ({ email, password }) => {
    const result = await login({ email, password });
    if (result) {
      dispatch(authActions.setCredentials(result));
      history.navigate("/");
    }
  };

  return (
      <Container>
        <Row className="vh-100 d-flex justify-content-center align-items-center">
          <Col md={8} lg={6} xs={12}>
            <div className="border border-3 border-primary"></div>
            <Card className="shadow">
              <Card.Body>
                <div className="mb-3 mt-md-4">
                  <img
                    src={Logo}
                    width="100%"
                    alt="PatientAPP"
                    className="d-inline-block align-top"
                  />
                  <div className="mb-3">
                    <Form onSubmit={handleSubmit(onSubmit)}>
                      <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label className="text-center">
                          Email address
                        </Form.Label>
                        <Form.Control
                          type="email"
                          name="email"
                          {...register("email")}
                          className={`${errors.email ? "is-invalid" : ""}`}
                          placeholder="Enter email"
                        />
                        <div className="invalid-feedback">
                          {errors.email?.message}
                        </div>
                      </Form.Group>
                      <Form.Group
                        className="mb-3"
                        controlId="formBasicPassword"
                      >
                        <Form.Label>Password</Form.Label>
                        <Form.Control
                          type="password"
                          name="password"
                          {...register("password")}
                          className={`${errors.password ? "is-invalid" : ""}`}
                          placeholder="Password"
                        />
                        <div className="invalid-feedback">
                          {errors.password?.message}
                        </div>
                      </Form.Group>
                      <Form.Group
                        className="mb-3"
                        controlId="formBasicCheckbox"
                      >
                      </Form.Group>
                      <div className="d-grid">
                        <Button variant="primary" type="submit">
                          Login
                        </Button>
                      </div>
                      {authError && (
                        <Alert variant="danger" className="mt-3 mb-0">
                          {authError.message}
                        </Alert>
                      )}
                    </Form>
                  </div>
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
  );
}
