import { type KeyboardEvent, useEffect, useRef, useState } from "react";
import type { HeaderDepth2Menu, HeaderMainMenu } from "./header.types";
import {
  Backdrop,
  DescriptionList,
  Inner,
  LastDepthList,
  MainLink,
  MainList,
  MainMenuItem,
  MainMenuList,
  MainToggleWrap,
  MainTrigger,
  Navigation,
  SubMenuContent,
  SubTitle,
  SubTrigger,
  SubTriggerList,
} from "./header.styles";

interface DesktopNavigationProps {
  menus: HeaderMainMenu[];
}

const getFirstExpandableSubmenu = (menu?: HeaderMainMenu): string | null => {
  const firstSubmenu = menu?.children?.find(
    (child) => child.children && child.children.length > 0,
  );

  return firstSubmenu?.id ?? null;
};

const DesktopNavigation = ({ menus }: DesktopNavigationProps) => {
  const [openMenuId, setOpenMenuId] = useState<string | null>(null);
  const [activeSubmenuId, setActiveSubmenuId] = useState<string | null>(null);

  const navigationRef = useRef<HTMLElement>(null);
  const triggerRefs = useRef<
    Array<HTMLButtonElement | HTMLAnchorElement | null>
  >([]);

  const openMenu = menus.find((menu) => menu.id === openMenuId);

  const activeSubmenu =
    openMenu?.children?.find((submenu) => submenu.id === activeSubmenuId) ??
    openMenu?.children?.[0];

  const closeMenu = () => {
    setOpenMenuId(null);
    setActiveSubmenuId(null);
  };

  const handleMainMenuClick = (menu: HeaderMainMenu) => {
    if (openMenuId === menu.id) {
      closeMenu();
      return;
    }

    setOpenMenuId(menu.id);
    setActiveSubmenuId(getFirstExpandableSubmenu(menu));
  };

  useEffect(() => {
    if (!openMenuId) {
      document.body.classList.remove("is-gnb-web", "hasScrollY");
      return;
    }

    const hasVerticalScrollbar =
      document.documentElement.scrollHeight > window.innerHeight;

    document.body.classList.add("is-gnb-web");
    document.body.classList.toggle("hasScrollY", hasVerticalScrollbar);

    const handleOutsideClick = (event: MouseEvent) => {
      const target = event.target;

      if (target instanceof Node && !navigationRef.current?.contains(target)) {
        closeMenu();
      }
    };

    const handleEscape = (event: globalThis.KeyboardEvent) => {
      if (event.key === "Escape") {
        closeMenu();
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);
    document.addEventListener("keydown", handleEscape);

    return () => {
      document.body.classList.remove("is-gnb-web", "hasScrollY");
      document.removeEventListener("mousedown", handleOutsideClick);
      document.removeEventListener("keydown", handleEscape);
    };
  }, [openMenuId]);

  const handleKeyboardNavigation = (
    event: KeyboardEvent<HTMLButtonElement | HTMLAnchorElement>,
    index: number,
  ) => {
    let targetIndex: number | null = null;

    switch (event.key) {
      case "Home":
        targetIndex = 0;
        break;

      case "End":
        targetIndex = menus.length - 1;
        break;

      case "ArrowRight":
      case "ArrowDown":
        targetIndex = (index + 1) % menus.length;
        break;

      case "ArrowLeft":
      case "ArrowUp":
        targetIndex = (index - 1 + menus.length) % menus.length;
        break;

      default:
        return;
    }

    event.preventDefault();
    triggerRefs.current[targetIndex]?.focus();
  };

  const renderSubmenuContent = (
    submenu: HeaderDepth2Menu | undefined,
    descriptionType: boolean,
  ) => {
    if (!submenu) {
      return null;
    }

    if (descriptionType) {
      return (
        <SubMenuContent>
          <SubTitle>{submenu.title ?? submenu.label}</SubTitle>

          <DescriptionList>
            <li>
              <h3>
                {submenu.href ? (
                  <a href={submenu.href}>
                    {submenu.label}
                    {submenu.external && <i className="svg-icon ico-go" />}
                  </a>
                ) : (
                  submenu.label
                )}
              </h3>

              {submenu.description && <p>{submenu.description}</p>}

              {submenu.children?.map((child) => (
                <p key={child.id}>
                  <a
                    href={child.href ?? "#"}
                    target={child.external ? "_blank" : undefined}
                    rel={child.external ? "noopener noreferrer" : undefined}
                  >
                    {child.label}
                  </a>
                </p>
              ))}
            </li>
          </DescriptionList>
        </SubMenuContent>
      );
    }

    return (
      <SubMenuContent>
        <SubTitle>{submenu.title ?? submenu.label}</SubTitle>

        <LastDepthList>
          {submenu.children?.map((child) => (
            <li key={child.id}>
              <a
                href={child.href ?? "#"}
                target={child.external ? "_blank" : undefined}
                rel={child.external ? "noopener noreferrer" : undefined}
              >
                {child.label}

                {child.external && <i className="svg-icon ico-go" />}
              </a>
            </li>
          ))}
        </LastDepthList>
      </SubMenuContent>
    );
  };

  return (
    <>
      <Navigation
        ref={navigationRef}
        aria-label="메인 메뉴"
        className="krds-main-menu"
      >
        <Inner>
          <MainMenuList className="gnb-menu">
            {menus.map((menu, index) => {
              const isOpen = openMenuId === menu.id;
              const toggleId = `desktop-menu-${menu.id}`;

              return (
                <MainMenuItem key={menu.id}>
                  {menu.href ? (
                    <MainLink
                      ref={(element) => {
                        triggerRefs.current[index] = element;
                      }}
                      href={menu.href}
                      className="gnb-main-trigger is-link"
                      data-trigger="gnb"
                      onKeyDown={(event) =>
                        handleKeyboardNavigation(event, index)
                      }
                    >
                      {menu.label}
                    </MainLink>
                  ) : (
                    <>
                      <MainTrigger
                        ref={(element) => {
                          triggerRefs.current[index] = element;
                        }}
                        type="button"
                        className="gnb-main-trigger"
                        data-trigger="gnb"
                        aria-controls={toggleId}
                        aria-expanded={isOpen}
                        aria-haspopup="true"
                        $isActive={isOpen}
                        onClick={() => handleMainMenuClick(menu)}
                        onKeyDown={(event) =>
                          handleKeyboardNavigation(event, index)
                        }
                      >
                        {menu.label}
                      </MainTrigger>

                      <MainToggleWrap
                        id={toggleId}
                        className={`gnb-toggle-wrap ${isOpen ? "is-open" : ""}`}
                        $isOpen={isOpen}
                      >
                        {menu.singleList ? (
                          <MainList className="gnb-main-list">
                            <SubTriggerList>
                              {menu.children?.map((submenu) => (
                                <li key={submenu.id}>
                                  <a
                                    href={submenu.href ?? "#"}
                                    className="gnb-sub-trigger is-link"
                                  >
                                    {submenu.label}
                                  </a>
                                </li>
                              ))}
                            </SubTriggerList>

                            <SubMenuContent>
                              <SubTitle>{menu.label}</SubTitle>

                              <LastDepthList>
                                {menu.children?.map((submenu) => (
                                  <li key={submenu.id}>
                                    <a href={submenu.href ?? "#"}>
                                      {submenu.label}
                                    </a>
                                  </li>
                                ))}
                              </LastDepthList>
                            </SubMenuContent>
                          </MainList>
                        ) : (
                          <MainList
                            className="gnb-main-list"
                            data-has-submenu="true"
                          >
                            <SubTriggerList>
                              {menu.children?.map((submenu) => {
                                const hasChildren = Boolean(
                                  submenu.children?.length,
                                );
                                const isActive =
                                  activeSubmenu?.id === submenu.id;

                                return (
                                  <li key={submenu.id}>
                                    {hasChildren ? (
                                      <SubTrigger
                                        type="button"
                                        className={`gnb-sub-trigger ${
                                          isActive ? "active" : ""
                                        }`}
                                        aria-expanded={isActive}
                                        aria-controls={`desktop-submenu-${submenu.id}`}
                                        aria-haspopup="true"
                                        $isActive={isActive}
                                        onClick={() =>
                                          setActiveSubmenuId(submenu.id)
                                        }
                                      >
                                        {submenu.label}
                                      </SubTrigger>
                                    ) : (
                                      <a
                                        href={submenu.href ?? "#"}
                                        className="gnb-sub-trigger is-link"
                                        target={
                                          submenu.external
                                            ? "_blank"
                                            : undefined
                                        }
                                        rel={
                                          submenu.external
                                            ? "noopener noreferrer"
                                            : undefined
                                        }
                                      >
                                        {submenu.label}
                                      </a>
                                    )}
                                  </li>
                                );
                              })}
                            </SubTriggerList>

                            <div
                              id={
                                activeSubmenu
                                  ? `desktop-submenu-${activeSubmenu.id}`
                                  : undefined
                              }
                              className="gnb-sub-list active"
                            >
                              {renderSubmenuContent(
                                activeSubmenu,
                                Boolean(menu.descriptionType),
                              )}
                            </div>
                          </MainList>
                        )}
                      </MainToggleWrap>
                    </>
                  )}
                </MainMenuItem>
              );
            })}
          </MainMenuList>
        </Inner>
      </Navigation>

      <Backdrop
        className="gnb-backdrop"
        $isOpen={Boolean(openMenuId)}
        aria-hidden="true"
        onClick={closeMenu}
      />
    </>
  );
};

export default DesktopNavigation;
