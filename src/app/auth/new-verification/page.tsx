"use client";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useState, useCallback, useEffect } from "react";
import { Card, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { BeatLoader } from "react-spinners";
import { CheckCircledIcon } from "@radix-ui/react-icons";
import { ExclamationTriangleIcon } from "@radix-ui/react-icons";
import { newVerification } from "@/actions/new-verification";

export default function NewVerificationPage() {
  const searchParams = useSearchParams();
  const token = searchParams.get("token");

  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");

  const onSubmit = useCallback(() => {
    if (success || error) return;

    if (!token) {
      setError("Missing token!");
      return;
    }
    newVerification(token)
      .then((data) => {
        setSuccess(data.success);
        setError(data.error);
      })
      .catch(() => {
        setError("Something went wrong!");
      });
  }, [token, success, error]);

  useEffect(() => {
    onSubmit();
  }, [onSubmit]);

  return (
    <Card className="my-[50px] mx-[10%]">
      <CardHeader>
        <CardTitle>Confirming your verification</CardTitle>
      </CardHeader>

      <div className="flex items-center w-full justify-center">
        {!success && !error && <BeatLoader />}
        {success && (
          <div className="bg-emerald-500/15 p-3 rounded-md flex items-center gap-x-2 text-sm text-emerald-500">
            <CheckCircledIcon className="h-4 w-4" />
            <p>{success}</p>
          </div>
        )}
        {error && (
          <div className="bg-destructive/15 p-3 rounded-md flex items-center gap-x-2 text-sm text-destructive">
            <ExclamationTriangleIcon className="h-4 w-4" />
            <p>{error}</p>
          </div>
        )}
      </div>

      <CardFooter>
        <Link href="/auth/login">Back to login</Link>
      </CardFooter>
    </Card>
  );
}
