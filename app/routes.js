/* eslint-disable react/jsx-key */
import React from 'react';
import { graphql } from 'react-relay';
import Route from 'found/lib/Route';
import queryMiddleware from 'farce/lib/queryMiddleware';
import createRender from 'found/lib/createRender';

import Error404 from './component/404';
import TopLevel from './component/TopLevel';

import { PREFIX_ITINERARY_SUMMARY } from './util/path';
import { preparePlanParams } from './util/planParamUtil';
import { errorLoading, getDefault } from './util/routerUtils';

import getStopRoutes from './stopRoutes';
import routeRoutes from './routeRoutes';

export const historyMiddlewares = [queryMiddleware];

export const render = createRender({});

export default config => {
  return (
    <Route Component={TopLevel}>
      <Route path="/" topBarOptions={{ disableBackButton: true }}>
        {{
          title: (
            <Route
              getComponent={() =>
                import(/* webpackChunkName: "itinerary" */ './component/Title').then(
                  getDefault,
                )
              }
            />
          ),
          content: (
            <Route
              getComponent={() =>
                import(/* webpackChunkName: "itinerary" */ './component/IndexPage').then(
                  getDefault,
                )
              }
            />
          ),
          meta: (
            <Route
              getComponent={() =>
                import(/* webpackChunkName: "itinerary" */ './component/IndexPageMeta').then(
                  getDefault,
                )
              }
            />
          ),
        }}
      </Route>
      <Route
        path="/styleguide"
        getComponent={() => {
          import(/* webpackChunkName: "styleguide" */ './component/StyleGuidePage')
            .then(getDefault)
            .catch(errorLoading);
        }}
      />
      <Route
        path="/styleguide/component/:componentName"
        topBarOptions={{ hidden: true }}
        getComponent={() => {
          import(/* webpackChunkName: "styleguide" */ './component/StyleGuidePage')
            .then(getDefault)
            .catch(errorLoading);
        }}
      />
      <Route
        path="/suosikki/uusi"
        getComponent={() => {
          import(/* webpackChunkName: "add-favourite" */ './component/AddFavouritePage')
            .then(getDefault)
            .catch(errorLoading);
        }}
      />
      {getStopRoutes()}
      {getStopRoutes(true) /* terminals */}
      {routeRoutes}
      <Route path={`/${PREFIX_ITINERARY_SUMMARY}/:from/:to/:hash?`}>
        {{
          title: (
            <Route
              path="(.*)?"
              getComponent={() =>
                import(/* webpackChunkName: "itinerary" */ './component/SummaryTitle').then(
                  getDefault,
                )
              }
            />
          ),
          content: (
            <Route
              getComponent={() =>
                import(/* webpackChunkName: "itinerary" */ './component/SummaryPage').then(
                  getDefault,
                )
              }
              query={graphql`
                query routes_SummaryPage_Query(
                  $fromPlace: String!
                  $toPlace: String!
                  $intermediatePlaces: [InputCoordinates!]
                  $numItineraries: Int!
                  $modes: String
                  $date: String!
                  $time: String!
                  $walkReluctance: Float
                  $walkBoardCost: Int
                  $minTransferTime: Int
                  $walkSpeed: Float
                  $maxWalkDistance: Float
                  $wheelchair: Boolean
                  $ticketTypes: String
                  $disableRemainingWeightHeuristic: Boolean
                  $arriveBy: Boolean
                  $transferPenalty: Int
                  $ignoreRealtimeUpdates: Boolean
                  $maxPreTransitTime: Int
                  $walkOnStreetReluctance: Float
                  $waitReluctance: Float
                  $bikeSpeed: Float
                  $bikeSwitchTime: Int
                  $bikeSwitchCost: Int
                  $bikeBoardCost: Int
                  $optimize: OptimizeType
                  $triangle: InputTriangle
                  $carParkCarLegWeight: Float
                  $maxTransfers: Int
                  $waitAtBeginningFactor: Float
                  $heuristicStepsPerMainStep: Int
                  $compactLegsByReversedSearch: Boolean
                  $itineraryFiltering: Float
                  $modeWeight: InputModeWeight
                  $preferred: InputPreferred
                  $unpreferred: InputUnpreferred
                  $allowedBikeRentalNetworks: [String]
                  $locale: String
                ) {
                  plan(
                    fromPlace: $fromPlace
                    toPlace: $toPlace
                    intermediatePlaces: $intermediatePlaces
                    numItineraries: $numItineraries
                    modes: $modes
                    date: $date
                    time: $time
                    walkReluctance: $walkReluctance
                    walkBoardCost: $walkBoardCost
                    minTransferTime: $minTransferTime
                    walkSpeed: $walkSpeed
                    maxWalkDistance: $maxWalkDistance
                    wheelchair: $wheelchair
                    ticketTypes: $ticketTypes
                    disableRemainingWeightHeuristic: $disableRemainingWeightHeuristic
                    arriveBy: $arriveBy
                    transferPenalty: $transferPenalty
                    ignoreRealtimeUpdates: $ignoreRealtimeUpdates
                    maxPreTransitTime: $maxPreTransitTime
                    walkOnStreetReluctance: $walkOnStreetReluctance
                    waitReluctance: $waitReluctance
                    bikeSpeed: $bikeSpeed
                    bikeSwitchTime: $bikeSwitchTime
                    bikeSwitchCost: $bikeSwitchCost
                    bikeBoardCost: $bikeBoardCost
                    optimize: $optimize
                    triangle: $triangle
                    carParkCarLegWeight: $carParkCarLegWeight
                    maxTransfers: $maxTransfers
                    waitAtBeginningFactor: $waitAtBeginningFactor
                    heuristicStepsPerMainStep: $heuristicStepsPerMainStep
                    compactLegsByReversedSearch: $compactLegsByReversedSearch
                    itineraryFiltering: $itineraryFiltering
                    modeWeight: $modeWeight
                    preferred: $preferred
                    unpreferred: $unpreferred
                    allowedBikeRentalNetworks: $allowedBikeRentalNetworks
                    locale: $locale
                  ) {
                    ...SummaryPage_plan
                  }

                  serviceTimeRange {
                    ...SummaryPage_serviceTimeRange
                  }
                }
              `}
              prepareVariables={preparePlanParams(config)}
              render={({ Component, props }) => {
                if (!Component) {
                  return null;
                }
                return props ? (
                  <Component {...props} />
                ) : (
                  <Component plan={null} />
                );
              }}
            >
              {{
                content: [
                  <Route
                    path="/tulosta"
                    getComponent={() =>
                      import(/* webpackChunkName: "itinerary" */ './component/PrintableItinerary').then(
                        getDefault,
                      )
                    }
                    printPage
                  />,
                  <Route
                    getComponent={() =>
                      import(/* webpackChunkName: "itinerary" */ './component/ItineraryTab').then(
                        getDefault,
                      )
                    }
                  />,
                ],
                map: (
                  <Route
                    path="(.*)?"
                    getComponent={() =>
                      import(/* webpackChunkName: "itinerary" */ './component/ItineraryPageMap').then(
                        getDefault,
                      )
                    }
                  />
                ),
              }}
            </Route>
          ),
          meta: (
            <Route
              path="(.*)?"
              getComponent={() =>
                import(/* webpackChunkName: "itinerary" */ './component/SummaryPageMeta').then(
                  getDefault,
                )
              }
            />
          ),
        }}
      </Route>

      <Route
        path="/suosikki/muokkaa/sijainti/:id"
        getComponent={() => {
          import(/* webpackChunkName: "add-favourite" */ './component/AddFavouritePage')
            .then(getDefault)
            .catch(errorLoading);
        }}
      />
      <Route
        path="/suosikki/muokkaa/pysakki/:id"
        getComponent={() => {
          import(/* webpackChunkName: "add-favourite" */ './component/AddFavouritePage')
            .then(getDefault)
            .catch(errorLoading);
        }}
      />
      <Route
        path="/tietoja-palvelusta"
        getComponent={() =>
          import(/* webpackChunkName: "about" */ './component/AboutPage').then(
            getDefault,
          )
        }
      />
      {!config.URL.API_URL.includes('/api.') && (
        <Route
          path="/admin"
          getComponent={() => {
            import(/* webpackChunkName: "admin" */ './component/AdminPage')
              .then(getDefault)
              .catch(errorLoading);
          }}
        />
      )}
      <Route path="/js/:name" Component={Error404} />
      <Route path="/css/:name" Component={Error404} />
      <Route path="/assets/:name" Component={Error404} />
      <Route path="/:from/:to" topBarOptions={{ disableBackButton: true }}>
        {{
          title: (
            <Route
              getComponent={() =>
                import(/* webpackChunkName: "itinerary" */ './component/Title').then(
                  getDefault,
                )
              }
            />
          ),
          content: (
            <Route
              getComponent={() =>
                import(/* webpackChunkName: "itinerary" */ './component/IndexPage').then(
                  getDefault,
                )
              }
            />
          ),
          meta: (
            <Route
              getComponent={() =>
                import(/* webpackChunkName: "itinerary" */ './component/IndexPageMeta').then(
                  getDefault,
                )
              }
            />
          ),
        }}
      </Route>
      <Route path="/?mock" topBarOptions={{ disableBackButton: true }}>
        {{
          title: (
            <Route
              getComponent={() =>
                import(/* webpackChunkName: "itinerary" */ './component/Title').then(
                  getDefault,
                )
              }
            >
              <Route path=":hash" />
            </Route>
          ),
          content: (
            <Route
              getComponent={() =>
                import(/* webpackChunkName: "itinerary" */ './component/IndexPage').then(
                  getDefault,
                )
              }
            />
          ),
        }}
      </Route>
      {/* For all the rest render 404 */}
      <Route path="*" Component={Error404} />
    </Route>
  );
};
