<template>
  <main>
      <HeroSction :profile="portfolioData?.profile" />
      <SkillsSection :skills="portfolioData?.skills" />
      <AboutMeSection :about="portfolioData?.about" />
      <ProjectSection :projects="portfolioData?.projects" />
      <ServiceSection :services="portfolioData?.services" />
      <ExperienceSection
        :work-experiences="portfolioData?.workExperiences"
        :educations="portfolioData?.educations"
      />
      <ConnectSection :contact="portfolioData?.contact" />
  </main>
</template>

<script setup lang="ts">
import AboutMeSection from '~/components/home/AboutMeSection.vue';
import ConnectSection from '~/components/home/ConnectSection.vue';
import ExperienceSection from '~/components/home/ExperienceSection.vue';
import HeroSction from '~/components/home/HeroSction.vue';
import ProjectSection from '~/components/home/ProjectSection.vue';
import ServiceSection from '~/components/home/ServiceSection.vue';
import SkillsSection from '~/components/home/SkillsSection.vue';

import { usePortfolioApi } from '~/composables/usePortfolioApi';
import {
  siteMetaConfig,
  heroProfileData,
  aboutMeData,
  contactInfoData,
  projectsData
} from '~/model'

const { fetchPortfolioBundle } = usePortfolioApi()
const { data: portfolioData } = await fetchPortfolioBundle()

const { siteUrl, title, description, keywords, author, ogImage, twitterHandle } = siteMetaConfig

useSeoMeta({
  title,
  description,
  keywords,
  author,
  creator: author,
  publisher: author,
  robots: 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1',
  
  // Open Graph
  ogTitle: title,
  ogDescription: description,
  ogType: 'profile',
  ogUrl: siteUrl,
  ogImage,
  ogImageSecureUrl: ogImage,
  ogImageType: 'image/png',
  ogImageWidth: 1200,
  ogImageHeight: 630,
  ogImageAlt: `${title} Portfolio`,
  ogSiteName: `${author} Portfolio`,
  ogLocale: 'en_US',

  // Twitter / X
  twitterCard: 'summary_large_image',
  twitterTitle: title,
  twitterDescription: description,
  twitterImage: ogImage,
  twitterImageAlt: title,
  twitterCreator: twitterHandle,
  twitterSite: twitterHandle
})

const structuredData = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Person',
      '@id': `${siteUrl}/#person`,
      name: `${heroProfileData.firstName}${heroProfileData.lastName}`.trim(),
      givenName: heroProfileData.firstName.trim(),
      familyName: heroProfileData.lastName.trim(),
      jobTitle: heroProfileData.role,
      description: aboutMeData.bioText,
      url: siteUrl,
      image: `${siteUrl}${heroProfileData.portraitImg}`,
      email: `mailto:${contactInfoData.email}`,
      nationality: 'German',
      address: {
        '@type': 'PostalAddress',
        addressCountry: 'Germany'
      },
      sameAs: heroProfileData.socialLinks.map((s) => s.url),
      knowsAbout: [
        'Product Design',
        'UI/UX Design',
        'Design Systems',
        'Frontend Development',
        'Vue.js',
        'Nuxt 3',
        'Figma',
        'Tailwind CSS',
        'TypeScript',
        'Accessibility (WCAG)',
        'Responsive Web Design'
      ]
    },
    {
      '@type': 'WebSite',
      '@id': `${siteUrl}/#website`,
      url: siteUrl,
      name: `${author} Portfolio`,
      description:
        `Official personal portfolio of ${author}, showcasing product design projects, client work, web applications, and UI/UX services.`,
      publisher: {
        '@id': `${siteUrl}/#person`
      },
      inLanguage: 'en-US'
    },
    {
      '@type': 'ProfilePage',
      '@id': `${siteUrl}/#profilepage`,
      url: siteUrl,
      name: title,
      isPartOf: {
        '@id': `${siteUrl}/#website`
      },
      about: {
        '@id': `${siteUrl}/#person`
      },
      primaryImageOfPage: {
        '@type': 'ImageObject',
        url: ogImage
      }
    },
    {
      '@type': 'ItemList',
      name: 'Featured Projects & Case Studies',
      description: `Selected digital products, finance applications, and dashboards designed and engineered by ${author}.`,
      itemListElement: projectsData.map((project, idx) => ({
        '@type': 'ListItem',
        position: idx + 1,
        item: {
          '@type': 'CreativeWork',
          name: project.title,
          description: project.description || project.subtitle,
          image: `${siteUrl}${project.img}`,
          keywords: project.techStack.join(', ')
        }
      }))
    }
  ]
}

useHead({
  link: [
    { rel: 'canonical', href: siteUrl },
    { rel: 'alternate', hreflang: 'en', href: siteUrl },
    { rel: 'alternate', hreflang: 'x-default', href: siteUrl }
  ],
  script: [
    {
      type: 'application/ld+json',
      innerHTML: JSON.stringify(structuredData)
    }
  ]
})
</script>
