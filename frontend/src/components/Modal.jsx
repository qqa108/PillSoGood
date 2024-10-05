import styled from 'styled-components';
import { IoClose } from 'react-icons/io5';
import colors from '../assets/colors';

const Overlay = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: -1px;
    z-index: 2;
    background: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
`;

const ModalContainer = styled.div`
    background-color: white;
    width: 80%;
    max-height: 100%;
    padding: 10px;
    border-radius: 6px;
`;

const CloseWrapper = styled.div`
    display: flex;
    justify-content: flex-end;
    font-size: 1.5rem;
    color: ${colors.main};
    & > svg {
        transition: 0.2s ease-in-out;
        cursor: pointer;
        &:hover {
            color: ${colors.point1};
        }
    }
`;

function Modal({ children, onClose }) {
    return (
        <Overlay onClick={onClose}>
            <ModalContainer onClick={(e) => e.stopPropagation()}>
                <CloseWrapper>
                    <IoClose onClick={onClose} />
                </CloseWrapper>
                {children}
            </ModalContainer>
        </Overlay>
    );
}

export default Modal;
