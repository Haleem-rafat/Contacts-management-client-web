import axios from 'axios';
import { IContact } from '@servicesTypes/contact.types';
import { IFormField, IPagination } from '@servicesTypes/api.types';
import * as Yup from 'yup';
import { EFormFieldType } from '@constants/enums';

class ContactService {
  public async getContactList(params: IPagination): Promise<IContact> {
    const { data } = await axios.get(import.meta.env.VITE_API_BASE, { params });
    return data;
  }

  public async getContactDetails(contactId: string): Promise<IContact> {
    const { data } = await axios.get(`${import.meta.env.VITE_API_BASE}?id${contactId}`);
    return data;
  }

  public creatContactFormSchema = Yup.object().shape({
    img: Yup.string().required('img is required'),
    userName: Yup.string().required('User Name is required'),
    email: Yup.string().required('E-mail is required').email('Please enter a valid email'),
    phoneNumber: Yup.number().required('Phone number is required'),
  });

  public creatContactFormFields: IFormField[] = [
    {
      name: 'img',
      label: 'Upload img',
      placeholder: 'Add img',
      type: EFormFieldType.IMG_UPLOAD,
    },
    {
      name: 'userName',
      label: 'User name',
      placeholder: 'Enter user name',
      type: EFormFieldType.TEXT,
    },
    {
      name: 'email',
      label: 'E-mail',
      placeholder: 'Enter E-mail',
      type: EFormFieldType.TEXT,
    },
    {
      name: 'phoneNumber',
      label: 'Phone number',
      placeholder: 'Enter phone Number',
      type: EFormFieldType.Number,
    },
  ];
}
export default Object.freeze(new ContactService());
