export interface HeaderDepth4Menu {
  id: string;
  label: string;
  href: string;
}

export interface HeaderDepth3Menu {
  id: string;
  label: string;
  href?: string;
  external?: boolean;
  children?: HeaderDepth4Menu[];
}

export interface HeaderDepth2Menu {
  id: string;
  label: string;
  title?: string;
  href?: string;
  external?: boolean;
  description?: string;
  children?: HeaderDepth3Menu[];
}

export interface HeaderMainMenu {
  id: string;
  label: string;
  href?: string;
  descriptionType?: boolean;
  singleList?: boolean;
  children?: HeaderDepth2Menu[];
}

