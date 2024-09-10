export interface IPagination {
  page: number;
  results: number;
  id?: string;
}

export interface IFormField extends React.InputHTMLAttributes<HTMLInputElement> {
  name: string;
  label: string;
  placeholder: string;
  type?: string;
}
