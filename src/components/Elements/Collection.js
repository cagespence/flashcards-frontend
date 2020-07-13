import styled from "styled-components"

const CollectionItem = styled.div`
  display: flex;
  position: relative;
  min-width: 200px;
  /* max-width: calc(500px - 2rem); */
  display: block;
  padding: 1rem;
  flex-grow: 1;
  border: var(--thiccness) solid var(--color-dark);
  margin: 1rem;
  cursor: pointer;
  transition: all 100ms;
  background-color: var(--color-light);
  /* &.purple > div {
      background-color: var(--color-purple);
      border-color: var(--color-purple);
      color: var(--color-light);
  }
  &.blue > div {
      background-color: var(--color-blue);
      border-color: var(--color-blue);
      color: var(--color-light);
  }
  &.green {
    border-color: var(--color-dark);
    color: var(--color-green);
    & > div {
      background-color: var(--color-green);
      border-color: var(--color-green);
      color: var(--color-light);
    }
    &:hover {
      background-color: var(--color-light);
      border-color: var(--color-green);
      color: var(--color-green);
    }
  }
  &.orange > div {
      background-color: var(--color-orange);
      border-color: var(--color-orange);
      color: var(--color-light);
  }
  &.red > div {
      background-color: var(--color-red);
      border-color: var(--color-red);
      color: var(--color-light);
  }
  &:hover{
    & div {
      width: calc(100% + 2rem);
      height: calc(100% + 2rem);
      left: -1rem;
      top: -1rem;
    }
  } */
`

const CollectionContent = styled.h1`
  /* overflow: hidden;
  text-overflow: ellipsis; */
  /* max-height: 196px; */
`

const CollectionDescription = styled.p`
  margin-bottom: 0;
  margin-top: 1rem;
  font-size: 1rem;
  font-weight: 500;
`

const CollectionBackground = styled.div`
  position: absolute;
  left: 0;
  top: 0;
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  width: 100%;
  height: 100%;
  max-width: none;
  border: var(--thiccness) solid var(--color-dark);
  z-index: -1;
  background-color: var(--color-light);
  transition:all 200ms;
  &:hover{
    
  }
`

const CollectionContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
  justify-content: space-between;
  margin: -1rem;
`

export {
  CollectionContainer,
  CollectionItem,
  CollectionContent,
  CollectionDescription,
  CollectionBackground
}