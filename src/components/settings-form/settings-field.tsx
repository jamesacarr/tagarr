import type { FC } from 'react';
import type { Control } from 'react-hook-form';
import { Controller } from 'react-hook-form';

import { Field, FieldError, FieldLabel } from '@/components/ui/field';
import { Input } from '@/components/ui/input';

import type { Fields } from './schema';

interface Props {
  label: string;
  name: keyof Fields;
  placeholder: string;
  control: Control<Fields>;
}

export const SettingsField: FC<Props> = ({
  control,
  label,
  name,
  placeholder,
}) => (
  <Controller
    control={control}
    name={name}
    render={({ field, fieldState }) => (
      <Field>
        <FieldLabel htmlFor={name}>{label}</FieldLabel>
        <Input
          {...field}
          aria-invalid={fieldState.invalid}
          autoComplete="off"
          id={name}
          placeholder={placeholder}
        />
        {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
      </Field>
    )}
  />
);
