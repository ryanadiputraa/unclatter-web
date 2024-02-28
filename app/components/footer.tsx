export function Footer() {
  const date = new Date();
  return (
    <footer className="py-4 px-[4%] lg:px-6">
      <a href="https://ryanadiputra.vercel.app/" target="_blank" referrerPolicy="no-referrer">
        © {date.getFullYear()}, RYAN ADI PUTRA
      </a>
    </footer>
  );
}
