import * as React from 'react';
import { Controller, type ControllerProps, useFormContext } from 'react-hook-form';
import { Label } from '@/components/ui/label';
import { cn } from '@/utils/cn';
import type { ComponentPropsWithoutRef, PropsWithChildren } from 'react';

export const FormItem = ({ children, className }: PropsWithChildren<{ className?: string }>) => (
  <div className={cn('space-y-2', className)}>{children}</div>
);

export const FormLabel = ({ className, ...props }: { className?: string } & ComponentPropsWithoutRef<'label'>) => (
  <Label className={cn('', className)} {...props} />
);

export const FormMessage = ({ children }: { children: React.ReactNode }) => (
  <p className="text-sm text-red-500">{children}</p>
);

type FormFieldProps<T extends ControllerProps> = T & {
  control: T['control'];
  name: T['name'];
  render: T['render'];
};

export const FormField = <T extends ControllerProps>(props: FormFieldProps<T>) => {
  const { control, name, render, ...rest } = props;
  return <Controller control={control} name={name} render={render} {...(rest as any)} />;
};

export const Form = ({ children, ...props }: ComponentPropsWithoutRef<'form'>) => (
  <form {...props}>{children}</form>
);
