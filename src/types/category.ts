export type Category = {
  name: string;
  parent_id?: number | null;
  max_images_allowed?: number | null;
  max_videos_allowed?: number | null;
  post_validity_interval_in_days?: number | null;
  image_url?: string | null;
  icon?: (highlight: boolean) => React.JSX.Element | string | null;
  sequence?: number;
  id: number;
  slug: string;
  ads_count?: number;
  parent?: Category | null;
  children?: Category[];
};

export type AttributePossibleValues = {
  count: number;
  value: string;
};

export type Attribute = {
  active: boolean;
  id: number;
  is_mandatory: boolean;
  is_multiple: boolean;
  name: string;
  possible_values: Array<AttributePossibleValues>;
  screen_control: {
    name: string;
  };
};

export type SubCategory = {
  ads_count: number;
  attributes: Array<Attribute>;
  children: Array<{
    id: number;
  }>;
  icon: string | null;
  id: number;
  image_url: string | null;
  max_images_allowed: number | null;
  max_videos_allowed: number | null;
  slug: string;
};

export type AttributeValue = Record<string, Array<string>>;
