import styled from 'styled-components';

const ContentContainer = styled.div`
    display: flex;
    flex-direction: column;
    & > *:not(:last-child) {
        margin-bottom: 30px;
    }
`;

export default ContentContainer;
