import { ButtonHTMLAttributes } from "react";
import Link from "next/link";

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
};

export function Button({ children, className = "", ...props }: Props) {
  const classes = `inline-flex items-center justify-center gap-2 px-6 py-3 border border-border text-fg font-mono text-mono uppercase tracking-widest hover:border-border-strong active:border-signal active:text-signal transition-colors duration-base ${className}`;

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
