export interface NavItem {
  href: string
  label: string
}

export interface Service {
  title: string
  description: string
  icon: string
}

export interface ContactFormData {
  name: string
  email: string
  phone: string
  message: string
  budget?: string
}

export interface LocaleString {
  [key: string]: string
} 