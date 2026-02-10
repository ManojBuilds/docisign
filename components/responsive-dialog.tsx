"use client";

import * as React from "react";
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Drawer, DrawerClose, DrawerContent, DrawerDescription, DrawerFooter, DrawerHeader, DrawerTitle, DrawerTrigger } from "@/components/ui/drawer";
import { useMediaQuery } from "@/hooks/useMediaQuery";

interface ResponsiveDialogProps {
  children: React.ReactNode;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}

interface ResponsiveDialogContentProps extends React.ComponentProps<typeof DialogContent> {
  useScrollArea?: boolean;
}

// Create a context to share the isDesktop value across all components
const ResponsiveDialogContext = React.createContext<boolean | undefined>(undefined);

const useResponsiveDialog = () => {
  const context = React.useContext(ResponsiveDialogContext);
  if (context === undefined) {
    throw new Error("useResponsiveDialog must be used within ResponsiveDialog");
  }
  return context;
};

const ResponsiveDialog = ({ children, open, onOpenChange, ...props }: ResponsiveDialogProps) => {
  // Only call useMediaQuery once at the top level
  const isDesktop = useMediaQuery("(min-width: 768px)");

  const Component = isDesktop ? Dialog : Drawer;

  return (
    <ResponsiveDialogContext.Provider value={isDesktop}>
      <Component open={open} onOpenChange={onOpenChange} {...props}>
        {children}
      </Component>
    </ResponsiveDialogContext.Provider>
  );
};

const ResponsiveDialogTrigger = ({ children, ...props }: React.ComponentProps<typeof DialogTrigger>) => {
  const isDesktop = useResponsiveDialog();

  const Component = isDesktop ? DialogTrigger : DrawerTrigger;

  return <Component {...props}>{children}</Component>;
};

const ResponsiveDialogContent = ({ children, className, useScrollArea = true, ...props }: ResponsiveDialogContentProps) => {
  const isDesktop = useResponsiveDialog();

  if (isDesktop) {
    return (
      <DialogContent className={className} {...props}>
        {children}
      </DialogContent>
    );
  }

  return (
    <DrawerContent className={className} {...props}>
      {useScrollArea ? (
        <div className="max-h-[75vh] overflow-y-auto px-4">{children}</div>
      ) : (
        <>{children}</>
      )}
    </DrawerContent>
  );
};

const ResponsiveDialogHeader = ({ children, ...props }: React.ComponentProps<typeof DialogHeader>) => {
  const isDesktop = useResponsiveDialog();

  const Component = isDesktop ? DialogHeader : DrawerHeader;

  return <Component {...props}>{children}</Component>;
};

const ResponsiveDialogTitle = ({ children, ...props }: React.ComponentProps<typeof DialogTitle>) => {
  const isDesktop = useResponsiveDialog();

  const Component = isDesktop ? DialogTitle : DrawerTitle;

  return <Component {...props}>{children}</Component>;
};

const ResponsiveDialogFooter = ({ children, ...props }: React.ComponentProps<typeof DialogFooter>) => {
  const isDesktop = useResponsiveDialog();

  const Component = isDesktop ? DialogFooter : DrawerFooter;

  return <Component {...props}>{children}</Component>;
};

const ResponsiveDialogDescription = ({ children, ...props }: React.ComponentProps<typeof DialogDescription>) => {
  const isDesktop = useResponsiveDialog();

  const Component = isDesktop ? DialogDescription : DrawerDescription;

  return <Component {...props}>{children}</Component>;
};

const ResponsiveDialogClose = ({ children, ...props }: React.ComponentProps<typeof DialogClose>) => {
  const isDesktop = useResponsiveDialog();

  const Component = isDesktop ? DialogClose : DrawerClose;

  return <Component {...props}>{children}</Component>;
};

// Export all components
export {
  ResponsiveDialog,
  ResponsiveDialogContent,
  ResponsiveDialogDescription,
  ResponsiveDialogHeader,
  ResponsiveDialogTitle,
  ResponsiveDialogTrigger,
  ResponsiveDialogFooter,
  ResponsiveDialogClose,
};