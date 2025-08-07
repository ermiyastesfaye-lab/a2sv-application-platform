import React, { useState, useRef, useEffect } from "react";
import { ChevronRightIcon } from "./Icons";

interface DropdownMenuProps {
  children: React.ReactNode;
}

interface DropdownMenuTriggerProps {
  children: React.ReactNode;
  className?: string;
}

interface DropdownMenuContentProps {
  children: React.ReactNode;
  className?: string;
}

interface DropdownMenuItemProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
}

interface DropdownMenuSubProps {
  trigger: React.ReactNode;
  children: React.ReactNode;
  className?: string;
}

interface DropdownMenuSubContentProps {
  children: React.ReactNode;
  className?: string;
}

interface DropdownMenuSubItemProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  icon?: React.ReactNode;
}

const DropdownContext = React.createContext<{
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
}>({
  isOpen: false,
  setIsOpen: () => {},
});

const DropdownSubContext = React.createContext<{
  isSubOpen: boolean;
  setIsSubOpen: (open: boolean) => void;
}>({
  isSubOpen: false,
  setIsSubOpen: () => {},
});

export const DropdownMenu: React.FC<DropdownMenuProps> = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <DropdownContext.Provider value={{ isOpen, setIsOpen }}>
      <div className="relative" ref={dropdownRef}>
        {children}
      </div>
    </DropdownContext.Provider>
  );
};

export const DropdownMenuTrigger: React.FC<DropdownMenuTriggerProps> = ({
  children,
  className = "",
}) => {
  const { isOpen, setIsOpen } = React.useContext(DropdownContext);

  return (
    <button
      className={`inline-flex items-center ${className}`}
      onClick={() => setIsOpen(!isOpen)}
    >
      {children}
    </button>
  );
};

export const DropdownMenuContent: React.FC<DropdownMenuContentProps> = ({
  children,
  className = "",
}) => {
  const { isOpen } = React.useContext(DropdownContext);

  if (!isOpen) return null;

  return (
    <div
      className={`absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 z-50 py-1 ${className}`}
    >
      {children}
    </div>
  );
};

export const DropdownMenuItem: React.FC<DropdownMenuItemProps> = ({
  children,
  className = "",
  onClick,
}) => {
  const { setIsOpen } = React.useContext(DropdownContext);

  const handleClick = () => {
    onClick?.();
    setIsOpen(false);
  };

  return (
    <button
      className={`w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors duration-150 ${className}`}
      onClick={handleClick}
    >
      {children}
    </button>
  );
};

export const DropdownMenuSub: React.FC<DropdownMenuSubProps> = ({
  trigger,
  children,
  className = "",
}) => {
  const [isSubOpen, setIsSubOpen] = useState(false);
  const subRef = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ top: 0, left: 0 });

  const handleMouseEnter = () => {
    setIsSubOpen(true);
    if (subRef.current) {
      const rect = subRef.current.getBoundingClientRect();
      setPosition({
        top: rect.top + window.scrollY,
        left: rect.right + window.scrollX,
      });
    }
  };

  const handleMouseLeave = () => {
    setIsSubOpen(false);
  };

  return (
    <DropdownSubContext.Provider value={{ isSubOpen, setIsSubOpen }}>
      <div
        className="relative"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        ref={subRef}
      >
        <button
          className={`w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors duration-150 flex items-center justify-between ${className}`}
        >
          {trigger}
          <ChevronRightIcon className="w-4 h-4 text-gray-400" />
        </button>
        {isSubOpen && (
          <div
            className="fixed bg-white rounded-lg shadow-lg border border-gray-200 z-[200] py-1 w-48"
            style={{
              top: `${position.top}px`,
              left: `${position.left}px`,
            }}
          >
            {children}
          </div>
        )}
      </div>
    </DropdownSubContext.Provider>
  );
};

export const DropdownMenuSubContent: React.FC<DropdownMenuSubContentProps> = ({
  children,
  className = "",
}) => {
  return <div className={className}>{children}</div>;
};

export const DropdownMenuSubItem: React.FC<DropdownMenuSubItemProps> = ({
  children,
  className = "",
  onClick,
  icon,
}) => {
  const { setIsOpen } = React.useContext(DropdownContext);
  const { setIsSubOpen } = React.useContext(DropdownSubContext);

  const handleClick = () => {
    onClick?.();
    setIsSubOpen(false);
    setIsOpen(false);
  };

  return (
    <button
      className={`w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors duration-150 flex items-center gap-3 ${className}`}
      onClick={handleClick}
    >
      {icon && <span className="flex-shrink-0">{icon}</span>}
      <span>{children}</span>
    </button>
  );
};
