import React from 'react';
import { ShowItem } from './ShowItem';
import { Styled } from './styled';
import { ListLoader } from './Loader';

const ShowList = React.memo(function ShowList({ shows, isLoading }) {
  return isLoading ? (
    <ListLoader />
  ) : (
    <Styled.ShowList className={shows.length < 6 ? 'few' : null}>
      {shows.map((show) => (
        <ShowItem key={show.id} show={show} />
      ))}
    </Styled.ShowList>
  );
});

export default ShowList;
