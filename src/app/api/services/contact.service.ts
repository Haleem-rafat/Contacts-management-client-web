import axios from 'axios';
import { IContact } from '@servicesTypes/contact.types';
import { IPagination } from '@servicesTypes/api.types';

class ContactService {
  public async getContactList(params: IPagination): Promise<IContact> {
    const { data } = await axios.get(import.meta.env.VITE_API_BASE, { params });
    return data;
  }
}
export default Object.freeze(new ContactService());
