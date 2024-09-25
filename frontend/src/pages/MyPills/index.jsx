import { useState } from "react";
import styled from "styled-components";
import colors from '../../assets/colors';
import { FaCirclePlus } from "react-icons/fa6";
import PillCardRegister from "./PillCardRegister/RegisterModal";

const IconContainer = styled.div`
  width: 2rem;
  height: 2rem;
  flex-shrink: 0;
  display: flex;
  align-items: center;
  position: fixed;
  bottom: 5rem;
  right: 1.2rem;
  
  & > svg {
   font-size: 2rem;
   color: ${colors.point2}
  }

`;

function MyPills() {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const openModal = () => {
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    return (
        <>
        My Pills
        <IconContainer alt="Add Icon" onClick={openModal} >
            <FaCirclePlus />
        </IconContainer>

        <PillCardRegister isModalOpen={isModalOpen} closeModal={closeModal} />
        </>
    );
}

export default MyPills;
