"use client";

import * as React from "react";
import Link from "next/link";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { ModeToggle } from "./darkMode-button";
import Image from "next/image";
import { Signin } from "./Signin";
import SignUp from "./SignUp";
import { useState } from "react";
import Modal from "./Modal";

const components = [
  { title: "Alert Dialog", href: "/docs/primitives/alert-dialog", description: "A modal ." },
  { title: "Hover Card", href: "/docs/primitives/hover-card", description: "For sighted users " },
  { title: "Progress", href: "/docs/primitives/progress", description: "Displays an indicator " },
  { title: "Scroll-area", href: "/docs/primitives/scroll-area", description: "Visually or semantically separates content." },
  { title: "Tabs", href: "/docs/primitives/tabs", description: "A set of layered " },
  { title: "Tooltip", href: "/docs/primitives/tooltip", description: "A popup that displays " },
];

export function NavigationMenum() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [showSignin, setShowSignin] = useState(false);
  const [showSignUp, setShowSignUp] = useState(false);
  const [openSubMenus, setOpenSubMenus] = useState<{ [key: string]: boolean }>({});

  const toggleSubMenu = (key: string) => {
    setOpenSubMenus((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const closeAll = () => {
    setMobileOpen(false);
    setOpenSubMenus({});
  };

  // Add login for mobile as button
  const mobileMenuItems = [
    {
      key: "home",
      title: "Home",
      submenu: [
        { title: "Introduction", href: "/a" },
        { title: "Installation", href: "/b" },
        { title: "Typography", href: "/c" },
      ],
    },
    {
      key: "components",
      title: "Components",
      submenu: components.map((c) => ({ title: c.title, href: c.href })),
    },
    { key: "docs", title: "Docs", href: "/docs" },
  ];

  return (
    <nav className="relative border-b border-gray-200 overflow-visible">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          {/* Logo / Brand */}
          <div className="flex-shrink-0 justify-between flex items-center space-x-2">
            <Image src="/assets/logo.png" alt="Satadiya Logo" width={45} height={40} />
            <div>
              <Link href="/" className="text-lg font-semibold">Satadiya</Link>
            </div>
          </div>
          {/* Hamburger for mobile and login button */}
          <div className="lg:hidden flex items-center">
            <button className="mr-3" onClick={()=>setShowSignin(true)}>login</button>
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label="Toggle menu"
              className="inline-flex items-center justify-center p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500"
            >
              {!mobileOpen ? (
                <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              ) : (
                <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              )}
            </button>
            <div className="lg:hidden px-3 flex items-center">
              <ModeToggle />
            </div>
          </div>

          {/* Desktop menu */}
          <div className="hidden lg:block">
            <NavigationMenu viewport={false}>
              <NavigationMenuList className="flex space-x-4">
                <NavigationMenuItem>
                  <NavigationMenuTrigger>Home</NavigationMenuTrigger>
                  <NavigationMenuContent className="absolute z-50 top-full left-0 mt-2 min-w-[17rem] max-w-screen-md shadow-lg rounded-md overflow-auto max-h-96">
                    <ul className="grid gap-2 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr] p-4">
                      <li className="row-span-3">
                        <NavigationMenuLink asChild>
                          <Link className="from-muted/50 to-muted flex h-full w-full flex-col justify-end rounded-md bg-linear-to-b p-6 no-underline select-none focus:shadow-md" href="/">
                            <div className="mt-4 mb-2 text-lg font-medium">Satadiya</div>
                            <p className="text-muted-foreground text-sm leading-tight">"A step towards digital Gram Swaraj"</p>
                          </Link>
                        </NavigationMenuLink>
                      </li>
                      <ListItem href="/" title="Introduction"></ListItem>
                      <ListItem href="/" title="Installation"></ListItem>
                      <ListItem href="/" title="Typography"></ListItem>
                    </ul>
                  </NavigationMenuContent>
                </NavigationMenuItem>

                <NavigationMenuItem>
                  <NavigationMenuTrigger>Components</NavigationMenuTrigger>
                  <NavigationMenuContent className="absolute z-50 top-full left-0 mt-2 min-w-[17rem] max-w-screen-md shadow-lg rounded-md overflow-auto max-h-96">
                    <ul className="grid gap-2 md:grid-cols-1 p-4 scroll-auto">
                      {components.map((component) => (
                        <ListItem
                          key={component.title}
                          title={component.title}
                          href={component.href}
                        >
                          {component.description}
                        </ListItem>
                      ))}
                    </ul>
                  </NavigationMenuContent>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <NavigationMenuLink asChild className={navigationMenuTriggerStyle()}>
                    <Link href="/docs">Docs</Link>
                  </NavigationMenuLink>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <NavigationMenuLink asChild className={navigationMenuTriggerStyle()}>
                    <button onClick={() => setShowSignin(true)}>
                      login
                    </button>
                  </NavigationMenuLink>
                </NavigationMenuItem>
                <ModeToggle />
              </NavigationMenuList>
            </NavigationMenu>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="lg:hidden border-t border-gray-200 shadow-md">
          <ul className="space-y-1 px-2 pt-2 pb-3">
            {mobileMenuItems.map(({ key, title, submenu, href }) => (
              <li key={key}>
                {submenu ? (
                  <>
                    <button
                      onClick={() => toggleSubMenu(key)}
                      className="w-full flex justify-between items-center rounded-md px-3 py-2 text-base font-medium "
                      aria-expanded={!!openSubMenus[key]}
                    >
                      {title}
                      <svg
                        className={`h-5 w-5 transform transition-transform duration-200 ${openSubMenus[key] ? "rotate-180" : ""}`}
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </button>
                    {openSubMenus[key] && (
                      <ul className="pl-6 mt-1 space-y-1">
                        {submenu.map((item) => (
                          <li key={item.href}>
                            <Link href={item.href} onClick={closeAll} className="block rounded-md px-3 py-2 text-sm font-normal">
                              {item.title}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    )}
                  </>
                ) : (
                  <Link href={href!} onClick={closeAll} className="block rounded-md px-3 py-2 text-base font-medium ">
                    {title}
                  </Link>
                )}
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* SignIn Modal */}
      <Modal isOpen={showSignin} onClose={() => setShowSignin(false)}>
        <Signin showSignupp={() => {
          setShowSignin(false);
          setShowSignUp(true);
        }} />
      </Modal>
      {/* SignUp Modal */}
      <Modal isOpen={showSignUp} onClose={() => setShowSignUp(false)}>
        <SignUp showSigninn={() => {
          setShowSignUp(false);
          setShowSignin(true);
        }} />
      </Modal>
    </nav>
  );
}

function ListItem({
  title,
  children,
  href,
  ...props
}: React.ComponentPropsWithoutRef<"li"> & { href: string }) {
  return (
    <li {...props}>
      <NavigationMenuLink asChild>
        <Link href={href} className="block">
          <div className="text-sm leading-none font-medium">{title}</div>
          <p className="text-muted-foreground line-clamp-2 text-sm leading-snug">{children}</p>
        </Link>
      </NavigationMenuLink>
    </li>
  );
}

export default NavigationMenum;
