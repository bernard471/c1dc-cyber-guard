

export default function Hero() {
    return (
      <div className="relative bg-[#001233] overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <div className="relative z-10 pb-8 sm:pb-16 md:pb-20 lg:max-w-2xl lg:w-full lg:pb-28 xl:pb-32">
            <main className="mt-10 mx-auto max-w-7xl px-4 sm:mt-12 sm:px-6 md:mt-16 lg:mt-20 lg:px-8 xl:mt-28">
              <div className="sm:text-center lg:text-left">
                <h1 className="text-4xl tracking-tight font-extrabold text-[#979dac] sm:text-5xl md:text-6xl">
                  <span className="block ">Report Cybercrime</span>
                  <span className="block font-serif text-[#0466c8]">Protect Your Digital Life</span>
                </h1>
                <p className="mt-3 text-base text-[#7d8597] sm:mt-5 sm:text-lg sm:max-w-xl sm:mx-auto md:mt-5 md:text-xl lg:mx-0">
                  Take action against cyber threats. Our platform provides a secure way to report cybercrimes and get immediate assistance from experts.
                </p>
                <div className="mt-5 sm:mt-8 sm:flex sm:justify-center lg:justify-start">
                  <div className="rounded-md shadow">
                    <a
                      href="/report-crime"
                      className="w-full flex items-center justify-center px-4 py-2 border border-transparent text-base font-medium rounded-md text-white bg-[#0466c8] hover:bg-[#0353a4] md:py-2 md:text-lg md:px-6"
                    >
                      Report Now
                    </a>
                  </div>
                  <div className="mt-3 sm:mt-0 sm:ml-3">
                    <a
                      href="/resources"
                      className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-[#979dac] bg-[#001845] hover:bg-[#023e7d] md:py-2 md:text-lg md:px-6"
                    >
                      Learn More
                    </a>
                  </div>
                </div>
              </div>
            </main>
          </div>
        </div>
        <div className="lg:absolute lg:inset-y-0 lg:right-0 lg:w-1/2">
          <div className="h-56 w-full object-cover sm:h-72 md:h-96 lg:w-full lg:h-full bg-gradient-to-r from-[#001233] via-[#023e7d] to-[#0466c8] opacity-75"></div>
        </div>
     
      </div>
    )
  }
  