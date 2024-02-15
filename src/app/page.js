import SignUp from "@/components/SignUp";
import Login from "@/components/Login";
import { Quattrocento } from "next/font/google";

const quattrocento = Quattrocento({ subsets: ["latin"], weight: '400' })

export default function Home() {
  return (
    <main className=" mt-16">
      <div className="h-[32rem]">
          <h1 className="text-center text-5xl md:text-7xl pt-16">The Reporting</h1>
          <h1 className="text-center text-5xl md:text-7xl mb-10">Source</h1>

          <h6 className="mx-auto opacity-80 text-center max-w-[800px]">Protect yourself from vacant land fraud! Join our community and together let&#697;s safeguard sellers, buyers, and realtors from falling victim to seller impersonation fraud.</h6>
      </div>
      <div className="px-14 py-12 flex flex-col md:flex-row bg-gradient-to-b from-gray-400 to-gray-600">
          <p className={`${quattrocento.className} text-offwhite leading-normal tracking-wide w-full md:w-3/5 pl-4 text-md md:text-lg`}>Vacant Land Fraud, also known as Seller Impersonation Fraud has become one of the leading real estate frauds in today&#697;s market. Vacant Land is often targeted because the homeowner is typically in a different city or state, leaving the property able to be marketed, toured and inspected without the actual seller being made aware. While there are many red flags that may help to identify a vacant land fraud attempt, we felt a single resource for industry professionals to share properties that have been targeted may allow for us to further protect our sellers, buyers and realtors from unknowingly falling victim to this type of fraud.</p>
          <div className="w-full md:w-2/5 flex flex-col justify-evenly gap-6 mt-8 md:mt-0">
              <SignUp />
              <Login />
          </div>
      </div>



    </main>
  );
}
