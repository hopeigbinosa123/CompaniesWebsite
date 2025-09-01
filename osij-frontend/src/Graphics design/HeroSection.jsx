export default function HeroSection() {
  return (
    <section className="min-h-screen bg-gradient-to-br from-indigo-700 via-purple-600 to-pink-500 text-white flex items-center justify-center px-6 py-32">
      <div className="max-w-4xl w-full text-center bg-white/10 backdrop-blur-xl rounded-3xl p-12 shadow-[0_20px_60px_rgba(0,0,0,0.4)]">
        <h1 className="text-5xl md:text-6xl font-black leading-tight tracking-tight mb-6 drop-shadow-lg">
          Welcome to Osij Studio 🎨
        </h1>
        <p className="text-lg md:text-xl font-medium mb-10 max-w-2xl mx-auto text-white/80">
          Your creative journey starts here. Submit designs, explore modules, and build your portfolio in a space that feels alive.
        </p>
        <div className="flex justify-center gap-4 flex-wrap">
          <Button variant="indigo">View Your Dashboard</Button>
          <Button variant="pink">Submit a Design</Button>
        </div>
      </div>
    </section>
  );
}

// Modular Button Component
function Button({ children, variant }) {
  const base = "font-semibold px-6 py-3 rounded-full shadow-lg transition";
  const variants = {
    indigo: "bg-white text-indigo-700 hover:bg-indigo-100",
    pink: "bg-white text-pink-600 hover:bg-pink-100",
  };
  return <button className={`${base} ${variants[variant]}`}>{children}</button>;
}
