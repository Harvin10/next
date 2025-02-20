import Image from "next/image";
import Link from "next/link";
import Button from '../components/common/Button/Button';

const Home = () => {
  return (
    <div className="relative h-screen w-full">
      <div className="absolute inset-0 bg-black/40 z-[1]" />

      <Image
        src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab"
        alt="Modern Property Building"
        fill
        className="object-cover"
        priority
      />

      <div className="relative z-10 p-8 max-w-3xl mx-auto h-full flex flex-col justify-center">
        <div className="space-y-6">
          <h1 className="text-5xl font-bold text-white leading-tight [text-shadow:_0_2px_4px_rgb(0_0_0_/_60%)]">
            Find Your Dream Property Today
          </h1>

          <p className="text-xl text-white leading-relaxed [text-shadow:_0_1px_2px_rgb(0_0_0_/_40%)]">
            Discover thousands of carefully curated properties that match your
            lifestyle and budget at <span className="font-bold">JagoRumah</span>. Our expert team is here to guide you through
            every step of your journey.
          </p>

          <div className="pt-4">
            <Link href="/products">
              <Button
                variant="primary"
                size="lg"
                icon={
                  <Image
                    src="/images/arrow-right.png"
                    alt="Arrow right icon"
                    width={20}
                    height={20}
                  />
                }
              >
                Find Now
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
