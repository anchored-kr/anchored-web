import type { Metadata } from "next";
import { AboutView } from "@/components/v4/AboutView";

export const metadata: Metadata = {
  title: "About — Anchored",
  description: "Anchored is a Roblox-native production company in Seoul that takes responsibility for Roblox projects — what to build, the right team, production, launch and LiveOps.",
};

export default function AboutPage() {
  return <AboutView />;
}
