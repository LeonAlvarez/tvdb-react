import React, { useState, useContext } from 'react';
import { ConfigContext } from 'contexts/configContext';

import { missingPoster } from 'images';
import { Button, Loader } from 'components';
import ModalVideo from 'react-modal-video';

import utils from 'utils';

import { faExternalLinkAlt, faVideo, faChevronRight } from '@fortawesome/free-solid-svg-icons';

import { Helmet } from 'react-helmet';
import { Styled } from './styled';
import { InfoLoader } from './Loader';

const ShowInfo = ({ show, isLoading }) => {
  const [backdropLoaded, setBackdropLoaded] = useState(false);
  const [posterLoaded, setPosterLoaded] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const config = useContext(ConfigContext);

  const handleBackdropLoad = () => {
    setBackdropLoaded(true);
  };
  const handlePosterLoad = () => {
    setPosterLoaded(true);
  };

  const showModal = () => {
    setIsModalOpen(true);
  };

  const hideModal = () => {
    setIsModalOpen(false);
  };

  return isLoading ? (
    <InfoLoader />
  ) : (
    <>
      {show.video && (
        <ModalVideo
          channel="youtube"
          isOpen={isModalOpen}
          videoId={show.video}
          onClose={hideModal}
        />
      )}
      <Styled.ShowInfo>
        <Helmet>
          <title>TVDB - {show.name}</title>
        </Helmet>
        <Styled.Background
          style={{ opacity: backdropLoaded ? '1' : '0' }}
          src={show.backdrop && `${config?.url}${config?.backdrop.custom}${show.backdrop}`}
          alt={show.name}
          onLoad={handleBackdropLoad}
        />
        <Styled.Filter />

        <Styled.Poster>
          {!posterLoaded && (
            <Styled.PosterLoader>
              <Loader />
            </Styled.PosterLoader>
          )}

          <Styled.PosterImage
            style={{ opacity: posterLoaded ? '1' : '0' }}
            src={
              show.poster ? `${config?.url}${config?.poster.normal}${show.poster}` : missingPoster
            }
            alt={show.name}
            onLoad={handlePosterLoad}
          />
        </Styled.Poster>
        <Styled.Data>
          <Styled.DataHeader>
            <div>
              <h1>{utils.generateTitle(show)}</h1>
              {show.rating && <span>{show.rating}</span>}
            </div>
            <Styled.DataSubHeader>
              <p>{show.genres.map((genre) => genre.name).join(', ')}</p>
              <p>{`${show.duration} min / ${utils.getCountryName(show.country)}`}</p>
            </Styled.DataSubHeader>
          </Styled.DataHeader>

          <Styled.DataSection>
            <h2>Summary</h2>
            <p>{show.overview}</p>
          </Styled.DataSection>
          <Styled.DataSeasons to={`${process.env.PUBLIC_URL}/show/${show.id}/season/1`}>
            {show.seasons?.length} {show.seasons?.length > 1 ? 'Seasons' : 'Season'}
            <Styled.Icon icon={faChevronRight} />
          </Styled.DataSeasons>
          <Styled.DataSection>
            <h2>Created by</h2>
            <p>{show.creator}</p>
          </Styled.DataSection>
          <Styled.DataSection>
            <h2>Status</h2>
            <p>{show.status}</p>
          </Styled.DataSection>
          <Styled.DataRating>
            <h2>Rating</h2>
            <Styled.DataStars>{utils.generateStars(show.vote_average)}</Styled.DataStars>
            <Styled.DataVotes>
              {`${show.vote_average} with 
              ${show.vote_count} votes`}
            </Styled.DataVotes>
          </Styled.DataRating>

          <Styled.DataFooter>
            <Styled.DataFooterLeft>
              {show.website && (
                <Styled.DataFooterLink href={show.website}>
                  <Button>
                    <Styled.Icon icon={faExternalLinkAlt} />
                    Website
                  </Button>
                </Styled.DataFooterLink>
              )}
              {show.video && (
                <Styled.DataFooterLink onClick={showModal}>
                  <Button>
                    <Styled.Icon icon={faVideo} />
                    Trailer
                  </Button>
                </Styled.DataFooterLink>
              )}
            </Styled.DataFooterLeft>
            <Styled.DataFooterRight>
              {show.network.logo ? (
                <img src={`${config?.url}/${config?.logo.big}${show.network.logo}`} alt="Network" />
              ) : null}
            </Styled.DataFooterRight>
          </Styled.DataFooter>
        </Styled.Data>
      </Styled.ShowInfo>
    </>
  );
};

export default ShowInfo;
