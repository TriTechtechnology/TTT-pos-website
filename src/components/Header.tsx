'use client';

import { useState, useEffect } from 'react';

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [canOpenDropdown, setCanOpenDropdown] = useState(true);


  useEffect(() => {
    let ticking = false;
    let scrollTimeout: NodeJS.Timeout;
    let lastScrollY = window.scrollY;

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const currentScrollY = window.scrollY;

          clearTimeout(scrollTimeout);
          scrollTimeout = setTimeout(() => {
            // Collapse when scrolling down past 50px
            if (currentScrollY > 50) {
              setIsScrolled(true);
              setIsExpanded(false); // Auto-collapse on scroll
            } else {
              setIsScrolled(false);
              setIsExpanded(false);
            }
          }, 10);

          lastScrollY = currentScrollY;
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
      clearTimeout(scrollTimeout);
    };
  }, []);

  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [isMobileMenuOpen]);

  const handleHeaderHover = () => {
    if (isScrolled && !isExpanded) {
      setIsExpanded(true);
      setCanOpenDropdown(false);
      // Re-enable dropdown opening after expansion animation completes
      setTimeout(() => {
        setCanOpenDropdown(true);
      }, 200);
    }
  };

  const handleDropdownOpen = (menuName: string) => {
    if (canOpenDropdown) {
      setOpenDropdown(menuName);
    }
  };

  const handleDropdownClose = () => {
    setOpenDropdown(null);
  };

  return (
    <>
      {/* Main Header */}
      <header className="sticky top-0 z-50 pt-3 bg-transparent">
        <div className="w-full px-2 lg:px-3">
          <div
            onMouseLeave={handleDropdownClose}
            className="relative pb-2"
          >
          <nav
            className="rounded-[42px] relative"
            onMouseEnter={handleHeaderHover}
            style={{
              backgroundColor: 'rgba(248, 248, 248, 0.3)',
              backdropFilter: 'blur(30px)',
              WebkitBackdropFilter: 'blur(30px)',
              border: '1px solid rgba(200, 200, 200, 0.2)',
              boxShadow: '0 4px 24px 0 rgba(0, 0, 0, 0.05)',
              height: isScrolled && !isExpanded ? '72px' : '72px',
              width: isScrolled && !isExpanded ? '72px' : '100%',
              transition: 'height 150ms cubic-bezier(0.4, 0.0, 0.2, 1), width 150ms cubic-bezier(0.4, 0.0, 0.2, 1)',
              willChange: 'height, width',
              transform: 'translate3d(0, 0, 0)',
            }}
          >
            <div
              className="flex items-center h-full justify-between overflow-hidden"
              style={{
                paddingLeft: isScrolled && !isExpanded ? '17px' : '24px',
                paddingRight: isScrolled && !isExpanded ? '17px' : '24px',
                transition: 'padding 150ms cubic-bezier(0.4, 0.0, 0.2, 1)',
              }}
            >
            {/* Logo */}
            <div className="flex-shrink-0">
              <a href="/" className="flex items-center">
                <svg className="h-8 w-auto" viewBox="0 0 179.67 155.51" xmlns="http://www.w3.org/2000/svg">
                  <defs>
                    <style>{`
                      .logo-stroke { stroke: #d1ab2e; stroke-miterlimit: 10; stroke-width: .25px; fill: none; }
                      .logo-fill { fill: #d1ab2e; }
                    `}</style>
                  </defs>
                  <g>
                    <path className="logo-fill" d="m178.79,11.75c-1.28-1.44-3.37-1.78-5.03-.85l-11.19,6.31-25.1,14.15-18.66,10.51h-.01l-.15.09-1.95,1.19-1.8,1.1c-1.43.87-1.39,2.97.07,3.79l17.38,9.73.02.02c1.27.95,3.49,3.07,2.44,5.82h0s-.01.04-.02.05c0,0-.01,0-.01.02-.01.03-.04.08-.09.15l.03-.06c-.36.54-.78.94-1.23,1.22-.07.03-.16.07-.26.12-1.44.72-3.56.14-5.14-.51l-11.65-6.04-6.34-3.29-2.51-1.3-2.38-1.24-8.17-4.24V12.82c.08-.55.26-1.07.51-1.54,0-.01.01-.02.01-.03.07-.13.15-.26.24-.38.78-1.15,2.04-1.95,3.5-2.1h19.22l4.72,5.4,9.19-5.71.69-.43c.65-.4,1.24-.94,1.59-1.62.32-.61.5-1.3.5-2.04,0-2.42-1.96-4.38-4.39-4.38H46.62c-1.21,0-2.31.49-3.11,1.28-.79.8-1.28,1.89-1.28,3.1,0,.01,0,.02,0,.04.01,1.49.89,2.83,2.15,3.61l.78.48,9.12,5.67,4.73-5.41h19c2.66,0,4.82,2.14,4.82,4.79v34.87l-8.28,4.3-23.53,12.22s-.02,0-.03.01c-1.47.55-4.42,1.26-6.16-1.09,0-.01-.01-.02-.02-.03l-.13-.26h0s-.02-.05-.02-.05c-.33-.77-.86-2.9,1.91-5.06h.01s.61-.35.61-.35l17.52-9.81c1.46-.82,1.5-2.92.07-3.79l-1.8-1.1-1.95-1.19-.15-.09h0l-18.66-10.51-25.1-14.15-11.19-6.31c-1.66-.93-3.75-.6-5.03.84-.48.54-.76,1.14-.85,1.76-.21,1.33.45,2.69,1.82,3.46l.43.23.03.02.27.16.28.15,39.34,22.16,6.25,3.52c2.19,1.23,2.19,4.4-.01,5.63l-6.24,3.5-2.13,1.19-11.63,6.5,24.87,40.71,1.26-.84,11.33-7.04,2.07-1.29,6.08-3.77c2.14-1.33,4.91.19,4.94,2.72l.05,7.16.38,45.15v.64s0,.52,0,.52c.01,1.64.97,2.93,2.33,3.33.54.16,1.14.18,1.77.04,1.87-.43,3.17-2.1,3.16-4l-.28-67.19c-.01-2.29-2.42-3.75-4.45-2.72l-18.96,9.7-.31.17v-.02s-.01,0-.02.01c-.02.01-.07.03-.14.06-.06.03-.12.05-.18.08-.03.01-.06.02-.1.04-.11.04-.23.09-.36.13-.01,0-.02,0-.03.01-.08.03-.16.05-.25.08-.62.18-1.45.36-2.39.38-1.17-.02-2.37-.42-3.27-1.62h-.01s-.02-.04-.02-.04c0,0,0-.01-.01-.02l-.12-.24v-.03c-.33-.73-.86-2.76,1.61-4.86l25.5-13.23,6.97-3.62,7.16,3.72,29.57,15.35-13.95,21.39v.04s-5.13,0-5.13,0v15.26h9.35l.44-.77,5.22-8.69,2.14-3.56,9.15-15.2.87-1.45,1.32-2.13,7.43-12.02.02-.04,3.95-6.38,3.82-6.18-11.64-6.51-2.13-1.19-6.24-3.5c-2.2-1.23-2.21-4.4-.01-5.63l6.25-3.52,39.34-22.16.28-.15.27-.16.45-.25c2-1.11,2.5-3.51.98-5.21ZM48.51,57.25l-1.03.59c.31-.2.65-.4,1.03-.59Z"/>
                    <polygon className="logo-fill" points="177.35 0 161.94 8.77 146.54 17.53 138.21 22.27 134.95 24.13 117.44 34.09 108.59 39.13 108.59 17.53 117.44 17.53 117.44 25.73 130.07 18.54 131.85 17.53 138.21 13.91 147.24 8.77 162.66 0 177.35 0"/>
                    <polygon className="logo-fill" points="2.66 .06 18.07 8.83 33.47 17.59 41.8 22.33 45.06 24.19 62.57 34.15 71.42 39.19 71.42 17.59 62.57 17.59 62.57 25.79 49.94 18.6 48.16 17.59 41.8 13.97 32.77 8.83 17.35 .06 2.66 .06"/>
                    <path className="logo-fill" d="m48.51,57.25l-1.03.59c.31-.2.65-.4,1.03-.59Z"/>
                    <polygon className="logo-fill" points="38.85 46.19 24.49 54.19 10.65 31.18 38.85 46.19"/>
                    <polygon className="logo-fill" points="140.38 45.79 154.9 53.88 168.75 30.78 140.38 45.79"/>
                    <g>
                      <path className="logo-fill" d="m134.81,63.62s-.01.03-.02.04c0,0-.01,0-.01.02-.01.03-.04.08-.09.15l.03-.06h0s.08-.15.08-.15h.01Z"/>
                      <path className="logo-fill" d="m134.8,63.62s0,.03-.01.04c0,0-.01,0-.01.02-.01.03-.04.08-.09.15l.03-.06h0s.08-.15.08-.15Z"/>
                    </g>
                    <path className="logo-fill" d="m48.51,57.25l-1.03.59c.31-.2.65-.4,1.03-.59Z"/>
                    <g>
                      <polygon className="logo-fill" points="112.57 84.06 108.16 91.73 101.05 87.65 101 102.19 100.99 104.23 100.97 111.55 100.93 121.94 100.89 143.19 100.86 143.24 93.51 155.51 93.62 134.69 93.68 116.97 93.72 107.39 93.73 103.64 93.8 83.49 93.83 73.32 93.85 73.32 101.09 77.47 112.57 84.06"/>
                      <polygon className="logo-fill" points="93.85 73.32 93.83 73.32 93.83 73.31 93.85 73.32"/>
                    </g>
                    <polygon className="logo-fill" points="62.71 83.56 62.7 83.57 62.7 83.56 62.71 83.56"/>
                    <polygon className="logo-fill" points="71.97 131.38 65.11 120.25 57.29 107.54 71.62 99.03 71.97 131.38"/>
                    <path className="logo-fill" d="m134.78,63.68s-.04.08-.09.15l.03-.06h0s.04-.06.06-.09Z"/>
                  </g>
                </svg>
              </a>
            </div>

            {/* Centered Mega Menu */}
            <div
              className="hidden lg:flex lg:items-center lg:gap-1 absolute left-1/2 -translate-x-1/2"
              style={{
                opacity: isScrolled && !isExpanded ? 0 : 1,
                pointerEvents: isScrolled && !isExpanded ? 'none' : 'auto',
                transition: 'opacity 80ms cubic-bezier(0.4, 0.0, 1, 1)',
                willChange: 'opacity',
              }}
            >
              {/* Products Dropdown */}
              <div
                className="relative"
                onMouseEnter={() => handleDropdownOpen('products')}
              >
                <button className="menu-link px-4 py-2.5 text-[#080A16] rounded-xl transition-all duration-100 ease-in-out flex items-center gap-1.5 group">
                  <span className="text-[15px] font-medium transition-colors duration-100 ease-in-out group-hover:text-[#d1ab35]">
                    Products
                  </span>
                  <svg
                    className={`w-4 h-4 transition-all duration-200 ease-in-out group-hover:text-[#d1ab35] ${openDropdown === 'products' ? 'rotate-180' : ''}`}
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                      clipRule="evenodd"
                    />
                  </svg>
                </button>
              </div>

              {/* Solutions Link */}
              <a
                href="#"
                className="menu-link px-4 py-2.5 text-[#080A16] rounded-xl transition-all duration-100 ease-in-out group flex items-center"
              >
                <span className="text-[15px] font-medium transition-colors duration-100 ease-in-out group-hover:text-[#d1ab35]">
                  Solutions
                </span>
              </a>

              {/* Pricing Link */}
              <a
                href="#"
                className="menu-link px-4 py-2.5 text-[#080A16] rounded-xl transition-all duration-100 ease-in-out group flex items-center"
              >
                <span className="text-[15px] font-medium transition-colors duration-100 ease-in-out group-hover:text-[#d1ab35]">
                  Pricing
                </span>
              </a>
            </div>

            {/* Mega Menu Dropdown - Absolute positioned with invisible hover bridge */}
            {openDropdown === 'products' && (
              <div
                className="absolute left-1/2 transform -translate-x-1/2 w-[900px] z-[100]"
                style={{
                  top: '100%',
                  paddingTop: '12px',
                  animation: 'dropdownFadeIn 200ms ease-out forwards',
                }}
              >
                <div
                  className="rounded-3xl py-10 px-8 max-h-[80vh] overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-transparent"
                  style={{
                    backgroundColor: 'rgba(255, 255, 255, 0.98)',
                    backdropFilter: 'blur(40px)',
                    WebkitBackdropFilter: 'blur(40px)',
                    border: '1px solid rgba(220, 220, 220, 0.4)',
                    boxShadow: '0 20px 60px 0 rgba(0, 0, 0, 0.15)',
                  }}
                >
                  <div className="grid grid-cols-3 gap-12">
                    {/* By Role */}
                    <div>
                      <h3 className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-5 px-2">
                        By role
                      </h3>
                      <div className="space-y-0.5">
                        {[
                          { icon: '🏪', name: 'For local business owner' },
                          { icon: '📊', name: 'For marketer' },
                          { icon: '🏢', name: 'For agency' },
                        ].map((item) => (
                          <a
                            key={item.name}
                            href="#"
                            className="group flex items-center gap-3 px-2 py-3 text-[15px] text-[#333] transition-colors duration-150 rounded-lg"
                          >
                            <span className="text-xl transition-transform duration-200 group-hover:scale-110">{item.icon}</span>
                            <span className="font-normal transition-colors duration-150 group-hover:text-[#d1ab35]">{item.name}</span>
                          </a>
                        ))}
                      </div>
                    </div>

                    {/* Products */}
                    <div>
                      <h3 className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-5 px-2">
                        Products
                      </h3>
                      <div className="space-y-0.5">
                        {[
                          { icon: '🍔', name: 'Food and Beverage' },
                          { icon: '💄', name: 'Beauty' },
                          { icon: '🛍️', name: 'Retail' },
                        ].map((item) => (
                          <a
                            key={item.name}
                            href="#"
                            className="group flex items-center gap-3 px-2 py-3 text-[15px] text-[#333] transition-colors duration-150 rounded-lg"
                          >
                            <span className="text-xl transition-transform duration-200 group-hover:scale-110">{item.icon}</span>
                            <span className="font-normal transition-colors duration-150 group-hover:text-[#d1ab35]">{item.name}</span>
                          </a>
                        ))}
                      </div>
                    </div>

                    {/* Customer Engagement */}
                    <div>
                      <h3 className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-5 px-2">
                        Customer Engagement
                      </h3>
                      <div className="space-y-0.5">
                        {[
                          { icon: '💊', name: 'Medicine' },
                          { icon: '🏨', name: 'Hospitality' },
                          { icon: '⚙️', name: 'Professional services' },
                        ].map((item) => (
                          <a
                            key={item.name}
                            href="#"
                            className="group flex items-center gap-3 px-2 py-3 text-[15px] text-[#333] transition-colors duration-150 rounded-lg"
                          >
                            <span className="text-xl transition-transform duration-200 group-hover:scale-110">{item.icon}</span>
                            <span className="font-normal transition-colors duration-150 group-hover:text-[#d1ab35]">{item.name}</span>
                          </a>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Desktop Navigation - Hidden */}
            <div className="hidden">
              {/* Who it's for Dropdown */}
              <div
                className="relative group"
                onMouseEnter={() => setOpenDropdown('who')}
                onMouseLeave={() => setOpenDropdown(null)}
              >
                <button className="menu-link px-4 py-2.5 text-[#080A16] rounded-xl transition-all duration-[50ms] ease-in-out flex items-center gap-1.5 hover:bg-[#FFF9E6] group">
                  <span className="text-[15px] font-medium transition-all duration-[50ms] ease-in-out group-hover:text-[#d1ab35]">
                    Who it&apos;s for
                  </span>
                  <svg
                    className="w-4 h-4 transition-all duration-300 ease-in-out group-hover:opacity-70"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                      clipRule="evenodd"
                    />
                  </svg>
                </button>
                {openDropdown === 'who' && (
                  <div
                    className="absolute left-0 mt-2 w-80 rounded-2xl py-4 z-50 animate-fadeIn"
                    style={{
                      backgroundColor: 'rgba(255, 255, 255, 0.85)',
                      backdropFilter: 'blur(20px)',
                      WebkitBackdropFilter: 'blur(20px)',
                      border: '1px solid rgba(255, 255, 255, 0.5)',
                      boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.2)',
                    }}
                  >
                    <div className="px-4 pb-3 mb-3 border-b border-gray-100">
                      <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-3">
                        By Role
                      </h3>
                      <a
                        href="#"
                        className="block px-4 py-3 text-sm text-[#080A16] hover:bg-[#F6F7FE] rounded-lg transition-all duration-[50ms] mb-1"
                      >
                        <div className="font-semibold mb-1">Local business owner</div>
                        <div className="text-xs text-gray-500">Grow your local business</div>
                      </a>
                      <a
                        href="#"
                        className="block px-4 py-3 text-sm text-[#080A16] hover:bg-[#F6F7FE] rounded-lg transition-all duration-[50ms] mb-1"
                      >
                        <div className="font-semibold mb-1">Marketer</div>
                        <div className="text-xs text-gray-500">Marketing solutions</div>
                      </a>
                      <a
                        href="#"
                        className="block px-4 py-3 text-sm text-[#080A16] hover:bg-[#F6F7FE] rounded-lg transition-all duration-[50ms]"
                      >
                        <div className="font-semibold mb-1">Agency</div>
                        <div className="text-xs text-gray-500">Partner with us</div>
                      </a>
                    </div>
                    <div className="px-4">
                      <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-3">
                        By Industry
                      </h3>
                      <div className="grid grid-cols-2 gap-2">
                        {['Food & Beverage', 'Beauty', 'Retail', 'Medicine', 'Hospitality', 'Professional services'].map(
                          (industry) => (
                            <a
                              key={industry}
                              href="#"
                              className="px-4 py-2 text-sm text-[#080A16] hover:bg-[#F6F7FE] rounded-lg transition-all duration-[50ms]"
                            >
                              {industry}
                            </a>
                          )
                        )}
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Solutions Dropdown */}
              <div
                className="relative group"
                onMouseEnter={() => setOpenDropdown('solutions')}
                onMouseLeave={() => setOpenDropdown(null)}
              >
                <button className="menu-link px-4 py-2.5 text-[#080A16] rounded-xl transition-all duration-[50ms] ease-in-out flex items-center gap-1.5 hover:bg-[#FFF9E6] group">
                  <span className="text-[15px] font-medium transition-all duration-[50ms] ease-in-out group-hover:text-[#d1ab35]">
                    Solutions
                  </span>
                  <svg
                    className="w-4 h-4 transition-all duration-300 ease-in-out group-hover:opacity-70"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                      clipRule="evenodd"
                    />
                  </svg>
                </button>
                {openDropdown === 'solutions' && (
                  <div
                    className="absolute left-0 mt-2 w-[800px] rounded-2xl py-6 z-50 animate-fadeIn"
                    style={{
                      backgroundColor: 'rgba(255, 255, 255, 0.85)',
                      backdropFilter: 'blur(20px)',
                      WebkitBackdropFilter: 'blur(20px)',
                      border: '1px solid rgba(255, 255, 255, 0.5)',
                      boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.2)',
                    }}
                  >
                    <div className="grid grid-cols-3 gap-6 px-6">
                      {/* Digital Loyalty Cards */}
                      <div>
                        <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-3 px-4">
                          Digital Loyalty Cards
                        </h3>
                        {[
                          'Punch cards',
                          'Cashback cards',
                          'Membership cards',
                          'Reward cards',
                          'Discount cards',
                          'Prepaid punch cards',
                          'Coupon cards',
                          'Gift cards',
                        ].map((item) => (
                          <a
                            key={item}
                            href="#"
                            className="block px-4 py-2 text-sm text-[#080A16] hover:bg-[#F6F7FE] rounded-lg transition-all duration-[50ms] mb-1"
                          >
                            {item}
                          </a>
                        ))}
                      </div>

                      {/* Products */}
                      <div>
                        <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-3 px-4">
                          Products
                        </h3>
                        {[
                          'Richie AI Marketer',
                          'Employee Sales',
                          'Franchise/Multi-location',
                          'Agencies',
                          'Scanner app',
                        ].map((item) => (
                          <a
                            key={item}
                            href="#"
                            className="block px-4 py-2 text-sm text-[#080A16] hover:bg-[#F6F7FE] rounded-lg transition-all duration-[50ms] mb-1"
                          >
                            {item}
                          </a>
                        ))}
                      </div>

                      {/* Customer Engagement */}
                      <div>
                        <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-3 px-4">
                          Customer Engagement
                        </h3>
                        {[
                          '2-way communication',
                          'Referral program',
                          'Feedback collection',
                          'Push notifications',
                          'SMS/Email mailings',
                          'Customer data platform',
                          'RFM analysis',
                        ].map((item) => (
                          <a
                            key={item}
                            href="#"
                            className="block px-4 py-2 text-sm text-[#080A16] hover:bg-[#F6F7FE] rounded-lg transition-all duration-50ms mb-1"
                          >
                            {item}
                          </a>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Resources Dropdown */}
              <div
                className="relative group"
                onMouseEnter={() => setOpenDropdown('resources')}
                onMouseLeave={() => setOpenDropdown(null)}
              >
                <button className="menu-link px-4 py-2.5 text-[#080A16] rounded-xl transition-all duration-[50ms] ease-in-out flex items-center gap-1.5 hover:bg-[#FFF9E6] group">
                  <span className="text-[15px] font-medium transition-all duration-[50ms] ease-in-out group-hover:text-[#d1ab35]">
                    Resources
                  </span>
                  <svg
                    className="w-4 h-4 transition-all duration-300 ease-in-out group-hover:opacity-70"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                      clipRule="evenodd"
                    />
                  </svg>
                </button>
                {openDropdown === 'resources' && (
                  <div
                    className="absolute left-0 mt-2 w-[700px] rounded-2xl py-6 z-50 animate-fadeIn"
                    style={{
                      backgroundColor: 'rgba(255, 255, 255, 0.85)',
                      backdropFilter: 'blur(20px)',
                      WebkitBackdropFilter: 'blur(20px)',
                      border: '1px solid rgba(255, 255, 255, 0.5)',
                      boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.2)',
                    }}
                  >
                    <div className="grid grid-cols-3 gap-6 px-6">
                      {/* Get Started */}
                      <div>
                        <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-3 px-4">
                          Get Started
                        </h3>
                        {['Watch demo', 'Quick wins', 'Loyalty ROI Calc', 'Meet Richie'].map((item) => (
                          <a
                            key={item}
                            href="#"
                            className="block px-4 py-2 text-sm text-[#080A16] hover:bg-[#F6F7FE] rounded-lg transition-all duration-[50ms] mb-1"
                          >
                            {item}
                          </a>
                        ))}
                      </div>

                      {/* Learn */}
                      <div>
                        <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-3 px-4">
                          Learn
                        </h3>
                        {['Blog', 'Case studies', 'Ebooks', 'Webinars', 'Comparison', 'Help center'].map((item) => (
                          <a
                            key={item}
                            href="#"
                            className="block px-4 py-2 text-sm text-[#080A16] hover:bg-[#F6F7FE] rounded-lg transition-all duration-[50ms] mb-1"
                          >
                            {item}
                          </a>
                        ))}
                      </div>

                      {/* Join */}
                      <div>
                        <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-3 px-4">
                          Join
                        </h3>
                        {[
                          'Community',
                          'YouTube',
                          'Affiliate program',
                          'Partnership program',
                          'Fully Managed Service',
                        ].map((item) => (
                          <a
                            key={item}
                            href="#"
                            className="block px-4 py-2 text-sm text-[#080A16] hover:bg-[#F6F7FE] rounded-lg transition-all duration-[50ms] mb-1"
                          >
                            {item}
                          </a>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Pricing Link */}
              <a
                href="#"
                className="menu-link px-4 py-2.5 text-[#080A16] rounded-xl transition-all duration-50ms ease-in-out hover:bg-[#FFF9E6] group flex items-center"
              >
                <span className="text-[15px] font-medium transition-all duration-50ms ease-in-out group-hover:text-[#d1ab35]">
                  Pricing
                </span>
              </a>
            </div>

            {/* CTA Buttons */}
            <div
              className={`hidden lg:flex lg:items-center lg:gap-3 flex-shrink-0 overflow-hidden whitespace-nowrap`}
              style={{
                opacity: isScrolled && !isExpanded ? 0 : 1,
                maxWidth: isScrolled && !isExpanded ? '0px' : '400px',
                transition: 'opacity 80ms cubic-bezier(0.4, 0.0, 1, 1), max-width 150ms cubic-bezier(0.4, 0.0, 0.2, 1)',
                willChange: 'opacity, max-width',
                pointerEvents: isScrolled && !isExpanded ? 'none' : 'auto',
                transform: 'translate3d(0, 0, 0)',
              }}
            >
              <a
                href="#"
                className="px-5 py-2.5 text-[15px] text-[#080A16] font-medium hover:text-[#d1ab35] transition-all duration-50ms"
              >
                Sign In
              </a>
              <a
                href="#"
                className="relative px-7 py-3 text-white text-[15px] font-semibold rounded-full overflow-hidden group"
                style={{
                  background: 'linear-gradient(to right, #d1ab35 0%, #f4c430 51%, #d1ab35 100%)',
                  backgroundSize: '200% auto',
                  boxShadow: '0 0 20px rgba(209, 171, 53, 0.3)',
                  transition: 'all 0.5s ease',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundPosition = 'right center';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundPosition = 'left center';
                }}
                onMouseDown={(e) => {
                  e.currentTarget.style.boxShadow = 'none';
                  const overlay = e.currentTarget.querySelector('.overlay') as HTMLElement;
                  if (overlay) overlay.style.opacity = '1';
                }}
                onMouseUp={(e) => {
                  e.currentTarget.style.boxShadow = '0 0 20px #eee';
                  const overlay = e.currentTarget.querySelector('.overlay') as HTMLElement;
                  if (overlay) overlay.style.opacity = '0';
                }}
              >
                <span className="relative z-10">Get Started</span>
                <div
                  className="overlay absolute inset-0 bg-black opacity-0 transition-opacity duration-200"
                  style={{ opacity: 0 }}
                ></div>
              </a>
            </div>

            {/* Mobile menu button */}
            <div className="lg:hidden">
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="p-2 rounded-md text-[#080A16] hover:bg-[#F6F7FE] focus:outline-none"
              >
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  {isMobileMenuOpen ? (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  ) : (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                  )}
                </svg>
              </button>
            </div>
            </div>

            {/* Mobile Menu */}
            {isMobileMenuOpen && (
            <div className="lg:hidden py-4 space-y-2 max-h-[80vh] overflow-y-auto">
              <div className="space-y-2">
                <a href="#" className="block px-4 py-2 text-[#080A16] hover:bg-[#F6F7FE] rounded-lg">
                  Who it&apos;s for
                </a>
                <a href="#" className="block px-4 py-2 text-[#080A16] hover:bg-[#F6F7FE] rounded-lg">
                  Solutions
                </a>
                <a href="#" className="block px-4 py-2 text-[#080A16] hover:bg-[#F6F7FE] rounded-lg">
                  Resources
                </a>
                <a href="#" className="block px-4 py-2 text-[#080A16] hover:bg-[#F6F7FE] rounded-lg">
                  Pricing
                </a>
              </div>

              <div className="pt-4 space-y-2 border-t border-gray-200">
                <a
                  href="#"
                  className="block w-full text-center px-6 py-3 text-[#080A16] text-sm font-medium border border-[#d1ab35] rounded-full hover:bg-[#FFF9E6] transition-all duration-[50ms]"
                >
                  Sign In
                </a>
                <a
                  href="#"
                  className="block w-full text-center px-6 py-3 text-white text-sm font-semibold rounded-full"
                  style={{
                    background: 'linear-gradient(to right, #d1ab35, #f4c430)',
                    boxShadow: '0 0 20px rgba(209, 171, 53, 0.3)',
                  }}
                >
                  Get Started
                </a>
              </div>
            </div>
            )}
          </nav>
          </div>
        </div>
      </header>

      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes dropdownFadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out forwards;
        }
      `}</style>
    </>
  );
}
