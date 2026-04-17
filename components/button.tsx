import { ButtonHTMLAttributes, AnchorHTMLAttributes } from "react";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  href?: undefined;
};

type AnchorProps = AnchorHTMLAttributes<HTMLAnchorElement> & {
  href: string;
};

type Props = (ButtonProps | AnchorProps) & {
  children: React.ReactNode;
};

export function Button({ children, className = "", ...props }: Props) {
  const classes = `inline-flex items-center justify-center gap-2 px-6 py-3 border border-border text-fg font-mono text-mono uppercase tracking-widest hover:border-border-strong active:border-signal active:text-signal transition-colors duration-base ${className}`;

  if ("href" in props && props.href) {
    return (
      <a className={classes} {...(props as AnchorProps)}>
        {children}
      </a>
    );
  }

  return (
    <button className={classes} {...(props as ButtonProps)}>
      {children}
    </button>
  );
}
