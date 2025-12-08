'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import type { FC } from 'react';
import { useCallback } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';

import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Field, FieldGroup } from '@/components/ui/field';
import { Spinner } from '@/components/ui/spinner';

import { updateSettings } from './actions';
import type { Fields } from './schema';
import { schema } from './schema';
import { SettingsField } from './settings-field';

interface FieldList {
  label: string;
  name: keyof Fields;
  placeholder: string;
}

const FIELDS: FieldList[] = [
  {
    label: 'Radarr URL',
    name: 'radarr_url',
    placeholder: 'https://radarr.video:7878',
  },
  {
    label: 'Radarr API Key',
    name: 'radarr_api_key',
    placeholder: '',
  },
  {
    label: 'Sonarr URL',
    name: 'sonarr_url',
    placeholder: 'https://sonarr.tv:8989',
  },
  {
    label: 'Sonarr API Key',
    name: 'sonarr_api_key',
    placeholder: '',
  },
];

interface Props {
  settings: Fields;
}

export const SettingsForm: FC<Props> = ({ settings }) => {
  const router = useRouter();
  const {
    control,
    formState: { isSubmitting },
    handleSubmit,
    setError,
  } = useForm<Fields>({
    defaultValues: settings,
    resolver: zodResolver(schema),
  });

  const onSubmit = useCallback(
    async (data: Fields) => {
      try {
        const result = await updateSettings(data);
        if (result.success) {
          toast.success('Settings updated');
          router.push('/');
          return;
        }

        for (const error of result.errors) {
          setError(error.path as keyof Fields, {
            message: error.message,
            type: error.type,
          });
        }
      } catch {
        toast.error('Failed to update settings');
      }
    },
    [router, setError],
  );

  return (
    <Card className="w-full sm:max-w-md">
      <CardHeader>
        <CardTitle>Settings</CardTitle>
        <CardDescription>
          Configure your *arr app connection settings.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form id="settings-form" onSubmit={handleSubmit(onSubmit)}>
          <FieldGroup>
            {FIELDS.map(field => (
              <SettingsField control={control} key={field.name} {...field} />
            ))}
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
