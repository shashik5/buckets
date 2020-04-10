import styled from "styled-components";

export const Modal = styled.div`
    display: ${({ hidden }) => hidden ? 'none' : 'flex'};
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, 0.2);
    justify-content: center;
    align-items: center;
    z-index: 5;
`;