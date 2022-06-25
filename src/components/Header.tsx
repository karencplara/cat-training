import { Logo } from "./Logo";

export function Header() {
  return (
   <header className="w-full py-5 flex items-center justify-center bg-rose-200 border-b border-rose-300">
      <Logo />
   </header>
  )
}