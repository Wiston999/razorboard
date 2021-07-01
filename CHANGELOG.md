# Changelog
All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]
### Added

### Changed

### Fixed

## [0.6.0] - 2021-07-01
### Added
- Pagination (page number and size). Manage URL query params so views are easily shareable ([#6](i6)).

### Changed
- Almost all filters are now case insensitive
- Refactored all list views, now they all inherit from a common class
- Reinstall node button always enabled

### Fixed
- Honor keep policy checkbox on reinstall node modal

## [0.5.0] - 2020-11-20
### Added
- Navigation links to in-app resources. I.E.: from policies to repos, tasks, etc.
- Window title according to content
- Brokers view
- Added click filter on tasks base column
- Added policy information to node list and node detail view ([#11](i11)).
- Pause / Resume auto refresh button on top bar
- Check HTTP errors and open settings modal if so [#7](i7)

### Changed
- Moved settings modal to its own component
- Added http-error interceptor that will manage toastr and console.err messages
- Renamed http-loading service to http-events service and added HTTP status notification mechanism to other components

### Fixed
- Fixed a bug that was preventing settings to be fully updated
- Render node list row even when facts object is not defined ([#10](i10))
- Filter by state.installed in node list view ([#9](i9))

## [0.4.0] - 2020-11-04

### Added
- Remove www-authenticate header returned by razor server to avoid browser prompt
- Tooltip on policy view "% Nodes" bar.
- "Rainbow" brackets on tag rules for better parentheses matching readibility
- Search box for filtering node facts
- Filter by tag or policy when clicked on node list

### Changed
- Remove static "v" from version footer
- Increased node log time column width
- Generate http link to repository URL

## [0.3.0] - 2020-11-03
### Added
- HTTP Basic AUTH support
- Push to ghcr.io for container image

### Changed
- Autogenerate docker image internal version on `npm build`
- Restore error handling of polled HTTP requests
- Add tag list view colored tags
- Minor changes to make tests easier

## [0.2.0] - 2020-10-23
### Added
- Dev environment using `docker-compose`
- Footer with version
- Node metadata edition
- Node reinstall button from node detail view
- HTTPS enabled for docker image

### Changed
- Needed changes to make `ng build --prod` work
- Changed repository structure
- Make navbar position fixed
- Reworked razorapi service for better handling of asynchronous events

## [0.1.0] - 2020-10-08
### Added
- Node log viewer
- Sort by node 'Last Seen' column
- Node reinstall option
- Node detail view
- Action buttons on node list items
- Node model class
- List views for basic razor objects (nodes, hooks, tags, tasks, repos, policies, configuration)

### Changed
- Switch from cookie storage to local storage for settings
- Sortable columns show pointer cursor


<!-- External links -->

[i6] https://github.com/Wiston999/razorboard/issues/6

[i7] https://github.com/Wiston999/razorboard/issues/7

[i9] https://github.com/Wiston999/razorboard/issues/9

[i10] https://github.com/Wiston999/razorboard/issues/10

[i11] https://github.com/Wiston999/razorboard/issues/11
