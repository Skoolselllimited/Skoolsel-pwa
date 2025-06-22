export type School = {
  id: number;
  name: string;
  abbrv: string | null;
  street?: string | null;
  street2?: string | null;
  zip_code?: string | null;
  city?: string | null;
  image_url?: string | null;
  slug?: string;
  created_uid?: string | null;
  updated_uid?: string | null;
  created_at?: string;
  updated_at?: string;
  active?: boolean;
};
