/* global gemini */

/**
 * Customizable test function
 * @componentName the component name to test
 * @variationName variation name
 * @aptureOrExampleNumber example number (index starts from 1) or array of
 *   selectors for capture-elements
 * @ignoreElements ignore ignoreElements selector (string) or selectors (Array of string)
 * @fn callback(actions, find) –  Optional callback describes a sequence of actions to bring the
 * page to this state, starting from a previous state of the suite.
 * */
function testVariation(
  componentName,
  variationName = 'normal',
  captureOrExampleNumber = 1,
  ignoreElements,
  fn = () => {},
) {
  return new Promise(resolve => {
    gemini.suite(`${componentName}_${variationName}`, suite => {
      try {
        let capture = `.component-example:nth-of-type(${captureOrExampleNumber}) .component`;
        if (captureOrExampleNumber instanceof Array) {
          capture = captureOrExampleNumber;
        }
        suite
          .setUrl(`/styleguide/component/${componentName}?enmock`)
          .setCaptureElements(capture)
          .ignoreElements(ignoreElements || [])
          .capture(variationName, {}, fn);
        resolve(suite);
      } catch (error) {
        console.error('Error occurred while testing variation', variationName);
      }
    });
  });
}

const skip = browsers => suite => {
  suite.skip(browsers);
};

// tests//
testVariation('IndexPage', 'normal', 1, [], actions => actions.wait(5000));

testVariation(
  'Departure',
  'normal',
  1,
  '.component-example:nth-of-type(1) .component .realtime-icon',
);

testVariation('WalkLeg', 'walk-start');
testVariation('WalkLeg', 'walk-middle', 2);
testVariation('WaitLeg');
testVariation('BicycleLeg', 'bicycle-leg-normal');
testVariation('BicycleLeg', 'bicycle-leg-walking-bike', 2);
testVariation('BicycleLeg', 'bicycle-leg-citybike', 3);
testVariation('BicycleLeg', 'bicycle-leg-citybike-walking-bike', 4);
testVariation('EndLeg');
testVariation('AirportCheckInLeg');
testVariation('AirportCollectLuggageLeg');
testVariation('BusLeg', 'scheduled');
testVariation('BusLeg', 'realtime', 2, ['svg.realtime-icon']);

testVariation('AirplaneLeg');
testVariation('SubwayLeg');
testVariation('TramLeg');
testVariation('RailLeg');
testVariation('FerryLeg');
testVariation('CarLeg');
testVariation('ViaLeg');
testVariation('CallAgencyLeg');

testVariation('Departure', 'added-padding', 2);
testVariation('Departure', 'with-stop', 3);
testVariation('Departure', 'isArrival', 4);

testVariation('RouteNumber', 'normal');
testVariation('RouteNumber', 'with-disruption', 2);
testVariation('RouteNumber', 'vertical', 4);
testVariation('RouteNumber', 'vertical-with-disruption', 5);

testVariation('RouteDestination', 'normal');
testVariation('RouteDestination', 'drop-off', 2);
testVariation('RouteDestination', 'last-stop', 3);

testVariation('PlatformNumber');

testVariation('CardHeader');
testVariation('Card');
testVariation('CityBikeCard');
testVariation('CityBikeContent');
testVariation('CityBikeAvailability');
testVariation('CityBikeUse');

testVariation('Availability');

testVariation('ParkAndRideAvailability', 'non-realtime');
testVariation('ParkAndRideAvailability', 'realtime', 2);

testVariation(
  'FavouriteLocation',
  'normal',
  1,
  '.component-example:nth-of-type(1) .component .realtime-icon',
);

testVariation('NoFavouriteLocations');

testVariation('EmptyFavouriteLocationSlot');

testVariation('TripRouteStop', 'non-realtime');
testVariation(
  'TripRouteStop',
  'realtime',
  ['.component-example:nth-of-type(2) .component'],
  '.component-example:nth-of-type(2) .component svg.realtime',
);

testVariation('Favourite', 'normal');
testVariation('Favourite', 'hovered', 1, [], actions =>
  actions.mouseMove('.component-example:nth-of-type(1) .component svg'),
);
testVariation('Favourite', 'not-favourite', 2);
testVariation('Favourite', 'not-favourite-hovered', 2, [], actions =>
  actions.mouseMove('.component-example:nth-of-type(2) .component svg'),
);

testVariation('IconWithTail', 'normal');
testVariation('IconWithTail', 'rotate', 2);
testVariation('IconWithTail', 'class', 3);
testVariation('IconWithTail', 'notail', 4);

testVariation('SelectedIconWithTail');
testVariation('IconWithCaution');
testVariation('IconWithBigCaution');
testVariation('IconWithIcon', 'customStyle', 1);
testVariation('IconWithIcon', 'normal', 2);

testVariation('TimeNavigationButtons', 'normal');
testVariation('TimeNavigationButtons', 'hovered', 1, [], actions => {
  actions
    .mouseMove(
      // eslint-disable-next-line comma-dangle
      '.component-example:nth-of-type(1) .component button:first-of-type',
    )
    .wait(400); // Wait for animation to happen
});

