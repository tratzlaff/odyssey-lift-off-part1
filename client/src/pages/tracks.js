import React from 'react';
import { Layout } from '../components';

// We need to wrap all GraphQL strings in the gql template literal.
import { gql } from "@apollo/client";

const TRACKS = gql`
  query GetTracks {
    tracksForHome {
      id
      title
      author {
        id
        name
        photo
      }
      thumbnail
      length
      modulesCount
    }
  }
`;

/**
 * Tracks Page is the Catstronauts home page.
 * We display a grid of tracks fetched with useQuery with the TRACKS query
 */
const Tracks = () => {

};

export default Tracks;
