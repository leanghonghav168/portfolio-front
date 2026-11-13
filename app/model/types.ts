/**
 * ============================================================================
 * Portfolio Domain Models & Type Definitions
 * Location: app/model/types.ts
 * ============================================================================
 */

export interface SocialLink {
  name: string
  url: string
  icon: string
  ariaLabel?: string
}

export interface HeroProfile {
  firstName: string
  lastName: string
  greeting: string
  role: string
  clientsCount: string
  portraitImg: string
  talkCtaUrl: string
  projectCtaUrl: string
  socialLinks: SocialLink[]
}

export interface Skill {
  id?: string | number
  name: string
  percent: string
  img: string
  category?: string
}

export interface AboutMe {
  categoryTag: string
  headline: string
  highlightWords: string[]
  bioText: string
  portraitImg: string
  isAvailableForWork: boolean
  availableBadgeText: string
  leftSpecialties: string[]
  rightSpecialties: string[]
}

export interface Service {
  id: number
  title: string
  description: string
  iconType: 'yinyang' | 'layout' | 'layers' | 'custom'
  iconClass?: string
}

export interface Project {
  id: number
  title: string
  subtitle?: string
  client?: string
  timeline?: string
  role?: string
  impact?: string
  categoryTags: string[]
  techStack: string[]
  img: string
  description?: string
  deliverables?: string[]
  demoUrl?: string
  repoUrl?: string
}

export interface WorkExperience {
  id: number
  period: string
  company: string
  location: string
  role: string
  type: string
  isCurrent?: boolean
  description: string
  highlights: string[]
  skills: string[]
}

export interface Education {
  id: number
  period: string
  institution: string
  location: string
  degree: string
  description: string
  skills: string[]
}

export interface ContactInfo {
  categoryTag: string
  title: string
  email: string
  phoneNumbers: string
  officeAddress: string
  formattedAddress: string
  socialLinks: SocialLink[]
}

export interface NavSubItem {
  label: string
  href: string
}

export interface NavItem {
  label: string
  href: string
  subMenu?: NavSubItem[]
}

export interface SiteMetaConfig {
  siteUrl: string
  title: string
  description: string
  keywords: string
  author: string
  ogImage: string
  twitterHandle: string
}