testVariation('TimeSelectors');

testVariation('RightOffcanvasToggle', 'default');
testVariation('RightOffcanvasToggle', 'adjusted', 2);

testVariation('MarkerSelectPopup');
testVariation('SelectStopRow');
testVariation('SelectTerminalRow');
testVariation('SelectCityBikeRow');
testVariation('SelectParkAndRideRow');
testVariation('TicketInformation');
testVariation('DateSelect');
testVariation('RouteScheduleHeader');
testVariation('RouteScheduleStopSelect');
testVariation('RouteScheduleTripRow');

// testVariation('AppBarSmall', 'with-back-arrow');
// testVariation('AppBarSmall', 'without-back-arrow', 2);
// testVariation('AppBarSmall', 'with-logo', 3);
// testVariation('AppBarLarge');

testVariation('FrontPagePanelLarge');
testVariation('FrontPagePanelSmall');
testVariation('ExternalLink');
testVariation('ExternalLink', 'with-icon-and-text', 2);
testVariation('LangSelect');

testVariation('ModeFilter', 'grey-buttons');
testVariation('ModeFilter', 'white-buttons', [
  '.nearby-routes .component-example:nth-of-type(1) .component',
]);

testVariation(
  'RouteStop',
  'normal',
  ['.component-example:nth-of-type(1) .component'],
  '.component-example:nth-of-type(1) .component svg.realtime',
);

testVariation('DepartureRow', 'normal', 1, [
  '.component-example:nth-of-type(1) .component .realtime-icon',
]);

testVariation('DepartureRow', 'with-cancelation', 2);

testVariation('BicycleRentalStationRow', 'plenty-of-bikes');
testVariation('BicycleRentalStationRow', 'few-bikes', 2);
testVariation('BicycleRentalStationRow', 'no-bikes', 3);

testVariation('StopPageHeader');
testVariation('Timetable');
testVariation('SplitBars');
testVariation('Labeled');
testVariation('Centered');
testVariation('InfoIcon');
testVariation('DepartureListHeader');
testVariation('NextDeparturesListHeader');
testVariation('SelectedStopPopupContent');
testVariation('PageFooter');

testVariation('FooterItem', 'basic');
testVariation('FooterItem', 'with-icon', 2);

testVariation('SummaryRow', 'large', 1);
testVariation('SummaryRow', 'small', 2);

testVariation('CallAgencyWarning');

testVariation('CurrentPositionSuggestionItem', 'with-position').then(
  skip('ie11'),
);
testVariation('CurrentPositionSuggestionItem', 'no-position', 2).then(
  skip('ie11'),
);

testVariation('SuggestionItem', 'Favourite');
testVariation('SuggestionItem', 'Address', 2);
testVariation('SuggestionItem', 'Route', 3);
testVariation('SuggestionItem', 'Stop', 4);
testVariation('SuggestionItem', 'Stop-without-timetable', 5);

testVariation('DateWarning', 'tomorrow-show-warning', 2);

testVariation('Error404');

testVariation('StopMarkerPopup', 'empty', 1);
testVariation('StopMarkerPopup', 'basic', 2, [
  'p:nth-child(2) > span.route-destination > span > span.last-stop-icon',
  'p:nth-child(4) > span.route-destination > span > span.last-stop-icon',
]);
testVariation('StopMarkerPopup', 'real-time', 3, [
  'div.departure-list > p:nth-child(1) > span.realtime svg.realtime',
  'div.departure-list > p:nth-child(2) > span.realtime svg.realtime',
  'div.departure-list > p:nth-child(4) > span.realtime svg.realtime',
  '#mainContent > div > div > div:nth-child(3) p:nth-child(2) > span.route-destination > span > span.last-stop-icon',
  '#mainContent > div > div > div:nth-child(3) p:nth-child(4) > span.route-destination > span > span.last-stop-icon',
]).then(skip('ie11'));
testVariation('StopMarkerPopup', 'tomorrow', 4, [
  '#mainContent > div > div > div:nth-child(4) p:nth-child(4) > span.route-destination > span > span.last-stop-icon',
  '#mainContent > div > div > div:nth-child(4) p:nth-child(8) > span.route-destination > span > span.last-stop-icon',
]).then(skip('ie11'));
testVariation('StopMarkerPopup', 'missing-platform', 5, [
  '#mainContent > div > div > div:nth-child(5) p:nth-child(2) > span.route-destination > span > span.last-stop-icon',
  '#mainContent > div > div > div:nth-child(5) p:nth-child(4) > span.route-destination > span > span.last-stop-icon',
]).then(skip('ie11'));

testVariation('SelectStreetModeDialog');
testVariation('SelectMapLayersDialog');
testVariation('MainMenuContainer');

testVariation('OriginDestinationBar', 'with-viapoint', 2);
