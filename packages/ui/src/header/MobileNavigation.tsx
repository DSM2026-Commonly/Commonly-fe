import {
  type MouseEvent as ReactMouseEvent,
  useEffect,
  useRef,
  useState,
} from "react";
import type { HeaderDepth3Menu, HeaderMainMenu } from "./header.types";
import {
  Depth4Body,
  Depth4Header,
  Depth4Layer,
  MobileBody,
  MobileDepth3,
  MobileHeader,
  MobileLogin,
  MobileNavigationLayer,
  MobileNavigationPanel,
  MobileServiceMenu,
  MobileSubButton,
  MobileSubList,
  MobileSubmenuArea,
  MobileSubsection,
  MobileTab,
  MobileTabList,
  ScreenReaderOnly,
  SubTitle,
} from "./header.styles";

interface MobileNavigationProps {
  menus: HeaderMainMenu[];
  isOpen: boolean;
  onClose: () => void;
  triggerRef: React.RefObject<HTMLButtonElement | null>;
}

const getFocusableElements = (container: HTMLElement) => {
  return Array.from(
    container.querySelectorAll<HTMLElement>(
      [
        "a[href]",
        "button:not([disabled])",
        "input:not([disabled])",
        "select:not([disabled])",
        "textarea:not([disabled])",
        '[tabindex]:not([tabindex="-1"])',
      ].join(","),
    ),
  );
};

