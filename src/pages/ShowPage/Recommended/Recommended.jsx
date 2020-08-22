import React, { useEffect, useState, useRef } from 'react';
import { ShowList, Pagination, Error } from 'components';
import queryString from 'query-string';
import { useLocation, useParams } from 'react-router-dom';
import { getRecommendations } from 'api/tmdb';
import { Styled } from './styled';

const Recommended = ({ parentLoading }) => {
  const { id } = useParams();

  const location = useLocation();

  const [recommendations, setRecommendations] = useState();
  const [error, setError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const pages = useRef(1);
  const params = queryString.parse(location.search);

  useEffect(() => {
    async function getData() {
      const res = await getRecommendations(params.page, id);

      if (res.error) {
        setError(true);
      } else {
        setRecommendations(res.data);
        pages.current = res.data.total_pages;
      }
      setIsLoading(false);
    }
    !parentLoading && getData();

    return () => setIsLoading(true);
  }, [id, params.page, parentLoading]);

  return error ? (
    <Error />
  ) : (
    <Styled.Recommended>
      <h1>Recommended</h1>
      {recommendations?.results.length !== 0 ? (
        <>
          <ShowList
            isLoading={isLoading}
            shows={recommendations?.results}
            few={recommendations?.total_results < 5 ? 'few' : null}
          />
          <Pagination
            currentPage={parseInt(params.page ?? '1')}
            totalPages={pages.current}
            size={7}
          />
        </>
      ) : (
        'No recommendations found for this show'
      )}
    </Styled.Recommended>
  );
};

export default Recommended;
