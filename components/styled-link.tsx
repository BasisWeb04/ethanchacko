import NextLink from "next/link";
import { AnchorHTMLAttributes } from "react";

type Props = AnchorHTMLAttributes<HTMLAnchorElement> & {
  href: string;
  external?: boolean;
  children: React.ReactNode;
};

export function StyledLink({
  href,
  external,
  children,
  className = "",
  ...props
}: Props) {
  const classes = `text-fg underline decoration-fg-dim decoration-1 underline-offset-4 hover:decoration-signal transition-colors duration-base ${className}`;

  if (external) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={classes}
        {...props}
      >
        {children}
      </a>
    );
  }

  return (
    <NextLink href={href} className={classes} {...props}>
      {children}
    </NextLink>
  );
}
