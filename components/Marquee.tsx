const PHRASE = "VOLT ENERGY ✦ IGNITE YOUR PULSE ✦ ";

export default function Marquee() {
  return (
    <section aria-hidden className="relative z-20 -my-6 overflow-hidden py-6">
      <div className="-rotate-2 scale-[1.03]">
        <div className="overflow-hidden border-y-4 border-black bg-volt py-3 md:py-4">
          <div className="animate-marquee flex w-max whitespace-nowrap">
            {[0, 1].map((copy) => (
              <span
                key={copy}
                className="font-display pr-2 text-2xl tracking-[0.08em] text-black md:text-4xl"
              >
                {PHRASE.repeat(6)}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
