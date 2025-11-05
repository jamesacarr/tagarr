'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import type { FC } from 'react';
import { useCallback } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { toast } from 'sonner';
import type z from 'zod';

import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import { Spinner } from '@/components/ui/spinner';

import { updateSettings } from './actions';
import { schema } from './schema';

interface Props {
  settings: z.infer<typeof schema>;
}

export const SettingsForm: FC<Props> = ({ settings }) => {
  const router = useRouter();
  const {
    control,
    formState: { isSubmitting },
    handleSubmit,
  } = useForm<z.infer<typeof schema>>({
    defaultValues: settings,
    resolver: zodResolver(schema),
  });

  const onSubmit = useCallback(
    async (data: z.infer<typeof schema>) => {
      await updateSettings(data);
      toast.success('Settings updated');

      router.push('/');
    },
    [router],
  );

  return (
    <Card className="w-full sm:max-w-md">
      <CardHeader>
        <CardTitle>Settings</CardTitle>
        <CardDescription>
          Configre your *arr app connection settings.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form id="settings-form" onSubmit={handleSubmit(onSubmit)}>
          <FieldGroup>
            <Controller
              control={control}
              name="radarr_url"
              render={({ field, fieldState }) => (
                <Field>
                  <FieldLabel htmlFor="radarr-url">Radarr URL</FieldLabel>
                  <Input
                    {...field}
                    aria-invalid={fieldState.invalid}
                    autoComplete="off"
                    id="radarr-url"
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
            <Controller
              control={control}
              name="radarr_api_key"
              render={({ field, fieldState }) => (
                <Field>
                  <FieldLabel htmlFor="radarr-api-key">
                    Radarr API Key
                  </FieldLabel>
                  <Input
                    {...field}
                    aria-invalid={fieldState.invalid}
                    autoComplete="off"
                    id="radarr-api-key"
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
            <Controller
              control={control}
              name="sonarr_url"
              render={({ field, fieldState }) => (
                <Field>
                  <FieldLabel htmlFor="sonarr-url">Sonarr URL</FieldLabel>
                  <Input
                    {...field}
                    aria-invalid={fieldState.invalid}
                    autoComplete="off"
                    id="sonarr-url"
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
            <Controller
              control={control}
              name="sonarr_api_key"
              render={({ field, fieldState }) => (
                <Field>
                  <FieldLabel htmlFor="sonarr-api-key">
                    Sonarr API Key
                  </FieldLabel>
                  <Input
                    {...field}
                    aria-invalid={fieldState.invalid}
                    autoComplete="off"
                    id="sonarr-api-key"
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
            <Controller
              control={control}
              name="mdblist_api_key"
              render={({ field, fieldState }) => (
                <Field>
                  <FieldLabel htmlFor="mdblist-api-key">
                    MDBList API Key
                  </FieldLabel>
                  <Input
                    {...field}
                    aria-invalid={fieldState.invalid}
                    autoComplete="off"
                    id="mdblist-api-key"
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
          </FieldGroup>
        </form>
      </CardContent>
      <CardFooter>
        <Field orientation="horizontal">
          <Button asChild type="button" variant="outline">
            <Link href="/">Cancel</Link>
          </Button>
          <Button disabled={isSubmitting} form="settings-form" type="submit">
            {isSubmitting ? <Spinner /> : 'Save'}
          </Button>
        </Field>
      </CardFooter>
    </Card>
  );
};
