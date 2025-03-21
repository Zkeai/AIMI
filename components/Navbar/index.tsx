import {
  Navbar as HeroUINavbar,
  NavbarContent,
  NavbarMenu,
  NavbarMenuToggle,
  NavbarBrand,
  NavbarItem,
  NavbarMenuItem,
} from "@heroui/navbar";
import { useTranslations } from "next-intl";

import { Kbd } from "@heroui/kbd";
import { Link } from "@heroui/link";
import { Input } from "@heroui/input";
import { link as linkStyles } from "@heroui/theme";
import NextLink from "next/link";
import clsx from "clsx";

import { siteConfig } from "@/config/site";
import { ThemeSwitch } from "@/components/ThemSwitch";
import { GithubIcon, SearchIcon, Logo } from "@/components/GlobalIcons";
import { ConnectButton } from "@/components/SolanaConnectButton";
import LangSwitch from "@/components/LangSwitch";

export const Navbar = () => {
  const t = useTranslations("NavBar");
  const searchInput = (
    <Input
      aria-label="Search"
      classNames={{
        inputWrapper: "bg-default-100 w-full", // 确保输入框的父容器宽度为100%
        input: "text-sm w-full", // 确保输入框本身宽度为100%
      }}
      endContent={
        <Kbd className="hidden lg:inline-block" keys={["command"]}>
          K
        </Kbd>
      }
      labelPlacement="outside"
      placeholder="Search..."
      startContent={
        <SearchIcon className="text-base text-default-400 pointer-events-none flex-shrink-0" />
      }
      type="search"
    />
  );

  return (
    <HeroUINavbar maxWidth="full" position="sticky">
      <NavbarContent className="basis-1/5 sm:basis-full" justify="start">
        <NavbarBrand as="li" className="gap-3 max-w-fit">
          <NextLink className="flex justify-start items-center gap-1" href="/">
            <img src="/favicon.ico" alt="logo" className="w-6 h-6" />
            <p className="font-bold text-inherit text-2xl">
              {process.env.NEXT_PUBLIC_PROJECT_NAME}
            </p>
          </NextLink>
        </NavbarBrand>
        <ul className="hidden lg:flex gap-4 justify-start ml-2  ">
          {siteConfig.navItems.map((item) => (
            <NavbarItem key={item.href}>
              <NextLink
                className={clsx(
                  linkStyles({ color: "foreground" }),
                  "data-[active=true]:text-primary data-[active=true]:font-medium"
                )}
                color="foreground"
                href={item.href}
              >
                <p className="text-gray-400 active:text-orange-600 ">
                  {t(item.label)}
                </p>
              </NextLink>
            </NavbarItem>
          ))}
        </ul>
      </NavbarContent>

      {/* PC端搜索栏居中 */}
      <NavbarContent className="hidden lg:flex basis-1/5 justify-center  ">
        <NavbarItem className="w-full">{searchInput}</NavbarItem>
      </NavbarContent>

      <NavbarContent
        className="hidden sm:flex basis-1/5 sm:basis-full"
        justify="end"
      >
        <NavbarItem className="hidden sm:flex gap-2 ">
          <ThemeSwitch />
          <LangSwitch />
        </NavbarItem>
        <NavbarItem className="hidden sm:flex gap-2 ml-5">
          <ConnectButton />
        </NavbarItem>
      </NavbarContent>

      {/* 手机模式 */}
      <NavbarContent className="sm:hidden basis-1 pl-4" justify="end">
        <Link isExternal aria-label="Github" href={siteConfig.links.github}>
          <GithubIcon className="text-default-500" />
        </Link>
        <ThemeSwitch />
        <NavbarMenuToggle />
      </NavbarContent>

      <NavbarMenu>
        {searchInput}
        <div className="mx-4 mt-2 flex flex-col gap-2">
          {siteConfig.navMenuItems.map((item, index) => (
            <NavbarMenuItem key={`${item}-${index}`}>
              <Link
                color={
                  index === 2
                    ? "primary"
                    : index === siteConfig.navMenuItems.length - 1
                      ? "danger"
                      : "foreground"
                }
                href="#"
                size="lg"
              >
                {item.label}
              </Link>
            </NavbarMenuItem>
          ))}
        </div>
      </NavbarMenu>
    </HeroUINavbar>
  );
};
