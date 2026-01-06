"use client";
import { useEffect } from "react";
import { loadRecaptcha } from "../lib/loadRecaptcha";

export function useRecaptchaConsent() {
  useEffect(() => {
    const saved = localStorage.getItem("muta-consent");
    if (saved === "accepted_all" || saved === "accepted_essential") loadRecaptcha();
    const handler = () => loadRecaptcha();
    window.addEventListener("consent:ready", handler);
    return () => window.removeEventListener("consent:ready", handler);
  }, []);
}