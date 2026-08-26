'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Send } from 'lucide-react';

import FormInput from '@/components/fields/FormInput';
import SelectInput from '@/components/fields/SelectInput';
import TextArea from '@/components/fields/TextArea';
import FormGrid from '@/components/fields/FormGrid';
import Button from '@/components/ui/Button';
import Toast from '@/components/ui/Toast';
import { CONTACT_SUBJECTS } from '@/data/site';
import { contactSchema, type ContactFormValues } from '@/lib/schemas';

const EMPTY: ContactFormValues = {
  name: '',
  email: '',
  phone: '',
  subject: CONTACT_SUBJECTS[0],
  message: '',
};

/**
 * Contact form.
 *
 * React Hook Form keeps the field values in uncontrolled inputs and only
 * re-renders when the validation state changes, and the zod schema in
 * lib/schemas.ts is the single description of what counts as valid.
 *
 * There is no backend yet, so a valid submission resets the form and confirms
 * on screen. When an API exists, replace the body of `onSubmit` with the POST —
 * nothing else in this component needs to change.
 */
export default function ContactForm() {
  const [toast, setToast] = useState('');

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ContactFormValues>({
    resolver: zodResolver(contactSchema),
    defaultValues: EMPTY,
    // Validate on blur, then keep correcting as they type — so a field is not
    // marked wrong while it is still half-typed.
    mode: 'onTouched',
  });

  async function onSubmit(values: ContactFormValues) {
    // Stands in for the POST. `values` is already validated and typed.
    void values;
    reset(EMPTY);
    setToast('Thank you — your message has been received.');
  }

  return (
    <>
      <form
        className="rounded-md border border-line-soft bg-ivory p-6 sm:p-8"
        onSubmit={handleSubmit(onSubmit)}
        noValidate
      >
        <h2 className="mb-2">Send Us a Message</h2>
        <p className="mb-8 text-muted">
          Questions about a wine, an order or a special occasion — we read every message and reply
          personally.
        </p>

        <FormGrid>
          <FormInput
            label="Full Name"
            autoComplete="name"
            error={errors.name?.message}
            required
            {...register('name')}
          />

          <FormInput
            label="Email Address"
            type="email"
            autoComplete="email"
            error={errors.email?.message}
            required
            {...register('email')}
          />

          <FormInput label="Phone Number" type="tel" autoComplete="tel" {...register('phone')} />

          <SelectInput
            label="Subject"
            options={CONTACT_SUBJECTS.map((subject) => ({ value: subject, label: subject }))}
            error={errors.subject?.message}
            {...register('subject')}
          />

          <TextArea
            label="Message"
            rows={5}
            className="col-span-full"
            error={errors.message?.message}
            required
            {...register('message')}
          />
        </FormGrid>

        <div className="mt-8">
          <Button
            type="submit"
            variant="primary"
            square
            block
            disabled={isSubmitting}
            icon={<Send size={16} />}
          >
            {isSubmitting ? 'Sending…' : 'Send Message'}
          </Button>
        </div>
      </form>

      <Toast message={toast} onDismiss={() => setToast('')} />
    </>
  );
}
