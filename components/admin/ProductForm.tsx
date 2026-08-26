'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { ImagePlus, Save } from 'lucide-react';

import FormInput from '@/components/fields/FormInput';
import SelectInput from '@/components/fields/SelectInput';
import TextArea from '@/components/fields/TextArea';
import FormGrid from '@/components/fields/FormGrid';
import Button from '@/components/ui/Button';
import Toast from '@/components/ui/Toast';
import AdminThumb, { AdminThumbPlaceholder } from '@/components/admin/AdminThumb';
import Fieldset from '@/components/admin/Fieldset';
import { ADMIN_ACTIONS } from '@/components/admin/adminStyles';
import { WINE_CATEGORIES, WINE_TYPE_SLUGS } from '@/data/products';
import {
  AVAILABILITY_OPTIONS,
  FLAVOUR_FIELDS,
  productSchema,
  type ProductFormValues,
} from '@/lib/schemas';
import type { Product } from '@/types';

/** Label each real category, keeping the wording the Collection filter uses. */
const TYPE_OPTIONS = WINE_TYPE_SLUGS.map((slug) => ({
  value: slug,
  label: WINE_CATEGORIES.find((category) => category.slug === slug)?.label ?? slug,
}));

const BLANK: ProductFormValues = {
  name: '',
  typeSlug: TYPE_OPTIONS[0].value,
  description: '',
  image: '',
  price: 0,
  stock: 0,
  availability: 'In Stock',
  volume: '750ml',
  alcohol: '',
  origin: 'Avissawella, Sri Lanka',
  vintage: '',
  sweetness: 50,
  acidity: 50,
  body: 50,
  fruitiness: 50,
  ingredients: '',
  servingSuggestions: '',
};

/** Maps an existing product onto the flat shape the form edits. */
function toFormValues(product: Product): ProductFormValues {
  return {
    name: product.name,
    typeSlug: product.typeSlug,
    description: product.description,
    image: product.image,
    price: product.price,
    stock: product.stock,
    availability: product.availability,
    volume: product.volume,
    alcohol: product.alcohol,
    origin: product.origin,
    vintage: product.vintage,
    sweetness: product.flavour.sweetness,
    acidity: product.flavour.acidity,
    body: product.flavour.body,
    fruitiness: product.flavour.fruitiness,
    ingredients: product.ingredients,
    servingSuggestions: product.servingSuggestions.foodPairings,
  };
}

/**
 * Add / edit product form.
 *
 * Pass an existing `product` to edit it, or omit it to create a new one. There
 * is no backend, so a valid save confirms on screen — replace the body of
 * `onSubmit` with the API call when one exists.
 */
export default function ProductForm({ product }: { product?: Product }) {
  const router = useRouter();
  const isEdit = Boolean(product);
  const [toast, setToast] = useState('');

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<ProductFormValues>({
    resolver: zodResolver(productSchema),
    defaultValues: product ? toFormValues(product) : BLANK,
    mode: 'onTouched',
  });

  // The thumbnail previews whatever path is currently in the image field, so
  // this one value is watched rather than the whole form.
  const imagePath = watch('image');

  function onSubmit(values: ProductFormValues) {
    setToast(isEdit ? `${values.name} saved.` : `${values.name} added to the collection.`);
  }

  return (
    <>
      <form className="flex flex-col gap-8" onSubmit={handleSubmit(onSubmit)} noValidate>
        <Fieldset legend="Basic Information">
          <FormGrid>
            <FormInput label="Product Name" error={errors.name?.message} required {...register('name')} />
            <SelectInput label="Wine Type" options={TYPE_OPTIONS} {...register('typeSlug')} />
            <TextArea
              label="Description"
              rows={3}
              className="col-span-full"
              error={errors.description?.message}
              required
              {...register('description')}
            />
          </FormGrid>
        </Fieldset>

        <Fieldset
          legend="Product Image"
          hint="Bottle photographs work best on a plain background, at least 800px tall."
        >
          <div className="flex items-center gap-6 rounded-sm border-[1.5px] border-dashed border-line bg-cream-deep p-6 transition-colors ease-out hover:border-burgundy">
            {imagePath ? (
              <AdminThumb src={imagePath} size="lg" />
            ) : (
              <AdminThumbPlaceholder>
                <ImagePlus size={24} aria-hidden="true" />
              </AdminThumbPlaceholder>
            )}

            <div className="flex-1">
              <FormInput
                label="Image Path"
                placeholder="/images/wines/your-wine.png"
                {...register('image')}
              />
            </div>
          </div>
        </Fieldset>

        <Fieldset legend="Price & Inventory">
          <FormGrid>
            <FormInput
              label="Price (Rs.)"
              type="number"
              min="0"
              step="50"
              error={errors.price?.message}
              required
              {...register('price', { valueAsNumber: true })}
            />
            <FormInput
              label="Stock Quantity"
              type="number"
              min="0"
              error={errors.stock?.message}
              required
              {...register('stock', { valueAsNumber: true })}
            />
            <SelectInput
              label="Availability"
              options={AVAILABILITY_OPTIONS.map((value) => ({ value, label: value }))}
              {...register('availability')}
            />
          </FormGrid>
        </Fieldset>

        <Fieldset legend="Wine Details">
          <FormGrid>
            <FormInput label="Volume" {...register('volume')} />
            <FormInput label="Alcohol %" placeholder="12.5%" {...register('alcohol')} />
            <FormInput label="Origin" {...register('origin')} />
            <FormInput label="Vintage" placeholder="2023" {...register('vintage')} />
          </FormGrid>
        </Fieldset>

        <Fieldset
          legend="Flavour Profile"
          hint="These percentages drive the animated bars on the product page."
        >
          <FormGrid>
            {FLAVOUR_FIELDS.map((key) => (
              <FormInput
                key={key}
                label={`${key.charAt(0).toUpperCase()}${key.slice(1)} %`}
                type="number"
                min="0"
                max="100"
                error={errors[key]?.message}
                {...register(key, { valueAsNumber: true })}
              />
            ))}
          </FormGrid>
        </Fieldset>

        <Fieldset legend="Additional Information">
          <FormGrid>
            <TextArea
              label="Ingredients & Origin"
              rows={3}
              className="col-span-full"
              {...register('ingredients')}
            />
            <TextArea
              label="Serving Suggestions"
              rows={3}
              className="col-span-full"
              {...register('servingSuggestions')}
            />
          </FormGrid>
        </Fieldset>

        <div className={ADMIN_ACTIONS}>
          <Button variant="outline" square onClick={() => router.push('/admin/products')}>
            Cancel
          </Button>
          <Button
            type="submit"
            variant="primary"
            square
            disabled={isSubmitting}
            icon={<Save size={16} />}
          >
            Save Product
          </Button>
        </div>
      </form>

      <Toast message={toast} onDismiss={() => setToast('')} />
    </>
  );
}
