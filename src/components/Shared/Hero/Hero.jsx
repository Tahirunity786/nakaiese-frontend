import React from 'react'
import Container from '../Container/Container'
import SearchBar from '../SearchBar/SearchBar'
import { useTranslations } from 'next-intl';


export const Hero = () => {
  const t = useTranslations('HomePage.Hero');


  return (
    // Updated min-h to 85vh to allow space for mobile dropdowns
    <section className="relative w-full min-h-[85vh] flex flex-col items-center justify-center bg-[url('/banner.jpg')] bg-no-repeat bg-center bg-cover mb-12">
      {/* Dark Overlay */}
      <div className="absolute top-0 left-0 w-full h-full bg-black/40"></div>

      {/* Content Container */}
      <Container className="relative z-10 w-full flex flex-col items-center px-4 md:px-0 mt-16 md:mt-0">
        <div className="text-center text-white mb-8 md:mb-12">
          <h1 className="text-3xl sm:text-4xl md:text-6xl font-bold drop-shadow-md leading-tight">
            {t("title")}
          </h1>
          <p className="text-lg sm:text-xl md:text-2xl mt-4 font-medium drop-shadow-sm opacity-90">
            {t("subtitle")}
          </p>
        </div>

        {/* Search Bar Wrapper */}
        <div className="w-full">
          <SearchBar />
        </div>
      </Container>
    </section>
  )
}