const MobileNavigation = ({
  menus,
  isOpen,
  onClose,
  triggerRef,
}: MobileNavigationProps) => {
  const [activeMenuId, setActiveMenuId] = useState(menus[0]?.id ?? "");
  const [openDepth3Ids, setOpenDepth3Ids] = useState<string[]>([]);
  const [activeDepth4, setActiveDepth4] = useState<HeaderDepth3Menu | null>(
    null,
  );

  const panelRef = useRef<HTMLDivElement>(null);
  const submenuAreaRef = useRef<HTMLDivElement>(null);
  const sectionRefs = useRef<Record<string, HTMLElement | null>>({});

  const toggleDepth3 = (menuId: string) => {
    setOpenDepth3Ids((currentIds) =>
      currentIds.includes(menuId)
        ? currentIds.filter((id) => id !== menuId)
        : [...currentIds, menuId],
    );
  };

  const scrollToMenu = (menuId: string) => {
    setActiveMenuId(menuId);

    sectionRefs.current[menuId]?.scrollIntoView({
      block: "start",
      behavior: "smooth",
    });
  };

  useEffect(() => {
    if (!isOpen) {
      setActiveDepth4(null);
      return;
    }

    const panel = panelRef.current;
    const triggerElement = triggerRef.current;

    if (!panel) {
      return;
    }

    document.body.classList.add("is-gnb-mobile");
    document.body.style.overflow = "hidden";

    document
      .querySelector("#krds-header .header-in")
      ?.setAttribute("inert", "");
    document.getElementById("container")?.setAttribute("inert", "");
    document.getElementById("footer")?.setAttribute("inert", "");

    const focusableElements = getFocusableElements(panel);
    focusableElements[0]?.focus();

    const handleKeyboard = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        if (activeDepth4) {
          setActiveDepth4(null);
        } else {
          onClose();
        }

        return;
      }

      if (event.key !== "Tab") {
        return;
      }

      const currentFocusableElements = getFocusableElements(panel);
      const firstElement = currentFocusableElements[0];
      const lastElement =
        currentFocusableElements[currentFocusableElements.length - 1];

      if (!firstElement || !lastElement) {
        return;
      }

      if (event.shiftKey && document.activeElement === firstElement) {
        event.preventDefault();
        lastElement.focus();
      } else if (!event.shiftKey && document.activeElement === lastElement) {
        event.preventDefault();
        firstElement.focus();
      }
    };

    document.addEventListener("keydown", handleKeyboard);

    return () => {
      document.body.classList.remove("is-gnb-mobile");
      document.body.style.overflow = "";

      document
        .querySelector("#krds-header .header-in")
        ?.removeAttribute("inert");
      document.getElementById("container")?.removeAttribute("inert");
      document.getElementById("footer")?.removeAttribute("inert");

      document.removeEventListener("keydown", handleKeyboard);

      triggerElement?.focus();
    };
  }, [activeDepth4, isOpen, onClose, triggerRef]);

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        onClose();
      }
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [isOpen, onClose]);

  useEffect(() => {
    const submenuArea = submenuAreaRef.current;

    if (!submenuArea || !isOpen) {
      return;
    }

    const handleScroll = () => {
      const entries = menus
        .map((menu) => {
          const element = sectionRefs.current[menu.id];

          if (!element) {
            return null;
          }

          return {
            id: menu.id,
            distance: Math.abs(element.offsetTop - submenuArea.scrollTop),
          };
        })
        .filter(
          (
            item,
          ): item is {
            id: string;
            distance: number;
          } => item !== null,
        )
        .sort((a, b) => a.distance - b.distance);

      if (entries[0]) {
        setActiveMenuId(entries[0].id);
      }
    };

    submenuArea.addEventListener("scroll", handleScroll, {
      passive: true,
    });

    return () => {
      submenuArea.removeEventListener("scroll", handleScroll);
    };
  }, [isOpen, menus]);

  const handleLayerClick = (event: ReactMouseEvent<HTMLDivElement>) => {
    if (event.target === event.currentTarget) {
      onClose();
    }
  };

  return (
    <MobileNavigationLayer
      id="mobile-nav"
      className={`krds-main-menu-mobile ${isOpen ? "is-open is-backdrop" : ""}`}
      $isOpen={isOpen}
      aria-hidden={!isOpen}
      onMouseDown={handleLayerClick}
    >
      <MobileNavigationPanel
        ref={panelRef}
        className="gnb-wrap"
        $isOpen={isOpen}
        role="dialog"
        aria-modal="true"
        aria-label="전체 메뉴"
      >
        <MobileHeader className="gnb-header">
          <MobileLogin className="gnb-login">
            <button type="button" className="krds-btn large text">
              <i className="svg-icon ico-log" />
              로그인을 해주세요
            </button>
          </MobileLogin>

          <MobileServiceMenu className="gnb-service-menu">
            <a href="/career">경력 관리</a>
            <a href="/certificate">증명서 발급</a>
            <a href="/notice">공지사항</a>
            <a href="/support">이용 안내</a>
          </MobileServiceMenu>
        </MobileHeader>

        <MobileBody className="gnb-body">
          <MobileTabList
            className="menu-wrap"
            role="tablist"
            aria-label="전체 메뉴 분류"
          >
            <ul>
              {menus.map((menu) => {
                const isActive = activeMenuId === menu.id;

                return (
                  <li key={menu.id} role="none">
                    <MobileTab
                      type="button"
                      id={`mobile-tab-${menu.id}`}
                      role="tab"
                      aria-selected={isActive}
                      aria-controls={`mobile-panel-${menu.id}`}
                      $isActive={isActive}
                      onClick={() => scrollToMenu(menu.id)}
                    >
                      {menu.label}
                    </MobileTab>
                  </li>
                );
              })}
            </ul>
          </MobileTabList>

          <MobileSubmenuArea ref={submenuAreaRef} className="submenu-wrap">
            {menus.map((menu) => (
              <MobileSubsection
                key={menu.id}
                ref={(element) => {
                  sectionRefs.current[menu.id] = element;
                }}
                id={`mobile-panel-${menu.id}`}
                role="tabpanel"
                aria-labelledby={`mobile-tab-${menu.id}`}
                className="gnb-sub-list"
              >
                <SubTitle>{menu.label}</SubTitle>

                {menu.href ? (
                  <a
                    href={menu.href}
                    className="gnb-sub-trigger"
                    onClick={onClose}
                  >
                    {menu.label} 바로가기
                  </a>
                ) : (
                  <MobileSubList>
                    {menu.children?.map((depth2) => {
                      const hasDepth3 = Boolean(depth2.children?.length);
                      const isDepth3Open = openDepth3Ids.includes(depth2.id);

                      return (
                        <li key={depth2.id}>
                          {hasDepth3 ? (
                            <>
                              <MobileSubButton
                                type="button"
                                className="gnb-sub-trigger has-depth3"
                                aria-expanded={isDepth3Open}
                                aria-controls={`mobile-depth3-${depth2.id}`}
                                $isActive={isDepth3Open}
                                onClick={() => toggleDepth3(depth2.id)}
                              >
                                {depth2.label}
                                <i
                                  className={`svg-icon ico-angle ${
                                    isDepth3Open ? "up" : "down"
                                  }`}
                                />
                              </MobileSubButton>

                              <MobileDepth3
                                id={`mobile-depth3-${depth2.id}`}
                                className={`depth3-wrap ${
                                  isDepth3Open ? "is-open" : ""
                                }`}
                                $isOpen={isDepth3Open}
                              >
                                <ul>
                                  {depth2.children?.map((depth3) => (
                                    <li key={depth3.id}>
                                      {depth3.children?.length ? (
                                        <button
                                          type="button"
                                          className="depth3-trigger has-depth4"
                                          onClick={() =>
                                            setActiveDepth4(depth3)
                                          }
                                        >
                                          {depth3.label}
                                        </button>
                                      ) : (
                                        <a
                                          href={depth3.href ?? "#"}
                                          className="depth3-trigger"
                                          target={
                                            depth3.external
                                              ? "_blank"
                                              : undefined
                                          }
                                          rel={
                                            depth3.external
                                              ? "noopener noreferrer"
                                              : undefined
                                          }
                                          onClick={onClose}
                                        >
                                          {depth3.label}
                                        </a>
                                      )}
                                    </li>
                                  ))}
                                </ul>
                              </MobileDepth3>
                            </>
                          ) : (
                            <a
                              href={depth2.href ?? "#"}
                              className="gnb-sub-trigger"
                              target={depth2.external ? "_blank" : undefined}
                              rel={
                                depth2.external
                                  ? "noopener noreferrer"
                                  : undefined
                              }
                              onClick={onClose}
                            >
                              {depth2.label}
                            </a>
                          )}
                        </li>
                      );
                    })}
                  </MobileSubList>
                )}
              </MobileSubsection>
            ))}
          </MobileSubmenuArea>
        </MobileBody>

        <button
          type="button"
          className="krds-btn medium icon"
          id="close-nav"
          aria-label="전체메뉴 닫기"
          onClick={onClose}
        >
          <ScreenReaderOnly>전체메뉴 닫기</ScreenReaderOnly>
          <i className="svg-icon ico-popup-close" />
        </button>

        <Depth4Layer
          className={`depth4-wrap ${activeDepth4 ? "is-open" : ""}`}
          $isOpen={Boolean(activeDepth4)}
          aria-hidden={!activeDepth4}
        >
          {activeDepth4 && (
            <>
              <Depth4Header className="depth4-head">
                <button
                  type="button"
                  className="krds-btn icon trigger-prev"
                  aria-label="이전화면"
                  onClick={() => setActiveDepth4(null)}
                >
                  <i className="svg-icon ico-angle left" />
                </button>

                <button
                  type="button"
                  className="krds-btn icon trigger-close"
                  aria-label="전체메뉴 닫기"
                  onClick={onClose}
                >
                  <i className="svg-icon ico-popup-close" />
                </button>
              </Depth4Header>

              <Depth4Body className="depth4-body">
                <SubTitle>{activeDepth4.label}</SubTitle>

                <ul>
                  {activeDepth4.children?.map((depth4) => (
                    <li key={depth4.id}>
                      <a href={depth4.href} onClick={onClose}>
                        {depth4.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </Depth4Body>
            </>
          )}
        </Depth4Layer>
      </MobileNavigationPanel>
    </MobileNavigationLayer>
  );
};

export default MobileNavigation;
