export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-slate-800/70 px-6 py-8 text-center text-sm text-slate-400">
      <p>
        Made with ❤️ by <span className="text-white">Aryan Tiwari</span> • {year}
      </p>
    </footer>
  );
}
