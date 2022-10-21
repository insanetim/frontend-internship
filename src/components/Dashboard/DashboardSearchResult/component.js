import React from 'react'
import PropTypes from 'prop-types'
import { isEmpty } from 'lodash'

import Loading from 'src/components/Loading'
import MoviesList from 'src/components/MoviesList'
import { useContainer } from './hook'

const DashboardSearchResult = ({ searchQuery }) => {
  const { movies, handlePagination } = useContainer(searchQuery)

  if (isEmpty(movies)) {
    return <Loading />
  }

  return (
    <MoviesList
      movies={movies}
      emptyText='No movies found'
      handlePagination={handlePagination}
    />
  )
}

DashboardSearchResult.propTypes = {
  searchQuery: PropTypes.string.isRequired
}

export default DashboardSearchResult
