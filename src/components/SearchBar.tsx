import { Search } from 'lucide-react';

interface SearchBarProps {
  placeholder: string;
  value: string;
  onChange: (value: string) => void;
  className?: string;
}

export function SearchBar({ placeholder, value, onChange, className = '' }: SearchBarProps) {
  return (
    <div className={`relative ${className}`}>
      <Search
        size={15}
        strokeWidth={1.8}
        className="absolute left-2.5 top-1/2 -translate-y-1/2 text-[#c2c2c6] pointer-events-none"
      />
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full rounded-lg bg-white py-1.5 pl-8 pr-3 text-sm text-[#2e2e30] placeholder-[#b8b8bc] outline-none ring-1 ring-black/[0.06] transition-all duration-200 focus:ring-[var(--accent,#007aff)] focus:ring-opacity-50 focus:shadow-[0_0_0_3px_var(--accent-soft,rgba(0,122,255,0.1))]"
        style={{
          borderRadius: 8,
          transition: 'width 0.25s cubic-bezier(0.23, 1, 0.32, 1), box-shadow 0.2s ease, border-color 0.2s ease',
        }}
      />
    </div>
  );
}

export default SearchBar;
