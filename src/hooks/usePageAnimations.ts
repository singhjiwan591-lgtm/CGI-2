
'use client';

import { useEffect, RefObject } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export function usePageAnimations(pageRef: RefObject<HTMLElement>) {
  useEffect(() => {
    const page = pageRef.current;
    if (!page) return;

    const fadeInElements = page.querySelectorAll<HTMLElement>('[data-animate="fade-in"]');
    const fadeInUpElements = page.querySelectorAll<HTMLElement>('[data-animate="fade-in-up"]');
    const staggerItems = page.querySelectorAll<HTMLElement>('[data-animate="stagger-item"]');
    const staggerItems2 = page.querySelectorAll<HTMLElement>('[data-animate="stagger-item-2"]');
    const timelineItems = page.querySelectorAll<HTMLElement>('[data-animate="timeline-item"]');

    gsap.fromTo(fadeInElements, 
      { opacity: 0 },
      { opacity: 1, duration: 1, ease: 'power2.out', stagger: 0.2 }
    );

    gsap.fromTo(fadeInUpElements,
      { opacity: 0, y: 50 },
      { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out', stagger: 0.3, scrollTrigger: {
        trigger: fadeInUpElements[0] || page,
        start: 'top 80%',
        toggleActions: 'play none none none',
      } }
    );

    if (staggerItems.length > 0) {
      gsap.fromTo(staggerItems,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.5, ease: 'power2.out', stagger: 0.15, scrollTrigger: {
          trigger: staggerItems[0],
          start: 'top 85%',
          toggleActions: 'play none none none',
        } }
      );
    }
    
    if (staggerItems2.length > 0) {
      gsap.fromTo(staggerItems2,
        { opacity: 0, x: -30 },
        { opacity: 1, x: 0, duration: 0.5, ease: 'power2.out', stagger: 0.15, scrollTrigger: {
          trigger: staggerItems2[0],
          start: 'top 85%',
          toggleActions: 'play none none none',
        } }
      );
    }

    timelineItems.forEach((item, index) => {
      gsap.fromTo(item,
        { opacity: 0, x: index % 2 === 0 ? -50 : 50 },
        {
          opacity: 1, x: 0, duration: 0.7, ease: 'power3.out',
          scrollTrigger: {
            trigger: item,
            start: 'top 85%',
            toggleActions: 'play none none none'
          }
        }
      );
    });

  }, [pageRef]);
}
