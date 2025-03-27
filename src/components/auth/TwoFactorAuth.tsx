
import React, { useState } from "react";
import { Shield, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormField, FormItem, FormLabel, FormControl, FormDescription } from "@/components/ui/form";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp";

const otpSchema = z.object({
  otp: z.string().min(6, {
    message: "Your verification code must be 6 characters.",
  }),
});

type OtpFormValues = z.infer<typeof otpSchema>;

interface TwoFactorAuthProps {
  open: boolean;
  onClose: () => void;
  onComplete: () => void;
  email?: string;
}

const TwoFactorAuth: React.FC<TwoFactorAuthProps> = ({
  open,
  onClose,
  onComplete,
  email = "your email",
}) => {
  const [isVerifying, setIsVerifying] = useState(false);
  const [resendDisabled, setResendDisabled] = useState(false);
  const [resendTimer, setResendTimer] = useState(0);
  const { toast } = useToast();

  const form = useForm<OtpFormValues>({
    resolver: zodResolver(otpSchema),
    defaultValues: {
      otp: "",
    },
  });

  const handleVerifyCode = (data: OtpFormValues) => {
    setIsVerifying(true);
    
    // Simulate verification process
    setTimeout(() => {
      setIsVerifying(false);
      toast({
        title: "Verification Successful",
        description: "Your account is now secure with two-factor authentication.",
      });
      onComplete();
    }, 1500);
  };

  const handleResendCode = () => {
    // Disable resend button and start timer
    setResendDisabled(true);
    setResendTimer(60);
    
    const intervalId = setInterval(() => {
      setResendTimer((prev) => {
        if (prev <= 1) {
          clearInterval(intervalId);
          setResendDisabled(false);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    // Show toast
    toast({
      title: "Verification Code Sent",
      description: `A new code has been sent to ${email}.`,
    });
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <div className="mx-auto mb-4 h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
            <Shield className="h-6 w-6 text-primary" />
          </div>
          <DialogTitle className="text-center">Two-Factor Authentication</DialogTitle>
          <DialogDescription className="text-center">
            For your security, we've sent a 6-digit verification code to {email}
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleVerifyCode)} className="space-y-4 py-4">
            <FormField
              control={form.control}
              name="otp"
              render={({ field }) => (
                <FormItem className="mx-auto max-w-[250px]">
                  <FormControl>
                    <InputOTP maxLength={6} {...field}>
                      <InputOTPGroup>
                        <InputOTPSlot index={0} />
                        <InputOTPSlot index={1} />
                        <InputOTPSlot index={2} />
                        <InputOTPSlot index={3} />
                        <InputOTPSlot index={4} />
                        <InputOTPSlot index={5} />
                      </InputOTPGroup>
                    </InputOTP>
                  </FormControl>
                  <FormDescription className="text-center">
                    Enter the 6-digit code sent to your email
                  </FormDescription>
                </FormItem>
              )}
            />

            <div className="text-center text-sm">
              <button
                type="button"
                className="text-primary underline text-sm disabled:text-muted-foreground disabled:no-underline disabled:cursor-not-allowed"
                onClick={handleResendCode}
                disabled={resendDisabled}
              >
                {resendDisabled 
                  ? `Resend code in ${resendTimer}s` 
                  : "Didn't receive a code? Resend"}
              </button>
            </div>

            <DialogFooter className="mt-6">
              <Button 
                type="submit" 
                className="w-full" 
                disabled={isVerifying || !form.formState.isValid}
              >
                {isVerifying ? "Verifying..." : "Verify"}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default TwoFactorAuth;
