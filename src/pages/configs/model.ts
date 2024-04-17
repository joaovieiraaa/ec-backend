export interface IConfigs {
  id: number;
  name: string;
  url: string;
  images_sizes: Array<any>;
  public_path: string;
  languages: Array<any>;
  fallback_locale: string;
  css_file: string;
  css_identifier: string;
  coming_soon: boolean;
  created_at: Date;
  updated_at: Date;
}
