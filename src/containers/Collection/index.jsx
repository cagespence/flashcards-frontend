import React, { useEffect, useState } from 'react'
import { connect, useDispatch } from 'react-redux';
import { useParams, useHistory } from 'react-router-dom';
import { collectionById } from '../../redux/actions/collectionActions';
import Centered from '../../components/Elements/Centered';
import Loading from '../../components/Elements/Loading';
import { ReactComponent as Next } from '../../next.svg';
import { ReactComponent as Turn } from '../../flip.svg';
import { ReactComponent as Incorrect } from '../../incorrect.svg';
import { ReactComponent as Correct } from '../../correct.svg';
import { ReactComponent as Previous } from '../../back.svg';
import Reward from 'react-rewards';

import {
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
  NavigationArea,
  NavigationCounter,
  ProgressWrapper,
  ProgressInner,
  NavigationButton,
  Word
} from '../../components/Elements/ReviewCard'

var classNames = require('classnames');

const Collection = ({collectionCache, loading}) => {
  const dispatch = useDispatch()
  const history = useHistory()
  const [collection, setCollection] = useState()
  const [fetchedCollection, setFetchedCollection] = useState(false)
  const [reviewing, setReviewing] = useState(false)
  const [flip, setFlip] = useState(false)
  const [currentTermIndex, setCurrentTermIndex] = useState(0)
  const [reward, setReward] = useState()
  const [transitionOut, setTransitionOut] = useState(false)
  const [transitionIn, setTransitionIn] = useState(false)
  const [transitionReverseOut, setTransitionReverseOut] = useState(false)
  const [transitionReverseIn, setTransitionReverseIn] = useState(false)
  const [completed, setCompleted] = useState(false)
  let { id } = useParams();

  useEffect(() => {
    const cached = collectionCache.find(collection => {
      return collection.id == id
    })

    if (!fetchedCollection){
      if (!cached) {
        dispatch(collectionById(id))
      }
      if (cached) {
        setFetchedCollection(true)
        setCollection(cached)
      }
    }
  }, [collection, collectionCache])

  useEffect(() => {
    if (completed) {
      setTimeout(() => reward.rewardMe(), 1500);
    }
  }, [completed])

  const handleNext = () => {
    if (currentTermIndex < collection?.cards?.length && !(transitionReverseIn || transitionReverseOut || transitionIn || transitionOut)) {
      if (flip) {
        setFlip(false)
        setTimeout(() => doTransition(),600)
      } else {
        doTransition()
      }
    }
    if(currentTermIndex === collection?.cards?.length -1){
      if (!completed) {
        if (collection?.cards.every(card => card.correct === true)){
          setCompleted(true)
        }
      }
    }
  }

  const handleReviewIncorrect = () => {
    const incorrect = collection?.cards?.filter(card => !card.correct)
    const updatedCollection = {...collection}
    incorrect.forEach(card => delete card.correct)
    updatedCollection.cards = incorrect
    console.log(updatedCollection)
    setCompleted(false)
    setCurrentTermIndex(0)
    setCollection(updatedCollection)
  }

  const handleCorrect = () => {
    collection.cards[currentTermIndex].correct = true
    handleNext()
  }
  
  const handleIncorrect = () => {
    collection.cards[currentTermIndex].correct = false
    handleNext()
  }
  
  const doTransition = () => {
    setTransitionOut(true)
    setTimeout(() => {
      setTransitionOut(false)
      setTransitionIn(true)
      setCurrentTermIndex(currentTermIndex + 1)
      setFlip(false)
    }, 500)
    setTimeout(() => {
      setTransitionIn(false)
    }, 1000)
  }
  
  const handleBack = () => {
    if (currentTermIndex > 0 && !(transitionReverseIn || transitionReverseOut || transitionIn || transitionOut)) {
      if (flip) {
        setFlip(false)
        setTimeout(() => doTransitionReverse(), 600)
      } else {
        doTransitionReverse()
      }
    }
  }

  const doTransitionReverse = () => {
    setTransitionReverseOut(true)
    setTimeout(() => {
      setTransitionReverseOut(false)
      setTransitionReverseIn(true)
      setCurrentTermIndex(currentTermIndex - 1)
      setFlip(false)
    }, 500)
    setTimeout(() => {
      setTransitionReverseIn(false)
    }, 1000)
  }

  const handleFlip = () => {
    setFlip(!flip)
  }

  const reviewClasses = classNames({
    'flip': flip,
    'animate-next': transitionReverseOut, 
    'animate-in': transitionReverseIn,
    'animate-next-reverse': transitionOut, 
    'animate-in-reverse': transitionIn,
    'green': currentTermIndex < collection?.cards?.length ? collection?.cards[currentTermIndex].correct === true : false,
    'red': currentTermIndex < collection?.cards?.length ? collection?.cards[currentTermIndex].correct === false: false
  })

  return (
    loading? 
      <Centered>
        <Loading></Loading>
      </Centered>
    :
    <>
      <CollectionTitle>
        {collection?.name}
      </CollectionTitle>
      <CollectionDescription>
        {collection?.description}
      </CollectionDescription>
        {!reviewing &&
          <Button onClick={() => {setReviewing(!reviewing)}}>
            start review
          </Button>
        }
      {reviewing?
        <ReviewContainer>
            <div style={{position: 'relative'}}>
              <ReviewCard className={reviewClasses}>
                <Face>
                  <Front>
                    <Word>
                      {currentTermIndex < collection?.cards?.length ? collection?.cards[currentTermIndex]?.front :
                        <div>
                          {
                            collection?.cards?.every(card => card.correct === true) ? 
                            <>
                              All finished!
                              <Button onClick={() => history.push('/')}>
                                back to overview
                              </Button>
                            </>
                            :
                            collection?.cards?.every(card => card.correct === undefined) ? 
                            <>
                              you know how
                              flashcards work
                              ..right?
                            </> :
                            <>
                              you missed {(collection?.cards?.filter(card => card.correct === false)).length}
                              <Button onClick={handleReviewIncorrect}>
                                continue reviewing
                              </Button>
                            </>
                          }
                        </div>
                      }
                    </Word>                      
                    {currentTermIndex < collection.cards.length && 
                      <FlipButton
                        onClick={handleFlip} >
                        <Turn/>
                        flip
                      </FlipButton>
                    }
                  </Front>
                  
                  <Back>
                    <Word>
                      {collection?.cards[currentTermIndex]?.back}
                    </Word>
                    <FrontNav>
                      {collection?.cards[currentTermIndex]?.correct === undefined &&
                        <>
                          <NavigationButton
                            onClick={handleIncorrect} >
                            <Incorrect/>
                            incorect
                          </NavigationButton>
                          <NavigationButton
                            onClick={handleCorrect} >
                            <Correct/>
                            correct
                          </NavigationButton>
                        </>
                      }
                    </FrontNav>
                    <FlipReverse
                        onClick={handleFlip} >
                        <Turn/>
                        flip
                      </FlipReverse>
                    </Back>
                  </Face>
                </ReviewCard>
              </div>
            <ProgressWrapper>
              <ProgressInner
                style={{
                  width: `${((currentTermIndex)/collection.cards.length) * 100}%`,
                  transition: 'width 1s'
                }}
              ></ProgressInner>
            </ProgressWrapper>
            <NavigationArea>
              <NavigationButton
                onClick={handleBack}>
                <Previous/>
                back
              </NavigationButton>
              <div>
                <Reward
                  ref={(ref) => { setReward(ref) }}
                  type='confetti'>
                  <NavigationCounter>
                    {currentTermIndex < collection?.cards?.length ? currentTermIndex + 1 : currentTermIndex}/{collection?.cards?.length}
                    </NavigationCounter>
                </Reward>
              </div>
            <NavigationButton
              onClick={handleNext} >
                <Next/>
              skip
            </NavigationButton>
          </NavigationArea>
        </ReviewContainer>
      :
      <>
        {/* {collection?.cards?.map(card => (
          <div>
            {card.front} - {card.back}
          </div>
        ))} */}
      </>
    }
    </>

  )
}

const mapStateToProps = (state) => ({
  collectionCache: state.collections.collectionCache,
  loading: state.collections.loading,
})

export default connect(mapStateToProps)(Collection)