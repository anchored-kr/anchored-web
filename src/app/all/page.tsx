import type { Metadata } from "next";
import { V4Root } from "@/components/v4/Root";
import { AllView } from "@/components/v4/AllView";

export const metadata: Metadata = { title: "All projects — Anchored" };

export default function AllPage() {
  return (
    <V4Root>
      <AllView />
    </V4Root>
  );
}
