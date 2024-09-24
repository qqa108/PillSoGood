import styled from 'styled-components';
import pillImage from '@/assets/pill_image.png';

const ImageWrapper = styled.div`
    display: flex;
    justify-content: center;
    margin-bottom: 30px;
`;

const Image = styled.img`
    width: 200px;
`;

function PillImage() {
    return (
        <ImageWrapper>
            <Image src={pillImage} />
        </ImageWrapper>
    );
}

export default PillImage;
