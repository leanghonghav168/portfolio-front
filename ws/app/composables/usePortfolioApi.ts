import {
  heroProfileData,
  aboutMeData,
  skillsData,
  projectsData,
  servicesData,
  workExperiencesData,
  educationsData,
  contactInfoData,
} from '~/model'
import type {
  HeroProfile,
  AboutMe,
  Skill,
  Project,
  Service,
  WorkExperience,
  Education,
  ContactInfo,
} from '~/model'

export interface PortfolioBundle {
  profile: HeroProfile
  about: AboutMe
  skills: Skill[]
  projects: Project[]
  services: Service[]
  workExperiences: WorkExperience[]
  educations: Education[]
  contact: ContactInfo
}

export interface ContactMessagePayload {
  name: string
  email: string
  phone?: string
  subject?: string
  message: string
}

export function usePortfolioApi() {
  const config = useRuntimeConfig()
  const apiBase = config.public.apiBase || 'http://localhost:3001/api'

  /**
   * Fetches the complete portfolio bundle from the NestJS PostgreSQL backend.
   * If the backend is unreachable (e.g. offline during local development),
   * it falls back seamlessly to the static dataset.
   */
  const fetchPortfolioBundle = () => {
    return useAsyncData<PortfolioBundle>('portfolio-bundle', async () => {
      try {
        const res = await $fetch<any>(`${apiBase}/portfolio`, {
          timeout: 4000,
        })

        if (res && res.profile) {
          return {
            profile: res.profile,
            about: res.about || aboutMeData,
            skills: Array.isArray(res.skills) && res.skills.length > 0 ? res.skills : skillsData,
            projects: Array.isArray(res.projects) && res.projects.length > 0 ? res.projects : projectsData,
            services: Array.isArray(res.services) && res.services.length > 0 ? res.services : servicesData,
            workExperiences: Array.isArray(res.workExperiences) && res.workExperiences.length > 0 ? res.workExperiences : workExperiencesData,
            educations: Array.isArray(res.educations) && res.educations.length > 0 ? res.educations : educationsData,
            contact: res.contact || contactInfoData,
          }
        }
      } catch (err) {
        // Fallback to static model data when backend is not running
        console.warn('Backend API unreachable, using static portfolio models:', err)
      }

      return {
        profile: heroProfileData,
        about: aboutMeData,
        skills: skillsData,
        projects: projectsData,
        services: servicesData,
        workExperiences: workExperiencesData,
        educations: educationsData,
        contact: contactInfoData,
      }
    })
  }

  /**
   * Sends a contact message to the NestJS PostgreSQL backend.
   */
  const sendContactMessage = async (payload: ContactMessagePayload) => {
    try {
      return await $fetch(`${apiBase}/portfolio/contact`, {
        method: 'POST',
        body: payload,
      })
    } catch (err) {
      console.error('Failed to post contact message to backend:', err)
      throw err
    }
  }

  return {
    apiBase,
    fetchPortfolioBundle,
    sendContactMessage,
  }
}

