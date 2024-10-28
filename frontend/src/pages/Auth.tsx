import { login, signup } from "@/api/auth";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { tokenAtom, userAtom } from "@/store/user";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useSetRecoilState } from "recoil";

const Auth = () => {
  const setToken = useSetRecoilState(tokenAtom);
  const setUser = useSetRecoilState(userAtom);

  const navigate = useNavigate();

  const [signupData, setSignupData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });
  const [loginData, setLoginData] = useState({
    login_email: "",
    login_password: "",
  });

  const onSignupChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSignupData((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };
  const onLoginChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLoginData((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const handleSignup = async () => {
    console.log(signupData);
    if (
      signupData.email === "" ||
      signupData.firstName === "" ||
      signupData.lastName === "" ||
      signupData.password === ""
    ) {
      toast.error("All fields are required");
      return;
    }
    if (signupData.password.length < 4) {
      toast.error("Password must be at least 4 characters long");
      return;
    }
    const toastId = toast.loading("Creating account...");
    const result = await signup(
      signupData.firstName,
      signupData.lastName,
      signupData.email,
      signupData.password
    );
    console.log(result);
    if (result?.success) {
      setToken(result.token);
      setUser({
        firstName: result?.user?.firstName,
        lastName: result?.user?.lastName,
        email: result?.user?.email,
        image: result?.user?.image,
      });
      toast.dismiss(toastId);
      toast.success("Account created successfully", { autoClose: 3000 });
      navigate("/");
    } else {
      toast.dismiss(toastId);
      toast.error(result?.message);
    }
  };
  const handleLogin = async () => {
    const toastId = toast.loading("Logging in...");
    console.log(loginData);
    if (loginData.login_email === "" || loginData.login_password === "") {
      toast.error("All fields are required");
      return;
    }

    const result = await login(loginData.login_email, loginData.login_password);
    console.log(result);
    if (result?.success) {
      setToken(result.token);
      setUser({
        firstName: result?.user?.firstName,
        lastName: result?.user?.lastName,
        email: result?.user?.email,
        image: result?.user?.image,
      });
      toast.dismiss(toastId);
      toast.success("Logged in successfully", { autoClose: 3000 });
      navigate("/");
    } else {
      toast.dismiss(toastId);
      toast.error(result?.message);
    }
  };
  return (
    <div className="h-[calc(100vh-90px)] flex items-center justify-center">
      <Tabs defaultValue="signup" className="w-[400px]">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="signup">Signup</TabsTrigger>
          <TabsTrigger value="login">Login</TabsTrigger>
        </TabsList>
        <TabsContent value="signup">
          <Card>
            <CardHeader>
              <CardTitle>Create Account</CardTitle>
              <CardDescription>
                Create a new account to virtually connect with the world.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="space-y-1">
                <Label htmlFor="firstName">First Name</Label>
                <Input
                  id="firstName"
                  placeholder="Enter first name"
                  onChange={onSignupChange}
                />
              </div>
              <div className="space-y-1">
                <Label htmlFor="lastName">Last Name</Label>
                <Input
                  id="lastName"
                  placeholder="Enter last name"
                  onChange={onSignupChange}
                />
              </div>
              <div className="space-y-1">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  placeholder="Enter your email"
                  onChange={onSignupChange}
                />
              </div>
              <div className="space-y-1">
                <Label htmlFor="password">Password</Label>
                <Input
                  type="password"
                  id="password"
                  placeholder="Enter a passeord"
                  onChange={onSignupChange}
                />
              </div>
            </CardContent>
            <CardFooter className="flex w-full justify-end">
              <Button variant={"destructive"} onClick={handleSignup}>
                Create
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
        <TabsContent value="login">
          <Card>
            <CardHeader>
              <CardTitle>Login</CardTitle>
              <CardDescription>
                Login to your account to access all features.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="space-y-1">
                <Label htmlFor="login_email">Email</Label>
                <Input
                  id="login_email"
                  placeholder="Enter your email"
                  onChange={onLoginChange}
                />
              </div>
              <div className="space-y-1">
                <Label htmlFor="login_password">Password</Label>
                <Input
                  type="password"
                  id="login_password"
                  placeholder="Enter your password"
                  onChange={onLoginChange}
                />
              </div>
            </CardContent>
            <CardFooter className="flex w-full justify-end">
              <Button variant={"destructive"} onClick={handleLogin}>
                Login
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Auth;
