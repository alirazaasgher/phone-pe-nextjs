"use client";

import { Turnstile } from "@marsidev/react-turnstile";

export default function TurnstileWidget({ onSuccess }) {
  return (
    <Turnstile
      siteKey={process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY}
      onSuccess={onSuccess}
      options={{ theme: "light" }}
    />
  );
}
