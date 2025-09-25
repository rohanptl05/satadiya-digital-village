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
import {
  createUserWithEmailAndPassword,
  sendEmailVerification,
  User as FirebaseUser,
} from "firebase/auth";
import { auth, db } from "@/firebaseConfig";
import { doc, setDoc } from "firebase/firestore";
import { UserDetailContext } from "@/context/UserDetailContext";

const HAMLETS = [
  "bavli",
  "dungi",
  "gamtal",
  "master",
  "amli",
  "desai",
  "mandir",
  "akkal-tekri",
  "pipla",
];

function SignUp({ showSigninn }: { showSigninn: () => void }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [emailSent, setEmailSent] = useState(false);
  const [loading, setLoading] = useState(false);

  // Village member states
  const [isVillageMember, setIsVillageMember] = useState<null | boolean>(null);
  const [hamlet, setHamlet] = useState("");

  const userDetailContext = useContext(UserDetailContext);
  if (!userDetailContext) {
    throw new Error("SignUp must be used within a UserDetailContext.Provider");
  }
  const { setUserDetail } = userDetailContext;

  const router = useRouter();

  const SaveUser = async (
    user: FirebaseUser,
    role: string,
    hamletValue: string
  ) => {
    await setDoc(doc(db, "users", user.uid), {
      uid: user.uid,
      firstName,
      lastName,
      email: user.email,
      role,
      approved: false,
      hamlet: hamletValue,
      createdAt: new Date(),
    });
  };

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);
    setEmailSent(false);

    // Validation
    if (isVillageMember === null) {
      setErrorMessage("Please specify if you are a village member.");
      return;
    }
    if (isVillageMember === true && !hamlet.trim()) {
      setErrorMessage("Please select your hamlet.");
      return;
    }
    if (!firstName.trim() || !lastName.trim()) {
      setErrorMessage("Please enter both first name and last name.");
      return;
    }
    if (!email.trim() || !password.trim()) {
      setErrorMessage("Please enter both email and password.");
      return;
    }

    const role = isVillageMember ? "member" : "others";
    const hamletValue = isVillageMember ? hamlet : "";

    try {
      setLoading(true);
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;

      await SaveUser(user, role, hamletValue);

      setUserDetail({
        uid: user.uid,
        firstName,
        lastName,
        email: user.email,
        role,
        approved: true,
        hamlet: hamletValue,
      });

      await sendEmailVerification(user);
      setEmailSent(true);
      alert(
        "Verification Email Sent. Please check your inbox and verify your email before logging in."
      );

      router.push("/");
    } catch (error: any) {
      switch (error.code) {
        case "auth/email-already-in-use":
          setErrorMessage("This email is already registered.");
          break;
        case "auth/invalid-email":
          setErrorMessage("Invalid email address.");
          break;
        case "auth/weak-password":
          setErrorMessage("Password should be at least 6 characters.");
          break;
        default:
          setErrorMessage(`Signup failed. Please try again. ${error.message}`);
          break;
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Create your account</CardTitle>
        <CardDescription>Enter your details below to sign up.</CardDescription>
        <CardAction>
          <Button variant="link" onClick={showSigninn}>
            Back to Login
          </Button>
        </CardAction>
      </CardHeader>

      <CardContent>
        <form onSubmit={handleSignup}>
          <div className="flex flex-col gap-6">
            {/* Village Member question */}
            <div className="grid gap-2">
              <Label>Are you a member of the village?</Label>
              <div className="flex gap-4 mt-1">
                <Button
                  variant={isVillageMember === true ? "default" : "outline"}
                  onClick={() => setIsVillageMember(true)}
                  type="button"
                >
                  Yes
                </Button>
                <Button
                  variant={isVillageMember === false ? "default" : "outline"}
                  onClick={() => setIsVillageMember(false)}
                  type="button"
                >
                  No
                </Button>
              </div>
            </div>

            {/* Hamlet selection if yes */}
            {isVillageMember && (
              <div className="grid gap-2">
                <Label htmlFor="hamlet">Select your Hamlet</Label>
                <select
                  id="hamlet"
                  value={hamlet}
                  onChange={(e) => setHamlet(e.target.value)}
                  required
                  className="rounded border p-2 bg-white text-black dark:bg-gray-800 dark:text-white"
                >
                  <option value="">-- Select Hamlet --</option>
                  {HAMLETS.map((h) => (
                    <option
                      key={h}
                      value={h}
                      className="bg-white text-black dark:bg-gray-800 dark:text-white"
                    >
                      {h.charAt(0).toUpperCase() + h.slice(1)} Faliya
                    </option>
                  ))}
                </select>
              </div>
            )}

            {/* First Name */}
            <div className="grid gap-2">
              <Label htmlFor="firstName">First Name</Label>
              <Input
                id="firstName"
                type="text"
                value={firstName}
                placeholder="First Name"
                required
                onChange={(e) => setFirstName(e.target.value)}
              />
            </div>

            {/* Last Name */}
            <div className="grid gap-2">
              <Label htmlFor="lastName">Last Name</Label>
              <Input
                id="lastName"
                type="text"
                value={lastName}
                placeholder="Last Name"
                required
                onChange={(e) => setLastName(e.target.value)}
              />
            </div>

            {/* Email */}
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={email}
                placeholder="m@example.com"
                required
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            {/* Password */}
            <div className="grid gap-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                value={password}
                required
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            {errorMessage && (
              <p className="text-red-600 mt-2 text-center">{errorMessage}</p>
            )}
            {emailSent && (
              <p className="text-green-600 mt-2 text-center">
                Verification email sent, please verify your email.
              </p>
            )}
          </div>
          <CardFooter className="flex-col gap-2 mt-4">
            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? "Signing Up..." : "Sign Up"}
            </Button>
            <Button variant="outline" className="w-full" type="button">
              Signup with Google
            </Button>
          </CardFooter>
        </form>
      </CardContent>
    </Card>
  );
}

export default SignUp;
