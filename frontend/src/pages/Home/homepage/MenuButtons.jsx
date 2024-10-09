import React from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import notToEatIcon from "@/assets/nottoeat.svg";
import searchDrugIcon from "@/assets/searchdrug.svg";
import colors from "@/assets/colors";

const MenuContainer = styled.div`
  display: flex;
  gap: 5%;
  margin: 0.75rem 0;
`;

const MenuButton = styled.button`
  width: 47.5%;
  height: 8.5rem;
  border-radius: 0.625rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border: 1px solid
    ${({ $variant }) => ($variant === "search" ? "#0550B2" : "#0550B2")};
  background-color: ${({ $variant }) =>
    $variant === "nottoeat" ? "#3382E9" : "#EBF3FF"};
  cursor: pointer;
`;

const MenuIcon = styled.img`
  width: ${({ $variant }) => ($variant === "nottoeat" ? "5.3125rem" : "5rem")};
  height: ${({ $variant }) => ($variant === "nottoeat" ? "5.3125rem" : "5rem")};
`;

const MenuText = styled.div`
  color: ${({ $variant }) => ($variant === "nottoeat" ? "#EBF3FF" : "#033075")};
  font-size: 1.25rem;
`;

const MenuButtons = () => {
  const navigate = useNavigate();

  return (
    <MenuContainer>
      <MenuButton $variant="nottoeat" onClick={() => navigate("/home/compare")}>
        <MenuIcon
          src={notToEatIcon}
          alt="Not to Eat Icon"
          $variant="nottoeat"
        />
        <MenuText $variant="nottoeat">병용금지 확인</MenuText>
      </MenuButton>
      <MenuButton $variant="search" onClick={() => navigate("/search")}>
        <MenuIcon
          src={searchDrugIcon}
          alt="Search Drug Icon"
          $variant="search"
        />
        <MenuText $variant="search">의약품 검색</MenuText>
      </MenuButton>
    </MenuContainer>
  );
};

export default MenuButtons;
