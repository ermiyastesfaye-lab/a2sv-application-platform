"use client";

import React from "react";
import { Menu, Popover } from "@mantine/core";
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

// Root wrapper around Mantine Menu
export const DropdownMenu: React.FC<DropdownMenuProps> = ({ children }) => {
  return (
    <Menu withinPortal position="bottom-end" offset={6} shadow="md" radius="md">
      {children}
    </Menu>
  );
};

// Trigger maps to Menu.Target; we keep your button + classes
export const DropdownMenuTrigger: React.FC<DropdownMenuTriggerProps> = ({
  children,
  className = "",
}) => {
  return (
    <Menu.Target>
      <button type="button" className={`inline-flex items-center ${className}`}>
        {children}
      </button>
    </Menu.Target>
  );
};

// Content maps to Menu.Dropdown; preserve ability to pass width classes like w-44
export const DropdownMenuContent: React.FC<DropdownMenuContentProps> = ({
  children,
  className = "",
}) => {
  return (
    <Menu.Dropdown
      className={`rounded-lg border border-gray-200 py-1 ${className}`}
    >
      {children}
    </Menu.Dropdown>
  );
};

// Item maps to Menu.Item
export const DropdownMenuItem: React.FC<DropdownMenuItemProps> = ({
  children,
  className = "",
  onClick,
}) => {
  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    onClick?.();
  };
  return (
    <Menu.Item onClick={handleClick} className={`text-sm ${className}`}>
      {children}
    </Menu.Item>
  );
};

// Submenu implemented using Mantine Popover for reliable click handling
export const DropdownMenuSub: React.FC<
  DropdownMenuSubProps & {
    onClick?: (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
  }
> = ({ trigger, children, className = "", onClick }) => {
  const [opened, setOpened] = React.useState(false);
  return (
    <Popover
      opened={opened}
      onChange={setOpened}
      position="right-start"
      withArrow
      shadow="md"
      offset={8}
      withinPortal
    >
      <Popover.Target>
        <div
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            setOpened((o) => !o);
            onClick?.(e);
          }}
          className={`flex items-center justify-between cursor-pointer select-none ${className}`}
          style={{ minWidth: 160 }}
        >
          <span>{trigger}</span>
          <ChevronRightIcon className="w-4 h-4 text-gray-400 ml-2" />
        </div>
      </Popover.Target>
      <Popover.Dropdown className="rounded-lg border border-gray-200 py-1 w-48 bg-white">
        {children}
      </Popover.Dropdown>
    </Popover>
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
  // Find the closest open popover and close it after click
  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    onClick?.();
    const popover = (e.target as HTMLElement).closest("[data-popover]");
    if (popover) {
      const evt = new CustomEvent("mantine-popover-close", { bubbles: true });
      popover.dispatchEvent(evt);
    }
  };
  return (
    <div data-popover-item>
      <Menu.Item
        onClick={handleClick}
        leftSection={icon}
        className={`flex items-center gap-3 text-sm ${className}`}
      >
        {children}
      </Menu.Item>
    </div>
  );
};
