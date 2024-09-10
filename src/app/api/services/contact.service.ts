import axios from 'axios';
import { IContact, Result } from '@servicesTypes/contact.types';
import { IPagination } from '@servicesTypes/api.types';

class ContactService {
  public async getContactList(params: IPagination): Promise<IContact> {
    const { data } = await axios.get(import.meta.env.VITE_API_BASE, { params });
    return data;
  }
  public async getContactDetails(contactId: string): Promise<IContact> {
    const { data } = await axios.get(`${import.meta.env.VITE_API_BASE}?id${contactId}`);
    return data;
  }
}
export default Object.freeze(new ContactService());
