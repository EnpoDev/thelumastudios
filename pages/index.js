import { useState, useEffect } from 'react';
import Head from 'next/head';
import Header from '../components/Header';
import HeroSlider from '../components/HeroSlider';
import Portfolio from '../components/Portfolio';
import Services from '../components/Services';
import TechStack from '../components/TechStack';
import Statistics from '../components/Statistics';
import About from '../components/About';
import PriceCalculator from '../components/PriceCalculator';
import Testimonials from '../components/Testimonials';
import Contact from '../components/Contact';
import Footer from '../components/Footer';
import { detectLocale } from '../lib/i18n';
import { dbHelpers } from '../lib/db';

export default function Home({ initialProjects, initialStatistics, initialTestimonials, initialFeatures, locale }) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  // Parse JSON fields for projects
  const projects = initialProjects.map((project) => ({
    ...project,
    gallery_images: project.gallery_images ? (typeof project.gallery_images === 'string' ? JSON.parse(project.gallery_images) : project.gallery_images) : [],
    technologies: project.technologies ? (typeof project.technologies === 'string' ? JSON.parse(project.technologies) : project.technologies) : [],
  }));

  return (
    <>
      <Head>
        <title>Luma Studios - Creative Web Design Solutions</title>
        <meta name="description" content="We create stunning digital experiences that drive results" />
      </Head>
      <Header locale={locale} />
      <div className="min-h-screen">
        <HeroSlider projects={projects} locale={locale} />
        <Portfolio projects={projects} locale={locale} />
        <Services locale={locale} />
        <TechStack locale={locale} />
        <Statistics statistics={initialStatistics} locale={locale} />
        <About locale={locale} />
        <PriceCalculator features={initialFeatures} locale={locale} />
        <Testimonials testimonials={initialTestimonials} locale={locale} />
        <Contact locale={locale} />
        <Footer locale={locale} />
      </div>
    </>
  );
}

export async function getServerSideProps(context) {
  const locale = detectLocale(context.req);
  
  try {
    // Get featured projects
    const projects = dbHelpers.getAllProjects(true) || [];
    const parsedProjects = projects.map((project) => {
      try {
        return {
          ...project,
          gallery_images: project.gallery_images ? (typeof project.gallery_images === 'string' ? JSON.parse(project.gallery_images) : project.gallery_images) : [],
          technologies: project.technologies ? (typeof project.technologies === 'string' ? JSON.parse(project.technologies) : project.technologies) : [],
        };
      } catch (e) {
        return {
          ...project,
          gallery_images: [],
          technologies: [],
        };
      }
    });

    // Get statistics
    const statistics = dbHelpers.getAllStatistics() || [];

    // Get featured testimonials
    const testimonials = dbHelpers.getAllTestimonials(true) || [];

    // Get price features
    const features = dbHelpers.getAllPriceFeatures() || [];

    return {
      props: {
        initialProjects: parsedProjects,
        initialStatistics: statistics,
        initialTestimonials: testimonials,
        initialFeatures: features,
        locale,
      },
    };
  } catch (error) {
    console.error('Error fetching data:', error);
    return {
      props: {
        initialProjects: [],
        initialStatistics: [],
        initialTestimonials: [],
        initialFeatures: [],
        locale,
      },
    };
  }
}
