import React, { useState, type ChangeEvent } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { motion } from "motion/react";
import { toast } from "sonner";
import { X } from "lucide-react";
import { Button } from "../app/components/ui/button";
import { Input } from "../app/components/ui/input";
import { Label } from "../app/components/ui/label";
import { useAuth } from "../context/AuthContext";

export function LoginModal() {
    const handleNameChange = (e: ChangeEvent<HTMLInputElement>) => setName(e.target.value);
    const handleEmailChange = (e: ChangeEvent<HTMLInputElement>) => setEmail(e.target.value);
    const handlePasswordChange = (e: ChangeEvent<HTMLInputElement>) => setPassword(e.target.value);

  const { showLoginModal, closeLoginModal, login, register, isLoading } = useAuth();
  const [isRegister, setIsRegister] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email || !password || (isRegister && !name)) {
      toast.error("Please fill in all fields");
      return;
    }

    try {
      if (isRegister) {
        await register(email, password, name);
        toast.success("Registration successful!");
      } else {
        await login(email, password);
        toast.success("Login successful!");
      }
      setEmail("");
      setPassword("");
      setName("");
    } catch (error: any) {
      toast.error(error.message || "An error occurred");
    }
  };

  return (
    <Dialog.Root open={showLoginModal} onOpenChange={closeLoginModal}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm" />
        <Dialog.Content className="fixed z-50 left-1/2 top-1/2 w-full max-w-md -translate-x-1/2 -translate-y-1/2 rounded-2xl bg-white p-8 shadow-2xl">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
          >
            <div className="flex items-center justify-between mb-6">
              <Dialog.Title className="text-2xl font-black text-slate-900">
                {isRegister ? "Create Account" : "Sign In"}
              </Dialog.Title>
              <Dialog.Close asChild>
                <button className="rounded-full p-1 hover:bg-slate-100 transition-colors">
                  <X className="w-5 h-5 text-slate-500" />
                </button>
              </Dialog.Close>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              {isRegister && (
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name</Label>
                  <Input
                    id="name"
                    type="text"
                    placeholder="John Doe"
                    value={name}
                    onChange={handleNameChange}
                    disabled={isLoading}
                  />
                </div>
              )}

              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="you@example.com"
                  value={email}
                  onChange={handleEmailChange}
                  disabled={isLoading}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={handlePasswordChange}
                  disabled={isLoading}
                />
              </div>

              <Button
                type="submit"
                disabled={isLoading}
                className="w-full bg-indigo-600 hover:bg-indigo-700 text-white text-lg font-bold h-12 rounded-xl"
              >
                {isLoading ? "Loading..." : isRegister ? "Create Account" : "Sign In"}
              </Button>
            </form>

            <div className="mt-6 text-center">
              <p className="text-slate-600 text-sm">
                {isRegister ? "Already have an account? " : "Don't have an account? "}
                <button
                  onClick={() => {
                    setIsRegister(!isRegister);
                    setEmail("");
                    setPassword("");
                    setName("");
                  }}
                  className="text-indigo-600 font-bold hover:underline"
                >
                  {isRegister ? "Sign In" : "Create One"}
                </button>
              </p>
            </div>
          </motion.div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
