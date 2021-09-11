import Skeleton from '../Skeleton';
import React, { useEffect, useState } from "react";
import styled from "styled-components";

const Card = styled.div`
    display: flex;
    justify-content: center;    
    width: 90px;
    height: 90px;
    border-radius: 8px;
    background-image: url(${(props) => props.photo});
    background-size: cover;
    p {
        margin-left: 6px;
        margin-top: 10px;
    }
`;

const Title = styled.p`
    font-family: ${(props) => props.theme.fonts.regular};
    color: #ffffff;
    font-size: 12px;
`;

const ImageCard = ({ photo, title }) => {
    const [imageLoaded, setImageLoaded] = useState(false);
    useEffect (() => {
        const imageLoaded = new Image();
        imageLoaded.src = photo;
        imageLoaded.onload = () => setImageLoaded(true);
    }, [photo]);

    return (
        <>
        {imageLoaded ? (        
    <Card photo={photo}>
        <Title>{title}</Title>
    </Card>
    ) : 
        <Skeleton width='90px' height='90px' />   }
    </>
    );
};

export default ImageCard;

