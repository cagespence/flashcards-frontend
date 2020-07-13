import styled from 'styled-components';

const CollectionTitle = styled.h1`

  color: var(--color-green);
  margin-bottom: 1rem;
`
const ReviewContainer = styled.div`
  max-width: 400px;
  margin: 0 auto;
  perspective: 2000px;
  margin-bottom: 2rem;
  position: relative;
`
const CollectionDescription = styled.div`
   line-height: 1.5em;
   margin-bottom: 2rem;
`
const ReviewCard = styled.div`
  width: 100%;
  position: relative;
  height: 450px;
  border: var(--thiccness) solid var(--color-dark);
  box-sizing: border-box;
  background-color: var(--color-light);
  transition: transform 0.8s, color 50ms, background-color 50ms, border-color 50ms;
  transform-style: preserve-3d;
  &.flip  {
    transform: rotateY(-180deg) rotateX(0deg);
  }
  &.done {
    display: none;
  }
  &.green {
    background-color: var(--color-green);
    color: var(--color-light);
    border-color: var(--color-green); 
    &>div {
      background-color: var(--color-green);
    }
    &>div>div>div>svg>g>* {
      stroke: var(--color-light);
    }
  }
  &.red {
    background-color: var(--color-red);
    color: var(--color-light);
    border-color: var(--color-red); 
    &>div {
      background-color: var(--color-red);
    }
    &>div>div>div>svg>g>* {
      stroke: var(--color-light);
    }
  }
`
const FlipButton = styled.div`
  position: absolute;
  top: .5rem;
  right: 0;
  width: 60px;
  height: 60px;
  text-align: center;
  cursor: pointer;
  & svg {
    transition: transform 200ms;
  } 
  &:hover svg{
    transform: scale(1.1);
  }
`
const Button = styled.button`
  background-color: var(--color-light);
  color: var(--color-dark);
  font-size: 1.5rem;
  border: var(--thiccness) solid var(--color-dark);
  padding: .5rem 2rem;
  font-weight: 400;
  margin-bottom: .5rem;
  font-family: 'Raleway';
  transition: transform 200ms;
  cursor: pointer;
  &:active, :focus {
    outline: none;
  }
  &:hover {
    transform: scale(1.05);
  }
`
const FlipReverse = styled(FlipButton)`
  left: 0;
`
const Face = styled.div`
  display: flex;
  flex-direction: column;
  padding: 1rem;
  backface-visibility: hidden;
  background-color: var(--color-light);
`
const FrontNav = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin-top: -4rem;
  position: absolute;
  left: 0;
  bottom: 0;
  box-sizing: border-box;
  width: 100%;
  padding: .5rem;
`
const Front = styled.div`
  width: 100%;
  -webkit-backface-visibility: hidden;
  backface-visibility: hidden;
  transform-style: preserve-3d;
  position: absolute;
  margin: -1rem;
  height: 100%;
  display: flex;
`
const Back = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  display: flex;
  transform-style: preserve-3d;
  backface-visibility: hidden;
  transform: rotateY(180deg);
  margin: -1rem;
`
const ReviewCardBackground = styled.div`
  position: absolute;
  left: .5rem;
  top: .5rem;
  box-sizing: border-box;
  z-index: -1;
  width: 100%;
  height: 450px;
  border: var(--thiccness) solid var(--color-dark);
`
const NavigationArea = styled.div`
  margin-top: 1.5rem;
  display: flex;
  justify-content: space-between;
`
const NavigationCounter = styled.div` 
  height: 50px;
  line-height: 50px;
`
const ProgressWrapper = styled.div` 
  margin-top: 1.5rem;
  -webkit-appearance: none;
  appearance: none;
  width: 100%;
  padding: 3px;
  border: var(--thiccness) solid var(--color-dark);
  border-radius: 10px;
  background-color: none;
  box-sizing: border-box;
`
const ProgressInner = styled.div` 
  background-color: var(--color-dark);
  height:10px;
  border-radius: 5px;
`
const NavigationButton = styled.button`
  background: none;
  width: 60px;
  height: 60px;
  /* margin-bottom: 1rem; */
  border-radius: 50%;
  outline: none;
  border: none;
  cursor: pointer;
  color: var(--color-dark);
  font-family: 'Raleway';
  & svg {
    transition: transform 200ms;
  }
  &:hover svg{
    transform: scale(1.1);
  }
`
const Word = styled.h1`
  /* color: var(--color-green); */
  margin: auto;
  text-align: center;
`

export {
  CollectionTitle,
  ReviewContainer,
  CollectionDescription,
  ReviewCard,
  FlipButton,
  Button,
  FlipReverse,
  Face,
  FrontNav,
  Front,
  Back,
  ReviewCardBackground,
  NavigationArea,
  NavigationCounter,
  ProgressWrapper,
  ProgressInner,
  NavigationButton,
  Word,
}