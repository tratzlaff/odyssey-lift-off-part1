import React from 'react';
import { Layout } from '../components';
import TrackCard from "../containers/track-card";

// This lets us use query results in a consistent, predictable way throughout our app.
import QueryResult from "../components/query-result";

// We need to wrap all GraphQL strings in the gql template literal.
// The useQuery hook is the primary API for executing queries in a React application,
// so we'll use Apollo Client's useQuery hook.
import { useQuery, gql } from "@apollo/client";

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
    const { loading, error, data } = useQuery(TRACKS);

    if (loading) return "Loading...";
    if (error) return `Error! ${error.message}`;

    return(
        <Layout grid>
            <QueryResult error={error} loading={loading} data={data}>
                {data?.tracksForHome?.map((track) => (
                    <TrackCard key={track.id} track={track} />
                ))}
            </QueryResult>
        </Layout>
    );
};

export default Tracks;
