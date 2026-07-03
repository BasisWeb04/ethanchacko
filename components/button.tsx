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
  const classes = `inline-flex items-center justify-center gap-2 px-5 py-2.5 border border-ink text-ink font-sans text-[0.95rem] hover:bg-ink hover:text-paper active:bg-ink active:text-paper transition-colors duration-base ${className}`;

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
