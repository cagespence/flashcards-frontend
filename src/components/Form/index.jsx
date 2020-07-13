import React from 'react'
import styled from 'styled-components'

const FormElement = (props) => {
  return (
    <FormElementWrapper>
      {!props.hideLabel && <FormLabel htmlFor={props.id}>{props.id}</FormLabel>}
      <FormInput {...props}
        onChange={(e) => {
          props.handleChange(e.target.value)
        }}
      />
    </FormElementWrapper>
  )
}

const RadioElements = ({selectedValue, elements, handleChange}) => {
  return (
    <RadioWrapper>
    {
      elements.map(element => (
        <>
          <RadioInput 
            key={`radio-${element}`}
            type='radio'
            id={element}
            value={element}
            checked={element === selectedValue}
            onChange={(e) => {
              handleChange(e.target.value)
            }}
          />
          <RadioLabel htmlFor={element}>
            {/* {element} */}
          </RadioLabel>
        </>
      ))
    }
    </RadioWrapper>
  )
}

const FormElementWrapper = styled.div`
  margin-bottom: .5em;
  display: flex;
  flex-direction: column;
`

const RadioWrapper = styled.div`
  margin-bottom: .5em;
  display: flex;
  flex-direction: row;
`

const FormLabel = styled.label`
  text-align: left;
  text-transform: uppercase;
`
const FormInput = styled.input`
  border: var(--thiccness) solid;
  height: 2.5em;
  &:focus {
    outline: none;
  }
  font-size: 1rem;
  padding: 0 1rem;
`
const RadioLabel = styled.label`
  /* display: inline-block;
  + input[type=radio]{
    display: none;
  }
  margin-right: 1rem;
  height: 50px;
  width: 50px;
  background-color: var(--color-blue);
  border-radius: 50%;
  &:checked {
    border: 1px solid white;
  } */
`
const RadioInput = styled.input`
  display: none;
  + label {
    cursor: pointer;
    display: inline-block;
    box-sizing: border-box;
    margin-right: 1rem;
    height: 50px;
    width: 50px;
    background-color: var(--color-blue);
    border-radius: 50%;
    &[for=black] {
      border: 1px solid var(--color-dark);
      background-color: var(--color-light)
    }
    &[for=blue] {
      background-color: var(--color-blue)
    }
    &[for=orange] {
      background-color: var(--color-orange)
    }
    &[for=green] {
      background-color: var(--color-green)
    }
    &[for=purple] {
      background-color: var(--color-purple)
    }
    &[for=red] {
      background-color: var(--color-red)
    }
  }
  
  &:checked {
    + label {
      border: 5px solid white;
    }
  }
`
const FormSubmitButton = styled.button`
  border: none;
  outline: none;
  height: 2em;
  color: var(--color-light);
  text-transform: uppercase;
  background-color: var(--color-dark);
  font-family: 'Raleway';
  font-size: 1.5rem;
  cursor: pointer;
  font-weight: 600;
  transition: transform 50ms ease-in;
  &:hover {
    transform: scale(1.05);
  }
`
const Form = styled.form`
  margin: 0 auto;
  max-width: 300px;
  width: 90%;
  display: flex;
  flex-direction: column;
`
const FormMedium = styled.form`
  margin: 0 auto;
  max-width: 400px;
  width: 90%;
  display: flex;
  flex-direction: column;
`
const FormSplitLarge = styled.form`
  margin: 0 auto;
  max-width: 1000px;
  width: 100%;
  display: flex;
  flex-direction: row;
  &div {
    flex-direction: column;
  }
`

export {
  Form,
  FormSplitLarge,
  FormMedium,
  FormElement,
  RadioElements,
  FormSubmitButton
}