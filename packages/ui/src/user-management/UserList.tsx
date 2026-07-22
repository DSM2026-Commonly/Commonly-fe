import "krds-react/dist/index.css";

import { Table } from "krds-react";
import { type FormEvent, useId, useState } from "react";
import {
  PageCount,
  PageEllipsis,
  PageJumpButton,
  PageJumpField,
  PageJumpForm,
  PageJumpInput,
  PageMoveButton,
  PageMoveIcon,
  PageNumberButton,
  PageNumberList,
  PaginationFrame,
  PaginationNav,
} from "../work-history/WorkHistory.styles";
import type { UserAccountRecord } from "./UserDeletion";
import {
  HomeButton,
  UserListActionRow,
  UserListCard,
  UserListContent,
  UserListRoot,
  UserListTableFrame,
} from "./UserList.styles";
import { FormSectionTitle, PageTitle } from "./userManagement.styles";

export interface UserListProps {
  accounts?: readonly UserAccountRecord[];
  totalPages?: number;
  initialPage?: number;
  onPageChange?: (page: number) => void;
  onHome?: () => void;
}

const DEFAULT_ACCOUNTS: readonly UserAccountRecord[] = Array.from(
  { length: 10 },
  (_, index) => ({
    id: `user-${index + 1}`,
    name: "전재준",
    accountId: "글로리1234",
    department: "대전광역시 유성구 가정북로 76",
  }),
);

type VisiblePage = number | "ellipsis";

function getVisiblePages(
  currentPage: number,
  totalPages: number,
): readonly VisiblePage[] {
  if (totalPages <= 7) {
    return Array.from({ length: totalPages }, (_, index) => index + 1);
  }

  if (currentPage <= 4) {
    return [1, 2, 3, 4, 5, "ellipsis", totalPages];
  }

  if (currentPage >= totalPages - 3) {
    return [
      1,
      "ellipsis",
      totalPages - 4,
      totalPages - 3,
      totalPages - 2,
      totalPages - 1,
      totalPages,
    ];
  }

  return [
    1,
    "ellipsis",
    currentPage - 1,
    currentPage,
    currentPage + 1,
    "ellipsis",
    totalPages,
  ];
}

function UserList({
  accounts = DEFAULT_ACCOUNTS,
  totalPages = 22,
  initialPage = 1,
  onPageChange,
  onHome,
}: UserListProps) {
  const titleId = useId();
  const cardTitleId = useId();
  const normalizedTotalPages = Math.max(1, Math.floor(totalPages));
  const normalizedInitialPage = Math.max(
    1,
    Math.min(normalizedTotalPages, Math.floor(initialPage)),
  );
  const [currentPage, setCurrentPage] = useState(normalizedInitialPage);
  const [pageInput, setPageInput] = useState(String(normalizedInitialPage));
  const visiblePages = getVisiblePages(currentPage, normalizedTotalPages);

  const changePage = (page: number) => {
    const nextPage = Math.max(1, Math.min(normalizedTotalPages, page));

    setCurrentPage(nextPage);
    setPageInput(String(nextPage));
    onPageChange?.(nextPage);
  };

  const handlePageJump = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const requestedPage = Number(pageInput);

    if (!Number.isInteger(requestedPage)) {
      setPageInput(String(currentPage));
      return;
    }

    changePage(requestedPage);
  };

  return (
    <UserListRoot aria-labelledby={titleId}>
      <PageTitle id={titleId}>사용자 목록 조회</PageTitle>

      <UserListContent>
        <UserListCard aria-labelledby={cardTitleId}>
          <FormSectionTitle id={cardTitleId}>사용자 목록 조회</FormSectionTitle>

          <UserListTableFrame>
            <Table>
              <Table.Caption className="sr-only">
                경력관리 시스템 사용자 목록
              </Table.Caption>
              <Table.Colgroup>
                <Table.Col width="165px" />
                <Table.Col width="216px" />
                <Table.Col width="331px" />
              </Table.Colgroup>
              <Table.Thead>
                <Table.Tr>
                  <Table.Th scope="col">이름</Table.Th>
                  <Table.Th scope="col">아이디</Table.Th>
                  <Table.Th scope="col">소속 부서</Table.Th>
                </Table.Tr>
              </Table.Thead>
              <Table.Tbody>
                {accounts.map((account) => (
                  <Table.Tr key={account.id}>
                    <Table.Td>{account.name}</Table.Td>
                    <Table.Td>{account.accountId}</Table.Td>
                    <Table.Td>{account.department}</Table.Td>
                  </Table.Tr>
                ))}
              </Table.Tbody>
            </Table>
          </UserListTableFrame>

          <PaginationFrame>
            <PaginationNav aria-label="사용자 목록 페이지">
              <PageMoveButton
                $direction="prev"
                aria-label="이전 페이지"
                disabled={currentPage === 1}
                type="button"
                onClick={() => changePage(currentPage - 1)}
              >
                <PageMoveIcon $direction="prev" aria-hidden="true" />
                이전
              </PageMoveButton>
              <PageNumberList>
                {visiblePages.map((page, index) =>
                  page === "ellipsis" ? (
                    <PageEllipsis aria-hidden="true" key={`ellipsis-${index}`}>
                      ···
                    </PageEllipsis>
                  ) : (
                    <PageNumberButton
                      $active={page === currentPage}
                      aria-current={page === currentPage ? "page" : undefined}
                      aria-label={`${page}페이지`}
                      key={page}
                      type="button"
                      onClick={() => changePage(page)}
                    >
                      {page}
                    </PageNumberButton>
                  ),
                )}
              </PageNumberList>
              <PageMoveButton
                $direction="next"
                aria-label="다음 페이지"
                disabled={currentPage === normalizedTotalPages}
                type="button"
                onClick={() => changePage(currentPage + 1)}
              >
                다음
                <PageMoveIcon $direction="next" aria-hidden="true" />
              </PageMoveButton>
            </PaginationNav>
          </PaginationFrame>

          <PageJumpForm aria-label="페이지 바로 이동" onSubmit={handlePageJump}>
            <PageJumpField>
              <PageJumpInput
                aria-label="이동할 페이지"
                inputMode="numeric"
                min={1}
                max={normalizedTotalPages}
                type="number"
                value={pageInput}
                onChange={(event) => setPageInput(event.target.value)}
              />
              <PageCount aria-hidden="true">/{normalizedTotalPages}</PageCount>
            </PageJumpField>
            <PageJumpButton size="small" type="submit" variant="secondary">
              이동
            </PageJumpButton>
          </PageJumpForm>
        </UserListCard>

        <UserListActionRow>
          <HomeButton
            size="xlarge"
            type="button"
            variant="primary"
            onClick={onHome}
          >
            홈으로 돌아가기
          </HomeButton>
        </UserListActionRow>
      </UserListContent>
    </UserListRoot>
  );
}

export default UserList;
