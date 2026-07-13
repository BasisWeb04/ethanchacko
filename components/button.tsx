import { ButtonHTMLAttributes } from "react";
import Link from "next/link";

type Variant = "primary" | "secondary";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  href?: undefined;
};

type LinkProps = {
  href: string;
  children: React.ReactNode;
  className?: string;
  "data-testid"?: string;
};

type Props = (ButtonProps | LinkProps) & {
  children: React.ReactNode;
  variant?: Variant;
};

/*
  Boxed form control, square corners, in the document register. Secondary reads
  as an outlined field; primary is an ink-filled key. Both swap to an azure fill
  with dark on-mark text on hover, the mark-phrase mechanic made interactive.
*/
const VARIANT: Record<Variant, string> = {
  primary:
    "border border-ink bg-ink text-paper hover:bg-mark hover:border-mark hover:text-[color:var(--on-mark)] active:bg-mark active:text-[color:var(--on-mark)]",
  secondary:
    "border border-ink bg-transparent text-ink hover:bg-mark hover:border-mark hover:text-[color:var(--on-mark)] active:bg-mark active:text-[color:var(--on-mark)]",
};

export function Button({
  children,
  className = "",
  variant = "primary",
  ...props
}: Props) {
  const classes = `inline-flex items-center justify-center gap-2 px-5 py-2.5 font-sans text-[0.9rem] font-semibold transition-colors duration-base ${VARIANT[variant]} ${className}`;

  if ("href" in props && props.href) {
    const { href, ...rest } = props as LinkProps;
    return (
      <Link href={href} className={classes} {...rest}>
        {children}
      </Link>
    );
  }

  return (
    <button className={classes} {...(props as ButtonProps)}>
      {children}
    </button>
  );
}
