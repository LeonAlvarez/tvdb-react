import React, { useEffect, useState, useContext, useRef } from 'react';
import { useParams, useHistory, useLocation } from 'react-router-dom';
import { getSeasonDetails } from 'api/tmdb';
import { faChevronLeft, faChevronDown, faChevronUp } from '@fortawesome/free-solid-svg-icons';
import { missingPoster } from 'images';
import { ConfigContext } from 'contexts/configContext';

import { Error } from 'components';
import { Helmet } from 'react-helmet';
import { Styled } from './styled';
import Episode from './Episode/Episode';
import { SeasonsLoader } from './Loader';

const SeasonPage = () => {
  const config = useContext(ConfigContext);
  const { id, number } = useParams();
  const location = useLocation();
  const [season, setSeason] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);
  const history = useHistory();
  const prevLocation = useRef(location.pathname);

  useEffect(() => {
    async function getData() {
      const res = await getSeasonDetails(id, number);
      if (res.error) {
        setError(res.error);
      } else {
        setSeason(res.data);
      }
      setIsLoading(false);
    }
    getData();
    return () => setIsLoading(true);
  }, [id, number]);

  useEffect(() => {
    if (prevLocation !== location.pathname) window.scrollTo(0, 0);
    prevLocation.current = location.pathname;
  }, [location.pathname]);

  const handleChange = (event) => {
    history.push(`/show/${id}/season/${event.target.value}`);
  };
  const handleTop = () => {
    window.scrollTo(0, 0);
  };

  return isLoading ? (
    <SeasonsLoader />
  ) : (
    <>
      {error ? (
        <Error message={error} />
      ) : (
        <>
          <Helmet>
            <title>
              TVDB - {season.show.name} {season.name}
            </title>
          </Helmet>
          <Styled.SeasonHeader>
            <Styled.SeasonHeaderLeft>
              <Styled.TitleWrapper>
                <Styled.PageTitle>{season?.name}</Styled.PageTitle>
                <Styled.BackLink to={`/show/${id}`}>
                  <Styled.Icon icon={faChevronLeft} />
                  Go Back to Show
                </Styled.BackLink>
              </Styled.TitleWrapper>
            </Styled.SeasonHeaderLeft>
            <Styled.SeasonHeaderRight>
              <Styled.PageTitle as="span">Select another season</Styled.PageTitle>
              <Styled.SelectWrapper>
                <label style={{ opacity: '0', width: ' 0px' }} htmlFor="seasons">
                  Select Season
                </label>
                <Styled.Select
                  onChange={handleChange}
                  name="seasons"
                  id="seasons"
                  value={season.number}
                >
                  {season?.show.seasons.map((s) => (
                    <option key={s.id} value={s.season_number}>
                      {s.name}
                    </option>
                  ))}
                </Styled.Select>

                <Styled.Icon icon={faChevronDown} />
              </Styled.SelectWrapper>
            </Styled.SeasonHeaderRight>
          </Styled.SeasonHeader>
          <Styled.Wrapper>
            {season?.overview && (
              <Styled.Overview>
                <Styled.Poster>
                  <Styled.PosterImage
                    src={
                      season?.poster
                        ? `${config?.url}${config?.poster.smaller}${season?.poster}`
                        : missingPoster
                    }
                    alt={season?.name}
                    missingPoster={!season?.poster}
                  />
                </Styled.Poster>
                <div>
                  <h2>Season Overview</h2>
                  <p>{season?.overview}</p>
                </div>
              </Styled.Overview>
            )}

            <Styled.Title>Episodes</Styled.Title>
            <Styled.Episodes>
              {season?.episodes.map((e) => (
                <Episode key={e.id} episode={e} />
              ))}
            </Styled.Episodes>
            <Styled.GoTop onClick={handleTop}>
              <Styled.Icon icon={faChevronUp} />
              Go to the top
            </Styled.GoTop>
          </Styled.Wrapper>
        </>
      )}
    </>
  );
};

export default SeasonPage;
