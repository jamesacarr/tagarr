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
import { Checkbox } from '@/components/ui/checkbox';
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from '@/components/ui/field';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectSeparator,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Spinner } from '@/components/ui/spinner';
import type { List } from '@/db/list/types';
import type { Tag } from '@/db/tag/types';

import { RefreshTagsButton } from './refresh-tags-button';
import { schema } from './schema';
import { updateList } from './update-list';

interface Props {
  list: List;
  tags: Tag[];
}

export const ListForm: FC<Props> = ({ list, tags }) => {
  const router = useRouter();
  const {
    control,
    formState: { isSubmitting },
    handleSubmit,
  } = useForm<z.infer<typeof schema>>({
    defaultValues: {
      sync: list.sync,
      tag_id: list.tag_id,
    },
    resolver: zodResolver(schema),
  });

  const onSubmit = useCallback(
    async (data: z.infer<typeof schema>) => {
      const result = await updateList(list.id, data);

      if (!result.success) {
        toast.error('Failed to update list');
        return;
      }

      toast.success(`${list.name} updated`);
      router.push('/');
    },
    [router, list.id, list.name],
  );

  return (
    <Card className="w-full sm:max-w-md">
      <CardHeader>
        <CardTitle>{list.name}</CardTitle>
        <CardDescription>{list.description}</CardDescription>
      </CardHeader>
      <CardContent>
        <form id={`list-form-${list.id}`} onSubmit={handleSubmit(onSubmit)}>
          <FieldGroup>
            <Controller
              control={control}
              name="tag_id"
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel>Tag</FieldLabel>
                  <Select
                    name={field.name}
                    onValueChange={value =>
                      field.onChange(
                        value !== 'clear' ? Number.parseInt(value, 10) : null,
                      )
                    }
                    value={field.value?.toString() ?? ''}
                  >
                    <SelectTrigger aria-invalid={fieldState.invalid}>
                      <SelectValue placeholder="Choose tag" />
                    </SelectTrigger>
                    <SelectContent>
                      {field.value !== null && (
                        <>
                          <SelectItem value="clear">Clear</SelectItem>
                          <SelectSeparator />
                        </>
                      )}
                      {tags.map(tag => (
                        <SelectItem key={tag.id} value={tag.id.toString()}>
                          {tag.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </Field>
              )}
            />
            <Controller
              control={control}
              name="sync"
              render={({ field, fieldState }) => (
                <Field orientation="horizontal">
                  <Checkbox
                    aria-invalid={fieldState.invalid}
                    checked={field.value === 1}
                    id="sync"
                    name={field.name}
                    onCheckedChange={value => field.onChange(value ? 1 : 0)}
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                  <FieldLabel htmlFor="sync">Sync</FieldLabel>
                </Field>
              )}
            />
          </FieldGroup>
        </form>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Field orientation="horizontal">
          <Button asChild type="button" variant="outline">
            <Link href="/">Cancel</Link>
          </Button>
          <Button
            disabled={isSubmitting}
            form={`list-form-${list.id}`}
            type="submit"
          >
            {isSubmitting ? <Spinner /> : 'Save'}
          </Button>
        </Field>
        <RefreshTagsButton />
      </CardFooter>
    </Card>
  );
};
