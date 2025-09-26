"use client";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import React, { useContext, useState } from "react";
import { useRouter } from "next/navigation";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "@/firebaseConfig";
import { doc, getDoc } from "firebase/firestore";
import { UserDetailContext } from "@/context/UserDetailContext";

export function Signin({ showSignupp }: { showSignupp: () => void }) {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const userDetailContext = useContext(UserDetailContext);
  const { setUserDetail } = userDetailContext;
  const router = useRouter();

  if (!userDetailContext) {
    throw new Error("SignIn must be used within a UserDetailContext.Provider");
  }

  // const handleInputChange =
  //   (setter: React.Dispatch<React.SetStateAction<string>>) =>
  //   (value: string) => {
  //     setter(value);
  //     if (errorMessage) setErrorMessage(null);
  //   };

  const handleLogin = async () => {
    setErrorMessage(null);

    if (!email.trim() || !password.trim()) {
      setErrorMessage("Please enter both email and password.");
      return;
    }

    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;

      if (user.emailVerified) {
        // Fetch Firestore user profile
        const docRef = doc(db, "users", user.uid);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          const data = docSnap.data();

          // console.log("User profile data:", data);

          const userData = {
            uid: user.uid,
            email: user.email,
            role: data.role || null,
            approved: data.approved ?? null,
            hamlet: data.hamlet || null,
            firstName: data.firstName || null,
            lastName: data.lastName || null,
          };
          setUserDetail(userData);
          sessionStorage.setItem("userDetail", JSON.stringify(userData));

          alert("Success Login Successful!");
          router.push("/");
        } else {
          setErrorMessage("User profile not found in database.");
          return;
        }
      } else {
        setErrorMessage("Please verify your email before logging in.");
        return;
      }

      setEmail("");
      setPassword("");
    } catch (error: unknown) {
      if (typeof error === "object" && error !== null && "code" in error) {
        const err = error as { code: string; message?: string };
        switch (err.code) {
          case "auth/user-not-found":
            setErrorMessage("No account found with this email.");
            break;
          case "auth/wrong-password":
            setErrorMessage("Incorrect password.");
            break;
          case "auth/invalid-email":
            setErrorMessage("Invalid email address.");
            break;
          default:
            setErrorMessage(
              `Login failed. Please try again. ${err.message ?? ""}`
            );
            break;
        }
      } else {
        setErrorMessage("An unknown error occurred during login.");
      }
    }
  };
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Login to your account</CardTitle>
        <CardDescription>
          Enter your email below to login to your account
        </CardDescription>
        <CardAction>
          <Button variant="link" onClick={showSignupp}>
            Sign Up
          </Button>
        </CardAction>
      </CardHeader>
      <CardContent>
        <form>
          <div className="flex flex-col gap-6">
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                onChange={(e) => setEmail(e.target.value)}
                placeholder="m@example.com"
                required
              />
            </div>
            <div className="grid gap-2">
              <div className="flex items-center">
                <Label htmlFor="password">Password</Label>
                <a
                  href="#"
                  className="ml-auto inline-block text-sm underline-offset-4 hover:underline"
                >
                  Forgot your password?
                </a>
              </div>
              <Input
                id="password"
                type="password"
                required
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            {errorMessage && (
              <p style={{ color: "red", marginBottom: 10 }}>{errorMessage}</p>
            )}
          </div>
        </form>
      </CardContent>
      <CardFooter className="flex-col gap-2">
        <Button type="submit" className="w-full" onClick={handleLogin}>
          Login
        </Button>
        <Button variant="outline" className="w-full">
          Login with Google
        </Button>
      </CardFooter>
    </Card>
  );
}
