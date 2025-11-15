// app/components/Container.tsx
import clsx from "clsx";

export default function Container({ className, children }) {
  return (
    <div className={clsx("p-1 space-y-1 lg:p-6 lg:space-y-6", className)}>
      {children}
    </div>
  );
}
