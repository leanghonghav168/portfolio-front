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

export interface ContactMessageItem {
  id: number
  name: string
  email: string
  phone?: string
  subject?: string
  message: string
  createdAt: string
  isRead: boolean
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
   * Health check to know if PostgreSQL NestJS backend is online.
   */
  const checkBackendHealth = async (): Promise<boolean> => {
    try {
      const res = await $fetch<any>(`${apiBase}/portfolio/health`, { timeout: 2500 })
      return res?.status === 'ok'
    } catch {
      return false
    }
  }

  /**
   * Fetches the complete portfolio bundle from the NestJS PostgreSQL backend.
   * If the backend is unreachable (e.g. offline during local preview),
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
   * Visitor: Send message
   */
  const sendContactMessage = async (payload: ContactMessagePayload) => {
    return $fetch(`${apiBase}/portfolio/contact`, {
      method: 'POST',
      body: payload,
    })
  }

  /**
   * Admin: Inquiries list
   */
  const fetchMessages = async (): Promise<ContactMessageItem[]> => {
    try {
      const res = await $fetch<ContactMessageItem[]>(`${apiBase}/portfolio/messages`, { timeout: 3500 })
      return Array.isArray(res) ? res : []
    } catch (err) {
      console.warn('Backend offline, returning mock inquiries:', err)
      return [
        {
          id: 1,
          name: 'Sarah Jenkins',
          email: 'sarah.jenkins@fintechpartners.com',
          phone: '+1 415 890 2311',
          subject: 'UI/UX Design Partnership for Q1 2027',
          message:
            'Hello Leang, we loved your Basinik Finance case study! We have an enterprise banking dashboard re-architecture starting in January and would love to discuss a contract role with you.',
          createdAt: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString(),
          isRead: false,
        },
        {
          id: 2,
          name: 'Marcus Weber',
          email: 'm.weber@nexum-digital.de',
          phone: '+49 176 5543 219',
          subject: 'Speaking invitation: Design Systems Summit Berlin',
          message:
            'Hi Leang, following your work on multi-brand tokens and Nuxt 3 component libraries, we would love to have you as a guest speaker on our panel in Berlin next month.',
          createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString(),
          isRead: true,
        },
      ]
    }
  }

  const markMessageAsRead = async (id: number, isRead = true) => {
    try {
      return await $fetch(`${apiBase}/portfolio/messages/${id}/read`, {
        method: 'PATCH',
        body: { isRead },
      })
    } catch (err) {
      console.warn('Backend offline, simulated mark as read for #', id)
      return { id, isRead }
    }
  }

  const deleteMessage = async (id: number) => {
    try {
      return await $fetch(`${apiBase}/portfolio/messages/${id}`, {
        method: 'DELETE',
      })
    } catch (err) {
      console.warn('Backend offline, simulated delete for #', id)
      return { success: true }
    }
  }

  // ========================
  // ADMIN MUTATIONS
  // ========================
  const updateHero = async (data: Partial<HeroProfile>) => {
    return $fetch(`${apiBase}/portfolio/hero`, {
      method: 'PUT',
      body: data,
    })
  }

  const updateAbout = async (data: Partial<AboutMe>) => {
    return $fetch(`${apiBase}/portfolio/about`, {
      method: 'PUT',
      body: data,
    })
  }

  const saveProject = async (project: Partial<Project>) => {
    if (project.id) {
      return $fetch(`${apiBase}/portfolio/projects/${project.id}`, {
        method: 'PUT',
        body: project,
      })
    } else {
      return $fetch(`${apiBase}/portfolio/projects`, {
        method: 'POST',
        body: project,
      })
    }
  }

  const deleteProject = async (id: number) => {
    return $fetch(`${apiBase}/portfolio/projects/${id}`, {
      method: 'DELETE',
    })
  }

  const saveSkill = async (skill: Partial<Skill>) => {
    if (skill.id) {
      return $fetch(`${apiBase}/portfolio/skills/${skill.id}`, {
        method: 'PUT',
        body: skill,
      })
    } else {
      return $fetch(`${apiBase}/portfolio/skills`, {
        method: 'POST',
        body: skill,
      })
    }
  }

  const deleteSkill = async (id: number) => {
    return $fetch(`${apiBase}/portfolio/skills/${id}`, {
      method: 'DELETE',
    })
  }

  const saveService = async (service: Partial<Service>) => {
    if (service.id) {
      return $fetch(`${apiBase}/portfolio/services/${service.id}`, {
        method: 'PUT',
        body: service,
      })
    } else {
      return $fetch(`${apiBase}/portfolio/services`, {
        method: 'POST',
        body: service,
      })
    }
  }

  const deleteService = async (id: number) => {
    return $fetch(`${apiBase}/portfolio/services/${id}`, {
      method: 'DELETE',
    })
  }

  const saveWorkExperience = async (work: Partial<WorkExperience>) => {
    if (work.id) {
      return $fetch(`${apiBase}/portfolio/experiences/work/${work.id}`, {
        method: 'PUT',
        body: work,
      })
    } else {
      return $fetch(`${apiBase}/portfolio/experiences/work`, {
        method: 'POST',
        body: work,
      })
    }
  }

  const deleteWorkExperience = async (id: number) => {
    return $fetch(`${apiBase}/portfolio/experiences/work/${id}`, {
      method: 'DELETE',
    })
  }

  const saveEducation = async (edu: Partial<Education>) => {
    if (edu.id) {
      return $fetch(`${apiBase}/portfolio/experiences/education/${edu.id}`, {
        method: 'PUT',
        body: edu,
      })
    } else {
      return $fetch(`${apiBase}/portfolio/experiences/education`, {
        method: 'POST',
        body: edu,
      })
    }
  }

  const deleteEducation = async (id: number) => {
    return $fetch(`${apiBase}/portfolio/experiences/education/${id}`, {
      method: 'DELETE',
    })
  }

  return {
    apiBase,
    checkBackendHealth,
    fetchPortfolioBundle,
    sendContactMessage,
    fetchMessages,
    markMessageAsRead,
    deleteMessage,
    updateHero,
    updateAbout,
    saveProject,
    deleteProject,
    saveSkill,
    deleteSkill,
    saveService,
    deleteService,
    saveWorkExperience,
    deleteWorkExperience,
    saveEducation,
    deleteEducation,
  }
}
