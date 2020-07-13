import React, { useState, useEffect } from 'react'
import { connect, useDispatch } from 'react-redux';
import { createCollection, createCards } from '../../redux/actions/collectionActions';
import Loading from '../../components/Elements/Loading';
import {
  FormMedium,
  FormElement,
  FormSubmitButton,
  RadioElements
} from '../../components/Form'
import { Button } from '../../components/Elements/ReviewCard';
const Collections = ({createdCards, loading, error, user}) => {
  const dispatch = useDispatch()
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [privateCollection, setPrivateCollection] = useState(false)
  const [tint, setTint] = useState('black')
  const [formError, setFormError] = useState()
  const [cards, setCards] = useState([{front: '', back: ''}])

  useEffect(() => {
    console.log(createdCards)
    if (createdCards.length > 0) {
      dispatch(createCollection({
        name,
        privateCollection, 
        "private": false,
        description,
        tint,
        creator: user.id,
        cards: createdCards
      }))
    }
  }, [createdCards])

  const handleCreateCollection = (e) => {
    e.preventDefault()
    if(validateCreateRequest()){
      dispatch(createCards(cards))
    }
  }

  const noCardsAreEmpty = () => {
    return cards.every(card => {
      return card.front.length > 0 && card.back.length > 0
    })
  }

  const validateCreateRequest = () => {
    if (!name) {
      setFormError('Collection is missing a name')
      return false
    }
    if (!description) {
      setFormError('Collection is missing a description')
      return false
    }
    if (!cards.length > 0){
      setFormError('Collection is missing cards')
      return false
    }
    if (!noCardsAreEmpty()) {
      setFormError('Cards are missing values')
      return false
    }
    return true
  }

  const handleSelectTint = (value) => {
    setTint(value)
  }

  const createCard = () => {
    setCards([...cards, {front: '', back: ''}])
  }

  return (
    <div>
      {formError}
      {error?.message}
      <FormMedium onSubmit={handleCreateCollection}>
        <div>
          <FormElement
            id='Collection name'
            type='text'
            value={name}
            handleChange={setName}
          />
          <FormElement
            id='Description'
            type='text'
            value={description}
            handleChange={setDescription}
          />
          <RadioElements
            selectedValue={tint}
            handleChange={handleSelectTint}
            elements={[
              'black', 'green', 'blue', 'purple', 'red', 'orange'
            ]}
          />
        </div>
        <div>
          {cards.map((card, index) => (
            <>
              <FormElement
                key={`card-${index}-front`}
                id={`Card #${index + 1}`}
                type='text'
                value={card.front}
                handleChange={(value) => {
                  const mutatedCards = [...cards]
                  mutatedCards[index].front = value
                  setCards(mutatedCards)
                }}
              />
              <FormElement
                hideLabel={true}
                key={`card-${index}-back`}
                id={`Card #${index + 1} back`}
                type='text'
                value={card.back}
                handleChange={(value) => {
                  const mutatedCards = [...cards]
                  mutatedCards[index].back = value
                  setCards(mutatedCards)
                }}
              />
            </>
            ))}
          </div>
          <Button onClick={createCard}>
            create card
          </Button>
        <FormSubmitButton type='submit'>{
          loading? <Loading/> : 
          'Create collection'
        }</FormSubmitButton>
      </FormMedium>
    </div>
  )
}

const mapStateToProps = (state) => ({
  loading: state.collections.loading,
  error: state.collections.error,
  createdCards: state.collections.createdCards,
  user: state.login.user
})

export default connect(mapStateToProps)(Collections)