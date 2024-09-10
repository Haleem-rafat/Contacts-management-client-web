import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import contactService from '@services/contact.service';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@components/ui/form';

import { Button } from '@components/ui/button';
import { Input } from '@components/ui/input';
import { EFormFieldType } from '@constants/enums';
import { ImgUpload } from '@UI/index';
import { useDispatch } from 'react-redux';
import { addContact, editContact } from '@store/slices/contact.slice';

export default function CreateContactForm({ contactData, onClose }) {
  const dispatch = useDispatch();
  const form = useForm({
    resolver: yupResolver(contactService.creatContactFormSchema),
    defaultValues: {
      img: contactData?.img || '',
      userName: contactData?.userName || '',
      email: contactData?.email || '',
      phoneNumber: contactData?.phoneNumber || null,
    },
  });

  const handleSubmit = (values) => {
    if (contactData) {
      dispatch(editContact({ ...values, id: contactData.id }));
    } else {
      dispatch(addContact(values));
    }
    onClose();
  };

  return (
    <div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
          {contactService.creatContactFormFields?.map((formDield) => (
            <FormField
              key={formDield.name}
              control={form.control}
              name={formDield.name as 'img' | 'userName' | 'email' | 'phoneNumber'}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{formDield.label}</FormLabel>
                  <FormControl>
                    {formDield?.type === EFormFieldType.IMG_UPLOAD ? (
                      <ImgUpload textButton={'Add img'} field={{ ...field }} />
                    ) : (
                      <Input
                        placeholder={formDield.placeholder}
                        type={formDield?.type}
                        {...field}
                      />
                    )}
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          ))}
          <div className="absolute bottom-0 left-0 w-full border-t-2 p-4">
            <Button type="submit" className="w-full">
              {contactData ? 'Edit contact' : 'Save contact'}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
