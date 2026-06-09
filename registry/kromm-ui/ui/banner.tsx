"use client";

import * as React from "react";
import { X } from "lucide-react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { useControllableState } from "@/registry/kromm-ui/hooks/use-controllable-state";

const bannerVariants = cva(
  "relative flex w-full items-start gap-3 rounded-none border px-4 py-3 text-sm transition-colors",
  {
    variants: {
      variant: {
        announcement:
          "h-8 items-center justify-center gap-0 rounded-none border-0 bg-foreground px-4 py-0 text-center text-[11px] font-semibold leading-none text-background shadow-none",
      },
      size: {
        sm: "px-3 py-2 text-xs",
        md: "px-4 py-3 text-sm",
        lg: "px-5 py-4 text-base",
      },
    },
    defaultVariants: {
      variant: "announcement",
      size: "md",
    },
  },
);

type BannerContextValue = {
  open: boolean;
  setOpen: (open: boolean) => void;
};

const BannerContext = React.createContext<BannerContextValue | null>(null);

function useBanner() {
  const context = React.useContext(BannerContext);

  if (!context) {
    throw new Error("Banner compound components must be used inside <Banner />");
  }

  return context;
}

type BannerRootProps = React.HTMLAttributes<HTMLDivElement> &
  VariantProps<typeof bannerVariants> & {
    open?: boolean;
    defaultOpen?: boolean;
    onOpenChange?: (open: boolean) => void;
    showClose?: boolean;
  };

function Banner({
  className,
  variant,
  size,
  showClose = false,
  open: controlledOpen,
  defaultOpen = true,
  onOpenChange,
  children,
  role = "status",
  ...props
}: BannerRootProps) {
  const [open, setOpen] = useControllableState({
    value: controlledOpen,
    defaultValue: defaultOpen,
    onChange: onOpenChange,
  });

  if (!open) {
    return null;
  }

  return (
    <BannerContext.Provider value={{ open, setOpen }}>
      <div
        role={role}
        data-state={open ? "open" : "closed"}
        className={cn(bannerVariants({ variant, size }), className)}
        {...props}
      >
        {children}
        {showClose && <BannerClose />}
      </div>
    </BannerContext.Provider>
  );
}

type BannerIconProps = React.HTMLAttributes<HTMLDivElement>;

function BannerIcon({ className, ...props }: BannerIconProps) {
  return (
    <div
      className={cn("mt-0.5 flex shrink-0 items-center justify-center", className)}
      {...props}
    />
  );
}

type BannerContentProps = React.HTMLAttributes<HTMLDivElement>;

function BannerContent({ className, ...props }: BannerContentProps) {
  return <div className={cn("min-w-0 flex-1 space-y-1", className)} {...props} />;
}

type BannerTitleProps = React.HTMLAttributes<HTMLParagraphElement>;

function BannerTitle({ className, ...props }: BannerTitleProps) {
  return <p className={cn("font-medium leading-none", className)} {...props} />;
}

type BannerDescriptionProps = React.HTMLAttributes<HTMLParagraphElement>;

function BannerDescription({ className, ...props }: BannerDescriptionProps) {
  return <p className={cn("text-current/80 leading-relaxed", className)} {...props} />;
}

type BannerActionProps = React.HTMLAttributes<HTMLDivElement>;

function BannerAction({ className, ...props }: BannerActionProps) {
  return <div className={cn("shrink-0", className)} {...props} />;
}

type BannerCloseProps = React.ButtonHTMLAttributes<HTMLButtonElement>;

function BannerClose({ className, children, onClick, ...props }: BannerCloseProps) {
  const { setOpen } = useBanner();

  return (
    <Button
      type="button"
      size="icon-xs"
      variant="ghost"
      className={className}
      aria-label="Close banner"
      onClick={(event) => {
        onClick?.(event);

        if (!event.defaultPrevented) {
          setOpen(false);
        }
      }}
      {...props}
    >
      {children ?? <X className="size-4" />}
    </Button>
  );
}

export {
  Banner,
  BannerIcon,
  BannerContent,
  BannerTitle,
  BannerDescription,
  BannerAction,
  BannerClose,
  bannerVariants,
};

export type {
  BannerRootProps,
  BannerIconProps,
  BannerContentProps,
  BannerTitleProps,
  BannerDescriptionProps,
  BannerActionProps,
  BannerCloseProps,
};
