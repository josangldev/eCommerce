import { useState } from 'react';
import React from 'react';

interface SidebarProps {
  categoryFilter: string;
  onCategoryChange: (category: string) => void;
  priceFilter: string;
  onPriceChange: (price: string) => void;
}

const priceRanges = {
  'all': 'Cualquiera',
  '0-20': '$0 - $20',
  '20-50': '$20 - $50',
  '50-100': '$50 - $100',
  '100-200': '$100 - $200'
};

const genderOptions = {
    'all': 'Todos',
    "men's clothing": 'Hombre',
    "women's clothing": 'Mujer',
};

const ChevronIcon = ({ isOpen }: { isOpen: boolean }) => (
    <svg className={`w-6 h-6 transition-transform transform ${isOpen ? '' : 'rotate-180'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
    </svg>
);

// Componente Sidebar: permite filtrar productos por género y precio
const Sidebar = ({ onCategoryChange, categoryFilter, onPriceChange, priceFilter }: SidebarProps) => {
  // Estado para abrir/cerrar el sidebar y las secciones de filtros
  const [isOpen, setIsOpen] = useState(false);
  const [openSections, setOpenSections] = useState({ gender: true, price: true, size: true, color: true });

  // Alterna la visibilidad de cada sección de filtros
  const toggleSection = (section: keyof typeof openSections) => {
    setOpenSections(prev => ({ ...prev, [section]: !prev[section] }));
  };

  // Renderiza una opción de filtro tipo radio
  const renderRadioOption = (groupName: string, value: string, label: string, checkedValue: string, onChange: (value: string) => void) => (
    <div key={value}>
        <label htmlFor={`${groupName}-${value}`} className="flex items-center cursor-pointer text-gray-700">
            <input 
                type="radio" 
                id={`${groupName}-${value}`} 
                name={groupName} 
                value={value} 
                checked={checkedValue === value} 
                onChange={(e) => onChange(e.target.value)}
                className="peer hidden"
            />
            <span className="w-5 h-5 mr-3 border-2 border-gray-400 rounded-sm grid place-items-center peer-checked:bg-gray-800 peer-checked:border-gray-800">
                {checkedValue === value && <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 16 16"><path d="M10.97 4.97a.75.75 0 0 1 1.07 1.05l-3.99 4.99a.75.75 0 0 1-1.08.02L4.324 8.384a.75.75 0 1 1 1.06-1.06l2.094 2.093 3.473-4.425a.267.267 0 0 1 .02-.022z"/></svg>}
            </span>
            {label}
        </label>
    </div>
  );

  // Renderiza una sección de filtros (género o precio)
  const renderSection = (section: keyof typeof openSections, title: string, content: React.ReactNode) => (
    <div className="mb-6">
      <button
        onClick={() => toggleSection(section)}
        className="flex justify-between items-center w-full font-bold text-lg mb-3 transition-colors duration-200 hover:text-blue-500 focus:text-blue-600"
      >
        <span>{title}</span>
        <ChevronIcon isOpen={openSections[section]} />
      </button>
      <div
        className={`transition-all duration-300 ease-in-out overflow-hidden ${openSections[section] ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}
        style={{ willChange: 'max-height, opacity' }}
      >
        {openSections[section] && content}
      </div>
    </div>
  );

  return (
    <>
      <div
        className={`sidebar-overlay${isOpen ? ' active' : ''} lg:hidden`}
        onClick={() => setIsOpen(false)}
      />
      {!isOpen && (
        <button 
          className="lg:hidden fixed top-20 left-2 z-20 bg-gray-800 text-white p-2 rounded-full shadow-lg transition-transform duration-200 hover:scale-110"
          onClick={() => setIsOpen(true)}
        >
          <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h7" />
          </svg>
        </button>
      )}

      <aside className={`bg-white p-6 rounded-lg shadow-md
        lg:static lg:translate-x-0 lg:h-auto lg:overflow-visible lg:z-auto
        transition-transform transform
        fixed top-0 left-0 h-full overflow-y-auto z-30 w-64
        ${isOpen ? 'translate-x-0' : '-translate-x-full'}
        lg:w-auto
      `}>
        <div className="flex justify-between items-center lg:hidden mb-4">
            <h2 className="text-xl font-bold">Filtros</h2>
            <button onClick={() => setIsOpen(false)} className="text-2xl transition-transform duration-200 hover:scale-110">&times;</button>
        </div>
        {renderSection('gender', 'Género', (
          <div className="space-y-3 pl-1">
            {Object.entries(genderOptions).map(([key, value]) => 
              renderRadioOption('gender', key, value, categoryFilter, onCategoryChange)
            )}
          </div>
        ))}
        <hr className="my-6"/>
        {renderSection('price', 'Precio', (
          <div className="space-y-3 pl-1">
            {Object.entries(priceRanges).map(([key, value]) => 
              renderRadioOption('price', key, value, priceFilter, onPriceChange)
            )}
          </div>
        ))}
        <hr className="my-6"/>
      </aside>
    </>
  );
}

export default Sidebar;