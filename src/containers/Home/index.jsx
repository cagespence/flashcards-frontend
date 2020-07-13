import React, { useEffect, useState } from 'react'
import { connect, useDispatch } from 'react-redux'
import { userCollections } from '../../redux/actions/collectionActions'
import { CollectionContainer, CollectionContent, CollectionBackground, CollectionItem, CollectionDescription } from '../../components/Elements/Collection'
import { useHistory } from 'react-router-dom'
import styled from 'styled-components'
import { FormElement } from '../../components/Form'

const FilterWrapper = styled.div`
  max-width: 400px;
  margin-left: auto;
`

const Home = ({user, loading, collections}) => {
  const dispatch = useDispatch()
  const history = useHistory()

  const [filteredCollections, setFilteredCollections] = useState(collections)
  const [searchTerm, setSearchTerm] = useState('')

  const handleChange = (term) => {
    setSearchTerm(term)
    setFilteredCollections(collections.filter(collection => (
      collection.name.toLowerCase().includes(term.toLowerCase())
    )))
  }

  useEffect(() => {
    if (collections.length === 0) {
      dispatch(userCollections(user.id))
    }
  }, [user])

  useEffect(() => {
    setFilteredCollections(collections)
  }, [collections])

  return (
    <>
      <FilterWrapper>
        <FormElement 
          autoComplete="off"
          id='filters'
          value={searchTerm}
          type="text"
          handleChange={handleChange}/>
      </FilterWrapper>
      <CollectionContainer>
          {filteredCollections?.map(collection => (
            <CollectionItem 
              className={`color-${collection.tint} ${collection.tint}`}
              onClick={()=>{
                history.push(`/collection/${collection.id}`)
              }}>
              <CollectionBackground/>
              <CollectionContent>
                {collection.name}
              </CollectionContent>
              <CollectionDescription>
                {collection.description}
              </CollectionDescription>
            </CollectionItem>
          ))}
      </CollectionContainer>
    </>
  )
}

const mapStateToProps = (state) => ({
  loading: state.collections.loading,
  collections: state.collections.collections,
  user: state.login.user,
})

export default connect(mapStateToProps)(Home)