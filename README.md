# Challenge-Trip

## Installation:

1. Clone the project;
2. Run commands on root folder:

```
  $ bundle install
  $ yarn install
  $ cd ios/ && bundle exec pod install
```


https://user-images.githubusercontent.com/4606616/131050260-7de42209-fa92-4261-9341-8c833590dfd6.mp4


---

## Architecture

The project is following a Clean approach I managed to come up with after some research, CUPER:

#### C = Component

The React component. It is responsible for the UI display and interactions between the user.

#### U = Use Cases

Use Cases are the hosts of the business logic of the project. All interactions between Entities, infrastructure and domain happen here. A place to have very specific logic that can be composed and reused to implement more complex use cases. This allows for better and easier testability of the project without dependencies from UI and other parts of the system.

#### P = Presenter

Presenter is the coordinator between UI, Use Cases and Router. It is going to redirect actions on components to the correct Use Case or route the project to a new screen. It enforces a contract between all parts, so changes can be done in a easier way. For a React or React Native project, it is disguised as a hook, so we can leverage all the capabilities of hooks without having them explicitly inside the component code.

#### E = Entity

Entities are the representation of the system. Objects used to describe everything that exists in the project.

#### R = Router

Routers are responsible for routing the application to another screen or component. They know how to do it and where to do it. Having this decoupling in the project allows for better management in navigation and unbinds components from the navigation flow itself.

---

## Structure

#### Components

This package hosts all base components in the project that can be used to build bigger and complete screens or features. They should be generic enough to cover all cases the project need.

#### Domain

This package hosts all business logic of the app. It can be seem as the BE of an application. Entities, Use Cases, API services, repository use for specific Entities. Each domain type has its own package containing all the elements it needs, so to keep organization.

#### Infrastructure

This package hosts generic implementations of data access. Network layer, storage layer that will be used by domain to shape and move data around the project.

#### Navigation

This package hosts navigation configuration. Routes and stack configuration are done here and used routers.

#### Screens

This packages hosts the full screen components. Each component will haver their own Presenter and Router to communicate with domain and move around the application as needed.
