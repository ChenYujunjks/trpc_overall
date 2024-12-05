"use client";
import { toast } from "@/hooks/use-toast";
import { Toaster } from "@/components/ui/toaster"; // 确保路径正确

import { Button } from "@/components/ui/button"; // 确保路径正确
export default function App() {
  function handleSubmit() {
    toast({
      title: "Form Submitted",
      description: "Your data has been saved successfully.",
    });
  }

  return (
    <>
      <Toaster />
      <div
        style={{ display: "flex", justifyContent: "center", marginTop: "50px" }}
      >
        <Button onClick={handleSubmit} variant="default">
          Submit
        </Button>
      </div>
    </>
  );
}
