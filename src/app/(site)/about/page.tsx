import type { Metadata } from "next";
import { AboutView } from "@/components/v4/AboutView";

export const metadata: Metadata = {
  title: "About — Anchored",
  description: "Anchored is a Roblox-native production company in Seoul. We find creators native to Roblox, assemble the right team, and stay through live operations.",
};

export default function AboutPage() {
  return <AboutView />;
}
